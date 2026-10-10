document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    // Seletores dos inputs
    const nomeInput = document.getElementById('nome-medico'); // Necessário para o cadastro
    const emailInput = document.getElementById('email');      // Necessário para o cadastro
    const senhaInput = document.getElementById('senha');      // Necessário para o cadastro
    
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const cepInput = document.getElementById('cep');
    const logradouroInput = document.getElementById('logradouro');
    const bairroInput = document.getElementById('bairro');
    const cidadeInput = document.getElementById('cidade');
    const ufSelect = document.getElementById('uf');

    // --- Máscara CPF ---
    if(cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value.slice(0, 14); 
        });
    }

    // --- Máscara Telefone ---
    if(telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            e.target.value = value.slice(0, 10);
        });
    }

    // --- Máscara CEP ---
    if(cepInput) {
        cepInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            e.target.value = value.slice(0, 9);
        });

        cepInput.addEventListener('blur', function() {
            const cep = cepInput.value.replace(/\D/g, '');
            if (cep.length === 8) {
                fetchAddress(cep);
            }
        });
    }

    // --- Busca de Endereço (ViaCEP) ---
    async function fetchAddress(cep) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (data.erro) {
                alert('CEP não encontrado.');
                clearAddressFields();
            } else {
                fillAddressFields(data);
            }
        } catch (error) {
            alert('Ocorreu um erro ao buscar o CEP. Tente novamente.');
            console.error(error);
        }
    }

    function fillAddressFields(data) {
        logradouroInput.value = data.logradouro;
        bairroInput.value = data.bairro;
        cidadeInput.value = data.localidade;
        ufSelect.value = data.uf;
    }
    
    function clearAddressFields() {
        logradouroInput.value = '';
        bairroInput.value = '';
        cidadeInput.value = '';
    }

    // --- Submissão do Formulário e Gravação no LocalStorage ---
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let formValido = true;
            const camposObrigatorios = form.querySelectorAll('[required]');

            // Validação visual dos campos
            camposObrigatorios.forEach(campo => {
                if (!campo.value) {
                    formValido = false;
                    campo.style.borderColor = 'red';
                } else {
                    campo.style.borderColor = '';
                }
            });

            if (formValido) {
                // 1. Criar o objeto do novo usuário
                const novoUsuario = {
                    nome: nomeInput.value.trim(),
                    email: emailInput.value.trim(),
                    senha: senhaInput.value.trim(),
                    role: 'profissional' // Define fixo como profissional
                };

                // 2. Recuperar usuários existentes (ou criar array vazio se não existir)
                let usuariosCadastrados = JSON.parse(localStorage.getItem('medzoUsers') || '[]');

                // (Opcional) Verificar se o email já existe para evitar duplicidade
                const emailExiste = usuariosCadastrados.some(user => user.email === novoUsuario.email);
                
                if (emailExiste) {
                    alert('Este e-mail já está cadastrado!');
                    return; // Para a execução aqui
                }

                // 3. Adicionar o novo usuário ao array
                usuariosCadastrados.push(novoUsuario);

                // 4. Salvar de volta no LocalStorage
                localStorage.setItem('medzoUsers', JSON.stringify(usuariosCadastrados));

                alert('Cadastro realizado com sucesso! Redirecionando para o login...');
                
                // Redireciona para a tela de login
                window.location.href = 'TelaLogin.html';

            } else {
                alert('Por favor, preencha todos os campos obrigatórios (*).');
            }
        });
    }
});