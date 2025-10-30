document.addEventListener('DOMContentLoaded', () => {
    const agendamentos = [
        { id: 7, paciente: "Horário Bloqueado", 
        detalhe: "08:00 - 09:00", 
        inicio: "18", 
        fim: "19", 
        status: "bloqueado", 
        diaDaSemana: 0.40, 
        duracaoDias: 1.08 },
        { id: 1, paciente: "Pedro Costa", 
        detalhe: "Cardio - 09:00 - 10:00", 
        inicio: "8.9", 
        fim: "10.1", 
        status: "agendado", 
        diaDaSemana: 0.40, 
        duracaoDias: 1.08 },
        { id: 2, paciente: "Maria Oliveira", 
        detalhe: "Dermatologista - 11:00", 
        inicio: "11.0", 
        fim: "12.0", 
        status: "agendado",
        diaDaSemana: 0.40, 
        duracaoDias: 2.16 },
        { id: 3, paciente: "Dr. Carlos Lima", 
        detalhe: "Consulta - 10:00 - 11:00", 
        inicio: "11", 
        fim: "12", 
        status: "confirmado",
        diaDaSemana: 2.57,
        duracaoDias: 2.16 },
        { id: 4, paciente: "Fernanda Rocha", 
        detalhe: "Bloqueado - 13:00 - 14:00", 
        inicio: "11.0", 
        fim: "12.0", 
        status: "bloqueado", 
        diaDaSemana: 4.75, 
        duracaoDias: 2.16 },
        { id: 6, paciente: "HORÁRIO CANCELADO", 
        detalhe: "14:00 - 15:00", 
        inicio: "12.0", 
        fim: "13.0", 
        status: "cancelado", 
        diaDaSemana: 5.83, 
        duracaoDias: 1.08 },
        { id: 5, paciente: "Ricardo Martins", 
        detalhe: "Cardio - 11:30 - 12:30", 
        inicio: "14", 
        fim: "15", 
        status: "agendado", 
        diaDaSemana: 4.75, 
        duracaoDias: 2.16 },
        { id: 8, paciente: "Horário Livre", 
        detalhe: "Disponível", 
        inicio: "13.0", 
        fim: "14.0", 
        status: "livre", 
        diaDaSemana: 1.49, 
        duracaoDias: 1.08 },
        { id: 9, paciente: "Horário Livre", 
        detalhe: "Disponível", 
        inicio: "14.0", 
        fim: "15.0", 
        status: "livre", 
        diaDaSemana: 1.49, 
        duracaoDias: 1.08 },
        { id: 10, paciente: "Horário Livre", 
        detalhe: "Disponível", 
        inicio: "18.0", 
        fim: "19.0", 
        status: "livre", 
        diaDaSemana: 2.59, 
        duracaoDias: 1.08 },
        { id: 11, paciente: "Horário Livre", 
        detalhe: "Disponível", 
        inicio: "18.0", 
        fim: "19.0", 
        status: "livre", 
        diaDaSemana: 4.76, 
        duracaoDias: 1.08 },
        { id: 12, paciente: "Horário Livre", 
        detalhe: "Disponível", 
        inicio: "16.0", 
        fim: "17.0", 
        status: "livre", 
        diaDaSemana: 6.92, 
        duracaoDias: 1.08 },
        { id: 12, paciente: "Horário Livre", 
        detalhe: "Disponível", 
        inicio: "13.0", 
        fim: "14.0", 
        status: "livre", 
        diaDaSemana: 6.92, 
        duracaoDias: 1.08 }
        
    ];

    //SELEÇÃO DOS ELEMENTOS HTML ---
    const eventosContainer = document.getElementById('eventos-container');
    const listaConsultasDia = document.getElementById('lista-consultas-dia');
    
    // Elementos do Pop-up de Detalhes
    const popup = document.getElementById('popup-detalhes');
    const popupTitulo = document.getElementById('popup-titulo');
    const popupCorpo = document.getElementById('popup-corpo');
    const datePickerButton = document.getElementById('date-picker-button');
    const calendarPopup = document.getElementById('calendar-popup');
    const calendarMonthYear = document.getElementById('calendar-month-year');
    const calendarDays = document.getElementById('calendar-days');
    const prevMonthBtn = document.getElementById('calendar-prev-month');
    const nextMonthBtn = document.getElementById('calendar-next-month');

    let selectedDate = new Date(); 
    function renderizarAgenda() {
        eventosContainer.innerHTML = '';
        listaConsultasDia.innerHTML = '';
        agendamentos.forEach(agendamento => {
            const eventoDiv = document.createElement('div');
            eventoDiv.id = `evento-${agendamento.id}`;
            eventoDiv.className = `evento status-${agendamento.status}`;
            eventoDiv.innerHTML = `<strong class="evento-nome">${agendamento.paciente}</strong><span class="evento-detalhe">${agendamento.detalhe || ''}</span>`;
            
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

   
    function renderCalendar() {
        const month = selectedDate.getMonth();
        const year = selectedDate.getFullYear();
        calendarMonthYear.textContent = selectedDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
        calendarDays.innerHTML = '';
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day-empty';
            calendarDays.appendChild(emptyCell);
        }

        for (let day = 1; day <= lastDateOfMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.textContent = day;
            dayCell.dataset.day = day;

            const today = new Date();
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayCell.classList.add('today');
            }
            if (day === selectedDate.getDate()) {
                dayCell.classList.add('selected');
            }
            calendarDays.appendChild(dayCell);
        }
    }

    function updateDatePickerButton() {
        datePickerButton.textContent = selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    }
    
    datePickerButton.addEventListener('click', (event) => {
        event.stopPropagation();
        calendarPopup.classList.toggle('hidden');
        if (!calendarPopup.classList.contains('hidden')) {
            const buttonRect = datePickerButton.getBoundingClientRect();
            calendarPopup.style.top = `${buttonRect.bottom + 10}px`;
            calendarPopup.style.left = `${buttonRect.left}px`;
            renderCalendar();
        }
    });

    prevMonthBtn.addEventListener('click', () => {
        selectedDate.setMonth(selectedDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        selectedDate.setMonth(selectedDate.getMonth() + 1);
        renderCalendar();
    });

    calendarDays.addEventListener('click', (event) => {
        const dayClicked = event.target.closest('.calendar-day');
        if (dayClicked && dayClicked.dataset.day) {
            selectedDate.setDate(parseInt(dayClicked.dataset.day));
            updateDatePickerButton();
            calendarPopup.classList.add('hidden');
            console.log("Nova data selecionada:", selectedDate);
        }
    });

    window.addEventListener('click', (event) => {
        if (!calendarPopup.contains(event.target) && !datePickerButton.contains(event.target)) {
            calendarPopup.classList.add('hidden');
        }
    });
    
    
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
        popupCorpo.innerHTML = `<strong>Detalhes:</strong> ${dadosAgendamento.detalhe || 'N/A'}<br><strong>Status:</strong> ${dadosAgendamento.status}`;

        popup.style.left = `${event.pageX + 15}px`;
        popup.style.top = `${event.pageY + 15}px`;
        popup.style.display = 'block';
        setTimeout(() => popup.classList.remove('hidden'), 10);
    });

    eventosContainer.addEventListener('mouseleave', () => {
        popup.classList.add('hidden');
        setTimeout(() => popup.style.display = 'none', 200);
    });
    renderizarAgenda();
    updateDatePickerButton();
});