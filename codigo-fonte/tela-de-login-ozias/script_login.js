document.addEventListener('DOMContentLoaded', () => {
        const views = {
        login: document.getElementById('loginView'),
    };
        const buttons = {

        showLogin: document.getElementById('showLoginBtn'),
        };
        const forms = {
        login: document.getElementById('loginForm'),
    };
    function setupNavigationEvents() {

        if (buttons.showLogin) {
            buttons.showLogin.addEventListener('click', () => {

                window.location.href = '/login/tela_de_login.html';
            });
        }
    }
    
    function setupFormHandlers() {
        if (forms.login) {
            forms.login.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Tentativa de login...');


                alert('Login efetuado! (Redirecionamento não implementado)');
            });
        }
    }
     function init() {

        setupFormHandlers();
    }


    init();
});

    


    

    


    


    


   