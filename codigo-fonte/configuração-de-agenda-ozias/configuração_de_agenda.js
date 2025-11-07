document.addEventListener('DOMContentLoaded', () => {

    // Chama as funções principais para adicionar interatividade
    handleFormSubmit();
    handleDayToggles();
    handleTimeSlots();
    handleDurations();

    /**
     * Função 1: Cuida do envio do formulário (Botão "Salvar Alterações")
     * Coleta todos os dados e os exibe no console (simulação de envio).
     */
    function handleFormSubmit() {
        const configForm = document.getElementById('config-form');
        if (!configForm) return;

        configForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio real do formulário
            
            const formData = {};

            // 1. Coletar dados simples (CRM, Telefone, Email, Bio)
            formData.crm = document.getElementById('crm')?.value;
            formData.telefone = document.getElementById('telefone')?.value;
            formData.email = document.getElementById('email')?.value;
            formData.biografia = document.getElementById('biografia')?.value;

            // 2. Coletar os dias da semana selecionados
            formData.diasSelecionados = [];
            document.querySelectorAll('.week-days input[name="day"]:checked').forEach(checkbox => {
                formData.diasSelecionados.push(checkbox.value);
            });

            // 3. Coletar *todos* os períodos de tempo (início e fim)
            formData.periodosDeAtendimento = [];
            document.querySelectorAll('.time-slots-wrapper .time-period').forEach(period => {
                const inicio = period.querySelector('input[type="time"]:first-of-type')?.value;
                const fim = period.querySelector('input[type="time"]:last-of-type')?.value;
                if (inicio && fim) {
                    formData.periodosDeAtendimento.push({ inicio, fim });
                }
            });

            // 4. Coletar as durações de consulta
            formData.duracoesDeConsulta = [];
            document.querySelectorAll('.duration-list li span').forEach(span => {
                formData.duracoesDeConsulta.push(span.textContent);
            });

            // Exibe os dados coletados no console
            console.log('--- DADOS DO FORMULÁRIO (SIMULAÇÃO DE ENVIO) ---');
            console.log(JSON.stringify(formData, null, 2));
            
            alert('Alterações salvas (simulação)! Verifique o console (F12) para ver os dados.');
        });
    }

    /**
     * Função 2: Cuida da seleção dos dias da semana
     * Adiciona/remove a classe '.active' quando um checkbox é marcado/desmarcado.
     */
    function handleDayToggles() {
        const weekDaysContainer = document.querySelector('.week-days');
        if (!weekDaysContainer) return;

        // Usa delegação de eventos para maior eficiência
        weekDaysContainer.addEventListener('change', (event) => {
            const checkbox = event.target;
            if (checkbox.type === 'checkbox') {
                const dayCheck = checkbox.closest('.day-check');
                if (dayCheck) {
                    if (checkbox.checked) {
                        dayCheck.classList.add('active');
                    } else {
                        dayCheck.classList.remove('active');
                    }
                }
            }
        });
    }

    /**
     * Função 3: Cuida dos "Períodos de Atendimento"
     * - Adiciona um novo período ao clicar em "+ Adicionar Período".
     * - Permite remover períodos clicando no 'X' (botão de remover).
     */
    function handleTimeSlots() {
        const wrapper = document.querySelector('.time-slots-wrapper');
        const addPeriodBtn = document.querySelector('.btn-add-period');
        
        if (!wrapper || !addPeriodBtn) return;

        // Adicionar novo período
        addPeriodBtn.addEventListener('click', () => {
            const newPeriod = document.createElement('div');
            newPeriod.className = 'time-period';
            // Adiciona o HTML para os inputs e um botão de remover
            newPeriod.innerHTML = `
                <div class="input-group">
                    <label>Horário de Início</label>
                    <input type="time" name="start_time" value="00:00">
                </div>
                <div class="input-group">
                    <label>Horário de Fim</label>
                    <input type="time" name="end_time" value="00:00">
                </div>
                <button type="button" class="btn-icon btn-remove" title="Remover período">&times;</button>
            `;
            // Insere o novo período antes do botão "Adicionar"
            wrapper.insertBefore(newPeriod, addPeriodBtn);
        });

        // Remover um período (usando delegação de eventos)
        wrapper.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-remove')) {
                event.target.closest('.time-period').remove();
            }
        });
    }

    /**
     * Função 4: Cuida da "Duração da Consulta"
     * - Adiciona um botão "+ Adicionar Duração" programaticamente.
     * - Transforma os botões '+' existentes em 'X' (Remover).
     * - Permite adicionar novas durações (via prompt).
     * - Permite remover durações.
     */
    function handleDurations() {
        const wrapper = document.querySelector('.duration-wrapper');
        const list = document.querySelector('.duration-list');
        const blockDatesBtn = document.querySelector('.block-dates-btn');

        if (!wrapper || !list || !blockDatesBtn) return;

        // 1. Transforma botões '+' em 'X' (Remover)
        list.querySelectorAll('.btn-icon').forEach(btn => {
            // Não deixa remover o item "Padrão"
            if (btn.closest('li').classList.contains('default')) {
                btn.style.display = 'none'; // Apenas esconde o botão
            } else {
                btn.innerHTML = '&times;'; // Muda para 'X'
                btn.classList.add('btn-remove');
                btn.title = 'Remover duração';
            }
        });

        // 2. Cria e insere um botão "Adicionar Duração"
        const addDurationBtn = document.createElement('button');
        addDurationBtn.type = 'button';
        addDurationBtn.className = 'btn btn-primary btn-add-duration';
        addDurationBtn.textContent = '+ Adicionar Duração';
        addDurationBtn.style.marginTop = '1rem'; // Adiciona um espaçamento
        // Insere o novo botão antes do botão "Bloquear Datas"
        wrapper.insertBefore(addDurationBtn, blockDatesBtn);

        // 3. Adicionar nova duração (via prompt)
        addDurationBtn.addEventListener('click', () => {
            const durationText = prompt('Digite a nova duração (ex: 30 minutos):', '30 minutos');
            if (durationText) {
                const newLi = document.createElement('li');
                newLi.innerHTML = `
                    <span>${durationText}</span>
                    <button type="button" class="btn-icon btn-remove" title="Remover duração">&times;</button>
                `;
                list.appendChild(newLi);
            }
        });

        // 4. Remover uma duração (usando delegação de eventos)
        list.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-remove')) {
                event.target.closest('li').remove();
            }
        });
    }

});