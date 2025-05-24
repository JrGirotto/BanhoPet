import IMask from 'imask';

document.addEventListener('DOMContentLoaded', () => {
  const cnpjInput = document.getElementById('cnpj');
  const telefoneInput = document.getElementById('telefone');
  const cepInput = document.getElementById('cep');

  if (cnpjInput) new IMask(cnpjInput, { mask: '00.000.000/0000-00' });
  if (telefoneInput) new IMask(telefoneInput, { mask: '(00) 00000-0000' });
  if (cepInput) new IMask(cepInput, { mask: '00000-000' });

  const form = document.getElementById('signupForm');
  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(form);

      try {
        console.log('Enviando requisição para o backend...');
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
        });

        console.log('Resposta recebida:', response);
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Erro na resposta do backend:', errorData);
          throw new Error(errorData.message || 'Erro ao cadastrar');
        }

        const data = await response.json();
        console.log('Dados recebidos:', data);

        if (data.access_token) {
          console.log('Redirecionando para o dashboard com token:', data.access_token);
          window.location.href = `http://dashboard.banhopet.com.br/#/cadastro?token=${encodeURIComponent(data.access_token)}`;
        } else {
          console.error('Token não encontrado na resposta:', data);
          alert(data.message || 'Erro ao cadastrar. Tente novamente.');
        }
      } catch (error) {
        console.error('Erro na requisição:', error.message);
        alert('Erro na requisição: ' + error.message);
      }
    });
  }
});