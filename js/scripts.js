import { supabase } from './supabase-client.js';

// --- Component Loading ---

async function loadComponents() {
    try {
        const [topbarRes, footerRes, terminalRes] = await Promise.all([
            fetch('components/topbar.html'),
            fetch('components/footer.html'),
            fetch('components/terminal.html')
        ]);

        const topbarHtml = await topbarRes.text();
        const footerHtml = await footerRes.text();
        const terminalHtml = await terminalRes.text();

        // Inject Topbar
        const topbarPlaceholder = document.getElementById('topbar-placeholder');
        if (topbarPlaceholder) {
            topbarPlaceholder.innerHTML = topbarHtml;
            initTopbar();
        }

        // Inject Footer
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = footerHtml;
        }

        // Inject Terminal (append to body if not present, or replace placeholder)
        if (!document.getElementById('terminal')) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = terminalHtml;
            document.body.appendChild(tempDiv.firstElementChild);
            initTerminal();
        } else {
             initTerminal();
        }

    } catch (error) {
        console.error('Error loading components:', error);
    }
}

function initTopbar() {
    // Active Link Logic
    const currentPath = window.location.pathname;
    const homeLink = document.getElementById('home-link');
    if (homeLink && (currentPath === '/' || currentPath.endsWith('index.html'))) {
        homeLink.style.display = 'none'; // Hide Home link on Home page
    }

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('.theme-icon');
        const savedTheme = localStorage.getItem('theme') || 'dark';

        if (savedTheme === 'light') {
            document.body.classList.add('white-theme');
            if (themeIcon) themeIcon.textContent = '☀';
        } else {
            if (themeIcon) themeIcon.textContent = '☾';
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('white-theme');
            const isWhite = document.body.classList.contains('white-theme');
            if (themeIcon) themeIcon.textContent = isWhite ? '☀' : '☾';
            localStorage.setItem('theme', isWhite ? 'light' : 'dark');

            // Update Giscus theme if present
            updateGiscusTheme();
        });
    }

    // Terminal Button Logic (must be here because button is in Topbar)
    const terminalBtn = document.getElementById('terminal-btn');
    if (terminalBtn) {
        terminalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleTerminal();
        });
    }
}

function updateGiscusTheme() {
    const giscusFrame = document.querySelector('iframe.giscus-frame');
    if (giscusFrame) {
        // Note: Giscus theme URL needs to be valid and accessible.
        // Using 'light' / 'transparent_dark' as safe fallbacks
        const safeTheme = document.body.classList.contains('white-theme') ? 'light' : 'transparent_dark';

        giscusFrame.contentWindow.postMessage({ giscus: { setConfig: { theme: safeTheme } } }, 'https://giscus.app');
    }
}


// --- Terminal Logic ---

let terminalOpen = false;
let lastFocusedElement;

function initTerminal() {
    const terminal = document.getElementById('terminal');
    const closeBtn = document.getElementById('close-terminal');
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');

    if (!terminal) return;

    // Close Button
    if (closeBtn) {
        // Remove existing listener to avoid duplicates if re-init
        const newCloseBtn = closeBtn.cloneNode(true);
        closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
        newCloseBtn.addEventListener('click', toggleTerminal);
    }

    // Input Handling
    if (input) {
         // Clone to remove old listeners
        const newInput = input.cloneNode(true);
        input.parentNode.replaceChild(newInput, input);

        newInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = newInput.value.trim();
                newInput.value = '';
                processCommand(command, output);
            }
            if (e.key === 'Escape') {
                if (terminalOpen) toggleTerminal();
            }
        });
    }
}

function toggleTerminal() {
    const terminal = document.getElementById('terminal');
    const input = document.getElementById('terminal-input');

    if (!terminal) return;

    terminalOpen = !terminalOpen;

    if (terminalOpen) {
        lastFocusedElement = document.activeElement;
        terminal.style.display = 'block';
        if (input) input.focus();
    } else {
        terminal.style.display = 'none';
        if (lastFocusedElement) lastFocusedElement.focus();
    }
}

