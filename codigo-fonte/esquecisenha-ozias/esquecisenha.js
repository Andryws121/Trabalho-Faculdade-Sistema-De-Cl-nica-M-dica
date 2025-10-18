// Aguarda o conteúdo da página ser totalmente carregado antes de executar o script.
document.addEventListener('DOMContentLoaded', function() {

    // Seleciona os elementos do formulário que vamos manipular.
    const recoveryForm = document.querySelector('form');
    const inputIdentifier = document.getElementById('user_identifier');
    const btnVoltar = document.querySelector('.btn-secondary');
    const container = document.querySelector('.recovery-form');

    // Adiciona um "ouvinte" ao formulário para o evento de "submit" (envio).
    recoveryForm.addEventListener('submit', function(event) {
        // Previne o comportamento padrão do formulário, que é recarregar a página.
        event.preventDefault(); 

        // 1. VALIDAÇÃO: Verifica se o campo está vazio.
        const identifierValue = inputIdentifier.value.trim(); // .trim() remove espaços em branco

        if (identifierValue === '') {
            // Se estiver vazio, exibe uma mensagem de erro.
            alert('Por favor, preencha o campo obrigatório.');
            return; // Interrompe a execução da função aqui.
        }

        // 2. SIMULAÇÃO DE ENVIO: Exibe feedback para o usuário.
        // Em um projeto real, aqui você faria a chamada para a sua API/backend.
        
        // Limpa o formulário para exibir a mensagem
        container.innerHTML = ''; 

        // Cria e exibe uma mensagem de sucesso.
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
        // Opção 1: Voltar para a página anterior no histórico do navegador.
        history.back();

        // Opção 2: Redirecionar para uma página específica (ex: a de login).
        // Descomente a linha abaixo e coloque o link da sua página de login.
        // window.location.href = 'pagina-de-login.html'; 
    });

});