document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('loginPassword');

    // Lógica para o formulário de login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = passwordInput.value;
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const validUser = users.find(user => user.email === email && user.password === password);

        if (email.value === USUARIO_CORRETO && password.value === SENHA_CORRETA) {
    // Se estiver certo, mostra um alerta de sucesso.
    alert('Login realizado com sucesso! Redirecionando...');
} else {
    // Se estiver errado, mostra uma mensagem de erro genérica.
    showError(emailError, 'Email ou senha incorretos.');
}
    });

    // Lógica para o botão de mostrar senha
    togglePassword.addEventListener('click', () => {
        // Verifica o tipo do input de senha
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Troca o ícone do olho
        togglePassword.classList.toggle('fa-eye-slash');
    });
});