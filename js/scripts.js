import { supabase } from './supabase-client.js';

// Carregar Topbar
fetch('components/topbar.html')
    .then(response => response.text())
    .then(data => {
        const placeholder = document.getElementById('topbar-placeholder');
        if (placeholder) placeholder.innerHTML = data;

        const homeLink = document.getElementById('home-link');
        const currentPath = window.location.pathname;
        if (homeLink && (currentPath === '/' || currentPath.endsWith('index.html'))) {
            homeLink.style.display = 'none';
        }

        const themeToggleBtn = document.getElementById('theme-toggle');
        if (themeToggleBtn) {
            const themeIcon = themeToggleBtn.querySelector('.theme-icon');
            const savedTheme = localStorage.getItem('theme') || 'dark';

            if (savedTheme === 'white') {
                document.body.classList.add('white-theme');
                themeIcon.textContent = '☀';
            } else {
                themeIcon.textContent = '☾';
            }

            themeToggleBtn.addEventListener('click', () => {
                document.body.classList.toggle('white-theme');
                const isWhiteTheme = document.body.classList.contains('white-theme');
                themeIcon.textContent = isWhiteTheme ? '☀' : '☾';
                localStorage.setItem('theme', isWhiteTheme ? 'white' : 'dark');
            });
        }

        const terminalBtn = document.getElementById('terminal-btn');
        if (terminalBtn) {
            terminalBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const terminalPopup = document.getElementById('terminal');
                if (terminalPopup) {
                    terminalPopup.style.display = 'block';
                    document.getElementById('terminal-input')?.focus();
                }
            });
        }
    })
    .catch(error => console.error('Erro ao carregar a topbar:', error));

// Carregar Footer
fetch('components/footer.html')
    .then(response => response.text())
    .then(data => {
        const placeholder = document.getElementById('footer-placeholder');
        if (placeholder) placeholder.innerHTML = data;
    })
    .catch(error => console.error('Erro ao carregar o footer:', error));

// Terminal Logic
const terminalPopup = document.getElementById('terminal');
const closeTerminal = document.getElementById('close-terminal');
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');

if (closeTerminal && terminalOutput && terminalInput) {
    closeTerminal.addEventListener('click', () => {
        terminalPopup.style.display = 'none';
    });

    const commands = {
        'whoami': 'erickdev',
        'pwd': '/root/erickdev',
        'ls': 'dir1  dir2  file1.txt  file2.txt',
        'clear': () => {
            terminalOutput.innerHTML = '';
            return '';
        },
        'help': 'Comandos disponíveis: whoami, pwd, ls, clear, help'
    };

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const input = terminalInput.value.trim().toLowerCase();
            let output = '';

            if (input in commands) {
                output = typeof commands[input] === 'function' ? commands[input]() : commands[input];
            } else if (input) {
                output = `Comando não encontrado: ${input}. Digite 'help' para ver os comandos disponíveis.`;
            }

            if (input !== 'clear') {
                const newLine = document.createElement('p');
                newLine.textContent = `$ ${input}`;
                terminalOutput.appendChild(newLine);

                if (output) {
                    const outputLine = document.createElement('p');
                    outputLine.textContent = output;
                    terminalOutput.appendChild(outputLine);
                }
            }
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
            terminalInput.value = '';
        }
    });
}

// --- BLOG LOGIC (Supabase) ---

async function loadBlogPosts() {
    const postsList = document.getElementById('posts-list');
    if (!postsList) return;

    const { data: posts, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .eq('type', 'post')
        .order('created_at', { ascending: false });

    if (error) {
        postsList.innerHTML = '<p>Erro ao carregar posts.</p>';
        console.error(error);
        return;
    }

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        const date = new Date(post.created_at).toLocaleDateString('pt-BR');

        postElement.innerHTML = `
            <div class="post-header">
                <h3><a href="post.html?slug=${post.slug}&title=${encodeURIComponent(post.title)}">${post.title}</a></h3>
                <div class="post-date">${date}</div>
            </div>
            <div class="post-preview">${post.excerpt || 'Clique para ler mais...'}</div>
        `;
        postsList.appendChild(postElement);
    });
}

