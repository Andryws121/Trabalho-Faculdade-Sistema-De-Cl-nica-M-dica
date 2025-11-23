function carregarConsultas() {
    let consultas = JSON.parse(localStorage.getItem('agendamentos')) || [];

    const proximasTabela = document.getElementById('proximasConsultas');
    const passadasTabela = document.getElementById('consultasPassadas');

    proximasTabela.innerHTML = '';
    passadasTabela.innerHTML = '';

    const agora = new Date();

    consultas.forEach((consulta, index) => {
        const dataConsulta = new Date(consulta.data);

        // Formata data e hora: DD/MM/YYYY e HH:MM
        const dataFormatada = dataConsulta.toLocaleDateString('pt-BR');
        const horarioFormatado = dataConsulta.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${consulta.paciente}</td>
            <td style="text-align: center;">${dataFormatada} &nbsp;&nbsp;&nbsp;${horarioFormatado}</td>
            <td style="text-align: center;">
                <button class="remarcar-btn" onclick="remarcarConsulta(${index})">R</button>
                <button class="remover-btn" onclick="removerConsulta(${index})">X</button>
            </td>
        `;

        if (dataConsulta >= agora) {
            proximasTabela.appendChild(linha);
        } else {
            passadasTabela.appendChild(linha);
        }
    });
}

function removerConsulta(index) {
    let consultas = JSON.parse(localStorage.getItem('agendamentos')) || [];
    consultas.splice(index, 1);
    localStorage.setItem('agendamentos', JSON.stringify(consultas));
    carregarConsultas();
}

function remarcarConsulta(index) {
    localStorage.setItem('consultaEdicao', index);
    window.location.href = 'TelaAgendamento.html';
}

document.addEventListener('DOMContentLoaded', carregarConsultas);
