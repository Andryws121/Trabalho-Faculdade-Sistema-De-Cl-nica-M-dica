# Plano de Testes de Software

Pré-requisitos: Especificação do Projeto, Projeto de Interface

Os requisitos para realização dos testes de software são:
<ul><li>Site publicado na internet;</li>
<li>Navegador da internet: Chrome, Firefox, Edge ou outro similar.</li>
</ul>
Os testes funcionais a serem realizados na aplicação são descritos a seguir.

<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>
 <tr>
  <td>CT-01: Verificar o funcionamento dos links da página de Login</td>
  <td>
   <ul>
    <li>RF-02	A aplicação deve permitir que o paciente e profissional da saúde façam login.</li>
   </ul>
  </td>
  <td>verificar se os links da pagina de login estão funcionando corretamente </td>
  <td>
   <ol>
    <li>Acessar o navegador.</li>
    <li>Informar o endereço do site.</li>
    <li>Vizualizar a página Login.</li>
    <li>Clicar Nos links da página de Login.</li>
   </ol>
   </td>
  <td>Todos os links da página Login devem encaminhar os usuários para as páginas descritas.</td>
  <td>Gustavo</td>
 </tr>
</table>

<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>
 <tr>
  <td>CT-02: Verificar o funcionamento da página de Cadastro de profissional</td>
  <td>
   <ul>
    <li>RF-01	A aplicação deve permitir cadastro de conta do paciente e profissional da saúde.</li>
    <li>RF-10	A aplicação deve permitir cadastro de perfil de usuário.</li>
   </ul>
  </td>
  <td>verificar se a pagina de cadastro de profissional esta funcionando coretamente</td>
  <td>
   <ol>
    <li>Acessar o navegador.</li>
    <li>Informar o endereço do site.</li>
    <li>Vizualizar a página Login.</li>
    <li>Clicar em CADASTRAR</li>
    <li>Selecionar "Médico"</li>
    <li>Informar seus dados e clicar em "Cadastrar"</li>
   </ol>
   </td>
  <td>Deve ocorrer uma validação das informações fornecidas pelo usuário, e ao clicar em "Cadastrar", deve aparecer a mensagem "Cadastro realizado com sucesso! Redirecionando para o login...".</td>
  <td>Gustavo</td>
 </tr>
</table>

<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>
 <tr>
  <td>CT-03: Verificar o funcionamento da página de Cadastro de Paciente </td>
  <td>
   <ul>
    <li>RF-01	A aplicação deve permitir cadastro de conta do paciente e profissional da saúde.</li>
    <li>RF-10	A aplicação deve permitir cadastro de perfil de usuário.</li>
   </ul>
  </td>
  <td>verificar se a pagina de cadastro de paciente esta funcionando coretamente </td>
  <td>
   <ol>
    <li>Acessar o navegador.</li>
    <li>Informar o endereço do site.</li>
    <li>Vizualizar a página Login.</li>
    <li>Clicar em CADASTRAR</li>
    <li>Selecionar "Paciente"</li>
    <li>Informar seus dados e clicar em "Cadastrar"</li>
   </ol>
   </td>
  <td>Deve ocorrer uma validação das informações fornecidas pelo usuário, e ao clicar em "Cadastrar", deve aparecer a mensagem "Cadastro realizado com sucesso! Redirecionando para o login...".</td>
  <td>Gustavo</td>
 </tr>
</table>

<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>
 <tr>
  <td>CT-04: Verificar o funcionamento dos links da pagina de menu profissional </td>
  <td>
   <ul>
    <li>RF-03	A aplicação deve permitir marcação de consulta online.</li>
   <li>RF-06	A aplicação deve permitir acesso a agenda.</li>
   <li>RF-07	A aplicação deve permitir acesso ao histórico de consultas.</li>
   </ul>
  </td>
  <td>verificar se os links da pagina de menu profissional está funcionando corretamente </td>
  <td>
   <ol>
    <li>Acessar o navegador.</li>
    <li>Informar o endereço do site.</li>
    <li>Vizualizar a página Login.</li>
    <li>Informar seu EMAIL e SENHA</li>
    <li>Clicar em LOGIN</li>
    <li>Entrar na tela de Menu Profissional</li>
    <li>Clicar nos Links da pagina de menu Profissional</li>
   </ol>
   </td>
  <td>Todos os links da página Menu Profissional devem encaminhar os usuários para as páginas descritas.</td>
  <td>Gustavo</td>
 </tr>
</table>

<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>
 <tr>
  <td>CT-05: Verificar o funcionamento dos links da pagina de menu de paciente </td>
  <td>
   <ul>
    <li>RF-03	A aplicação deve permitir marcação de consulta online.</li>
   <li>RF-06	A aplicação deve permitir acesso a agenda.</li>
   <li>RF-07	A aplicação deve permitir acesso ao histórico de consultas.</li>
   </ul>
  </td>
  <td>verificar se os links da pagina de menu de paciente  está funcionando corretamente </td>
  <td>
   <ol>
    <li>Acessar o navegador.</li>
    <li>Informar o endereço do site.</li>
    <li>Vizualizar a página Login.</li>
    <li>Informar seu EMAIL e SENHA</li>
    <li>Clicar em LOGIN</li>
    <li>Entrar na tela de Menu de Paciente </li>
    <li>Clicar nos Links da pagina de Menu de Paciente</li>
   </ol>
   </td>
  <td>Todos os links da página Menu Paciente devem encaminhar os usuários para as páginas descritas.</td>
  <td>Gustavo</td>
 </tr>
</table>

