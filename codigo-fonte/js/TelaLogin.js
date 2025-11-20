function initializeUsers() {
    const initialUsers = [
        { nome: 'Alice Silva', email: 'alice@email.com', senha: '123senha', role: 'paciente' },
        { nome: 'Beto Costa', email: 'beto@email.com', senha: 'abc1234', role: 'paciente' },
        { nome: 'Medzo (Teste)', email: 'medzo@exemplo.com', senha: 'senha123', role: 'profissional' }
    ];

    localStorage.setItem('medzoUsers', JSON.stringify(initialUsers));
    console.log('Usuários de teste foram ATUALIZADOS no localStorage.');
}
initializeUsers();

document.addEventListener('DOMContentLoaded', () => {

    // IDs dos elementos do formulário de login
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const togglePassword = document.getElementById('togglePassword');
    const container = document.getElementById('login-container');

    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (email === '' || password === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const users = JSON.parse(localStorage.getItem('medzoUsers') || '[]');
        const foundUser = users.find(user => user.email === email && user.senha === password);

        if (foundUser) {

            localStorage.setItem('sessionToken', JSON.stringify({
                email: foundUser.email,
                nome: foundUser.nome,
                role: foundUser.role
            }));

            if (container) {
                container.classList.add('login-success');
            }

            setTimeout(() => {

                if (foundUser.role === 'paciente') {
                    window.location.href = 'MenuPaciente.html';

                } else if (foundUser.role === 'profissional') {
                    window.location.href = 'MenuProfissional.html';

                } else {
                    alert('Tipo de usuário com erro! Contacte o suporte.');
                    console.error('Usuário encontrado sem um "role" válido:', foundUser);
                }

            }, 750); // 0.75 segundos (coloquei menos tempo ai observa )

        } else {
            // FALHA NO LOGIN
            alert('E-mail ou senha incorretos. Por favor, tente novamente.');
        }
    });
});