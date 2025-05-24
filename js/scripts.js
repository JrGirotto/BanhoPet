// js/scripts.js
import './navbar.js';
import './form.js';
import './animations.js';

$(document).ready(function() {
    // Move Form Fields Label
    $('input, textarea').on('keyup', function() {
        if ($(this).val() !== '') {
            $(this).addClass('notEmpty');
        } else {
            $(this).removeClass('notEmpty');
        }
    });
});