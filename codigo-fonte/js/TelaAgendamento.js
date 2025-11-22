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

(function configurarEspecialidades() {
    const input = document.querySelector("#especialidade");
    const lista = document.querySelector("#lista-especialidades");

    if (!input || !lista) return;

    // Função para atualizar as sugestões
    function atualizarLista(filtro = "") {
        lista.innerHTML = ""; // limpar

        especialidadesComuns
            .filter(esp =>
                esp.toLowerCase().includes(filtro.toLowerCase())
            )
            .forEach(esp => {
                const option = document.createElement("option");
                option.value = esp;
                lista.appendChild(option);
            });
    }

    // Atualiza tudo ao clicar e ao digitar
    input.addEventListener("input", () => atualizarLista(input.value));

    // Carrega todas no início
    atualizarLista();
})();

(function gerarHorarios() {
    const select = document.querySelector("#horario");
    if (!select) return;

    const horaInicio = 8;  // 08:00
    const horaFim = 18;    // 18:00

    for (let h = horaInicio; h <= horaFim; h++) {
        for (let m = 0; m < 60; m += 15) {

            // 18:00 é o último horário permitido
            if (h === horaFim && m > 0) break;

            const hh = String(h).padStart(2, "0");
            const mm = String(m).padStart(2, "0");

            const op = document.createElement("option");
            op.value = `${hh}:${mm}`;
            op.textContent = `${hh}:${mm}`;

            select.appendChild(op);
        }
    }
})();


