document.addEventListener('DOMContentLoaded', () => {

    const allResults = [
        { nome: "Dr. Carlos Moura", especialidade: "Cardiologia", status: "Em aberto" },
        { nome: "Dra. Ana Bezerra", especialidade: "Dermatologia", status: "Em aberto" },
        { nome: "Dr. Ricardo Martins", especialidade: "Ortopedia", status: "Em aberto" },
        { nome: "Dra. Juliana Teixeira", especialidade: "Pediatria", status: "Em aberto" },
        { nome: "Dr. Felipe Carvalho", especialidade: "Clínico Geral", status: "Em aberto" },
        { nome: "Dr. Marcos Andrade", especialidade: "Neurologia", status: "Em aberto" },
        { nome: "Dra. Beatriz Nogueira", especialidade: "Ginecologia", status: "Em aberto" },
        { nome: "Dr. Thiago Lopes", especialidade: "Endocrinologia", status: "Em aberto" },
        { nome: "Dra. Camila Ramos", especialidade: "Oftalmologia", status: "Em aberto" },
        { nome: "Dr. Eduardo Farias", especialidade: "Urologia", status: "Em aberto" },
        { nome: "Dra. Renata Monteiro", especialidade: "Reumatologia", status: "Em aberto" },
        { nome: "Dr. Lucas Azevedo", especialidade: "Psiquiatria", status: "Em aberto" },
        { nome: "Dra. Mariana Pires", especialidade: "Otorrinolaringologia", status: "Em aberto" },
        { nome: "Dr. Samuel Oliveira", especialidade: "Gastroenterologia", status: "Em aberto" },
        { nome: "Dra. Patrícia Almeida", especialidade: "Anestesiologia", status: "Em aberto" },
        { nome: "Dr. João Henrique", especialidade: "Cirurgia Geral", status: "Em aberto" },
        { nome: "Dra. Lorena Duarte", especialidade: "Pneumologia", status: "Em aberto" },
        { nome: "Dr. Fernando Vasconcelos", especialidade: "Oncologia", status: "Em aberto" },
        { nome: "Dra. Aline Castro", especialidade: "Hematologia", status: "Em aberto" },
        { nome: "Dr. Pedro Lima", especialidade: "Nutrição Clínica", status: "Em aberto" },
        { nome: "Dra. Juliana Santos", especialidade: "Fisioterapia", status: "Em aberto" },
        { nome: "Dr. Rafael Gomes", especialidade: "Cirurgia Plástica", status: "Em aberto" },
        { nome: "Dra. Bianca Costa", especialidade: "Cirurgia Cardiovascular", status: "Em aberto" },
        { nome: "Dr. André Pinto", especialidade: "Cirurgia Vascular", status: "Em aberto" },
        { nome: "Dra. Fernanda Ribeiro", especialidade: "Imunologia", status: "Em aberto" },
        { nome: "Dr. Leonardo Martins", especialidade: "Gerontologia", status: "Em aberto" },
        { nome: "Dra. Camila Azevedo", especialidade: "Alergologia", status: "Em aberto" },
        { nome: "Dr. Vinícius Oliveira", especialidade: "Psiquiatria", status: "Em aberto" },
        { nome: "Dra. Tatiane Souza", especialidade: "Pediatria", status: "Em aberto" },
        { nome: "Dr. Gustavo Ferreira", especialidade: "Clínico Geral", status: "Em aberto" },
        { nome: "Dra. Larissa Rocha", especialidade: "Cardiologia", status: "Em aberto" },
        { nome: "Dr. Daniel Ribeiro", especialidade: "Ortopedia", status: "Em aberto" },
        { nome: "Dra. Paula Mendes", especialidade: "Dermatologia", status: "Em aberto" },
        { nome: "Dr. Rodrigo Lima", especialidade: "Endocrinologia", status: "Em aberto" },
        { nome: "Dra. Vanessa Costa", especialidade: "Neurologia", status: "Em aberto" },
        { nome: "Dr. Marcelo Alves", especialidade: "Urologia", status: "Em aberto" },
        { nome: "Dra. Daniela Silva", especialidade: "Ginecologia", status: "Em aberto" },
        { nome: "Dr. Fabio Souza", especialidade: "Oftalmologia", status: "Em aberto" },
        { nome: "Dra. Adriana Martins", especialidade: "Reumatologia", status: "Em aberto" },
        { nome: "Dr. Henrique Fernandes", especialidade: "Gastroenterologia", status: "Em aberto" },
        { nome: "Dra. Renata Lima", especialidade: "Anestesiologia", status: "Em aberto" },
        { nome: "Dr. Tiago Rocha", especialidade: "Cirurgia Geral", status: "Em aberto" },
        { nome: "Dra. Sabrina Azevedo", especialidade: "Pneumologia", status: "Em aberto" },
        { nome: "Dr. Bruno Costa", especialidade: "Oncologia", status: "Em aberto" },
        { nome: "Dra. Mariana Silva", especialidade: "Hematologia", status: "Em aberto" },
        { nome: "Dr. Felipe Andrade", especialidade: "Nutrição Clínica", status: "Em aberto" },
        { nome: "Dra. Amanda Ramos", especialidade: "Fisioterapia", status: "Em aberto" },
        { nome: "Dr. Leandro Ferreira", especialidade: "Cirurgia Plástica", status: "Em aberto" },
        { nome: "Dra. Priscila Rocha", especialidade: "Cirurgia Cardiovascular", status: "Em aberto" },
        { nome: "Dr. Eduardo Alves", especialidade: "Cirurgia Vascular", status: "Em aberto" },
        { nome: "Dra. Camila Pereira", especialidade: "Imunologia", status: "Em aberto" },
        { nome: "Dr. Rafael Martins", especialidade: "Gerontologia", status: "Em aberto" },
        { nome: "Dra. Letícia Souza", especialidade: "Alergologia", status: "Em aberto" }
    ];

    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsList = document.getElementById('resultsList');
    const resultsCount = document.getElementById('resultsCount');
    const backButton = document.getElementById('backButton');

    function renderResults(results) {
        resultsList.innerHTML = '';
        resultsCount.textContent = results.length;

        if (results.length === 0) {
            resultsList.innerHTML = '<li class="no-results">Nenhum resultado encontrado.</li>';
            return;
        }

        // Mapa de classes definido fora do loop para melhor performance
        const statusClassMap = {
            'Agendada': 'status-agendada',
            'Concluída': 'status-concluida',
            'Cancelada': 'status-cancelada',
            'Em aberto': 'status-em-aberto'
        };

        results.forEach(item => {
            const li = document.createElement('li');
            li.className = 'result-item';
            
            // Torna o item clicável para agendar
            li.style.cursor = 'pointer';
            li.title = 'Clique para agendar com este médico';
            li.addEventListener('click', () => {
                // Salva o médico selecionado para a tela de agendamento usar
                localStorage.setItem('medico_pre_selecionado', item.nome);
                window.location.href = 'TelaAgendamento.html';
            });

            const statusClass = statusClassMap[item.status] || '';

            // Criação segura de elementos DOM (Previne XSS)
            const infoDiv = document.createElement('div');
            infoDiv.className = 'result-info';

            const nameP = document.createElement('p');
            nameP.className = 'name';
            nameP.textContent = item.nome;

            const detailsP = document.createElement('p');
            detailsP.className = 'details';
            detailsP.textContent = item.especialidade;

            infoDiv.appendChild(nameP);
            infoDiv.appendChild(detailsP);

            if (item.data) {
                const dateP = document.createElement('p');
                dateP.className = 'datetime';
                dateP.textContent = item.data;
                infoDiv.appendChild(dateP);
            }

            const statusSpan = document.createElement('span');
            statusSpan.className = `status-badge ${statusClass}`;
            statusSpan.textContent = item.status;

            li.appendChild(infoDiv);
            li.appendChild(statusSpan);

            resultsList.appendChild(li);
        });
    }


let selectedEspecialidade = "";
function performSearch() {
    const query = searchInput.value.toLowerCase().trim();

    const filteredResults = allResults.filter(item => {
        // Pesquisa apenas pelo nome
        const nameMatch = item.nome.toLowerCase().includes(query) || 
                          item.especialidade.toLowerCase().includes(query);

        // Filtra pela especialidade selecionada (se houver)
        const specialtyMatch = selectedEspecialidade ? item.especialidade === selectedEspecialidade : true;

        return nameMatch && specialtyMatch;
    });

    renderResults(filteredResults);
}

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('input', performSearch);

    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'MenuPaciente.html';
            // Verifica se existe histórico anterior na aba (> 1 significa que há algo antes da página atual)
            if (window.history.length > 1) {
                window.history.back();
            } else {
                // Fallback: Se não houver histórico (ex: abriu link direto), força ir para o Menu
                window.location.href = 'MenuPaciente.html';
            }
        });
    }

    renderResults(allResults);

    // --- Lógica do Filtro de Especialidades (Movida para dentro do escopo correto) ---
    const especialidadesComuns = [
        "Cardiologia",
        "Clínico Geral",
        "Pediatria",
        "Ginecologia",
        "Obstetrícia",
        "Ortopedia",
        "Dermatologia",
        "Psiquiatria",
        "Neurologia",
        "Oftalmologia",
        "Otorrinolaringologia",
        "Endocrinologia",
        "Gastroenterologia",
        "Reumatologia",
        "Urologia",
        "Nefrologia",
        "Hematologia",
        "Oncologia",
        "Infectologia",
        "Pneumologia",
        "Nutrição Clínica",
        "Anestesiologia",
        "Fisioterapia",
        "Gerontologia",
        "Alergologia",
        "Imunologia",
        "Cirurgia Geral",
        "Cirurgia Plástica",
        "Cirurgia Cardiovascular",
        "Cirurgia Vascular"
    ];

    // Elementos
    const btnEspecialidade = document.querySelector("#btnEspecialidade");
    const listaEspecialidades = document.querySelector("#listaEspecialidades");

    // Preencher lista
    function carregarEspecialidades() {
        if (!listaEspecialidades) return;
        listaEspecialidades.innerHTML = "";

        // Melhoria: Adiciona opção para limpar o filtro e ver todos
        const liTodas = document.createElement("li");
        liTodas.textContent = "Todas as Especialidades";
        liTodas.style.fontWeight = "bold"; // Destaque visual simples
        liTodas.addEventListener("click", (e) => {
            e.stopPropagation();
            if (btnEspecialidade) btnEspecialidade.textContent = "Especialidades";
            selectedEspecialidade = ""; // Limpa a variável
            listaEspecialidades.classList.add("hidden");
            performSearch(); // Atualiza a lista
        });
        listaEspecialidades.appendChild(liTodas);

        especialidadesComuns.forEach(esp => {
            const li = document.createElement("li");
            li.textContent = esp;

            li.addEventListener("click", (e) => {
                e.stopPropagation();
                if (btnEspecialidade) btnEspecialidade.textContent = esp;
                selectedEspecialidade = esp; // Agora acessa a variável correta
                listaEspecialidades.classList.add("hidden");
                performSearch(); // Atualiza a busca imediatamente ao clicar
            });

            listaEspecialidades.appendChild(li);
        });
    }

    if (btnEspecialidade && listaEspecialidades) {
        carregarEspecialidades();

        btnEspecialidade.addEventListener("click", (e) => {
            e.stopPropagation();
            listaEspecialidades.classList.toggle("hidden");
        });

        document.addEventListener("click", () => {
            listaEspecialidades.classList.add("hidden");
        });
    }
});
