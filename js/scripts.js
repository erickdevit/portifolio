// Carregar Topbar
fetch('components/topbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('topbar-placeholder').innerHTML = data;

        // Verificar se estamos na página index.html e ocultar o link "Home"
        const homeLink = document.getElementById('home-link');
        const currentPath = window.location.pathname;
        if (currentPath === '/' || currentPath.endsWith('index.html')) {
            homeLink.style.display = 'none';
        }

        // Configurar o botão de alternância de tema
        const themeToggleBtn = document.getElementById('theme-toggle');
        const themeIcon = themeToggleBtn.querySelector('.theme-icon');
        
        // Carregar tema salvo do localStorage
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'white') {
            document.body.classList.add('white-theme');
            themeIcon.textContent = '☀'; // Ícone de sol para tema branco
        } else {
            themeIcon.textContent = '☾'; // Ícone de lua para tema preto
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('white-theme');
            const isWhiteTheme = document.body.classList.contains('white-theme');
            themeIcon.textContent = isWhiteTheme ? '☀' : '☾'; // Alternar entre sol e lua
            localStorage.setItem('theme', isWhiteTheme ? 'white' : 'dark'); // Salvar preferência
        });

        // Adicionar evento ao botão do terminal
        const terminalBtn = document.getElementById('terminal-btn');
        terminalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            terminalPopup.style.display = 'block';
            terminalInput.focus();
        });
    })
    .catch(error => console.error('Erro ao carregar a topbar:', error));

// Carregar Footer
fetch('components/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Erro ao carregar o footer:', error));

// Terminal
const terminalPopup = document.getElementById('terminal');
const closeTerminal = document.getElementById('close-terminal');
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');

// Verificar se os elementos do terminal existem (para páginas sem terminal)
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
                if (typeof commands[input] === 'function') {
                    output = commands[input]();
                } else {
                    output = commands[input];
                }
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

// Lógica do Blog
function loadBlogPosts() {
    const postsList = document.getElementById('posts-list');
    if (!postsList) return;

    fetch('posts/posts.json')
        .then(response => response.json())
        .then(posts => {
            // Ordenar posts por data (mais recente primeiro)
            posts.sort((a, b) => new Date(b.date) - new Date(a.date));

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post';

                const formattedDate = new Date(post.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

                postElement.innerHTML = `
                    <div class="post-header">
                        <h3><a href="post.html?file=${post.file}&title=${encodeURIComponent(post.title)}&date=${post.date}">${post.title}</a></h3>
                        <div class="post-date">${formattedDate}</div>
                    </div>
                    <div class="post-preview" id="preview-${post.file.replace(/\W/g, '')}">Carregando prévia...</div>
                `;
                postsList.appendChild(postElement);

                // Carregar a prévia do post
                fetch(post.file)
                    .then(res => res.text())
                    .then(text => {
                        // Primeiro, converte o Markdown para HTML para a prévia
                        const html = marked.parse(text);

                        const previewContainer = document.getElementById(`preview-${post.file.replace(/\W/g, '')}`);
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = html;
                        // Remove o conteúdo de blocos de código da prévia para não poluir
                        tempDiv.querySelectorAll('pre').forEach(pre => pre.remove());
                        const previewText = (tempDiv.textContent || tempDiv.innerText).split(' ').slice(0, 30).join(' ') + '...';
                        previewContainer.textContent = previewText.replace(/\s+/g, ' ').trim();
                    });
            });
        })
        .catch(error => {
            postsList.innerHTML = '<p>Erro ao carregar os posts. Tente novamente mais tarde.</p>';
            console.error('Erro ao carregar o arquivo de posts:', error);
        });
}