async function loadSinglePost() {
    const postTitleElement = document.getElementById('post-title');
    if (!postTitleElement) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    const legacyFile = params.get('file');

    let post = null;

    if (slug) {
        const { data, error } = await supabase.from('posts').select('*').eq('slug', slug).single();
        if (data) post = data;
    } else if (legacyFile) {
        // Fallback or ignore.
        console.warn('Legacy URL detected');
    }

    if (post) {
        document.title = post.title;
        postTitleElement.textContent = post.title;
        document.getElementById('post-date').textContent = new Date(post.created_at).toLocaleDateString('pt-BR');

        const contentElement = document.getElementById('post-content');
        const processedData = processCustomTags(post.content || '');

        if (typeof marked !== 'undefined') {
            contentElement.innerHTML = marked.parse(processedData);
            enhanceCodeBlocks(contentElement);
        } else {
            contentElement.innerHTML = processedData;
        }

        updateMetaTags(post.title, post.excerpt || '');
        loadGiscus();
    } else {
         document.getElementById('post-content').innerHTML = '<p>Post não encontrado.</p>';
    }
}

// --- TUTORIALS LOGIC (Supabase) ---

async function loadTutorials() {
    const tutorialsList = document.getElementById('tutorials-list');
    if (!tutorialsList) return;

    const { data: tutorials, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'published')
        .eq('type', 'tutorial')
        .order('created_at', { ascending: false });

    if (error) {
        tutorialsList.innerHTML = '<p>Erro ao carregar tutoriais.</p>';
        return;
    }

    tutorials.forEach(tutorial => {
        const tutorialElement = document.createElement('div');
        tutorialElement.className = 'post';
        const date = new Date(tutorial.created_at).toLocaleDateString('pt-BR');

        tutorialElement.innerHTML = `
            <div class="post-header">
                <h3><a href="tutorial.html?slug=${tutorial.slug}&title=${encodeURIComponent(tutorial.title)}">${tutorial.title}</a></h3>
                <div class="post-date">${date}</div>
            </div>
            <div class="post-preview">${tutorial.excerpt || 'Clique para ler mais...'}</div>
        `;
        tutorialsList.appendChild(tutorialElement);
    });
}

async function loadSingleTutorial() {
    const tutorialTitleElement = document.getElementById('tutorial-title');
    if (!tutorialTitleElement) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');

    if (slug) {
        const { data: tutorial } = await supabase.from('posts').select('*').eq('slug', slug).single();

        if (tutorial) {
            document.title = tutorial.title;
            tutorialTitleElement.textContent = tutorial.title;
            document.getElementById('tutorial-date').textContent = new Date(tutorial.created_at).toLocaleDateString('pt-BR');

            const contentElement = document.getElementById('tutorial-content');
            const processedData = processCustomTags(tutorial.content || '');

            if (typeof marked !== 'undefined') {
                contentElement.innerHTML = marked.parse(processedData);
                enhanceCodeBlocks(contentElement);
            } else {
                contentElement.innerHTML = processedData;
            }

            updateMetaTags(tutorial.title, tutorial.excerpt || '');
            loadGiscus();
        }
    }
}

// --- UTILS ---

function enhanceCodeBlocks(container) {
    const codeBlocks = container.querySelectorAll('pre');
    codeBlocks.forEach(pre => {
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-btn';
        copyButton.textContent = 'Copiar';
        wrapper.appendChild(copyButton);

        copyButton.addEventListener('click', () => {
            const code = pre.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                copyButton.textContent = 'Copiado!';
                setTimeout(() => { copyButton.textContent = 'Copiar'; }, 2000);
            });
        });
    });
}

function loadGiscus() {
    const commentsContainer = document.getElementById('comments-container');
    if (!commentsContainer) return;

    commentsContainer.innerHTML = '';
    const script = document.createElement('script');
    const theme = document.body.classList.contains('white-theme')
        ? 'url:https://erickdev.it/css/giscus-light.css'
        : 'url:https://erickdev.it/css/giscus-dark.css';

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
    script.setAttribute('data-theme', theme);
    script.setAttribute('data-lang', 'pt');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;
    commentsContainer.appendChild(script);

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const giscusFrame = document.querySelector('iframe.giscus-frame');
            if (giscusFrame) {
                const newTheme = document.body.classList.contains('white-theme')
                    ? 'url:https://erickdev.it/css/giscus-light.css'
                    : 'url:https://erickdev.it/css/giscus-dark.css';
                giscusFrame.contentWindow.postMessage({ giscus: { setConfig: { theme: newTheme } } }, 'https://giscus.app');
            }
        });
    }
}

