// ---------------------------------------------------------
// 1) LISTA DE ESPECIALIDADES
// ---------------------------------------------------------
const especialidadesComuns = [
  "Cardiologia", "Clínico Geral", "Pediatria", "Ginecologia", "Obstetrícia",
  "Ortopedia", "Dermatologia", "Psiquiatria", "Neurologia", "Oftalmologia",
  "Otorrinolaringologia", "Endocrinologia", "Gastroenterologia", "Reumatologia",
  "Urologia", "Nefrologia", "Hematologia", "Oncologia", "Infectologia",
  "Pneumologia", "Nutrição Clínica", "Anestesiologia", "Fisioterapia",
  "Gerontologia", "Alergologia", "Imunologia", "Cirurgia Geral",
  "Cirurgia Plástica", "Cirurgia Cardiovascular", "Cirurgia Vascular"
];

(function configurarEspecialidades() {
  const input = document.querySelector("#especialidade");
  const lista = document.querySelector("#lista-especialidades");
  if (!input || !lista) return;

  function atualizarLista(filtro = "") {
    lista.innerHTML = "";
    especialidadesComuns
      .filter(esp => esp.toLowerCase().includes(filtro.toLowerCase()))
      .forEach(esp => {
        const option = document.createElement("option");
        option.value = esp;
        lista.appendChild(option);
      });
  }

  input.addEventListener("input", () => atualizarLista(input.value));
  input.addEventListener("focus", () => atualizarLista(input.value));
  atualizarLista();
})();

// ---------------------------------------------------------
// 2) GERAR HORÁRIOS
// ---------------------------------------------------------
(function gerarHorarios() {
  const select = document.querySelector("#horario");
  if (!select) return;

  for (let h = 8; h <= 18; h++) {
    for (let m = 0; m < 60; m += 15) {
      if (h === 18 && m > 0) break;

      const option = document.createElement("option");
      option.value = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      option.textContent = option.value;
      select.appendChild(option);
    }
  }
})();

// ---------------------------------------------------------
// 3) LISTA DE PROFISSIONAIS
// ---------------------------------------------------------
const allResults = [
    { nome: "Dr. Carlos Moura", especialidade: "Cardiologia" },
    { nome: "Dra. Ana Bezerra", especialidade: "Dermatologia" },
    { nome: "Dr. Ricardo Martins", especialidade: "Ortopedia" },
    { nome: "Dra. Juliana Teixeira", especialidade: "Pediatria" },
    { nome: "Dr. Felipe Carvalho", especialidade: "Clínico Geral" },
    { nome: "Dr. Marcos Andrade", especialidade: "Neurologia" },
    { nome: "Dra. Beatriz Nogueira", especialidade: "Ginecologia" },
    { nome: "Dr. Thiago Lopes", especialidade: "Endocrinologia" },
    { nome: "Dra. Camila Ramos", especialidade: "Oftalmologia" },
    { nome: "Dr. Eduardo Farias", especialidade: "Urologia" },
    { nome: "Dra. Renata Monteiro", especialidade: "Reumatologia" },
    { nome: "Dr. Lucas Azevedo", especialidade: "Psiquiatria" },
    { nome: "Dra. Mariana Pires", especialidade: "Otorrinolaringologia" },
    { nome: "Dr. Samuel Oliveira", especialidade: "Gastroenterologia" },
    { nome: "Dra. Patrícia Almeida", especialidade: "Anestesiologia" },
    { nome: "Dr. João Henrique", especialidade: "Cirurgia Geral" },
    { nome: "Dra. Lorena Duarte", especialidade: "Pneumologia" },
    { nome: "Dr. Fernando Vasconcelos", especialidade: "Oncologia" },
    { nome: "Dra. Aline Castro", especialidade: "Hematologia" },
    { nome: "Dr. Pedro Lima", especialidade: "Nutrição Clínica" },
    { nome: "Dra. Juliana Santos", especialidade: "Fisioterapia" },
    { nome: "Dr. Rafael Gomes", especialidade: "Cirurgia Plástica" },
    { nome: "Dra. Bianca Costa", especialidade: "Cirurgia Cardiovascular" },
    { nome: "Dr. André Pinto", especialidade: "Cirurgia Vascular" },
    { nome: "Dra. Fernanda Ribeiro", especialidade: "Imunologia" },
    { nome: "Dr. Leonardo Martins", especialidade: "Gerontologia" },
    { nome: "Dra. Camila Azevedo", especialidade: "Alergologia" },
    { nome: "Dr. Vinícius Oliveira", especialidade: "Psiquiatria" },
    { nome: "Dra. Tatiane Souza", especialidade: "Pediatria" },
    { nome: "Dr. Gustavo Ferreira", especialidade: "Clínico Geral" },
    { nome: "Dra. Larissa Rocha", especialidade: "Cardiologia" },
    { nome: "Dr. Daniel Ribeiro", especialidade: "Ortopedia" },
    { nome: "Dra. Paula Mendes", especialidade: "Dermatologia" },
    { nome: "Dr. Rodrigo Lima", especialidade: "Endocrinologia" },
    { nome: "Dra. Vanessa Costa", especialidade: "Neurologia" },
    { nome: "Dr. Marcelo Alves", especialidade: "Urologia" },
    { nome: "Dra. Daniela Silva", especialidade: "Ginecologia" },
    { nome: "Dr. Fabio Souza", especialidade: "Oftalmologia" },
    { nome: "Dra. Adriana Martins", especialidade: "Reumatologia" },
    { nome: "Dr. Henrique Fernandes", especialidade: "Gastroenterologia" },
    { nome: "Dra. Renata Lima", especialidade: "Anestesiologia" },
    { nome: "Dr. Tiago Rocha", especialidade: "Cirurgia Geral" },
    { nome: "Dra. Sabrina Azevedo", especialidade: "Pneumologia" },
    { nome: "Dr. Bruno Costa", especialidade: "Oncologia" },
    { nome: "Dra. Mariana Silva", especialidade: "Hematologia" },
    { nome: "Dr. Felipe Andrade", especialidade: "Nutrição Clínica" },
    { nome: "Dra. Amanda Ramos", especialidade: "Fisioterapia" },
    { nome: "Dr. Leandro Ferreira", especialidade: "Cirurgia Plástica" },
    { nome: "Dra. Priscila Rocha", especialidade: "Cirurgia Cardiovascular" },
    { nome: "Dr. Eduardo Alves", especialidade: "Cirurgia Vascular" },
    { nome: "Dra. Camila Pereira", especialidade: "Imunologia" },
    { nome: "Dr. Rafael Martins", especialidade: "Gerontologia" },
    { nome: "Dra. Letícia Souza", especialidade: "Alergologia" }
];