// Lógica da Página de Post Individual
function loadSinglePost() {
    const postTitleElement = document.getElementById('post-title');
    if (!postTitleElement) return; // Só executa na página de post

    const params = new URLSearchParams(window.location.search);
    const postFile = params.get('file');
    const postTitle = params.get('title');
    const postDate = params.get('date');

    if (postFile && postTitle && postDate) {
        document.title = postTitle; // Atualiza o título da aba do navegador
        postTitleElement.textContent = postTitle;
        document.getElementById('post-date').textContent = new Date(postDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

        fetch(postFile)
            .then(response => response.text())
            .then(data => {
                const contentElement = document.getElementById('post-content');

                // Gera a descrição e atualiza as meta tags para o preview de link
                const description = generatePreviewFromMarkdown(data, 50);
                updateMetaTags(postTitle, description);

                const processedData = processCustomTags(data);
                // Verifica se o arquivo é .md antes de processar com marked
                if (postFile.endsWith('.md')) {
                    contentElement.innerHTML = marked.parse(processedData);
                    // Adiciona os botões de cópia aos blocos de código
                    enhanceCodeBlocks(contentElement);
                } else {
                    // Para arquivos não-markdown, removemos o conteúdo de exemplo
                    // e podemos decidir o que mostrar.
                    contentElement.innerHTML = processedData;
                }
            })
            .catch(error => {
                document.getElementById('post-content').innerHTML = '<p>Erro ao carregar o conteúdo do post.</p>';
                console.error('Erro ao carregar o post:', error);
            });

        // Carrega os comentários do giscus
        loadGiscus();
    }
}

// Função para adicionar botões de "Copiar" aos blocos de código
function enhanceCodeBlocks(container) {
    const codeBlocks = container.querySelectorAll('pre');
    codeBlocks.forEach(pre => {
        // Cria um wrapper para posicionar o botão
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
                setTimeout(() => {
                    copyButton.textContent = 'Copiar';
                }, 2000);
            });
        });
    });
}

