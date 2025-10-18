document.addEventListener('DOMContentLoaded', function() {


    const recoveryForm = document.querySelector('form');
    const inputIdentifier = document.getElementById('user_identifier');
    const btnVoltar = document.querySelector('.btn-secondary');
    const container = document.querySelector('.recovery-form');


    recoveryForm.addEventListener('submit', function(event) {
        
        event.preventDefault(); 

        
        const identifierValue = inputIdentifier.value.trim(); 

        if (identifierValue === '') {
            
            alert('Por favor, preencha o campo obrigatório.');
            return; 
        }

       
        container.innerHTML = ''; 

        
        const successMessage = document.createElement('div');
        successMessage.className = 'feedback-message success';
        successMessage.innerHTML = `
            <h2>Verifique seu e-mail</h2>
            <p>Se um usuário com <strong>${identifierValue}</strong> for encontrado em nosso sistema, um link para redefinição de senha foi enviado para o e-mail associado.</p>
            <a href="#" class="btn btn-primary" onclick="window.location.reload()">Tentar novamente</a>
        `;
        container.appendChild(successMessage);
    });

    // 3. FUNCIONALIDADE DO BOTÃO "VOLTAR"
    btnVoltar.addEventListener('click', function() {
    
        history.back();

    });

});