// ---------------------------------------------------------
// 4) CONFIGURAR DATLIST DE PROFISSIONAIS + AUTOPREENCHER
// ---------------------------------------------------------
const inputProf = document.querySelector("#profissional");
const listaProfs = document.querySelector("#lista-profissionais");
const inputEsp = document.querySelector("#especialidade");

(function carregarProfissionais() {
  if (!listaProfs) return;

  listaProfs.innerHTML = "";

  allResults.forEach(prof => {
    const option = document.createElement("option");
    option.value = `${prof.nome} — ${prof.especialidade}`; // VISUAL
    option.dataset.nome = prof.nome;
    option.dataset.especialidade = prof.especialidade;
    listaProfs.appendChild(option);
  });
})();

// ⚡ **AUTOMATICAMENTE ABRE A LISTA AO CLICAR NO CAMPO**
if (inputProf) {
  inputProf.addEventListener("focus", () => {
    inputProf.dispatchEvent(new Event("input"));
  });

  inputProf.addEventListener("input", () => {
    const itens = [...listaProfs.options];
    const op = itens.find(o => o.value === inputProf.value);

    if (op) {
      inputProf.value = op.dataset.nome;
      inputEsp.value = op.dataset.especialidade;
      inputEsp.setAttribute("readonly", true);
    } else {
      inputEsp.value = "";
      inputEsp.removeAttribute("readonly");
    }
  });
}

// ---------------------------------------------------------
// 5) FORMULÁRIO + SALVAR AGENDAMENTO NO LOCALSTORAGE
// ---------------------------------------------------------
(function () {
  const form = document.querySelector("form");
  if (!form) return;

  const el = {
    paciente: document.querySelector("#paciente"),
    profissional: document.querySelector("#profissional"),
    especialidade: document.querySelector("#especialidade"),
    data: document.querySelector("#data"),
    hora: document.querySelector("#horario"),
    observacoes: document.querySelector("#observacoes"),
  };

  const lista = document.createElement("div");
  lista.id = "listaAgendamentos";
  form.insertAdjacentElement("afterend", lista);

  const STORAGE_KEY = "agendamentos";
  let agendamentos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const obrig = [el.paciente, el.profissional, el.especialidade, el.data, el.hora];
    const inval = obrig.find(i => !i.value.trim());
    if (inval) {
      alert("Preencha todos os campos obrigatórios.");
      inval.focus();
      return;
    }

    // Validar especialidade
    if (!especialidadesComuns.includes(el.especialidade.value.trim())) {
      alert("Selecione uma especialidade válida da lista.");
      return;
    }

    const quando = new Date(`${el.data.value}T${el.hora.value}`);
    if (quando < new Date()) {
      alert("Escolha uma data e horário no futuro.");
      return;
    }

    const ag = {
      paciente: el.paciente.value.trim(),
      profissional: el.profissional.value.trim(),
      especialidade: el.especialidade.value.trim(),
      data: el.data.value,
      hora: el.hora.value,
      observacoes: el.observacoes.value.trim(),
      criadoEm: new Date().toISOString(),
    };

    agendamentos.push(ag);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(agendamentos));

    alert("Agendamento confirmado!");
    voltarParaMenu();
  });
})();

// ---------------------------------------------------------
// 6) BOTÃO VOLTAR DINÂMICO
// ---------------------------------------------------------
const botaoVoltar = document.querySelector(".btn-verde");
const usuarioLogado = JSON.parse(localStorage.getItem("sessionToken") || "{}");

if (botaoVoltar) {
  if (usuarioLogado.role === "profissional") {
    botaoVoltar.href = "MenuProfissional.html";
  } else {
    botaoVoltar.href = "MenuPaciente.html";
  }
}

// BOTÃO CANCELAR → VOLTAR SEM VALIDAR
const btnCancelar = document.querySelector(".btn-cinza");

if (btnCancelar) {
  btnCancelar.addEventListener("click", () => {
    window.history.back();
});
}


function voltarParaMenu() {
  const usuarioLogado = JSON.parse(localStorage.getItem("sessionToken") || "{}");

  if (usuarioLogado.role === "profissional") {
    window.location.href = "MenuProfissional.html";
  } else {
    window.location.href = "MenuPaciente.html";
  }
}