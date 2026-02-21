import { supabase } from './supabase-client.js';

const loginForm = document.getElementById('login-form');
const errorMsg = document.getElementById('error-msg');
const loginBtn = document.getElementById('login-btn');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        loginBtn.disabled = true;
        loginBtn.textContent = 'Carregando...';
        errorMsg.textContent = '';

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            errorMsg.textContent = 'Erro ao fazer login: ' + error.message;
            loginBtn.disabled = false;
            loginBtn.textContent = 'Entrar';
        } else {
            window.location.href = 'dashboard.html';
        }
    });
}

export async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        window.location.href = 'login.html';
    }
    return session;
}

export async function logout() {
    await supabase.auth.signOut();
    window.location.href = 'login.html';
}

// Check auth state change
supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
        window.location.href = 'login.html';
    }
});
