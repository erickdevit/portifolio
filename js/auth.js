import { supabase } from './supabase-client.js';

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const errorMsg = document.getElementById('error-msg');

if (loginForm) {
    const loginBtn = document.getElementById('login-btn');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        loginBtn.disabled = true;
        loginBtn.textContent = 'Carregando...';
        if(errorMsg) errorMsg.textContent = '';

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            if(errorMsg) errorMsg.textContent = 'Erro ao fazer login: ' + error.message;
            loginBtn.disabled = false;
            loginBtn.textContent = 'Entrar';
        } else {
            window.location.href = 'dashboard.html';
        }
    });
}

if (signupForm) {
    const signupBtn = document.getElementById('signup-btn');
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        signupBtn.disabled = true;
        signupBtn.textContent = 'Criando...';
        if(errorMsg) errorMsg.textContent = '';

        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            if(errorMsg) errorMsg.textContent = 'Erro ao criar conta: ' + error.message;
            signupBtn.disabled = false;
            signupBtn.textContent = 'Criar Conta';
        } else {
            alert('Conta criada com sucesso! Você já pode fazer login.');
            window.location.href = 'login.html';
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
