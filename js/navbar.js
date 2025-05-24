document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('navbar-toggle');
    const menu = document.getElementById('navbar-menu');

    if (toggleButton && menu) {
        toggleButton.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }
});