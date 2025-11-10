document.addEventListener('DOMContentLoaded', () => {
    let agendamentos = [
        { id: 7, paciente: "Horário Bloqueado", detalhe: "08:00 - 09:00", inicio: "8.0", fim: "9.0", status: "bloqueado", diaDaSemana: 0, duracaoDias: 1 },
        { id: 1, paciente: "Pedro Costa", detalhe: "Cardio - 09:00 - 10:00", inicio: "9.0", fim: "10.0", status: "agendado", diaDaSemana: 0, duracaoDias: 1 },
        { id: 2, paciente: "Maria Oliveira", detalhe: "Dermatologista - 11:00", inicio: "11.0", fim: "12.0", status: "agendado", diaDaSemana: 0, duracaoDias: 1 },
        { id: 3, paciente: "Dr. Carlos Lima", detalhe: "Consulta - 10:00 - 11:00", inicio: "10.0", fim: "11.0", status: "confirmado", diaDaSemana: 0, duracaoDias: 1 },
        { id: 8, paciente: "Paciente Teste (Qua)", detalhe: "Check-up - 10:00 - 11:00", inicio: "10.0", fim: "11.0", status: "agendado", diaDaSemana: 2, duracaoDias: 1 },
        { id: 4, paciente: "Fernanda Rocha", detalhe: "Bloqueado - 13:00 - 14:00", inicio: "13.0", fim: "14.0", status: "bloqueado", diaDaSemana: 3, duracaoDias: 1 },
        { id: 6, paciente: "HORÁRIO CANCELADO", detalhe: "14:00 - 15:00", inicio: "15.0", fim: "16.0", status: "cancelado", diaDaSemana: 3, duracaoDias: 1 },
        { id: 5, paciente: "Ricardo Martins", detalhe: "Cardio - 11:30 - 12:30", inicio: "12.0", fim: "13.0", status: "agendado", diaDaSemana: 4, duracaoDias: 1 }
    ];

    const agendaGrid = document.querySelector('.agenda-grid');
    const eventosContainer = document.getElementById('eventos-container');
    const listaConsultasDia = document.getElementById('lista-consultas-dia');
    const popup = document.getElementById('popup-detalhes');
    const popupTitulo = document.getElementById('popup-titulo');
    const popupCorpo = document.getElementById('popup-corpo');
    const datePickerButton = document.getElementById('date-picker-button');
    const calendarPopup = document.getElementById('calendar-popup');
    const calendarMonthYear = document.getElementById('calendar-month-year');
    const calendarDays = document.getElementById('calendar-days');
    const prevMonthBtn = document.getElementById('calendar-prev-month');
    const nextMonthBtn = document.getElementById('calendar-next-month');
    const contextMenu = document.getElementById('context-menu');
    const btnMenuAdicionarNota = document.getElementById('ctx-menu-adicionar-nota');
    const btnMenuBloquear = document.getElementById('ctx-menu-bloquear');
    const btnMenuCancelar = document.getElementById('ctx-menu-cancelar');

    const headersDias = document.querySelectorAll('.grid-header.day-header');
    const sidebarTitle = document.getElementById('sidebar-title');
    const diasNomes = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
    
    let diaSelecionadoIndex = 0; 

    let selectedDate = new Date();
    let contextEventId = null;
    let rightClickPosition = { dia: null, hora: null };

    function atualizarSidebar() {
        listaConsultasDia.innerHTML = '';
        sidebarTitle.textContent = `Consultas de ${diasNomes[diaSelecionadoIndex]}`;

        const agendamentosDoDia = agendamentos.filter(ag =>
            ag.diaDaSemana === diaSelecionadoIndex
        );

        agendamentosDoDia.sort((a, b) => parseFloat(a.inicio) - parseFloat(b.inicio));

        if (agendamentosDoDia.length === 0) {
            listaConsultasDia.innerHTML = '<li style="border: none; background: #fafafa;">Nenhuma consulta para este dia.</li>';
            return;
        }

        agendamentosDoDia.forEach(agendamento => {
            if (agendamento.status !== 'livre') {
                const listItem = document.createElement('li');
                listItem.className = `status-${agendamento.status}`;
                listItem.innerHTML = `<strong>${agendamento.detalhe || agendamento.paciente}</strong> (${agendamento.status})`;
                listaConsultasDia.appendChild(listItem);
            }
        });
    }
    function renderizarAgenda() {
        eventosContainer.innerHTML = '';

        const agendamentosParaMostrar = agendamentos.filter(ag => 
            ag.diaDaSemana === diaSelecionadoIndex 
        );

        agendamentosParaMostrar.forEach(agendamento => {
            const eventoDiv = document.createElement('div');
            eventoDiv.id = `evento-${agendamento.id}`;
            eventoDiv.className = `evento status-${agendamento.status}`;
            eventoDiv.innerHTML = `<div class="evento-nome">${agendamento.paciente}</div><div class="evento-detalhe">${agendamento.detalhe || ''}</div>`;

            const horaInicio = parseFloat(String(agendamento.inicio));
            const horaFim = parseFloat(String(agendamento.fim));
            const alturaDaLinhaDeHora = 50;
            const horaInicialDaGrade = 8;
            const offsetHeader = 50;
            const top = ((horaInicio - horaInicialDaGrade) * alturaDaLinhaDeHora) + offsetHeader;
            const duracao = horaFim - horaInicio;
            const height = (duracao * alturaDaLinhaDeHora); 
            const diaIndex = agendamento.diaDaSemana; 
            const left = `calc(60px + ((100% - 60px) / 7) * ${diaIndex})`;
            const width = `calc(((100% - 60px) / 7) - 4px)`; // 4px de margem horizontal

            if (height > 0) {
                eventoDiv.style.top = `${top}px`;
                eventoDiv.style.left = left;
                eventoDiv.style.height = `${height}px`;
                eventoDiv.style.width = width;
                eventosContainer.appendChild(eventoDiv);
            }
        });
        
        atualizarSidebar();
    }

    // --- LÓGICA DO CALENDÁRIO ---
    function renderCalendar() {
        const month = selectedDate.getMonth();
        const year = selectedDate.getFullYear();
        calendarMonthYear.textContent = selectedDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
        calendarDays.innerHTML = '';
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
        for (let i = 0; i < firstDayOfMonth; i++) { const emptyCell = document.createElement('div'); emptyCell.className = 'calendar-day-empty'; calendarDays.appendChild(emptyCell); }
        for (let day = 1; day <= lastDateOfMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            dayCell.textContent = day;
            dayCell.dataset.day = day;
            const today = new Date();
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) { dayCell.classList.add('today'); }
            if (day === selectedDate.getDate()) { dayCell.classList.add('selected'); }
            calendarDays.appendChild(dayCell);
        }
    }
    function updateDatePickerButton() {
        datePickerButton.textContent = selectedDate.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    }

    // --- EVENT LISTENERS ---

    eventosContainer.addEventListener('dblclick', (event) => {
        const blocoClicado = event.target.closest('.evento');
        if (!blocoClicado || blocoClicado.classList.contains('editing')) return;
        blocoClicado.classList.add('editing');
        const idDoEvento = parseInt(blocoClicado.id.replace('evento-', ''));
        const dadosAgendamento = agendamentos.find(ag => ag.id === idDoEvento);
        if (!dadosAgendamento) return;
        const nomeAtual = dadosAgendamento.paciente;
        const detalheAtual = dadosAgendamento.detalhe || '';
        const inputNome = document.createElement('input');
        inputNome.type = 'text';
        inputNome.className = 'edit-input';
        inputNome.value = nomeAtual;
        const inputDetalhe = document.createElement('input');
        inputDetalhe.type = 'text';
        inputDetalhe.className = 'edit-input';
        inputDetalhe.value = detalheAtual;
        blocoClicado.innerHTML = '';
        blocoClicado.appendChild(inputNome);
        blocoClicado.appendChild(inputDetalhe);
        inputNome.focus();
        inputNome.select();
        const salvarEdicao = () => {
            const novoPaciente = inputNome.value.trim();
            const novoDetalhe = inputDetalhe.value.trim();
            dadosAgendamento.paciente = novoPaciente;
            dadosAgendamento.detalhe = novoDetalhe;
            const textoNormalizado = novoPaciente.toLowerCase();
            if (textoNormalizado.includes('bloqueado')) { dadosAgendamento.status = 'bloqueado'; }
            else if (textoNormalizado.includes('livre')) { dadosAgendamento.status = 'livre'; }
            else if (textoNormalizado.includes('cancelado')) { dadosAgendamento.status = 'cancelado'; }
            else if (dadosAgendamento.status !== 'nota') { dadosAgendamento.status = 'agendado'; }
            
            renderizarAgenda();
        };
        inputNome.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === 'Escape') inputDetalhe.focus(); });
        inputDetalhe.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === 'Escape') salvarEdicao(); });
        inputNome.addEventListener('blur', salvarEdicao, { once: true });
        inputDetalhe.addEventListener('blur', salvarEdicao, { once: true });
    });

    // --- LÓGICA DE CLIQUE DIREITO ---
    agendaGrid.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        const blocoClicado = event.target.closest('.evento');
        if (blocoClicado) {
            contextEventId = parseInt(blocoClicado.id.replace('evento-', ''));
            btnMenuAdicionarNota.style.display = 'none';
            btnMenuBloquear.style.display = 'flex';
            btnMenuCancelar.style.display = 'flex';
        } else {
            contextEventId = null;
            btnMenuAdicionarNota.style.display = 'flex';
            btnMenuBloquear.style.display = 'none';
            btnMenuCancelar.style.display = 'none';
            
            const gridRect = agendaGrid.getBoundingClientRect();
            const x = event.clientX - gridRect.left;
            const y = event.clientY - gridRect.top;
            const alturaDaLinhaDeHora = 50;
            const offsetHeader = 50;
            const colunaHorarioWidth = 60; 
            const horaInicialDaGrade = 8;
            
            const larguraColunaDia = (gridRect.width - colunaHorarioWidth) / 7; 
            const hora = Math.floor((y - offsetHeader) / alturaDaLinhaDeHora) + horaInicialDaGrade;
            const diaIndexClicado = Math.floor((x - colunaHorarioWidth) / larguraColunaDia); 

            if (hora >= 8 && hora <= 18 && diaIndexClicado >= 0 && diaIndexClicado <= 6) {
                rightClickPosition = { dia: diaIndexClicado, hora: hora };
            } else {
                rightClickPosition = { dia: null, hora: null };
                return;
            }
        }
        contextMenu.style.top = `${event.pageY}px`;
        contextMenu.style.left = `${event.pageX}px`;
        contextMenu.classList.remove('hidden');
    });

    // --- BOTÃO ADICIONAR NOTA ---
    btnMenuAdicionarNota.addEventListener('click', () => {
        if (rightClickPosition.dia !== null && rightClickPosition.hora !== null) {
            const comentario = prompt("Digite sua nota para este horário:");
            if (comentario && comentario.trim() !== "") {
                const newId = Math.max(0, ...agendamentos.map(ag => ag.id)) + 1;
                const novaNota = {
                    id: newId, paciente: comentario, detalhe: "Nota",
                    inicio: `${rightClickPosition.hora}.0`, fim: `${rightClickPosition.hora + 1}.0`,
                    status: 'nota', 
                    diaDaSemana: rightClickPosition.dia, 
                    duracaoDias: 1 
                };
                agendamentos.push(novaNota);
                renderizarAgenda();
            }
        }
        contextMenu.classList.add('hidden');
    });
    
    // --- BOTÕES BLOQUEAR/CANCELAR ---
    btnMenuBloquear.addEventListener('click', () => {
        if (contextEventId) {
            const agendamento = agendamentos.find(ag => ag.id === contextEventId);
            if (agendamento) {
                agendamento.status = 'bloqueado';
                agendamento.paciente = 'Horário Bloqueado';
                agendamento.detalhe = `${String(agendamento.inicio).replace('.0', ':00').replace('.5', ':30')} - ${String(agendamento.fim).replace('.0', ':00').replace('.5', ':30')}`;
                renderizarAgenda();
            }
            contextMenu.classList.add('hidden');
            contextEventId = null;
        }
    });
    btnMenuCancelar.addEventListener('click', () => {
        if (contextEventId) {
            const agendamento = agendamentos.find(ag => ag.id === contextEventId);
            if (agendamento) {
                agendamento.status = 'cancelado';
                renderizarAgenda();
            }
            contextMenu.classList.add('hidden');
            contextEventId = null;
        }
    });

    // --- OUTROS LISTENERS ---
    eventosContainer.addEventListener('mouseover', (event) => {
        const blocoHover = event.target.closest('.evento');
        if (!blocoHover || blocoHover.classList.contains('editing')) return;
        const idDoEvento = parseInt(blocoHover.id.replace('evento-', ''));
        const dadosAgendamento = agendamentos.find(ag => ag.id === idDoEvento);
        if (!dadosAgendamento) return;
        popupTitulo.innerText = dadosAgendamento.paciente;
        popupCorpo.innerHTML = `<strong>Detalhes:</strong> ${dadosAgendamento.detalhe || 'N/A'}<br><strong>Status:</strong> ${dadosAgendamento.status}`;
        popup.style.display = 'block';
        popup.classList.remove('hidden');
        const mouseX = event.pageX; const mouseY = event.pageY;
        const popupWidth = popup.offsetWidth; const popupHeight = popup.offsetHeight;
        const windowWidth = window.innerWidth; const windowHeight = window.innerHeight;
        const offset = 20;
        let topPos, leftPos;
        if (mouseX + offset + popupWidth > windowWidth) { leftPos = mouseX - popupWidth - offset; } else { leftPos = mouseX + offset; }
        if (mouseY + offset + popupHeight > windowHeight) { topPos = mouseY - popupHeight - offset; } else { topPos = mouseY + offset; }
        popup.style.left = `${leftPos}px`;
        popup.style.top = `${topPos}px`;
    });
    eventosContainer.addEventListener('mouseleave', () => {
        popup.classList.add('hidden');
        setTimeout(() => { if (popup.classList.contains('hidden')) { popup.style.display = 'none'; } }, 200);
    });
    datePickerButton.addEventListener('click', (event) => { event.stopPropagation(); calendarPopup.classList.toggle('hidden'); if (!calendarPopup.classList.contains('hidden')) { const buttonRect = datePickerButton.getBoundingClientRect(); calendarPopup.style.top = `${buttonRect.bottom + 10}px`; calendarPopup.style.left = `${buttonRect.left}px`; renderCalendar(); } });
    prevMonthBtn.addEventListener('click', () => { selectedDate.setMonth(selectedDate.getMonth() - 1); renderCalendar(); });
    nextMonthBtn.addEventListener('click', () => { selectedDate.setMonth(selectedDate.getMonth() + 1); renderCalendar(); });
    calendarDays.addEventListener('click', (event) => { const dayClicked = event.target.closest('.calendar-day'); if (dayClicked && dayClicked.dataset.day) { selectedDate.setDate(parseInt(dayClicked.dataset.day)); updateDatePickerButton(); calendarPopup.classList.add('hidden'); console.log("Nova data selecionada:", selectedDate); } });
    window.addEventListener('click', () => {
        contextMenu.classList.add('hidden');
        calendarPopup.classList.add('hidden');
    });

    
    // --- LISTENER DOS HEADERS ---
    headersDias.forEach(header => {
        header.addEventListener('click', () => {
            const diaIndexClicado = parseInt(header.dataset.dia, 10);
            diaSelecionadoIndex = diaIndexClicado;

            headersDias.forEach(h => h.classList.remove('active'));
            header.classList.add('active');

            renderizarAgenda();
        });
    });


    // --- INICIALIZAÇÃO ---
    const primeiroHeader = document.querySelector('.grid-header.day-header[data-dia="0"]');
    if (primeiroHeader) {
        primeiroHeader.classList.add('active');
    }
    
    renderizarAgenda(); // Renderiza grid e sidebar para o dia 0
    updateDatePickerButton();
});