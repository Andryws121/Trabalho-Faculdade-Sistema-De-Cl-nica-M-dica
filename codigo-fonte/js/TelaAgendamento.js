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