function carregarConsultas() {
    let consultas = JSON.parse(localStorage.getItem('agendamentos')) || [];

    const proximasTabela = document.getElementById('proximasConsultas');
    const passadasTabela = document.getElementById('consultasPassadas');
    const avisoHoje = document.getElementById('avisoHoje'); // elemento onde exibiremos a mensagem

    proximasTabela.innerHTML = '';
    passadasTabela.innerHTML = '';
    avisoHoje.innerHTML = '';

    const agora = new Date();
    let consultasHoje = 0;

    consultas.forEach((consulta, index) => {
        const dataConsulta = new Date(consulta.data);

        // Contar consultas para hoje
        if (
            dataConsulta.getDate() === agora.getDate() &&
            dataConsulta.getMonth() === agora.getMonth() &&
            dataConsulta.getFullYear() === agora.getFullYear()
        ) {
            consultasHoje++;
        }

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

    // Exibir mensagem de consultas hoje
    if (consultasHoje > 0) {
        avisoHoje.textContent = `Você tem ${consultasHoje} consulta(s) hoje.`;
    }
}