<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>
 <tr>
  <td>CT-06: Verificar o cadastro de consultas </td>
  <td>
   <ul>
    <li>RF-03	A aplicação deve permitir marcação de consulta online.</li>
   </ul>
  </td>
  <td>verificar se a pagina de cadastro de consultas esta funcionando corretamente </td>
  <td>
   <ol>
    <li>Acessar o navegador.</li>
    <li>Informar o endereço do site.</li>
    <li>Vizualizar a página Login.</li>
    <li>Informar seu EMAIL e SENHA</li>
    <li>Clicar em LOGIN</li>
    <li>Entrar na tela de Menu Profissional ou de Paciente</li>
    <li>Clicar em "Agendar Consulta"</li>
    <li>Informar os dados da Consulta</li>
    <li>Clicar em Agendar Consulta</li>
   </ol>
   </td>
  <td>Deve ocorrer uma validação das informações fornecidas pelo usuário, e ao clicar em "Confirmar agendamento", deve aparecer a mensagem "Agendamento Confirmado!".</td>
  <td>Gustavo</td>
 </tr>
</table>

<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>
 <tr>
  <td>CT-07: Verificar o cancelamento de consultas </td>
  <td>
   <ul>
    <li>RF-03	A aplicação deve permitir marcação de consulta online..</li>
   <li>RF-08	A aplicação deve permitir cancelar consulta.</li>
   <li>RF-09	A aplicação deve permitir notificações de consulta.</li>
   </ul>
  </td>
  <td>verificar se o cancelamento de consultas está funcionando corretamente </td>
  <td>
   <ol>
    <li>Acessar o navegador.</li>
    <li>Informar o endereço do site.</li>
    <li>Vizualizar a página Login.</li>
    <li>Informar seu EMAIL e SENHA</li>
    <li>Clicar em LOGIN</li>
    <li>Entrar na tela de Menu Profissional ou de Paciente</li>
    <li>Clicar em "Agendar Consulta"</li>
    <li>Informar os dados da Consulta</li>
    <li>Clicar em Agendar Consulta</li>
    <li>Clicar em CONSULTAS</li>
    <li>Selecionar a consulta desejada</li>
    <li>Clicar no "X" na frente da consulta</li>
   </ol>
   </td>
  <td> Ao clicar em "X", deve aparecer a mensagem "Agendamento Cancelado!".</td>
  <td>Gustavo</td>
 </tr>
</table>

<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>
 <tr>
  <td>CT-08: Verificar o funcionamento das tabelas dos menus </td>
  <td>
   <ul>
RF-07	A aplicação deve permitir acesso ao histórico de consultas.
   </ul>
  </td>
  <td>verificar se as tabelas da tela de menu estão correspondendo com as alterações </td>
  <td>
   <ol>
    <li>Acessar o navegador.</li>
    <li>Informar o endereço do site.</li>
    <li>Vizualizar a página Login.</li>
    <li>Informar seu EMAIL e SENHA</li>
    <li>Clicar em LOGIN</li>
    <li>Entrar na tela de Menu Profissional ou de Paciente</li>
    <li>Clicar em "Agendar Consulta"</li>
    <li>Informar os dados da Consulta</li>
    <li>Clicar em Agendar Consulta</li>
    <li>Verificar as tabelas do Menu encontrado</li>
   </ol>
   </td>
  <td>Todas as tabelas de ambos menus devem estar interativas</td>
  <td>Gustavo</td>
 </tr>
</table>

<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>
 <tr>
  <td>CT-09: Verificar o funcionamento da agenda </td>
  <td>
   <ul>
    <li>RF-06	A aplicação deve permitir acesso a agenda.</li>
   </ul>
  </td>
  <td>verificar se a tela de agenda esta funcional </td>
  <td>
   <ol>
    <li>Acessar o navegador.</li>
    <li>Informar o endereço do site.</li>
    <li>Vizualizar a página Login.</li>
    <li>Informar seu EMAIL e SENHA</li>
    <li>Clicar em LOGIN</li>
    <li>Entrar na tela de Menu Profissional ou de Paciente</li>
    <li>Clicar em "Agenda"</li>
    <li>Verificar o se está interativa</li>
   </ol>
   </td>
  <td>Todos os funcionamentos da pagina de agenda devem estar interativos.</td>
  <td>Gustavo</td>
 </tr>
</table>


<table>
 <tr>
  <th>Caso de teste</th>
  <th>Requisitos associados</th>
  <th>Objetivo do teste</th>
  <th>Passos</th>
  <th>Critérios de êxito</th>
  <th>Responsável</th>
 </tr>
 <tr>
  <td>CT-10: Verificar o funcionamento do menu de busca </td>
  <td>
   <ul>
   <li>RF-04	A aplicação deve permitir a funcionalidade de busca e filtro de pesquisa.</li>
   </ul>
  </td>
  <td>verificar se a tela de menu de busca esta funcional </td>
  <td>
   <ol>
    <li>Acessar o navegador.</li>
    <li>Informar o endereço do site.</li>
    <li>Vizualizar a página Login.</li>
    <li>Informar seu EMAIL e SENHA</li>
    <li>Clicar em LOGIN</li>
    <li>Entrar na tela de Menu Profissional ou de Paciente</li>
    <li>Clicar em "Busca"</li>
    <li>Verificar o filtro de pesquisa</li>
    <li>Verificar se está interativo</li>
   </ol>
   </td>
  <td>Todos os funcionamentos da pagina de menu de busca devem estar interativos</td>
  <td>Gustavo</td>
 </tr>
</table>
 
> **Links Úteis**:
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> -  [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e Geração de Planos de Teste de Software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)
