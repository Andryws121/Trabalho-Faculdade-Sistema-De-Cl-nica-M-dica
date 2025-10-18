// Aguarda o conteúdo da página ser totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
    
    const backButton = document.querySelector('.back-button');

    if (backButton) {
        backButton.addEventListener('click', () => {
            // Ação ao clicar no botão "VOLTAR"
            // Exemplo: voltar para a página anterior
            window.history.back();
            
            // Ou redirecionar para uma página específica
            // window.location.href = 'pagina_principal.html';

            console.log('Botão Voltar clicado!');
        });
    }

    // Você pode adicionar mais interatividade aqui no futuro
    // Por exemplo, mostrar informações sobre cada membro ao clicar na foto.

});