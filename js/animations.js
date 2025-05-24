import AOS from 'aos';
import 'aos/dist/aos.css'; // Importa o CSS do AOS localmente

document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-out', // Suaviza a transição
        offset: 100 // Ajusta o ponto de ativação
    });

    // Corrigir o "pulo" no header ajustando o posicionamento
    const header = document.querySelector('#header');
    if (header) {
        header.style.position = 'relative'; // Garante que o header não pule
        header.style.opacity = '1'; // Previne comportamento inesperado
    }
});