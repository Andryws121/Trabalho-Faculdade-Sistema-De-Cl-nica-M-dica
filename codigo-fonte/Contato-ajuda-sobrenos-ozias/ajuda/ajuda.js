
document.addEventListener('DOMContentLoaded', () => {
    
    const backButton = document.querySelector('.back-button');

    if (backButton) {
        backButton.addEventListener('click', () => {
            
            window.history.back();
            
            

            console.log('Botão Voltar clicado!');
        });
    }

    

});