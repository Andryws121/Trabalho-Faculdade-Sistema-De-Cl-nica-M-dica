document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================================
    // 🔒 1. SEGURANÇA (PROTEÇÃO DE ROTA)
    // ============================================================
    
    const usuarioLogado = JSON.parse(localStorage.getItem('sessionToken') || '{}');

    // Verifica se é médico (profissional)
    if (!usuarioLogado.role || usuarioLogado.role !== 'profissional') {
        alert("Acesso Restrito: Apenas médicos podem acessar esta configuração.");
        
        if (usuarioLogado.role === 'paciente') {
            window.location.href = 'MenuPaciente.html';
        } else {
            window.location.href = 'TelaLogin.html';
        }
        throw new Error("Acesso negado.");
    }

    // ============================================================
    // 👤 2. PERSONALIZAÇÃO (PREENCHER DADOS DO MÉDICO)
    // ============================================================

    console.log("Médico autenticado: " + usuarioLogado.nome);

    // Pega os elementos do HTML que queremos mudar
    const nomeDisplay = document.querySelector('.info-row.static h2'); // O título onde está o nome
    const emailInput = document.getElementById('email'); // O campo de email

    // Troca "Dra. Maria Oliveira" pelo nome do usuário logado
    if (nomeDisplay && usuarioLogado.nome) {
        nomeDisplay.textContent = usuarioLogado.nome;
    }

    // Troca o email fixo pelo email do usuário logado
    if (emailInput && usuarioLogado.email) {
        emailInput.value = usuarioLogado.email;
    }

    // ============================================================
    // 💾 3. BOTÃO SALVAR (Lógica Simples)
    // ============================================================
    const form = document.getElementById('config-form');
    
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert("Configurações da agenda salvas com sucesso!");
            // Aqui futuramente você pode salvar os horários no localStorage
        });
    }

    // Botão Cancelar (Voltar para o menu)
    const btnCancel = document.querySelector('.btn-cancel');
    if(btnCancel) {
        btnCancel.addEventListener('click', function() {
            window.location.href = 'MenuProfissional.html';
        });
    }
});