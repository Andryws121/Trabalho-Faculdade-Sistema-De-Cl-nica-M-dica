document.addEventListener('DOMContentLoaded', function() {

  const menuBuscaButton = document.getElementById('menuBuscaButton');
  const agendaButton = document.getElementById('agendar-button');
  if (agendaButton) {
    agendaButton.addEventListener('click', function() {
      window.location.href = 'agenda.html';
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

document.addEventListener("DOMContentLoaded", carregarConsultasMenuProfissional);

function carregarConsultasMenuProfissional() {
    const consultas = JSON.parse(localStorage.getItem("consultas")) || [];
    const hoje = new Date().toISOString().split("T")[0];

    const consultasHoje = [];
    const proximas = [];

    consultas.forEach(c => {
        if (c.data === hoje) {
            consultasHoje.push(c);
        } else if (c.data > hoje) {
            proximas.push(c);
        }
    });

    // Ordenar HOJE por horário
    consultasHoje.sort((a, b) => a.horario.localeCompare(b.horario));

    // Ordenar PRÓXIMAS por data
    proximas.sort((a, b) => new Date(a.data) - new Date(b.data));

    // Limitar quantidade
    const hojeLimitadas = consultasHoje.slice(0, 3);
    const proximasLimitadas = proximas.slice(0, 4);

    document.getElementById("consultasHoje").textContent = consultasHoje.length;
    document.getElementById("consultasTotais").textContent = consultas.length;

    preencherTabelaHoje("tabelaHojeProfissional", hojeLimitadas);
    preencherTabelaProximas("tabelaProximasProfissional", proximasLimitadas);
}

function preencherTabelaHoje(idTabela, lista) {
    const tabela = document.getElementById(idTabela);
    tabela.innerHTML = "";

    lista.forEach(c => {
        tabela.innerHTML += `
            <tr>
                <td>
                    <strong>${c.paciente}</strong><br>
                </td>
                <td>${c.horario}</td>
            </tr>
        `;
    });
}

function preencherTabelaProximas(idTabela, lista) {
    const tabela = document.getElementById(idTabela);
    tabela.innerHTML = "";

    lista.forEach(c => {
        tabela.innerHTML += `
            <tr>
                <td><strong>${c.paciente}</strong></td>
                <td>${formatarData(c.data)}</td>
            </tr>
        `;
    });
}

function formatarData(data) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}`;
}