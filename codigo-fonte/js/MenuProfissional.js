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
      window.location.href = 'TelaAgendamento.html';
    });
  }

  carregarConsultasMenuProfissional();
});


function carregarConsultasMenuProfissional() {
    const consultas = JSON.parse(localStorage.getItem("agendamentos")) || [];
    const hoje = new Date().toISOString().split("T")[0];

    const consultasHoje = [];
    const proximas = [];

    consultas.forEach(c => {
        console.log("Consulta carregada:", c); // DEBUG

        if (!c.data || !c.hora || !c.paciente) return; // ignora registros incompletos

        if (c.data === hoje) {
            consultasHoje.push(c);
        } else if (c.data > hoje) {
            proximas.push(c);
        }
    });

    consultasHoje.sort((a, b) => a.hora.localeCompare(b.hora));
    proximas.sort((a, b) => new Date(a.data) - new Date(b.data));

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
                <td><strong>${c.paciente}</strong></td>
                <td>${c.hora}</td>
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