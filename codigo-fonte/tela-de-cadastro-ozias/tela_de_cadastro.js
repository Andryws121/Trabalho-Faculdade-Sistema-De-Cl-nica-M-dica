document.addEventListener('DOMContentLoaded', () => {
    const customSelect = document.querySelector('.custom-select');
    if (customSelect) {
        const selectTrigger = customSelect.querySelector('.select-trigger');
        const options = customSelect.querySelector('.options');
        const optionItems = customSelect.querySelectorAll('.option');
        const triggerSpan = selectTrigger.querySelector('span');
        const hiddenInput = document.getElementById('user_type');

        selectTrigger.addEventListener('click', () => {
            options.classList.toggle('open');
        });

        optionItems.forEach(option => {
            option.addEventListener('click', () => {
                triggerSpan.textContent = option.textContent;
                hiddenInput.value = option.getAttribute('data-value');
                options.classList.remove('open');
            });
        });

        window.addEventListener('click', (e) => {
            if (!customSelect.contains(e.target)) {
                options.classList.remove('open');
            }
        });
    }

    // ✅ ESTE BLOCO AGORA FUNCIONARÁ
    const continueButton = document.getElementById('continue-btn');
    if (continueButton) {
        continueButton.addEventListener('click', () => {
            const userType = document.getElementById('user_type').value;

            if (userType === 'medico') {
                // Redireciona para a página de cadastro de médico
                window.location.href = '../tela-login-tela-cadastro-medico/cadastro_medico.html'; 
            } else if (userType === 'paciente') {
                // Redireciona para a página de cadastro de paciente
                window.location.href = '../Cadastro-Paciente/index.html'; 
            } else {
                alert('Por favor, selecione um tipo de conta para continuar.');
            }
        });
    }

    const backToLoginButton = document.getElementById('back-to-login-btn');
    if (backToLoginButton) {
        backToLoginButton.addEventListener('click', () => {
            window.location.href = '../tela-de-login-ozias/tela_login.html';
        });
    }
});