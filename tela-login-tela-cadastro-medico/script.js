document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const cpfInput = document.getElementById('cpf');
    const telefoneInput = document.getElementById('telefone');
    const cepInput = document.getElementById('cep');
    const logradouroInput = document.getElementById('logradouro');
    const bairroInput = document.getElementById('bairro');
    const cidadeInput = document.getElementById('cidade');
    const ufSelect = document.getElementById('uf');

    if(cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value.slice(0, 14);
        });
    }

    if(telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            e.target.value = value.slice(0, 10);
        });
    }

    if(cepInput) {
        cepInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            e.target.value = value.slice(0, 9);
        });
    }

    if(cepInput) {
        cepInput.addEventListener('blur', function() {
            const cep = cepInput.value.replace(/\D/g, '');
            if (cep.length === 8) {
                fetchAddress(cep);
            }
        });
    }

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

    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let formValido = true;
            const camposObrigatorios = form.querySelectorAll('[required]');

            camposObrigatorios.forEach(campo => {
                if (!campo.value) {
                    formValido = false;
                    campo.style.borderColor = 'red';
                } else {
                    campo.style.borderColor = '';
                }
            });

            if (formValido) {
                alert('Cadastro de médico realizado com sucesso! Redirecionando para o login...');
                
                // Lembre-se de ter o arquivo 'login.html' nesta mesma pasta
                window.location.href = 'login.html';

            } else {
                alert('Por favor, preencha todos os campos obrigatórios (*).');
            }
        });
    }
});