function updateMetaTags(title, description) {
    document.title = title;
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="twitter:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="twitter:description"]')?.setAttribute('content', description);
}

function processCustomTags(content) {
    return content.replace(/\[youtube:(.*?)\]/g, (match, videoId) => {
        return `<div class="youtube-video-container">
                    <iframe src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>`;
    });
}

// Matrix Effect
const canvas = document.getElementById('matrix-canvas');
if (canvas && !document.body.classList.contains('no-matrix')) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const rainDrops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
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
    setInterval(draw, 30);
}

// White Theme Particles (Simplified from original for brevity, keeping main logic)
const whiteCanvas = document.getElementById('white-theme-canvas');
if (whiteCanvas && !document.body.classList.contains('no-matrix')) {
    const ctx = whiteCanvas.getContext('2d');
    let rainDrops = [];
    const fontSize = 16;
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const resizeCanvas = () => {
        whiteCanvas.width = window.innerWidth;
        whiteCanvas.height = window.innerHeight;
        const columns = whiteCanvas.width / fontSize;
        rainDrops = Array(Math.floor(columns)).fill(1);
    };
    const animate = () => {
        ctx.fillStyle = 'rgba(245, 245, 245, 0.05)';
        ctx.fillRect(0, 0, whiteCanvas.width, whiteCanvas.height);
        const gradient = ctx.createLinearGradient(0, 0, 0, whiteCanvas.height);
        gradient.addColorStop(0, '#FFA500');
        gradient.addColorStop(1, '#C8A2C8');
        ctx.fillStyle = gradient;
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
            if (rainDrops[i] * fontSize > whiteCanvas.height && Math.random() > 0.975) rainDrops[i] = 0;
            rainDrops[i]++;
        }
        requestAnimationFrame(animate);
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    if (typeof marked !== 'undefined' && typeof hljs !== 'undefined') {
        marked.setOptions({
            highlight: function(code, lang) {
                const language = hljs.getLanguage(lang) ? lang : 'plaintext';
                return hljs.highlight(code, { language }).value;
            }
        });
    }

    loadBlogPosts();
    loadSinglePost();
    loadTutorials();
    loadSingleTutorial();
    loadSuggestions(); // kept from original although not Supabase-backed yet
    initContributePage();

    // DateTime
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
});

// Helper for suggestions (still localstorage)
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
                <h3>${suggestion.topic}</h3>
                <div class="post-date">${formattedDate}</div>
            </div>
            <div style="font-size: 0.9em; margin-bottom: 5px; color: #00FF00;">
                Sugerido por: <strong>${suggestion.nickname}</strong>
            </div>
            <div class="post-preview" style="white-space: pre-wrap;">${suggestion.details}</div>
        `;
        suggestionsList.appendChild(suggestionCard);
    });
}

// Função para inicializar a página de contribuição e sugestão
function initContributePage() {
    const tutorialForm = document.getElementById('tutorial-form');
    const suggestionForm = document.getElementById('suggestion-form');

    // Lógica para envio de Tutorial (Email)
    if (tutorialForm) {
        tutorialForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('tutorial-name').value;
            const email = document.getElementById('tutorial-email').value;
            const title = document.getElementById('tutorial-title').value;
            const content = document.getElementById('tutorial-content').value;

            const subject = encodeURIComponent(`Submissão de Tutorial: ${title}`);
            const body = encodeURIComponent(
                `Nome: ${name}\nEmail: ${email}\n\nTítulo do Tutorial: ${title}\n\nConteúdo/Link:\n${content}`
            );

            window.location.href = `mailto:erick@wornexs.com?subject=${subject}&body=${body}`;
        });
    }

    // Lógica para envio de Sugestão (LocalStorage)
    if (suggestionForm) {
        suggestionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nickname = document.getElementById('suggest-nickname').value;
            const topic = document.getElementById('suggest-topic').value;
            const details = document.getElementById('suggest-details').value;

            if (nickname && topic && details) {
                const newSuggestion = {
                    nickname: nickname,
                    topic: topic,
                    details: details,
                    date: new Date().toISOString()
                };

                // Recupera lista atual, adiciona e salva
                let suggestions = JSON.parse(localStorage.getItem('blog_suggestions')) || [];
                suggestions.push(newSuggestion);
                localStorage.setItem('blog_suggestions', JSON.stringify(suggestions));

                alert('Sugestão enviada com sucesso!');
                window.location.href = 'suggestions.html';
            }
        });
    }
}
