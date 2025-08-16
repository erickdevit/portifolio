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

// Lidar com os posts na página do blog
const postPopup = document.getElementById('post-popup');
const postPopupTitle = document.getElementById('post-popup-title');
const postPopupContent = document.getElementById('post-popup-content');
const closePost = document.getElementById('close-post');
const postsList = document.getElementById('posts-list');

// Verificar se estamos na página do blog (se os elementos existem)
if (postPopup && closePost && postsList) {
    closePost.addEventListener('click', () => {
        postPopup.style.display = 'none';
    });

    const posts = Array.from(document.querySelectorAll('.post'));

    // Ordenar postagens por data (mais recente primeiro)
    posts.sort((a, b) => {
        const dateA = new Date(a.getAttribute('data-post-date'));
        const dateB = new Date(b.getAttribute('data-post-date'));
        return dateB - dateA; // Ordem decrescente (mais recente primeiro)
    });

    // Reorganizar os elementos no DOM
    posts.forEach(post => postsList.appendChild(post));

    // Carregar prévias e configurar eventos para abrir os posts
    posts.forEach(post => {
        const title = post.querySelector('h3');
        const previewDiv = post.querySelector('.post-preview');
        const postFile = post.getAttribute('data-post-file');

        fetch(postFile)
            .then(response => response.text())
            .then(data => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = data;
                const fullText = tempDiv.textContent || tempDiv.innerText;
                const previewText = fullText.split(' ').slice(0, 30).join(' ') + '...';
                previewDiv.textContent = previewText;

                title.addEventListener('click', () => {
                    postPopupTitle.textContent = title.textContent;
                    postPopupContent.innerHTML = data;
                    postPopup.style.display = 'block';
                });
            })
            .catch(error => {
                previewDiv.textContent = 'Erro ao carregar a prévia.';
                console.error('Erro ao carregar o post:', error);
            });
    });
}