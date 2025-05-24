// js/form.js
import IMask from 'imask';

$(document).ready(function() {
    // Máscaras
    const cnpjMask = IMask(document.getElementById('cnpj'), { mask: '00.000.000/0000-00' });
    const telefoneMask = IMask(document.getElementById('telefone'), { mask: '(00) 00000-0000' });
    const cepMask = IMask(document.getElementById('cep'), { mask: '00000-000' });

    // Submissão do formulário
    $('#signupForm').on('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        $.ajax({
            url: $(this).attr('action'),
            method: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                if (data.message === 'Pet shop adicionado à lista de espera' || data.id) {
                    window.location.href = 'http://localhost:8080/#/cadastro';
                } else {
                    alert(data.message || 'Erro ao cadastrar. Tente novamente.');
                }
            },
            error: function(error) {
                alert('Erro na requisição: ' + error.statusText);
            }
        });
    });
});