/* =================================================================
   ARQUIVO: Consultas.js
   DESCRIÇÃO: Lista consultas e gerencia ações (Remarcar/Cancelar)
   ================================================================= */

document.addEventListener('DOMContentLoaded', () => {
    carregarTodasConsultas();
});

function carregarTodasConsultas() {
    const consultas = JSON.parse(localStorage.getItem('bd_consultas')) || [];
    const hoje = new Date().toISOString().slice(0, 10);

    // Filtros
    const listaProximas = consultas.filter(c => c.data >= hoje && c.status !== 'cancelada' && c.status !== 'passada');
    const listaPassadas = consultas.filter(c => c.data < hoje || c.status === 'passada' || c.status === 'concluida');

    // Ordenação
    listaProximas.sort((a, b) => new Date(a.data) - new Date(b.data));
    listaPassadas.sort((a, b) => new Date(b.data) - new Date(a.data));

    // Renderizar
    preencherTabela('proximasConsultas', listaProximas, true); 
    preencherTabela('consultasPassadas', listaPassadas, false);
}

function preencherTabela(idTbody, lista, comAcoes) {
    const tbody = document.getElementById(idTbody);
    if (!tbody) return;

    tbody.innerHTML = '';

    if (lista.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" class="aviso-vazio" style="text-align:center; padding:20px; color:#adb5bd;">Nenhuma consulta encontrada.</td></tr>`;
        return;
    }

    lista.forEach(c => {
        const dataFormatada = formatarDataCompleta(c.data);
        const horaFormatada = c.hora || '--:--';
        
        let colunaAcoes = '';
        
        if (comAcoes) {
            // AQUI ESTÁ A MÁGICA: O botão R chama remarcarConsulta()
            colunaAcoes = `
                <div class="acoes-container" style="display:flex; justify-content:center; gap:10px;">
                    <button class="btn-acao btn-remarcar" title="Remarcar" onclick="remarcarConsulta(${c.id})" style="background-color:#28a745; border:none; color:white; border-radius:5px; width:30px; height:30px; cursor:pointer; font-weight:bold;">R</button>
                    <button class="btn-acao btn-cancelar" title="Cancelar" onclick="cancelarConsulta(${c.id})" style="background-color:#dc3545; border:none; color:white; border-radius:5px; width:30px; height:30px; cursor:pointer; font-weight:bold;">X</button>
                </div>
            `;
        } else {
            colunaAcoes = `<span class="status-concluida" style="color:#28a745; font-weight:bold;">Concluída</span>`;
        }

        const html = `
            <tr>
                <td class="col-paciente" style="text-align: left; padding: 15px;">
                    <strong style="color: #e9ecef;">${c.medico}</strong><br>
                    <span style="color: #adb5bd; font-size: 0.9rem;">${c.especialidade}</span>
                </td>
                <td class="col-data" style="text-align: center; color: #e9ecef;">
                    ${dataFormatada}<br>
                    <small style="color: #adb5bd;">${horaFormatada}</small>
                </td>
                <td class="col-acoes" style="text-align: center;">
                    ${colunaAcoes}
                </td>
            </tr>
        `;
        tbody.innerHTML += html;
    });
}

function formatarDataCompleta(dataISO) {
    if (!dataISO) return '--/--/----';
    const partes = dataISO.split('-');
    if (partes.length !== 3) return dataISO;
    const [ano, mes, dia] = partes;
    return `${dia}/${mes}/${ano}`;
}

// --- FUNÇÃO QUE FALTAVA: REMARCAR ---
function remarcarConsulta(id) {
    // 1. Salva o ID da consulta que queremos editar
    localStorage.setItem('id_consulta_editar', id);
    
    // 2. Manda o usuário para a tela de agendamento
    window.location.href = 'TelaAgendamento.html';
}

// --- FUNÇÃO CANCELAR ---
function cancelarConsulta(id) {
    if (confirm("Tem certeza que deseja cancelar esta consulta?")) {
        const consultas = JSON.parse(localStorage.getItem('bd_consultas')) || [];
        const index = consultas.findIndex(c => c.id === id);
        
        if (index !== -1) {
            consultas[index].status = 'cancelada';
            localStorage.setItem('bd_consultas', JSON.stringify(consultas));
            alert("Consulta cancelada com sucesso.");
            carregarTodasConsultas();
        }
    }
}
