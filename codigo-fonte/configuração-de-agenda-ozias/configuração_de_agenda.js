document.addEventListener('DOMContentLoaded', () => {
    const addPeriodBtn = document.querySelector('.btn-add-period');
    const timeSlotsContainer = document.querySelector('.time-slots');

    if (addPeriodBtn && timeSlotsContainer) {
        addPeriodBtn.addEventListener('click', () => {
            
            // 1. Criar um novo elemento <div> com a classe 'time-period'.
            // 2. Dentro dele, criar os dois 'input-group' (Início e Fim) com inputs do tipo 'time'.
            // 3. Adicionar um botão "Remover" (ícone de lixeira) para excluir esse período.
            // 4. Inserir esse novo <div> no 'timeSlotsContainer', antes do botão 'addPeriodBtn'.
            
            console.log('Funcionalidade "Adicionar Período" a ser implementada.');
          
        });
    }

    // Funcionalidade: Salvar Alterações (Submit do Formulário)
    const configForm = document.getElementById('config-form');
    if (configForm) {
        configForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio real do formulário
            
            
            // 1. Criar um objeto 'formData' (ex: const formData = new FormData(configForm);).
            // 2. Coletar todos os dados dos inputs (CRM, Telefone, Email, Bio).
            // 3. Coletar os dias da semana selecionados (checkboxes).
            // 4. Coletar *todos* os períodos de tempo (início e fim) que foram adicionados.
            // 5. Coletar as durações de consulta.
            // 6. Enviar esses dados para o seu "backend" (servidor) para salvar no banco de dados.
            
            console.log('Formulário enviado (simulação). Dados a serem coletados e enviados.');
            alert('Alterações salvas (simulação)!');
        });
    }

    // 3. Outras Funcionalidades (a implementar):
    // - Lógica para "Bloquear Datas Específicas" (provavelmente abriria um modal com um calendário).
    // - Lógica para adicionar/remover "Duração da Consulta Padrão".

});