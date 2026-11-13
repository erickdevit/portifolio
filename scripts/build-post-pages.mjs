import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const siteUrl = 'https://erickdevs.it';
const socialImage = `${siteUrl}/img/erickportifolio.png`;
const posts = JSON.parse(await readFile(join(root, 'posts/posts.json'), 'utf8'));

marked.use({ gfm: true, breaks: false });

const escapeHtml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const absoluteUrl = (path) => new URL(path, siteUrl).href;
const isoDate = (date) => `${date}T09:00:00-03:00`;
const formattedDate = (date) => new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
}).format(new Date(`${date}T00:00:00Z`));

const renderCustomTags = (markdown) => markdown.replace(
    /\[youtube:(.*?)\]/g,
    (_, videoId) => `<div class="youtube-video-container"><iframe src="https://www.youtube.com/embed/${escapeHtml(videoId)}" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`
);

const jsonLd = (post) => JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'BlogPosting',
            '@id': `${absoluteUrl(post.url)}#article`,
            mainEntityOfPage: absoluteUrl(post.url),
            headline: post.title,
            description: post.description,
            image: {
                '@type': 'ImageObject',
                url: socialImage,
                width: 1920,
                height: 1080
            },
            datePublished: isoDate(post.date),
            dateModified: isoDate(post.dateModified),
            inLanguage: 'pt-BR',
            articleSection: post.section,
            keywords: post.tags,
            author: {
                '@type': 'Person',
                '@id': `${siteUrl}/#erick-dev`,
                name: 'Erick Dev',
                url: `${siteUrl}/`
            },
            publisher: { '@id': `${siteUrl}/#erick-dev` },
            isPartOf: {
                '@type': 'Blog',
                '@id': `${siteUrl}/blog.html#blog`,
                name: 'Blog do Erick Dev',
                url: `${siteUrl}/blog.html`
            }
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Erick Dev', item: `${siteUrl}/` },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog.html` },
                { '@type': 'ListItem', position: 3, name: post.title, item: absoluteUrl(post.url) }
            ]
        }
    ]
}).replaceAll('<', '\\u003c');

const renderPostPage = (post, articleHtml) => `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(post.seoTitle)}</title>
    <meta name="description" content="${escapeHtml(post.description)}">
    <meta name="author" content="Erick Dev">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <meta name="theme-color" content="#000000">
    <link rel="canonical" href="${absoluteUrl(post.url)}">
    <link rel="alternate" type="application/rss+xml" title="Blog do Erick Dev" href="${siteUrl}/feed.xml">

    <meta property="og:type" content="article">
    <meta property="og:locale" content="pt_BR">
    <meta property="og:site_name" content="Erick Dev">
    <meta property="og:url" content="${absoluteUrl(post.url)}">
    <meta property="og:title" content="${escapeHtml(post.seoTitle)}">
    <meta property="og:description" content="${escapeHtml(post.description)}">
    <meta property="og:image" content="${socialImage}">
    <meta property="og:image:secure_url" content="${socialImage}">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1920">
    <meta property="og:image:height" content="1080">
    <meta property="og:image:alt" content="Erick Dev em uma composição visual escura com código ao fundo">
    <meta property="article:published_time" content="${isoDate(post.date)}">
    <meta property="article:modified_time" content="${isoDate(post.dateModified)}">
    <meta property="article:author" content="${siteUrl}/#erick-dev">
    <meta property="article:section" content="${escapeHtml(post.section)}">
${post.tags.map((tag) => `    <meta property="article:tag" content="${escapeHtml(tag)}">`).join('\n')}

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(post.seoTitle)}">
    <meta name="twitter:description" content="${escapeHtml(post.description)}">
    <meta name="twitter:image" content="${socialImage}">
    <meta name="twitter:image:alt" content="Erick Dev em uma composição visual escura com código ao fundo">

    <script type="application/ld+json">${jsonLd(post)}</script>
    <link rel="stylesheet" href="/css/styles.css?v=20261113-mobile">
    <link rel="icon" href="/img/erickport.png" type="image/png">
    <link rel="apple-touch-icon" href="/img/erickport.png">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css">
</head>
<body class="post-page" data-static-post="true">
    <canvas id="matrix-canvas"></canvas>
    <canvas id="white-theme-canvas"></canvas>
    <div id="topbar-placeholder"></div>

    <main class="container">
        <article class="post-full">
            <header class="post-full-header">
                <h1 id="post-title">${escapeHtml(post.title)}</h1>
                <div class="post-date">Por <a href="/">Erick Dev</a> · <time id="post-date" datetime="${post.date}">${formattedDate(post.date)}</time></div>
            </header>
            <section class="post-full-content" id="post-content">
${articleHtml}
            </section>
        </article>

        <section class="post-comments post-full" aria-labelledby="comments-title">
            <h2 id="comments-title">&gt;&gt; Comentários</h2>
            <div id="comments-container"></div>
        </section>
    </main>

    <div id="footer-placeholder"></div>
    <div class="terminal-popup" id="terminal">
        <div class="terminal-header"><span>root@erickdev:~$</span><span class="close-btn" id="close-terminal">[X]</span></div>
        <div class="terminal-body" id="terminal-output"></div>
        <div class="terminal-input"><span>$</span><input type="text" id="terminal-input" aria-label="Comando do terminal"></div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    <script src="/js/scripts.js"></script>
</body>
</html>
`;

for (const post of posts) {
    const markdown = await readFile(join(root, post.file), 'utf8');
    const articleHtml = await marked.parse(renderCustomTags(markdown));
    const output = join(root, post.url.replace(/^\//, ''));
    await mkdir(dirname(output), { recursive: true });
    const page = renderPostPage(post, articleHtml).replace(/[ \t]+$/gm, '');
    await writeFile(output, page, 'utf8');
}

const sitemapUrls = [
    { loc: `${siteUrl}/`, lastmod: '2026-07-16' },
    { loc: `${siteUrl}/blog.html`, lastmod: '2026-07-16' },
    ...posts.map((post) => ({ loc: absoluteUrl(post.url), lastmod: post.dateModified })),
    { loc: `${siteUrl}/tutoriais.html`, lastmod: '2025-10-16' }
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(({ loc, lastmod }) => `  <url>\n    <loc>${escapeHtml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;
await writeFile(join(root, 'sitemap.xml'), sitemap, 'utf8');

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog do Erick Dev</title>
    <link>${siteUrl}/blog.html</link>
    <description>Programação, Linux, ambiente de desenvolvimento, Git, Docker e DevOps.</description>
    <language>pt-BR</language>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
${posts.map((post) => `    <item>\n      <title>${escapeHtml(post.title)}</title>\n      <link>${absoluteUrl(post.url)}</link>\n      <guid isPermaLink="true">${absoluteUrl(post.url)}</guid>\n      <pubDate>${new Date(isoDate(post.date)).toUTCString()}</pubDate>\n      <description>${escapeHtml(post.description)}</description>\n    </item>`).join('\n')}
  </channel>
</rss>
`;
await writeFile(join(root, 'feed.xml'), rss, 'utf8');

console.log(`Geradas ${posts.length} páginas de post, sitemap.xml e feed.xml.`);
