document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('form');
    const input = document.getElementById('user_identifier');
    const errorMessage = document.getElementById('error-message');
    const recoveryFormContainer = document.querySelector('.recovery-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const value = input.value.trim();

        
        if (value === '') {
            showError('O campo não pode estar vazio.');
            return; 
        }

        if (value.length < 3) {
            showError('Por favor, insira um valor válido (mínimo 3 caracteres).');
            return;
        }
        clearError();
        showSuccessMessage(value);
    });
    input.addEventListener('input', () => {
        clearError();
    });

    /**
    @param {string} message 
     */
    function showError(message) {
        errorMessage.textContent = message;
        input.classList.add('error');
    }
    function clearError() {
        errorMessage.textContent = '';
        input.classList.remove('error');
    }

    /**

     * @param {string} identifier 
     */
    function showSuccessMessage(identifier) {

        recoveryFormContainer.innerHTML = `
            <div style="text-align: center;">
                <h2>Verifique seu e-mail</h2>
                <p style="font-size: 16px; line-height: 1.6; color: #333;">
                    Se um usuário com <strong>${identifier}</strong> for encontrado em nosso sistema, um link para redefinição de senha foi enviado para o e-mail associado.
                </p>
                <a href="esquecisenha.html" class="btn btn-primary" style="margin-top: 20px;">Tentar novamente</a>
            </div>
        `;
    }
});