(function () {
    // ---------------------------
    // 1. Configuração do Formulário
    // ---------------------------
    const form = document.querySelector("form");
    
    // Se não achar o formulário, para o script para não dar erro
    if (!form) return;
  
    // Seleção dos campos
    const el = {
      paciente: document.querySelector("#paciente"),
      profissional: document.querySelector("#profissional"),
      especialidade: document.querySelector("#especialidade"),
      data: document.querySelector("#data"),
      hora: document.querySelector("#horario"),
      observacoes: document.querySelector("#observacoes"),
    };
  
    // Área onde os agendamentos aparecerão (escondida/opcional já que vamos redirecionar)
    const lista = document.createElement("div");
    lista.id = "listaAgendamentos";
    lista.style.marginTop = "16px";
    form.insertAdjacentElement("afterend", lista);
  
    const STORAGE_KEY = "agendamentos";
    let agendamentos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    
    // Renderiza a lista inicial (caso tenha algo salvo)
    render();
  
    // ---------------------------
    // 2. Envio do Formulário (Salvar + Redirecionar)
    // ---------------------------
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const obrig = [el.paciente, el.profissional, el.especialidade, el.data, el.hora];
      
      // Validação de campos vazios
      const inval = obrig.find((i) => !i || !String(i.value).trim());
      if (inval) {
        inval.focus(); 
        alert("Preencha todos os campos obrigatórios.");
        return;
      }

      // Validar se especialidade está na lista
    if (!especialidadesComuns.includes(el.especialidade.value.trim())) {
       alert("Selecione uma especialidade válida da lista.");
       el.especialidade.value = "";
       el.especialidade.focus();
      return;
   }
  
      // Validação de data/hora
      const quandoStr = `${el.data.value}T${el.hora.value}`;
      const quando = new Date(quandoStr);
      
      if (isNaN(quando.getTime())) {
        alert("Data/hora inválidas.");
        return;
      }
      if (quando < new Date()) {
        alert("Escolha uma data e horário no futuro.");
        el.data.focus();
        return;
      }
  
      // Cria o objeto do agendamento
      const ag = {
        paciente: el.paciente.value.trim(),
        profissional: el.profissional.value.trim(),
        especialidade: el.especialidade.value.trim(),
        data: el.data.value,
        hora: el.hora.value,
        observacoes: (el.observacoes?.value || "").trim(),
        criadoEm: new Date().toISOString(),
      };
  
      // Salva no LocalStorage
      agendamentos.push(ag);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(agendamentos));
  
      // --- SUCESSO E REDIRECIONAMENTO ---
      alert("Agendamento confirmado! Redirecionando para a configuração...");
      
      // Leva para a próxima tela
      window.location.href = 'ConfiguracaoAgenda.html'; 
    });
  
    // ---------------------------
    // 3. Lógica do Botão Voltar (Dinâmico)
    // ---------------------------
    const botaoVoltar = document.querySelector('.btn-verde'); // Pega o botão pelo estilo
    
    // Recupera o usuário que está logado
    const usuarioLogado = JSON.parse(localStorage.getItem('sessionToken') || '{}');
  
    if (botaoVoltar) {
        // Se o usuário for médico/profissional, muda o link para o menu dele
        if (usuarioLogado.role === 'profissional') {
            botaoVoltar.setAttribute('href', 'MenuProfissional.html');
        } else {
            // Se for qualquer outra coisa (paciente), mantém o padrão
            botaoVoltar.setAttribute('href', 'MenuPaciente.html');
        }
    }
  
    // ---------------------------
    // 4. Funções de Renderização e Auxiliares
    // ---------------------------
    function render() {
      if (!agendamentos.length) {
        lista.innerHTML = "<p>Nenhum agendamento ainda.</p>";
        return;
      }
  
      lista.innerHTML = agendamentos
        .map((a, i) => {
          const quando = formataDataHora(a.data, a.hora);
          const criado = new Date(a.criadoEm).toLocaleString("pt-BR");
  
          return `
            <div class="ag-card">
              <div class="ag-header">
                <h4>Agendamento #${i + 1}</h4>
                <span class="ag-created">criado em ${criado}</span>
              </div>
  
              <div class="ag-body">
                <div class="row"><strong>Paciente:</strong> ${esc(a.paciente)}</div>
                <div class="row"><strong>Profissional:</strong> ${esc(a.profissional)}</div>
                <div class="row"><strong>Especialidade:</strong> ${esc(a.especialidade)}</div>
                <div class="row"><strong>Quando:</strong> ${quando}</div>
                ${
                  a.observacoes
                    ? `<div class="row"><strong>Observações:</strong> ${esc(a.observacoes)}</div>`
                    : ""
                }
              </div>
  
              <div class="ag-footer">
                <button class="ag-remove" data-idx="${i}">Excluir</button>
              </div>
            </div>
          `;
        })
        .join("");
  
      // Botão de remover
      lista.querySelectorAll(".ag-remove").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = Number(btn.dataset.idx);
          agendamentos.splice(idx, 1);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(agendamentos));
          render();
        });
      });
    }
  
    function formataDataHora(dateISO, hhmm) {
      try {
        const [y, m, d] = dateISO.split("-").map(Number);
        const [h, mm] = hhmm.split(":").map(Number);
        const dt = new Date(y, m - 1, d, h, mm);
        return `${dt.toLocaleDateString("pt-BR")} às ${dt.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        })}`;
      } catch {
        return `${dateISO} ${hhmm}`;
      }
    }
  
    function esc(s) {
      const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
      return String(s).replace(/[&<>"']/g, (ch) => map[ch]);
    }
  
  })(); // <--- O fechamento correto é SÓ AQUI no final de tudo

  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const consulta = {
        paciente: document.getElementById("paciente").value,
        profissional: document.getElementById("profissional").value,
        especialidade: document.getElementById("especialidade").value,
        data: document.getElementById("data").value,
        horario: document.getElementById("horario").value,
        observacoes: document.getElementById("observacoes").value
    };

    // Pega lista já existente
    const consultas = JSON.parse(localStorage.getItem("consultas")) || [];

    // Adiciona nova consulta
    consultas.push(consulta);

    // Salva novamente
    localStorage.setItem("consultas", JSON.stringify(consultas));
    });

