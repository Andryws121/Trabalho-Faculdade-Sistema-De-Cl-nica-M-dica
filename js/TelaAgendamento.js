/* =================================================================
   ARQUIVO: TelaAgendamento.js
   DESCRIÇÃO: Lógica para CRIAR ou EDITAR consultas
   ================================================================= */

// 1. LISTA DE MÉDICOS E ESPECIALIDADES
const listaMedicos = [
    { nome: "Dr. Carlos Moura", especialidade: "Cardiologia" },
    { nome: "Dra. Ana Bezerra", especialidade: "Dermatologia" },
    { nome: "Dr. Ricardo Martins", especialidade: "Ortopedia" },
    { nome: "Dra. Juliana Teixeira", especialidade: "Pediatria" },
    { nome: "Dr. Felipe Carvalho", especialidade: "Clínico Geral" },
    { nome: "Dr. Marcos Andrade", especialidade: "Neurologia" },
    { nome: "Dra. Beatriz Nogueira", especialidade: "Ginecologia" },
    { nome: "Dr. Thiago Lopes", especialidade: "Endocrinologia" },
    { nome: "Dra. Camila Ramos", especialidade: "Oftalmologia" },
    { nome: "Dr. Eduardo Farias", especialidade: "Urologia" }
];

document.addEventListener('DOMContentLoaded', () => {
    carregarListaMedicos();
    configurarFormulario();
    verificarModoEdicao(); // Verifica se é Novo ou Edição ao carregar
});

// --- FUNÇÕES DE CONFIGURAÇÃO ---

function carregarListaMedicos() {
    const datalist = document.getElementById('lista-profissionais');
    if (!datalist) return;
    
    datalist.innerHTML = ""; // Limpa para não duplicar
    listaMedicos.forEach(med => {
        const option = document.createElement('option');
        option.value = med.nome;
        datalist.appendChild(option);
    });
}

function configurarFormulario() {
    const form = document.querySelector('form');
    const inputMedico = document.getElementById('profissional');
    const inputEspecialidade = document.getElementById('especialidade');

    // Auto-preencher especialidade ao digitar o médico
    if (inputMedico && inputEspecialidade) {
        inputMedico.addEventListener('input', function() {
            const nomeDigitado = this.value;
            const medicoEncontrado = listaMedicos.find(m => m.nome === nomeDigitado);
            
            if (medicoEncontrado) {
                inputEspecialidade.value = medicoEncontrado.especialidade;
            } else {
                inputEspecialidade.value = "";
            }
        });
    }

    // Interceptar o envio do formulário
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            salvarAgendamento();
        });
    }
}

// --- LÓGICA INTELIGENTE: NOVO VS EDITAR ---
function verificarModoEdicao() {
    const idParaEditar = localStorage.getItem('id_consulta_editar');
    
    // Seleciona os elementos de texto
    const tituloPagina = document.querySelector('.titulo-pagina');
    const botaoSalvar = document.querySelector('.btn-salvar');

    if (idParaEditar) {
        // --- MODO EDIÇÃO ---
        if (tituloPagina) tituloPagina.innerText = "REMARCAR CONSULTA";
        if (botaoSalvar) botaoSalvar.innerText = "ATUALIZAR AGENDAMENTO";

        // Busca os dados antigos e preenche os campos
        const consultas = JSON.parse(localStorage.getItem('bd_consultas')) || [];
        const consulta = consultas.find(c => c.id == idParaEditar);

        if (consulta) {
            document.getElementById('paciente').value = consulta.paciente;
            document.getElementById('profissional').value = consulta.medico;
            document.getElementById('especialidade').value = consulta.especialidade;
            document.getElementById('data').value = consulta.data;
            document.getElementById('horario').value = consulta.hora;
            document.getElementById('observacoes').value = consulta.observacoes;
        }
    } else {
        // --- MODO NOVO (Reset) ---
        // Garante que os textos voltem ao normal
        if (tituloPagina) tituloPagina.innerText = "AGENDAR CONSULTA";
        if (botaoSalvar) botaoSalvar.innerText = "CONFIRMAR AGENDAMENTO";

        // Verifica se veio um médico pré-selecionado da Busca
        const medicoPre = localStorage.getItem('medico_pre_selecionado');
        if (medicoPre) {
            const inputMedico = document.getElementById('profissional');
            if (inputMedico) {
                inputMedico.value = medicoPre;
                inputMedico.dispatchEvent(new Event('input')); // Dispara evento para preencher especialidade
            }
            localStorage.removeItem('medico_pre_selecionado'); // Limpa após usar
        }
    }
}

// --- FUNÇÃO PRINCIPAL: SALVAR ---
function salvarAgendamento() {
    // 1. Captura dados
    const paciente = document.getElementById('paciente').value.trim();
    const medico = document.getElementById('profissional').value.trim();
    const especialidade = document.getElementById('especialidade').value.trim();
    const data = document.getElementById('data').value;
    const hora = document.getElementById('horario').value;
    const obs = document.getElementById('observacoes').value.trim();

    // 2. Validação Campos Vazios
    if (!paciente || !medico || !especialidade || !data || !hora) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    // 3. Validação Data (Não permitir passado)
    const dataSelecionada = new Date(data + 'T' + hora);
    const agora = new Date();
    if (dataSelecionada < agora) {
        alert("A data selecionada já passou. Escolha uma data futura.");
        return;
    }

    // 4. Lógica de Salvar ou Atualizar
    const consultas = JSON.parse(localStorage.getItem('bd_consultas')) || [];
    const idParaEditar = localStorage.getItem('id_consulta_editar');

    // --- VERIFICAÇÃO DE CONFLITO DE HORÁRIO ---
    const conflito = consultas.find(c => 
        c.medico === medico && 
        c.data === data && 
        c.hora === hora &&
        c.status !== 'cancelada' && c.status !== 'cancelado' && // Ignora cancelados
        (idParaEditar ? c.id != parseInt(idParaEditar) : true) // Garante comparação correta de ID
    );

    if (conflito) {
        alert(conflito.status === 'bloqueado' ? "Este horário foi bloqueado pelo médico." : "Este horário já está reservado. Por favor, escolha outro.");
        return;
    }

    if (idParaEditar) {
        // --- ATUALIZAR EXISTENTE ---
        const index = consultas.findIndex(c => c.id == parseInt(idParaEditar));
        if (index !== -1) {
            consultas[index].paciente = paciente;
            consultas[index].medico = medico;
            consultas[index].especialidade = especialidade;
            consultas[index].data = data;
            consultas[index].hora = hora;
            consultas[index].observacoes = obs;
            consultas[index].status = 'agendada'; // Reseta status para agendada
            
            alert("Consulta atualizada com sucesso!");
        }
        localStorage.removeItem('id_consulta_editar'); // Sai do modo edição

    } else {
        // --- CRIAR NOVA ---
        const novaConsulta = {
            id: Date.now(),
            paciente: paciente,
            medico: medico,
            especialidade: especialidade,
            data: data,
            hora: hora,
            status: "agendada",
            observacoes: obs
        };
        consultas.push(novaConsulta);
        alert("Consulta agendada com sucesso!");
    }

    // 5. Salvar e Sair
    localStorage.setItem('bd_consultas', JSON.stringify(consultas));
    window.location.href = "MenuPaciente.html";
}