document.addEventListener('DOMContentLoaded', function() {

  const menuBuscaButton = document.getElementById('menuBuscaButton');
  if (menuBuscaButton) {
    menuBuscaButton.addEventListener('click', function() {
      window.location.href = 'menuBusca.html';
    });
  }
  const sairButton = document.getElementById('sairButton');
  if (sairButton) {
    sairButton.addEventListener('click', function() {
      window.location.href = 'TelaLogin.html';
    });
  }

  const agendarButton = document.getElementById('agendarButton');
  if (agendarButton) {
    agendarButton.addEventListener('click', function() {
      // Este caminho é relativo, conforme estava no seu HTML(conferir o caminho da pasta sempre observando o ../ ou .// ou /)
      window.location.href = 'TelaAgendamento.html';
    });
  }

});