document.addEventListener('DOMContentLoaded', () => {

    const allResults = [
        { nome: 'Pedro Costa', especialidade: 'Cardiologista', status: 'Agendada' },
        { nome: 'Ana Silva', especialidade: 'Clínico Geral', status: 'Concluída' },
        { nome: 'Pedro Costa', especialidade: 'Cardiologista', status: 'Concluída' },
        { nome: 'Carlos Souza', especialidade: 'Ortopedista', status: 'Agendada' },
        { nome: 'Pedro Costa', especialidade: 'fisioterapeuta', status: 'Concluída', data: '10/05/2025 - 09:00' },
        { nome: 'Mariana Lima', especialidade: 'Dermatologista', status: 'Concluída' },
        { nome: 'João Ferreira', especialidade: 'Cardiologista', status: 'Cancelada' },
        { nome: 'Lucas Martins', especialidade: 'fisioterapeuta', status: 'Agendada' },
        { nome: 'Beatriz Almeida', especialidade: 'Cardiologista', status: 'Concluída' },
        { nome: 'Fernando Alves', especialidade: 'Nutricionista', status: 'Concluída' },
        { nome: 'Ricardo Pereira', especialidade: 'fisioterapeuta', status: 'Agendada' },
        { nome: 'Juliana Barros', especialidade: 'Cardiologista', status: 'Concluída' },
        { nome: 'Renato Mendes', especialidade: 'Psicólogo', status: 'Cancelada' },
        { nome: 'Camila Rocha', especialidade: 'Cardiologista', status: 'Agendada' },
        { nome: 'Gabriel Ribeiro', especialidade: 'Endocrinologista', status: 'Concluída' },
    ];

    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsList = document.getElementById('resultsList');
    const resultsCount = document.getElementById('resultsCount');

    function renderResults(results) {
        
        resultsList.innerHTML = '';

       
        resultsCount.textContent = results.length;

        if (results.length === 0) {
            resultsList.innerHTML = '<li class="no-results">Nenhum resultado encontrado.</li>';
            return;
        }

        results.forEach(item => {
            const li = document.createElement('li');
            li.className = 'result-item';

            
            const statusClassMap = {
                'Agendada': 'status-agendada',
                'Concluída': 'status-concluida',
                'Cancelada': 'status-cancelada'
            };
            const statusClass = statusClassMap[item.status] || '';

            
            const dateTimeHtml = item.data ? `<p class="datetime">${item.data}</p>` : '';

            li.innerHTML = `
                <div class="result-info">
                    <p class="name">${item.nome}</p>
                    <p class="details">${item.especialidade}</p>
                    ${dateTimeHtml}
                </div>
                <span class="status-badge ${statusClass}">${item.status}</span>
            `;
            resultsList.appendChild(li);
        });
    }

    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();

        const filteredResults = allResults.filter(item => {
            const nameMatch = item.nome.toLowerCase().includes(query);
            const specialtyMatch = item.especialidade.toLowerCase().includes(query);
            return nameMatch || specialtyMatch;
        });

        renderResults(filteredResults);
    }

    searchButton.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keyup', performSearch);

    renderResults(allResults);
});