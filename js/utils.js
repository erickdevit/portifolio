// Função para processar tags customizadas como [youtube:ID]
function processCustomTags(content) {
    // Regex para encontrar [youtube:VIDEO_ID]
    const youtubeRegex = /\[youtube:(.*?)\]/g;
    return content.replace(youtubeRegex, (match, videoId) => {
        // Substitui a tag pelo HTML do player responsivo
        return `<div class="youtube-video-container">
                    <iframe src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>`;
    });
}

// Exportar para testes se estiver em ambiente Node
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { processCustomTags };
}
