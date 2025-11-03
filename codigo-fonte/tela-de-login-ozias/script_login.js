document.addEventListener('DOMContentLoaded', () => {

    //Captura os elementos do HTML que vamos usar
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const togglePassword = document.getElementById('togglePassword');


    //alteração gustavo

    const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
    const profissionais = JSON.parse(localStorage.getItem("profissionais")) || [];
    
    //alteração gustavo

    //Lógica para mostrar/esconder a senha ---
    togglePassword.addEventListener('click', () => {
        const isPassword = passwordInput.getAttribute('type') === 'password';
        passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
        togglePassword.classList.toggle('fa-eye-slash');
    });

    //Lógica para validar o formulário ao enviar ---
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Pega os valores digitados
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        
        // Aqui definimos o usuário e senha que o sistema irá aceitar como corretos.
        const usuarioCorreto = 'medzo@exemplo.com';
        const senhaCorreta = 'senha123';
        // -----------------------------------------

        // Validação básica de campos vazios
        if (email === '' || password === '') {
            alert('Por favor, preencha todos os campos.');
            return; // Interrompe a execução se os campos estiverem vazios
        }

        //LÓGICA DE VERIFICAÇÃO ---
        // Compara o que foi digitado com os dados "corretos"
        if (email === usuarioCorreto && password === senhaCorreta) {
            // Se ambos forem corretos...
            alert('Login realizado com sucesso! Bem-vindo ao Medzo.');
            
            // Próximo passo: Redirecionar para a página principal
            // Exemplo: window.location.href = 'pagina_principal.html';

        //alteração gustavo 

        const prof = profissionais.find(p => p.email === email && p.password === password);
        if (prof) {
          window.location.href = "../menuPrincipal/menuPrincipal.html";
          return;
        }

        const pac = pacientes.find(p => p.email === email && p.password === password);
        if (pac) {
          window.location.href = "../menuPaciente/menuPaciente.html";
          return;
        }
        
        //alteração gustavo

        } else {
            // Se o e-mail ou a senha (ou ambos) estiverem errados...
            alert('E-mail ou senha incorretos. Por favor, tente novamente.');
        }
    });
});
