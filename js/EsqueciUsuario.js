// Aguarda o carregamento completo do HTML antes de executar o script
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const inputIdentifier = document.getElementById('user_identifier');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function (event) {

        event.preventDefault();


        const identifierValue = inputIdentifier.value.trim();

        if (identifierValue === '') {
            errorMessage.textContent = 'Por favor, preencha este campo.';
            inputIdentifier.classList.add('input-error');
        }
        else {

            errorMessage.textContent = '';
            inputIdentifier.classList.remove('input-error');

            alert(`Link de recuperação enviado com sucesso para o e-mail associado a: "${identifierValue}"`);
            form.reset();
        }
    });
});