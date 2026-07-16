const LEGACY_POST_REDIRECTS = {
    'posts/post1.md': '/blog/do-zero-ao-hacker.html',
    'posts/post2.md': '/blog/ambiente-de-desenvolvimento.html'
};

export async function onRequest(context) {
    const url = new URL(context.request.url);
    const isLegacyPostRequest = url.pathname === '/post.html'
        && (context.request.method === 'GET' || context.request.method === 'HEAD');

    if (isLegacyPostRequest) {
        const destinationPath = LEGACY_POST_REDIRECTS[url.searchParams.get('file')];

        if (destinationPath) {
            return new Response(null, {
                status: 301,
                headers: {
                    Location: new URL(destinationPath, url.origin).href,
                    'Cache-Control': 'public, max-age=3600'
                }
            });
        }
    }

    return context.next();
}
