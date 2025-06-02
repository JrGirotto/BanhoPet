import "./form.js"; // Importa o form.js para incluir no bundle

document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.value.trim() !== "") {
        input.classList.add("notEmpty");
      } else {
        input.classList.remove("notEmpty");
      }
    });
  });
});
