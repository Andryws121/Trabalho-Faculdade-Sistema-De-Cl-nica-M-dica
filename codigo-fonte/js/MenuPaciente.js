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


function carregarConsultas() {
    const consultas = JSON.parse(localStorage.getItem("agendamentos")) || [];

    const hoje = new Date().toISOString().slice(0, 10);

const futuras = [];
const recentes = [];

consultas.forEach(c => {
    if (c.data >= hoje) futuras.push(c);
    else recentes.push(c);
});

// 🔽 ORDENAR PRÓXIMAS CONSULTAS 🔽
// Data mais próxima primeiro; se for no mesmo dia, ordena por horário.
futuras.sort((a, b) => {
    const diffDatas = new Date(a.data) - new Date(b.data);
    if (diffDatas !== 0) return diffDatas;
    return a.hora.localeCompare(b.hora);
});

// 🔽 (Opcional) Ordenar recentes por data mais recente primeiro
recentes.sort((a, b) => new Date(b.data) - new Date(a.data));

const futurasLimitadas = futuras.slice(0, 3);   // máximo 3 próximas consultas
const recentesLimitadas = recentes.slice(0, 4); // máximo 4 consultas recentes


  preencherTabela("tabelaProximas", futurasLimitadas);
  preencherTabela("tabelaRecentes", recentesLimitadas);

  
    atualizarContadores(futuras, recentes);
}

function preencherTabela(idTabela, lista) {
    const tabela = document.getElementById(idTabela);
    tabela.innerHTML = "";

    lista.forEach(c => {
        tabela.innerHTML += `
            <tr>
                <td class="nome"><strong>${c.profissional}</strong><br>
                    <span class="cargo">${c.especialidade}</span>
                </td>
                <td class="data">${formatarData(c.data)}</td>
                <td class="hora">${c.hora}</td>
            </tr>
        `;
    });
}

function atualizarContadores(futuras, recentes) {
    const hoje = new Date().toISOString().slice(0, 10);

    const consultasHoje = futuras.filter(c => c.data === hoje).length;
    const totalPaciente = futuras.length + recentes.length;

    document.getElementById("consultasHoje").innerText = consultasHoje;
    document.getElementById("consultasTotais").innerText = totalPaciente;
}

function formatarData(data) {
    const d = data.split("-");
    return `${d[2]}/${d[1]}`;
}

// Carrega tudo quando a página abre
carregarConsultas();