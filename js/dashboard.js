import { supabase } from './supabase-client.js';
import { checkAuth, logout } from './auth.js';

let currentUser = null;
let userRole = 'user';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Check Auth
    const session = await checkAuth();
    currentUser = session.user;
    document.getElementById('user-email').textContent = currentUser.email;

    // 2. Fetch Profile/Role
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', currentUser.id)
        .single();

    if (profile) {
        userRole = profile.role;
        document.getElementById('user-role').textContent = userRole;
    }

    // 3. Setup Logout
    document.getElementById('logout-btn').addEventListener('click', logout);

    // 4. Setup Modal Logic
    setupModal();

    // 5. Load Data
    loadMyPosts();
    if (userRole === 'admin') {
        document.getElementById('admin-section').style.display = 'block';
        loadPendingPosts();
    }
});

function setupModal() {
    const modal = document.getElementById('post-modal');
    const btn = document.getElementById('new-post-btn');
    const span = document.getElementsByClassName('close')[0];
    const form = document.getElementById('post-form');

    btn.onclick = () => {
        openModal();
    }

    span.onclick = () => {
        modal.style.display = 'none';
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    form.onsubmit = async (e) => {
        e.preventDefault();
        await savePost();
    }
}

function openModal(post = null) {
    const modal = document.getElementById('post-modal');
    modal.style.display = 'block';

    if (post) {
        document.getElementById('modal-title').textContent = 'Editar Post';
        document.getElementById('post-id').value = post.id;
        document.getElementById('post-title').value = post.title;
        document.getElementById('post-slug').value = post.slug;
        document.getElementById('post-type').value = post.type;
        document.getElementById('post-excerpt').value = post.excerpt || '';
        document.getElementById('post-content').value = post.content || '';
    } else {
        document.getElementById('modal-title').textContent = 'Novo Post';
        document.getElementById('post-form').reset();
        document.getElementById('post-id').value = '';
    }
}

async function savePost() {
    const id = document.getElementById('post-id').value;
    const title = document.getElementById('post-title').value;
    const slug = document.getElementById('post-slug').value;
    const type = document.getElementById('post-type').value;
    const excerpt = document.getElementById('post-excerpt').value;
    const content = document.getElementById('post-content').value;

    const payload = {
        title,
        slug,
        type,
        excerpt,
        content,
        // If creating new, default to draft (DB default)
        // If updating, keep status unless admin changes it (not implemented in this form yet)
    };

    if (!id) {
        // Create
        payload.author_id = currentUser.id;
        const { error } = await supabase.from('posts').insert([payload]);
        if (error) alert('Erro ao criar: ' + error.message);
        else {
            alert('Post criado com sucesso!');
            document.getElementById('post-modal').style.display = 'none';
            loadMyPosts();
            if(userRole === 'admin') loadPendingPosts(); // In case admin creates
        }
    } else {
        // Update
        const { error } = await supabase.from('posts').update(payload).eq('id', id);
        if (error) alert('Erro ao atualizar: ' + error.message);
        else {
            alert('Post atualizado!');
            document.getElementById('post-modal').style.display = 'none';
            loadMyPosts();
            if(userRole === 'admin') loadPendingPosts();
        }
    }
}

async function loadMyPosts() {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('author_id', currentUser.id)
        .order('created_at', { ascending: false });

    const container = document.getElementById('my-posts-list');
    if (error) {
        container.textContent = 'Erro ao carregar posts.';
        return;
    }

    renderTable(container, data, false);
}

async function loadPendingPosts() {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('status', 'draft') // Or 'pending' if we implement submission flow
        // For now, let's say admins approve 'drafts' directly or we assume 'draft' needs approval to be 'published'
        .neq('status', 'published')
        .order('created_at', { ascending: false });

    const container = document.getElementById('pending-list');
    if (error) {
        container.textContent = 'Erro ao carregar pendências.';
        return;
    }

    renderTable(container, data, true);
}

function renderTable(container, posts, isAdminView) {
    if (posts.length === 0) {
        container.innerHTML = '<p>Nenhum post encontrado.</p>';
        return;
    }

    let html = '<table><thead><tr><th>Título</th><th>Status</th><th>Data</th><th>Ações</th></tr></thead><tbody>';

    posts.forEach(post => {
        const date = new Date(post.created_at).toLocaleDateString();
        let actions = `<button class="btn btn-edit" onclick="editPost('${post.id}')">Editar</button>`;

        if (isAdminView) {
            actions += ` <button class="btn btn-approve" onclick="approvePost('${post.id}')">Aprovar</button>`;
        }

        html += `<tr>
            <td>${DOMPurify.sanitize(post.title)}</td>
            <td>${DOMPurify.sanitize(post.status)}</td>
            <td>${date}</td>
            <td>${actions}</td>
        </tr>`;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

// Global functions for inline onclick handlers
window.editPost = async (id) => {
    const { data } = await supabase.from('posts').select('*').eq('id', id).single();
    if (data) openModal(data);
};

window.approvePost = async (id) => {
    if (!confirm('Tem certeza que deseja publicar este post?')) return;

    const { error } = await supabase
        .from('posts')
        .update({ status: 'published', published_at: new Date() })
        .eq('id', id);

    if (error) alert('Erro: ' + error.message);
    else {
        alert('Post publicado!');
        loadPendingPosts();
        loadMyPosts();
    }
};
