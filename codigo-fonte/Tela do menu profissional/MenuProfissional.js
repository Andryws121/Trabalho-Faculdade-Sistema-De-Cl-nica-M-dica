document.addEventListener('DOMContentLoaded', function() {

  const menuBuscaButton = document.getElementById('menuBuscaButton');
  if (menuBuscaButton) {
    menuBuscaButton.addEventListener('click', function() {
      window.location.href = '/codigo-fonte/menuBusca/menuBusca.html';
    });
  }
  const agendaButton = document.getElementById('agendar-button');
  if (agendaButton) {
    agendaButton.addEventListener('click', function() {
      window.location.href = '/codigo-fonte/tela_de_agenda-ozias/agenda.html';
    });
  }
  const sairButton = document.getElementById('sairButton');
  if (sairButton) {
    sairButton.addEventListener('click', function() {
      window.location.href = '/codigo-fonte/tela-de-login-ozias/tela_login.html';
    });
  }

  const agendarButton = document.getElementById('agendarButton');
  if (agendarButton) {
    agendarButton.addEventListener('click', function() {
      // Este caminho é relativo, conforme estava no seu HTML(conferir o caminho da pasta sempre observando o ../ ou .// ou /)
      window.location.href = '../tela-de-agendamento/telaagendamento.html';
    });
  }

});