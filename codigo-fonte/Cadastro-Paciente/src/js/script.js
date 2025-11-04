document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const firstname = document.getElementById("firstname").value.trim();
        const lastname = document.getElementById("lastname").value.trim();
        const email = document.getElementById("email").value.trim();
        const cpf = document.getElementById("cpf").value.trim();
        const number = document.getElementById("number").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmpassword").value;
        const genderInput = document.querySelector("input[name='gender']:checked");
        const gender = genderInput ? genderInput.value : null;

        // --- Validação de Campos Vazios ---
        if (!firstname || !lastname || !email || !cpf || !number || !password || !confirmPassword || !gender) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        // --- Validação de Formato (CPF) ---
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!cpfRegex.test(cpf)) {
            alert("CPF inválido. Use o formato 000.000.000-00.");
            return;
        }

        // --- Validação de Formato (Email) ---
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Formato de e-mail inválido. Use o formato exemplo@email.com.");
            return;
        }

        // --- Validação de Senha ---
        if (password !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }

        // --- Verificação de Duplicidade (LocalStorage) ---
        const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

        if (pacientes.find(p => p.email === email)) {
            alert("Esse email já está cadastrado!");
            return;
        }

        // --- Salvar o Novo Paciente ---
        const novoPaciente = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            cpf: cpf,
            number: number,
            password: password,
            gender: gender
        };

        pacientes.push(novoPaciente);
        localStorage.setItem("pacientes", JSON.stringify(pacientes));

        // --- Sucesso Final e Redirecionamento ---
        
        alert("Cadastro realizado com sucesso! Redirecionando para o login...");
        
        // Limpa o formulário 
        form.reset(); 

        // Redireciona o usuário para a tela de login
        window.location.href = '/codigo-fonte/tela-de-login-ozias/tela_login.html';
    });
});
