// js/Setup.js

/* =================================================================
   BANCO DE DADOS SIMULADO (LOCALSTORAGE)
   Este arquivo garante que existam dados iniciais para o sistema funcionar.
   ================================================================= */

// 1. Lista Inicial de Consultas (Caso não exista nada salvo)
const dadosIniciais = [
    {
        id: 1,
        medico: "Dr. Carlos Moura",
        especialidade: "Cardiologia",
        data: "2023-11-27", // Formato ISO para facilitar ordenação (AAAA-MM-DD)
        hora: "18:00",
        status: "passada", // 'passada', 'agendada', 'cancelada'
        paciente: "João Silva"
    },
    {
        id: 2,
        medico: "Dra. Ana Souza",
        especialidade: "Dermatologia",
        data: "2023-10-15",
        hora: "09:30",
        status: "passada",
        paciente: "Maria Oliveira"
    },
    {
        id: 3,
        medico: "Dr. Pedro Santos",
        especialidade: "Ortopedia",
        data: "2023-09-01",
        hora: "14:00",
        status: "passada",
        paciente: "Carlos Pereira"
    },
    {
        id: 4,
        medico: "Dr. Carlos Moura",
        especialidade: "Cardiologia",
        data: "2023-11-28",
        hora: "15:15",
        status: "agendada",
        paciente: "Ana Costa"
    },
    {
        id: 5,
        medico: "Dr. Carlos Moura",
        especialidade: "Cardiologia",
        data: "2024-02-11",
        hora: "11:30",
        status: "agendada",
        paciente: "Roberto Lima"
    }
];

// 2. Inicializar o Banco de Dados no Navegador
function inicializarSistema() {
    // Verifica se já existem consultas salvas
    if (!localStorage.getItem('bd_consultas')) {
        // Se não existir, salva a lista inicial
        localStorage.setItem('bd_consultas', JSON.stringify(dadosIniciais));
        console.log("Banco de dados inicializado com sucesso!");
    } else {
        console.log("Banco de dados carregado.");
    }
}

// 3. Função Global para Formatar Data (ex: 2023-11-27 -> 27/11/2023)
function formatarData(dataISO) {
    if (!dataISO) return "";
    const partes = dataISO.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

// Executa a inicialização assim que o script é lido
inicializarSistema();