function processCommand(command, output) {
    if (!command) return;

    const cmdLine = document.createElement('div');
    cmdLine.innerHTML = `<span style="color: var(--accent-color);">$</span> ${sanitizeHTML(command)}`;
    output.appendChild(cmdLine);

    const response = document.createElement('div');
    response.style.marginBottom = '10px';

    const args = command.split(' ');
    const cmd = args[0].toLowerCase();

    switch (cmd) {
        case 'help':
            response.innerHTML = 'Comandos: help, clear, about, home, blog, contact, echo [msg], date, whoami';
            break;
        case 'clear':
            output.innerHTML = '';
            return; // Don't append response
        case 'about':
            window.location.href = 'index.html';
            response.textContent = 'Navegando para Home...';
            break;
        case 'home':
            window.location.href = 'index.html';
            response.textContent = 'Navegando para Home...';
            break;
        case 'blog':
            window.location.href = 'blog.html';
            response.textContent = 'Navegando para Blog...';
            break;
        case 'contact':
             response.innerHTML = 'Email: erick@wornexs.com<br>Whatsapp: +55 98 98478-9893';
            break;
        case 'echo':
            response.textContent = args.slice(1).join(' ');
            break;
        case 'date':
            response.textContent = new Date().toString();
            break;
        case 'whoami':
            response.textContent = 'visitante@erickdev.it';
            break;
        case 'sudo':
            response.textContent = 'Permissão negada: você não tem superpoderes aqui.';
            break;
        default:
            response.textContent = `Comando não encontrado: ${cmd}`;
    }

    output.appendChild(response);
    output.scrollTop = output.scrollHeight;
}

function sanitizeHTML(str) {
    if (!str) return '';
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}


// --- Content Loading Functions ---

async function loadBlogPosts() {
    const postsList = document.getElementById('posts-list');
    if (!postsList) return;

    try {
        // Fetch from Supabase
        const { data: posts, error } = await supabase
            .from('posts')
            .select('*')
            .eq('published', true)
            .order('created_at', { ascending: false });

        if (error) throw error;

        if (!posts || posts.length === 0) {
            postsList.innerHTML = '<p>Nenhuma postagem encontrada.</p>';
            return;
        }

        postsList.innerHTML = '';
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post';

            const date = new Date(post.created_at).toLocaleDateString('pt-BR');
            // Extract a plain text preview from markdown content
            let preview = post.content.replace(/[#*_\`]/g, '').substring(0, 150) + '...';

            postElement.innerHTML = `
                <div class="post-header">
                    <h3><a href="post.html?id=${post.id}">[ ${sanitizeHTML(post.title)} ]</a></h3>
                    <div class="post-date">${date}</div>
                </div>
                <div class="post-preview">
                    ${sanitizeHTML(preview)}
                </div>
                <a href="post.html?id=${post.id}" class="read-more" style="font-size: 0.8em; margin-left: 10px;">[ Ler mais ]</a>
            `;
            postsList.appendChild(postElement);
        });

    } catch (err) {
        console.error('Error loading posts:', err);
        postsList.innerHTML = '<p>Erro ao carregar postagens.</p>';
    }
}

async function loadSinglePost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const postContainer = document.getElementById('single-post-content');

    if (!postId || !postContainer) return;

    try {
         const { data: post, error } = await supabase
            .from('posts')
            .select('*')
            .eq('id', postId)
            .single();

        if (error) throw error;
        if (!post) {
            postContainer.innerHTML = '<p>Postagem não encontrada.</p>';
            return;
        }

        document.title = `${post.title} - Erick Dev`;

        // Render content
        let htmlContent = marked.parse(post.content);

        // Add Copy Buttons to code blocks
        htmlContent = htmlContent.replace(/<pre><code class="language-(.*?)">([\s\S]*?)<\/code><\/pre>/g, (match, lang, code) => {
             return `<div class="code-block-wrapper">
                        <button class="copy-code-btn" onclick="copyCode(this)">Copiar</button>
                        <pre><code class="language-${lang}">${code}</code></pre>
                    </div>`;
        });

        // Custom Tags
        htmlContent = processCustomTags(htmlContent);

        postContainer.innerHTML = `
            <h1>[ ${sanitizeHTML(post.title)} ]</h1>
            <div class="post-date" style="text-align: center; margin-bottom: 20px;">
                ${new Date(post.created_at).toLocaleDateString('pt-BR')}
            </div>
            <div class="post-full-content">
                ${htmlContent}
            </div>

            <div class="post-comments">
                <h3>>> Comentários</h3>
                <div class="giscus"></div>
            </div>
        `;

        // Load Comments Script
        const giscusContainer = document.querySelector('.giscus');
        if (giscusContainer) loadGiscus(giscusContainer);

        // Highlight Code
        if (typeof hljs !== 'undefined') {
            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block);
            });
        }

    } catch (err) {
        console.error('Error loading post:', err);
        postContainer.innerHTML = '<p>Erro ao carregar a postagem.</p>';
    }
}

