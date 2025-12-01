/* =================================================================
   ARQUIVO: MenuPaciente.js
   DESCRIÇÃO: Lógica da Tela Inicial (Dashboard)
   ================================================================= */

document.addEventListener('DOMContentLoaded', function() {
    // 1. Configura os botões (Busca, Sair, Agendar)
    configurarNavegacao();

    // 2. Carrega os dados na tela
    carregarConsultas();
});

// --- FUNÇÃO DE NAVEGAÇÃO ---
function configurarNavegacao() {
    // Botão de Busca
    const menuBuscaButton = document.getElementById('menuBuscaButton');
    if (menuBuscaButton) {
        menuBuscaButton.addEventListener('click', () => window.location.href = 'menuBusca.html');
    }

    // Botão de Consultas (Histórico)
    const consultasButton = document.getElementById('consultas-button');
    if (consultasButton) {
        consultasButton.addEventListener('click', () => window.location.href = 'Consultas.html');
    }

    // Botão de Sair
    const sairButton = document.getElementById('sairButton');
    if (sairButton) {
        sairButton.addEventListener('click', () => window.location.href = 'TelaLogin.html');
    }

    // Botão AGENDAR (O mais importante!)
    const agendarButton = document.getElementById('agendarButton');
    if (agendarButton) {
        agendarButton.addEventListener('click', () => {
            // IMPORTANTE: Limpa qualquer "rastro" de edição anterior.
            // Isso garante que a tela de agendamento abra limpa (Modo Criar Novo).
            localStorage.removeItem('id_consulta_editar'); 
            
            window.location.href = 'TelaAgendamento.html';
        });
    }
}

// --- FUNÇÃO DE CARREGAMENTO DE DADOS ---
function carregarConsultas() {
    // 1. Pega os dados do 'banco de dados' compartilhado
    const consultas = JSON.parse(localStorage.getItem("bd_consultas")) || [];
    
    // Data de hoje (AAAA-MM-DD)
    const hoje = new Date().toISOString().slice(0, 10);

    const futuras = [];
    const recentes = [];

    // 2. Separa as consultas
    consultas.forEach(c => {
        // Se a data é hoje ou futuro E não está cancelada
        if (c.data >= hoje && c.status !== 'cancelada') {
            futuras.push(c);
        } else {
            // Se é passado ou cancelada
            recentes.push(c);
        }
    });

    // 3. Ordenação
    // Próximas: Data mais próxima primeiro
    futuras.sort((a, b) => {
        const diffDatas = new Date(a.data) - new Date(b.data);
        if (diffDatas !== 0) return diffDatas;
        return a.hora.localeCompare(b.hora);
    });

    // Recentes: Data mais nova primeiro (decrescente)
    recentes.sort((a, b) => new Date(b.data) - new Date(a.data));

    // 4. Limites para a Home
    const futurasLimitadas = futuras.slice(0, 3);   // Máximo 3
    const recentesLimitadas = recentes.slice(0, 4); // Máximo 4

    // 5. Preenche as tabelas
    preencherTabela("tabelaProximas", futurasLimitadas);
    preencherTabela("tabelaRecentes", recentesLimitadas);

    // 6. Atualiza os números grandes
    atualizarContadores(futuras, recentes);
}

function preencherTabela(idTabela, lista) {
    const tabela = document.getElementById(idTabela);
    if (!tabela) return; 

    tabela.innerHTML = ""; 

    if (lista.length === 0) {
        tabela.innerHTML = `<tr><td colspan="3" style="text-align:center; padding:15px; color:#adb5bd; font-size: 0.9rem;">Nenhuma consulta.</td></tr>`;
        return;
    }

    lista.forEach(c => {
        // Compatibilidade de nomes (medico ou profissional)
        const nomeMedico = c.medico || c.profissional || "Não informado";
        
        tabela.innerHTML += `
            <tr>
                <td style="text-align: left; padding-left: 10px;">
                    <strong style="color: #e9ecef;">${nomeMedico}</strong><br>
                    <span style="color: #adb5bd; font-size: 0.85rem; font-weight: 500;">${c.especialidade}</span>
                </td>
                <td class="data" style="text-align: center;">${formatarData(c.data)}</td>
                <td class="hora" style="text-align: center;">${c.hora}</td>
            </tr>
        `;
    });
}

function atualizarContadores(futuras, recentes) {
    const hoje = new Date().toISOString().slice(0, 10);

    // Conta consultas de hoje
    const consultasHoje = futuras.filter(c => c.data === hoje).length;
    // Conta total
    const totalPaciente = futuras.length + recentes.length;

    const elHoje = document.getElementById("consultasHoje");
    const elTotal = document.getElementById("consultasTotais");

    if (elHoje) elHoje.innerText = consultasHoje;
    if (elTotal) elTotal.innerText = totalPaciente;
}

function formatarData(dataISO) {
    if (!dataISO) return "--/--";
    const d = dataISO.split("-");
    return `${d[2]}/${d[1]}`; // Retorna Dia/Mês
}