function initializeUsers() {
    if (localStorage.getItem('medzoUsers')) {
        console.log('Usuários de teste já existem no localStorage.');
        return; 
    }
    const initialUsers = [
        { nome: 'Alice Silva', email: 'alice@email.com', senha: '123' },
        { nome: 'Beto Costa', email: 'beto@email.com', senha: 'abc' },
        { nome: 'Medzo (Teste)', email: 'medzo@exemplo.com', senha: 'senha123' }
    ];
    localStorage.setItem('medzoUsers', JSON.stringify(initialUsers));
    console.log('Usuários de teste foram adicionados ao localStorage.');
}
initializeUsers();


document.addEventListener('DOMContentLoaded', () => {
    
    // IDs login
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('loginEmail'); 
    const passwordInput = document.getElementById('loginPassword'); 
    const togglePassword = document.getElementById('togglePassword');
    const container = document.getElementById('login-container'); // Para a animação

    // Lógica para mostrar/esconder a senha
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }

    // Lógica para validar o formulário ao enviar
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

            // Salva a sessão para o Menu.html
            localStorage.setItem('sessionToken', JSON.stringify({ email: foundUser.email, nome: foundUser.nome }));

            // Aciona a animação de sucesso (pulo dos bonecos)
            if (container) {
                container.classList.add('login-success');
            }

            // Redireciona para a página principal APÓS a animação
            setTimeout(() => {
                
                // ===== NOME DO ARQUIVO CORRIGIDO =====
                window.location.href = '/codigo-fonte/tela do menu profissional/MenuProfissional.html'; 
            
            }, 750); // 0.75 segundos

        } else {
            alert('E-mail ou senha incorretos. Por favor, tente novamente.');
        }
    });
});
