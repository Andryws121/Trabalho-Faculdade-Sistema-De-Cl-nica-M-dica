document.addEventListener('DOMContentLoaded', () => {

    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = document.getElementById('btn-enviar');
    const feedbackMessage = document.getElementById('form-feedback');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        feedbackMessage.textContent = '';
        feedbackMessage.className = '';

        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const messageValue = messageInput.value.trim();
        let isValid = true;

        if (nameValue === '') {
            showFeedback('Por favor, preencha seu nome completo.', 'error');
            isValid = false;
        } else if (!isValidEmail(emailValue)) { // Esta linha chama a nova função abaixo
            showFeedback('Por favor, insira um endereço de email válido.', 'error');
            isValid = false;
        } else if (messageValue === '') {
            showFeedback('Por favor, escreva sua mensagem.', 'error');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';

        setTimeout(() => {
            showFeedback('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            contactForm.reset();
            submitButton.disabled = false;
            submitButton.textContent = 'Enviar';
        }, 2000);
    });

    function showFeedback(message, type) {
        feedbackMessage.textContent = message;
        feedbackMessage.className = type;
    }

    function isValidEmail(email) {
        
        if (typeof email !== 'string' || email.length === 0) {
            return false;
        }

        // 2. Verifica se contém o símbolo @ e se não há espaços
        if (!email.includes('@') || email.includes(' ')) {
            return false;
        }

        
        const parts = email.split('@');

        
        if (parts.length !== 2) {
            return false;
        }

        const localPart = parts[0];
        const domainPart = parts[1];

        
        if (localPart.length === 0 || domainPart.length === 0) {
            return false;
        }

        if (!domainPart.includes('.')) {
            return false;
        }
        
        if (domainPart.endsWith('.')) {
            return false;
        }

        
        return true;
    }
    
    
});