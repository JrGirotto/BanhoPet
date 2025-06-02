import IMask from 'imask';

document.addEventListener('DOMContentLoaded', () => {
  console.log("js/form.js carregado!");

  const cnpjInput = document.getElementById("cnpj");
  const telefoneInput = document.getElementById("telefone");
  const cepInput = document.getElementById("cep");

  // Aplicar máscaras visuais
  const cnpjMask = cnpjInput
    ? new IMask(cnpjInput, { mask: "00.000.000/0000-00" })
    : null;
  const telefoneMask = telefoneInput
    ? new IMask(telefoneInput, { mask: "(00) 00000-0000" })
    : null;
  const cepMask = cepInput ? new IMask(cepInput, { mask: "00000-000" }) : null;

  const form = document.getElementById("signupForm");
  const submitButton = form?.querySelector('button[type="submit"]');
  const signupContent = document.getElementById("signup-content");
  const feedbackSection = document.getElementById("feedback-section");
  const feedbackMessage = document.getElementById("feedback-message");
  const redirectButton = document.getElementById("redirect-button");

  if (
    form &&
    submitButton &&
    signupContent &&
    feedbackSection &&
    feedbackMessage &&
    redirectButton
  ) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      // Usar FormData para coletar os dados
      const formData = new FormData(form);

      // Converter FormData para objeto e limpar os valores formatados
      const data = {};
      formData.forEach((value, key) => {
        let cleanedValue = value.toString();
        // Remover formatação de cnpj, telefone e cep
        if (key === "cnpj" || key === "telefone" || key === "cep") {
          cleanedValue = cleanedValue.replace(/[^0-9]/g, ""); // Remove tudo que não for número
        }
        data[key] = cleanedValue;
      });

      // Log detalhado para depuração
      console.log(
        "Dados a serem enviados (após limpeza):",
        JSON.stringify(data, null, 2)
      );

      // Validação no frontend
      const errors = [];
      if (!data.nome || data.nome.trim() === "")
        errors.push("Nome do Petshop é obrigatório.");
      if (!data.cnpj || data.cnpj.trim() === "" || !/^\d{14}$/.test(data.cnpj))
        errors.push("CNPJ inválido (deve conter 14 dígitos numéricos).");
      if (
        !data.email ||
        data.email.trim() === "" ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
      )
        errors.push("E-mail inválido.");
      if (
        !data.telefone ||
        data.telefone.trim() === "" ||
        !/^\d{10,11}$/.test(data.telefone)
      )
        errors.push(
          "Telefone inválido (deve conter 10 ou 11 dígitos numéricos)."
        );
      if (!data.senha || data.senha.length < 8)
        errors.push("A senha deve ter pelo menos 8 caracteres.");
      if (!data.cep || data.cep.trim() === "" || !/^\d{8}$/.test(data.cep))
        errors.push("CEP inválido (deve conter 8 dígitos numéricos).");
      if (!data.numero || data.numero.trim() === "")
        errors.push("Número é obrigatório.");

      if (errors.length > 0) {
        console.warn("Erros de validação no frontend:", errors);
        feedbackMessage.textContent =
          "Por favor, corrija os seguintes erros:\n- " + errors.join("\n- ");
        feedbackMessage.className =
          "mb-4 p-4 rounded-lg text-center font-medium bg-red-100 text-red-800";
        signupContent.classList.add("hidden");
        feedbackSection.classList.remove("hidden");
        redirectButton.classList.add("hidden");
        return;
      }

      try {
        console.log("Enviando requisição para o backend...");
        const response = await fetch(form.action, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        console.log("Resposta recebida:", response);
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Erro na resposta do backend:", errorData);
          let errorMessage =
            errorData.message ||
            "Erro ao realizar o cadastro. Tente novamente.";
          // Mensagens amigáveis para erros específicos
          if (errorMessage.includes("Email ou CNPJ já cadastrados")) {
            errorMessage =
              "O e-mail ou CNPJ informado já está cadastrado. Por favor, use outro.";
          } else if (
            errorMessage.includes(
              "Este endereço já está associado a outro petshop"
            )
          ) {
            errorMessage =
              "Este endereço (CEP e número) já está associado a outro petshop. Por favor, informe outro endereço.";
          }
          throw new Error(errorMessage);
        }

        const dataResponse = await response.json();
        console.log("Dados recebidos:", dataResponse);

        // Limpar os dados do formulário e ocultá-lo
        form.reset();
        signupContent.classList.add("hidden");

        // Exibir mensagem de sucesso e botão de redirecionamento
        feedbackMessage.textContent =
          "Cadastro inicial realizado com sucesso! Faça login na dashboard para completar o cadastro.";
        feedbackMessage.className =
          "mb-4 p-4 rounded-lg text-center font-medium bg-green-100 text-green-800";
        feedbackSection.classList.remove("hidden");
        redirectButton.classList.remove("hidden");

        // Alterar o tipo do botão para evitar comportamento de submit
        redirectButton.type = "button";
        redirectButton.addEventListener("click", () => {
          window.location.href = "http://localhost:5000/login?from=signup";
        });
      } catch (error) {
        console.error("Erro na requisição:", error.message);
        feedbackMessage.textContent = error.message;
        feedbackMessage.className =
          "mb-4 p-4 rounded-lg text-center font-medium bg-red-100 text-red-800";
        signupContent.classList.add("hidden");
        feedbackSection.classList.remove("hidden");
        redirectButton.classList.add("hidden");
      }
    });

    // Armazenar o manipulador de submit para remoção posterior
    form.submitHandler = form.querySelector('button[type="submit"]').onclick;
  } else {
    console.error(
      "Formulário signupForm ou elementos relacionados não encontrados!"
    );
  }
});