// Global copy function
window.copyCode = function(btn) {
    const pre = btn.nextElementSibling;
    const code = pre.querySelector('code').innerText;
    navigator.clipboard.writeText(code).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copiado!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
};


function loadTutorials() {
    const list = document.getElementById('tutorials-list');
    if (!list) return;

    fetch('tutoriais/tutoriais.json')
        .then(res => res.json())
        .then(data => {
            list.innerHTML = '';
            data.forEach(tut => {
                const div = document.createElement('div');
                div.className = 'post';
                div.innerHTML = `
                    <div class="post-header">
                        <h3><a href="tutorial.html?id=${tut.id}">[ ${sanitizeHTML(tut.title)} ]</a></h3>
                    </div>
                    <div class="post-preview">${sanitizeHTML(tut.description)}</div>
                `;
                list.appendChild(div);
            });
        })
        .catch(err => console.error('Error loading tutorials:', err));
}

function loadSingleTutorial() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const container = document.getElementById('single-tutorial-content');

    if (!id || !container) return;

    fetch('tutoriais/tutoriais.json')
        .then(res => res.json())
        .then(data => {
            const tut = data.find(t => t.id == id);
            if (!tut) {
                container.innerHTML = '<p>Tutorial não encontrado.</p>';
                return;
            }

            // If content is a file path (e.g., "tutoriais/tutorialLinux.md")
            if (tut.file) {
                fetch(tut.file)
                    .then(res => res.text())
                    .then(md => {
                        let html = marked.parse(md);
                        html = processCustomTags(html);
                        container.innerHTML = `
                            <h1>[ ${sanitizeHTML(tut.title)} ]</h1>
                            <div class="post-full-content">${html}</div>
                        `;
                        if (typeof hljs !== 'undefined') hljs.highlightAll();
                    });
            } else {
                 container.innerHTML = `
                    <h1>[ ${sanitizeHTML(tut.title)} ]</h1>
                    <div class="post-full-content">${marked.parse(tut.content || '')}</div>
                `;
            }
        });
}

// Kept Suggestions Logic (LocalStorage)
function loadSuggestions() {
    const suggestionsList = document.getElementById('suggestions-list');
    if (!suggestionsList) return;

    let suggestions = JSON.parse(localStorage.getItem('blog_suggestions')) || [];
    if (suggestions.length === 0) {
        suggestionsList.innerHTML = '<p>Nenhuma sugestão enviada ainda. Seja o primeiro!</p>';
        return;
    }
    suggestions.sort((a, b) => new Date(b.date) - new Date(a.date));
    suggestionsList.innerHTML = '';
    suggestions.forEach(suggestion => {
        const suggestionCard = document.createElement('div');
        suggestionCard.className = 'post suggestion-card';
        const formattedDate = new Date(suggestion.date).toLocaleDateString('pt-BR');
        suggestionCard.innerHTML = `
            <div class="post-header">
                <h3>${sanitizeHTML(suggestion.topic)}</h3>
                <div class="post-date">${formattedDate}</div>
            </div>
            <div style="font-size: 0.9em; margin-bottom: 5px; color: var(--accent-color);">
                Sugerido por: <strong>${sanitizeHTML(suggestion.nickname)}</strong>
            </div>
            <div class="post-preview" style="white-space: pre-wrap;">${sanitizeHTML(suggestion.details)}</div>
        `;
        suggestionsList.appendChild(suggestionCard);
    });
}

