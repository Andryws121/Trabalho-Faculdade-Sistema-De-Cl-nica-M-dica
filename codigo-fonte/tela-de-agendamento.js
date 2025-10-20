(function () {
  const form = document.querySelector("form");
  if (!form) return;

  // Campos do formulário
  const el = {
    paciente: document.querySelector("#paciente"),
    profissional: document.querySelector("#Profissional"),
    especialidade: document.querySelector("#Especialidade"),
    data: document.querySelector("#data"),
    hora: document.querySelector('input[id="Horario da consulta"]'),
    observacoes: document.querySelector("#Observações"),
  };

  // Área onde os agendamentos aparecerão
  const lista = document.createElement("div");
  lista.id = "listaAgendamentos";
  lista.style.marginTop = "16px";
  form.insertAdjacentElement("afterend", lista);

  const STORAGE_KEY = "agendamentos";
  let agendamentos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  render();

  // Envio do formulário
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const obrig = [el.paciente, el.profissional, el.especialidade, el.data, el.hora];
    const inval = obrig.find((i) => !i || !String(i.value).trim());
    if (inval) {
      inval.focus();
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    // Validação de data/hora futura
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

    agendamentos.push(ag);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(agendamentos));

    alert("Agendamento confirmado!");
    form.reset();
    render();
  });

  // ---------------------------
  // 🔷 Função render atualizada
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

  // ---------------------------
  // Funções auxiliares
  // ---------------------------
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
  // Botão verde: voltar ao menu principal
const btnVoltar = document.getElementById("btnVoltar");
if (btnVoltar) {
  btnVoltar.addEventListener("click", () => {
    window.location.href = "menuprincipal.html"; 
  });
}
})();