// Lógica dos Tutoriais
function loadTutorials() {
    const tutorialsList = document.getElementById('tutorials-list');
    if (!tutorialsList) return;

    fetch('tutoriais/tutoriais.json')
        .then(response => response.json())
        .then(tutorials => {
            // Ordenar tutoriais por data (mais recente primeiro)
            tutorials.sort((a, b) => new Date(b.date) - new Date(a.date));

            tutorials.forEach(tutorial => {
                const tutorialElement = document.createElement('div');
                tutorialElement.className = 'post'; // Reutilizando a classe .post

                const formattedDate = new Date(tutorial.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

                tutorialElement.innerHTML = `
                    <div class="post-header">
                        <h3><a href="tutorial.html?file=${tutorial.file}&title=${encodeURIComponent(tutorial.title)}&date=${tutorial.date}">${tutorial.title}</a></h3>
                        <div class="post-date">${formattedDate}</div>
                    </div>
                    <div class="post-preview" id="preview-${tutorial.file.replace(/\W/g, '')}">Carregando prévia...</div>
                `;
                tutorialsList.appendChild(tutorialElement);

                // Carregar a prévia do tutorial
                fetch(tutorial.file)
                    .then(res => res.text())
                    .then(text => {
                        // Primeiro, converte o Markdown para HTML para a prévia
                        const html = marked.parse(text);

                        const previewContainer = document.getElementById(`preview-${tutorial.file.replace(/\W/g, '')}`);
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = html;
                        // Remove o conteúdo de blocos de código da prévia para não poluir
                        tempDiv.querySelectorAll('pre').forEach(pre => pre.remove());
                        const previewText = (tempDiv.textContent || tempDiv.innerText).split(' ').slice(0, 30).join(' ') + '...';
                        previewContainer.textContent = previewText.replace(/\s+/g, ' ').trim();
                    });
            });
        })
        .catch(error => {
            tutorialsList.innerHTML = '<p>Erro ao carregar os tutoriais. Tente novamente mais tarde.</p>';
            console.error('Erro ao carregar o arquivo de tutoriais:', error);
        });
}

// Lógica da Página de Tutorial Individual
function loadSingleTutorial() {
    const tutorialTitleElement = document.getElementById('tutorial-title');
    if (!tutorialTitleElement) return; // Só executa na página de tutorial

    const params = new URLSearchParams(window.location.search);
    const tutorialFile = params.get('file');
    const tutorialTitle = params.get('title');
    const tutorialDate = params.get('date');

    if (tutorialFile && tutorialTitle && tutorialDate) {
        document.title = tutorialTitle;
        tutorialTitleElement.textContent = tutorialTitle;
        document.getElementById('tutorial-date').textContent = new Date(tutorialDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' });

        fetch(tutorialFile)
            .then(response => response.text())
            .then(data => {
                const contentElement = document.getElementById('tutorial-content');

                // Gera a descrição e atualiza as meta tags para o preview de link
                const description = generatePreviewFromMarkdown(data, 50);
                updateMetaTags(tutorialTitle, description);

                const processedData = processCustomTags(data);
                // Verifica se o arquivo é .md antes de processar com marked
                if (tutorialFile.endsWith('.md')) {
                    contentElement.innerHTML = marked.parse(processedData);
                    // Adiciona os botões de cópia aos blocos de código
                    enhanceCodeBlocks(contentElement);
                } else {
                    contentElement.innerHTML = processedData;
                }
            })
            .catch(error => {
                document.getElementById('tutorial-content').innerHTML = '<p>Erro ao carregar o conteúdo do tutorial.</p>';
                console.error('Erro ao carregar o tutorial:', error);
            });

        // Carrega os comentários do giscus
        loadGiscus();
    }
}

// Função para carregar o giscus (sistema de comentários)
function loadGiscus() {
    const commentsContainer = document.getElementById('comments-container');
    if (!commentsContainer) return;

    // Limpa o container caso já exista um script (útil para navegação SPA no futuro)
    commentsContainer.innerHTML = '';

    const script = document.createElement('script');
    // Define o tema personalizado com base no tema do site.
    // ATENÇÃO: O URL deve ser absoluto (com seu domínio).
    const theme = document.body.classList.contains('white-theme')
        ? 'url:https://erickdev.it/css/giscus-light.css'
        : 'url:https://erickdev.it/css/giscus-dark.css';

    script.src = 'https://giscus.app/client.js';
    // Configurações do seu repositório giscus
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

    // Adiciona um listener para trocar o tema do giscus quando o tema do site mudar
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

// Função para gerar uma prévia de texto a partir de um conteúdo Markdown
function generatePreviewFromMarkdown(markdown, wordCount = 30) {
    if (typeof marked === 'undefined') return '';

    const html = marked.parse(markdown);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Remove elementos que não contribuem bem para uma prévia de texto
    tempDiv.querySelectorAll('pre, code, h1, h2, h3, h4, h5, h6, blockquote, img, table').forEach(el => el.remove());

    const text = (tempDiv.textContent || tempDiv.innerText || '').trim();
    const preview = text.split(/\s+/).slice(0, wordCount).join(' ');

    return preview ? (preview + '...').replace(/\s+/g, ' ') : 'Clique para ler mais.';
}

// Função para atualizar as meta tags Open Graph e Twitter Card
function updateMetaTags(title, description) {
    const url = window.location.href;

    // Atualiza o título da página
    document.title = title;

    // Atualiza as meta tags
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="twitter:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="twitter:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url);
}


// Atualizar data e hora na página inicial
const datetimeElement = document.getElementById('datetime');
if (datetimeElement) {
    function updateDateTime() {
        const now = new Date();
        const date = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        datetimeElement.textContent = `${date} ${time}`;
    }

    // Atualiza imediatamente e depois a cada segundo
    updateDateTime();
    setInterval(updateDateTime, 1000);
}

// Executa as funções de acordo com a página
document.addEventListener('DOMContentLoaded', () => {
    // Configura o marked.js para usar o highlight.js para syntax highlighting
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
});

// Efeito Matrix no Background
const canvas = document.getElementById('matrix-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Caracteres a serem usados no efeito
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops = [];

    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }

    const draw = () => {
        // Fundo preto semi-transparente para criar o efeito de rastro
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Cria o gradiente de roxo para ciano
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#8A2BE2'); // Roxo
        gradient.addColorStop(1, '#00FFFF'); // Ciano

        ctx.fillStyle = gradient;
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            const x = i * fontSize;
            const y = rainDrops[i] * fontSize;
            ctx.fillText(text, x, y);
            if (y > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };

    setInterval(draw, 30);
}

// Efeito de partículas para o tema branco
const whiteCanvas = document.getElementById('white-theme-canvas');
if (whiteCanvas) {
    const ctx = whiteCanvas.getContext('2d');
    let particles = [];
    let rainDrops = [];
    let columns = 0;
    const fontSize = 16;
    const alphabet = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    
    const resizeCanvas = () => {
        whiteCanvas.width = window.innerWidth;
        whiteCanvas.height = window.innerHeight;
        columns = whiteCanvas.width / fontSize;
        rainDrops = [];
        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }
    };
    
    const animate = () => {
        // Fundo que apaga lentamente para criar rastro nas partículas
        ctx.fillStyle = 'rgba(245, 245, 245, 0.05)';
        ctx.fillRect(0, 0, whiteCanvas.width, whiteCanvas.height);

        // Cria o gradiente de verde para lilás
        const gradient = ctx.createLinearGradient(0, 0, 0, whiteCanvas.height);
        gradient.addColorStop(0, '#FFA500'); // Laranja
        gradient.addColorStop(1, '#C8A2C8'); // Lilás

        ctx.fillStyle = gradient;
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > whiteCanvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }

        requestAnimationFrame(animate);
    };

    window.addEventListener('resize', () => {
        resizeCanvas();
    });

    // Inicia a animação
    resizeCanvas();
    animate();
}