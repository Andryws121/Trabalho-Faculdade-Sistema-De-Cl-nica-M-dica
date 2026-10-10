document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = document.getElementById('btn-enviar');
    const feedbackMessage = document.getElementById('form-feedback');

    
    contactForm.addEventListener('submit', (event) => {
       
        event.preventDefault();

        // Limpa erros anteriores antes de uma nova validação
        clearErrors();
        let isValid = true;

        // --- VALIDAÇÃO DE CADA CAMPO INDIVIDUALMENTE ---

        // Valida o campo Nome
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'O campo nome é obrigatório.');
            isValid = false;
        }

        // Valida o campo Email
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'O campo email é obrigatório.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Por favor, insira um endereço de email válido.');
            isValid = false;
        }

        // Valida o campo Mensagem
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'O campo mensagem é obrigatório.');
            isValid = false;
        }

        // Se algum campo for inválido, exibe a mensagem de erro geral e interrompe
        if (!isValid) {
            feedbackMessage.textContent = 'Por favor, corrija os campos destacados.';
            feedbackMessage.className = 'feedback-error';
            return;
        }
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        setTimeout(() => {
            feedbackMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
            feedbackMessage.className = 'feedback-success';
            
            contactForm.reset(); 
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar';
        }, 1500); 
    });

    /**

     * @param {HTMLElement} input 
     */
    function showError(input, message) {
        input.classList.add('input-error');
    }
    function clearErrors() {
        const errorInputs = document.querySelectorAll('.input-error');
        errorInputs.forEach(input => input.classList.remove('input-error'));
        feedbackMessage.textContent = '';
        feedbackMessage.className = '';
    }

    /**
     * Valida o formato de um email usando uma Expressão Regular (Regex).
     * @param {string} email - O email a ser validado.
     * @returns {boolean} - Retorna true se o email for válido, false caso contrário.
     */
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});