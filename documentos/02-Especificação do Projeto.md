# Especificações do Projeto

## Perfis de Usuários

<table>
<tbody>
<tr>
<th colspan="2">Perfil 1: Paciente </th>
</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">
Pacientes que desejam marcar consulta. 
</td>
</tr>
<tr>
<td><b>Necessidades</b></td>
<td>
1. Agendar de forma prática e rápida uma consulta;
  
2. Acessar agenda das próximas consultas;
 
3. Deixar um feedback de como foi todo processo de atendimento;
 
4. Possibilidade de remarcar com antecedência consultas já agendadas. 
</td>
</tr>
</tbody>
</table>

<table>
<tbody>
<tr>
<th colspan="2">Perfil 2: Profissional de saúde </th>
</tr>
<tr>
<td width="150px"><b>Descrição</b></td>
<td width="600px">
Profissionais da área da saúde disponíveis para atendimento. 
</td>
</tr>
<tr>
<td><b>Necessidades</b></td>
<td>
1. Receber as consultas agendadas;
  
2. Acessar agenda das próximas consultas.
</td>
</tr>
</tbody>
</table>

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE`                                             |PARA ... `MOTIVO/VALOR`                 |
|--------------------|--------------------------------------------------------------------------------|----------------------------------------|
|Paciente | Marcar consulta online.  | É uma forma mais ágil. |
|paciente | Remarcar uma consulta já marcada previamente.  | Preciso de uma nova data.  |
|Médico|Disponibilizar atendimento.  | Para conseguir pacientes dessa forma.  |
|Paciente/Médico | Ter acesso a agenda.   | Acompanhar consultas agendadas. |
|Paciente | Ter acesso ao histórico de consultas.  | Ter um melhor controle das atividades feitas. |
|Médico |Ter acesso ao histórico de atendimentos realizados. | Acompanhar o desempenho das consultas. |
|Paciente |Cancelar uma consulta.  | Não poderei comparecer.|
|Médico | Enviar lembretes de consulta.   | Reduzir os números de faltas. |
|Paciente | Receber notificações de lembrete de consulta.  | Evitar não comparecimento.. |

## Requisitos

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-01| A aplicação deve permitir cadastro de conta do paciente e profissional da saúde.   | ALTA | 
|RF-02| A aplicação deve permitir que o paciente e profissional da saúde façam login.   | ALTA | 
|RF-03| A aplicação deve permitir marcação de consulta online.    | ALTA |
|RF-04| A aplicação deve permitir a funcionalidade de busca e filtro de pesquisa.    | ALTA |
|RF-05| A aplicação deve permitir remarcar uma consulta já marcada previamente.  | MÉDIA |
|RF-06| A aplicação deve permitir acesso a agenda.    | ALTA |
|RF-07| A aplicação deve permitir acesso ao histórico de consultas.    | MÉDIA |
|RF-08| A aplicação deve permitir cancelar consulta.   | ALTA |
|RF-09| A aplicação deve permitir notificações de consulta.  | MÉDIA |
|RF-10| A aplicação deve permitir cadastro de perfil de usuário.  | MÉDIA |

**Prioridade: Alta / Média / Baixa. 

### Requisitos Não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-01| A aplicação deve ter sistema disponível 24 horas.  | ALTA | 
|RNF-02| A aplicação deverá ser acessível em diferentes dispositivos.  | ALTA | 
|RNF-03| A aplicação deve manter os dados dos pacientes armazenados de forma segura e anônima de acordo com a LGPD.  | MÉDIA | 
|RNF-04| A aplicação deve ser compatível com os principais navegadores de internet. Google Chrome, Mozilla Firefox, Microsoft Edge. | ALTA | 


**Prioridade: Alta / Média / Baixa. 

