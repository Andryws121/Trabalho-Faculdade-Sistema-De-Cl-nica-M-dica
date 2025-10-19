document.addEventListener('DOMContentLoaded', () => {

   
    const agendamentos = [
        { id: 7, paciente: "Horário Bloqueado", 
          detalhe: "08:00 - 09:00", 
          inicio: "16.0", 
          fim: "17.0", 
          status: "bloqueado", 
          diaDaSemana: 0.45, 
          duracaoDias: 1.1 },
        { id: 1, paciente: "Pedro Costa", 
            detalhe: "Cardio - 09:00 - 10:00", 
            inicio: "9.0", 
            fim: "10.6", 
            status: "agendado", 
            diaDaSemana: 0.45, 
            duracaoDias: 1.1 },
        { id: 2, paciente: "Maria Oliveira", 
            detalhe: "Dermatologista - 11:00", 
            inicio: "11.0", 
            fim: "12.0", 
            status: "agendado", 
            diaDaSemana: 0.45,
            duracaoDias: 2.16 },
        { id: 3, paciente: "Dr. Carlos Lima", 
            detalhe: "Consulta - 10:00 - 11:00",
             inicio: "11.0", 
             fim: "12.", 
             status: "confirmado", 
             diaDaSemana: 2.63, 
             duracaoDias: 2.15 },
        { id: 4, paciente: "Fernanda Rocha", 
            detalhe: "Bloqueado - 13:00 - 14:00", 
            inicio: "11.0", 
            fim: "12.0", 
            status: "bloqueado", 
            diaDaSemana: 4.8, 
            duracaoDias: 2.16 },
        { id: 6, paciente: "HORÁRIO CANCELADO", 
            detalhe: "14:00 - 15:00", 
            inicio: "14.0", 
            fim: "15.0",
            status: "cancelado", 
            diaDaSemana: 4, 
            duracaoDias: 1 },
        { id: 5, paciente: "Ricardo Martins", 
            detalhe: "Cardio - 11:30 - 12:30", 
            inicio: "15", 
            fim: "16", 
            status: "agendado", 
            diaDaSemana: 4.8, 
            duracaoDias: 1.1 }
    ];


    const eventosContainer = document.getElementById('eventos-container');
    const listaConsultasDia = document.getElementById('lista-consultas-dia');
    const popup = document.getElementById('popup-detalhes'); 
    const popupTitulo = document.getElementById('popup-titulo'); 
    const popupCorpo = document.getElementById('popup-corpo');  

    
    
    function renderizarAgenda() {

        eventosContainer.innerHTML = '';
        listaConsultasDia.innerHTML = '';
        agendamentos.forEach(agendamento => {
            const eventoDiv = document.createElement('div');
            eventoDiv.id = `evento-${agendamento.id}`;
            eventoDiv.className = `evento status-${agendamento.status}`;
            eventoDiv.innerHTML = `<strong class="evento-nome">${agendamento.paciente}</strong><span class="evento-detalhe">${agendamento.detalhe}</span>`;
            const horaInicio = parseFloat(String(agendamento.inicio));
            const horaFim = parseFloat(String(agendamento.fim));
            const alturaDaLinhaDeHora = 50;
            const horaInicialDaGrade = 8;
            const offsetHeader = 50;
            const top = ((horaInicio - horaInicialDaGrade) * alturaDaLinhaDeHora) + offsetHeader;
            const duracao = horaFim - horaInicio;
            const height = duracao * alturaDaLinhaDeHora;
            const left = `calc(100% / 8 * ${agendamento.diaDaSemana})`;
            const duracaoDias = agendamento.duracaoDias || 1;
            const width = `calc(100% / 8 * ${duracaoDias})`;
            if (height > 0) {
                eventoDiv.style.top = `${top}px`;
                eventoDiv.style.left = left;
                eventoDiv.style.height = `${height}px`;
                eventoDiv.style.width = width;
                eventosContainer.appendChild(eventoDiv);
            }
            const listItem = document.createElement('li');
            listItem.className = `status-${agendamento.status}`;
            listItem.innerHTML = `<strong>${agendamento.detalhe || agendamento.paciente}</strong> (${agendamento.status})`;
            listaConsultasDia.appendChild(listItem);
        });
    }
    renderizarAgenda();

    
    eventosContainer.addEventListener('click', (event) => {
        
        const blocoClicado = event.target.closest('.evento');
        if (!blocoClicado) return;
        const idDoEvento = parseInt(blocoClicado.id.replace('evento-', ''));
        switch (idDoEvento) {
            case 1: alert(`Ação especial para Pedro Costa (ID: 1)`); break;
            case 3:
                console.log(`Informações detalhadas do Dr. Carlos Lima (ID: 3)`);
                blocoClicado.style.transform = 'scale(1.05)';
                setTimeout(() => { blocoClicado.style.transform = 'scale(1)'; }, 200);
                break;
            case 5: if (confirm('Deseja cancelar a consulta de Ricardo Martins (ID: 5)?')) { alert('Consulta cancelada!'); } break;
            default: alert(`Você clicou no evento com ID: ${idDoEvento}`);
        }
    });

    
    eventosContainer.addEventListener('mouseover', (event) => {
        const blocoHover = event.target.closest('.evento');
        if (!blocoHover) return;

        
        const idDoEvento = parseInt(blocoHover.id.replace('evento-', ''));
        const dadosAgendamento = agendamentos.find(ag => ag.id === idDoEvento);
        if (!dadosAgendamento) return;

        
        popupTitulo.innerText = dadosAgendamento.paciente;
        popupCorpo.innerHTML = `
            <strong>Detalhes:</strong> ${dadosAgendamento.detalhe}<br>
            <strong>Status:</strong> ${dadosAgendamento.status}
        `;

    
        popup.style.left = `${event.pageX + 15}px`;
        popup.style.top = `${event.pageY + 15}px`;

        // 4. Mostrar o pop-up
        popup.style.display = 'block';
        setTimeout(() => popup.classList.remove('hidden'), 10); 
    });

    eventosContainer.addEventListener('mouseleave', () => {
        
        popup.classList.add('hidden');
        setTimeout(() => popup.style.display = 'none', 200); 
    });
});