function initContributePage() {
    const tutorialForm = document.getElementById('tutorial-form');
    const suggestionForm = document.getElementById('suggestion-form');

    if (tutorialForm) {
        tutorialForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Just simple alert and mailto for now
            const name = document.getElementById('tutorial-name').value;
            const title = document.getElementById('tutorial-title').value;
             alert('Obrigado! Seu cliente de e-mail será aberto para envio.');

             const email = document.getElementById('tutorial-email').value;
            const content = document.getElementById('tutorial-content').value;

            const subject = encodeURIComponent(`Submissão de Tutorial: ${title}`);
            const body = encodeURIComponent(
                `Nome: ${name}\nEmail: ${email}\n\nTítulo do Tutorial: ${title}\n\nConteúdo/Link:\n${content}`
            );

            window.location.href = `mailto:erick@wornexs.com?subject=${subject}&body=${body}`;
        });
    }

    if (suggestionForm) {
        suggestionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nickname = document.getElementById('suggest-nickname').value;
            const topic = document.getElementById('suggest-topic').value;
            const details = document.getElementById('suggest-details').value;

            if (nickname && topic && details) {
                const newSuggestion = {
                    nickname, topic, details,
                    date: new Date().toISOString()
                };
                let suggestions = JSON.parse(localStorage.getItem('blog_suggestions')) || [];
                suggestions.push(newSuggestion);
                localStorage.setItem('blog_suggestions', JSON.stringify(suggestions));
                alert('Sugestão enviada com sucesso!');
                window.location.href = 'suggestions.html';
            }
        });
    }
}


function loadGiscus(container) {
    if (!container) return;
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', 'erickdevit/blog-comments-');
    script.setAttribute('data-repo-id', 'R_kgDOQE81ng');
    script.setAttribute('data-category', 'General');
    script.setAttribute('data-category-id', 'DIC_kwDOQE81ns4CwzXN');
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', document.body.classList.contains('white-theme') ? 'light' : 'transparent_dark');
    script.setAttribute('data-lang', 'pt');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;
    container.appendChild(script);
}

function processCustomTags(content) {
    if (!content) return '';
    return content.replace(/\[youtube:(.*?)\]/g, (match, videoId) => {
        return `<div class="youtube-video-container">
                    <iframe src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>`;
    });
}

// --- Effects (Matrix) ---

function initEffects() {
    // Only init if not explicitly disabled via class "no-matrix"
    if (document.body.classList.contains('no-matrix')) return;

    const matrixCanvas = document.getElementById('matrix-canvas');
    const whiteCanvas = document.getElementById('white-theme-canvas');

    if (matrixCanvas) initMatrix(matrixCanvas);
    if (whiteCanvas) initWhiteParticles(whiteCanvas);
}

function initMatrix(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    let rainDrops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
        // Optimization: check if visible
        if (getComputedStyle(canvas).display === 'none') return;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#8A2BE2');
        gradient.addColorStop(1, '#00FFFF');
        ctx.fillStyle = gradient;
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            const x = i * fontSize;
            const y = rainDrops[i] * fontSize;
            ctx.fillText(text, x, y);
            if (y > canvas.height && Math.random() > 0.975) rainDrops[i] = 0;
            rainDrops[i]++;
        }
    };

    // Use requestAnimationFrame instead of setInterval for better performance
    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    const animate = (time) => {
        requestAnimationFrame(animate);
        const delta = time - lastTime;
        if (delta > interval) {
            draw();
            lastTime = time - (delta % interval);
        }
    };
    requestAnimationFrame(animate);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Reset drops
        rainDrops = Array(Math.floor(canvas.width / fontSize)).fill(1);
    });
}

function initWhiteParticles(canvas) {
    const ctx = canvas.getContext('2d');
    const fontSize = 16;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let rainDrops = [];

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const columns = canvas.width / fontSize;
        rainDrops = Array(Math.floor(columns)).fill(1);
    };

    const animate = () => {
        if (getComputedStyle(canvas).display === 'none') {
            requestAnimationFrame(animate);
            return;
        }

        ctx.fillStyle = 'rgba(245, 245, 245, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#FFA500');
        gradient.addColorStop(1, '#C8A2C8');
        ctx.fillStyle = gradient;
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) rainDrops[i] = 0;
            rainDrops[i]++;
        }
        requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();
}

// --- Init ---

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Load UI Components
    await loadComponents();

    // 2. Init Effects
    initEffects();

    // 3. Init DateTime
    const datetimeElement = document.getElementById('datetime');
    if (datetimeElement) {
        const updateDateTime = () => {
            const now = new Date();
            const date = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
            const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            datetimeElement.textContent = `${date} ${time}`;
        };
        updateDateTime();
        setInterval(updateDateTime, 1000);
    }

    // 4. Load Content based on page
    loadBlogPosts();
    loadSinglePost();
    loadTutorials();
    loadSingleTutorial();
    loadSuggestions();
    initContributePage();

    // 5. Config Marked
    if (typeof marked !== 'undefined' && typeof hljs !== 'undefined') {
        marked.setOptions({
            highlight: function(code, lang) {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                return hljs.highlight(code, { language }).value;
            }
        });
    }
});
