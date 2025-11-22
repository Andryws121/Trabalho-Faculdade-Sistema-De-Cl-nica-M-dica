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
                'Cancelada': 'status-cancelada',
                'Em aberto': 'status-em-aberto'
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


let selectedEspecialidade = "";
function performSearch() {
    const query = searchInput.value.toLowerCase().trim();

    const filteredResults = allResults.filter(item => {
        // Pesquisa apenas pelo nome
        const nameMatch = item.nome.toLowerCase().includes(query);

        // Filtra pela especialidade selecionada (se houver)
        const specialtyMatch = selectedEspecialidade ? item.especialidade === selectedEspecialidade : true;

        return nameMatch && specialtyMatch;
    });

    renderResults(filteredResults);
}

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', performSearch);

    renderResults(allResults);
});


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
    listaEspecialidades.innerHTML = "";

    especialidadesComuns.forEach(esp => {
        const li = document.createElement("li");
        li.textContent = esp;

        li.addEventListener("click", (e) => {
            e.stopPropagation();
            btnEspecialidade.textContent = esp;
            selectedEspecialidade = esp;  // atualiza variável global
            listaEspecialidades.classList.add("hidden");
            performSearch();              // atualiza lista
        });

        listaEspecialidades.appendChild(li);
    });
}

carregarEspecialidades();

btnEspecialidade.addEventListener("click", (e) => {
    e.stopPropagation();
    listaEspecialidades.classList.toggle("hidden");
});

document.addEventListener("click", () => {
    listaEspecialidades.classList.add("hidden");
});


