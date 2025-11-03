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
        const gender = document.querySelector("input[name='gender']:checked");

        
        if (!firstname || !lastname || !email || !cpf || !number || !password || !confirmPassword || !gender) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!cpfRegex.test(cpf)) {
            alert("CPF inválido. Use o formato 000.000.000-00.");
            return;
        }

        
        if (password !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }


        //alteração gustavo
        
        const pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
        if (pacientes.find(p => p.email === email)) {
    alert("Esse email já está cadastrado!");
    return;
        pacientes.push({ email, password });
  localStorage.setItem("pacientes", JSON.stringify(pacientes));
            
        //alteração gustavo 
        
        alert("Cadastro realizado com sucesso!");
        form.reset();
    });
});
