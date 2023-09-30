document.addEventListener("DOMContentLoaded", function () {
    // Recorre todos los productos
    for (let i = 1; i <= 9; i++) { // Cambia el número a la cantidad de productos en la página
        const imagenesPrincipales = document.querySelectorAll('.imagen-principal.producto-' + i);
        const imagenesPequenas = document.querySelectorAll('.imagen-pequena.producto-' + i);

        // Agrega un evento de clic a cada miniatura dentro del producto
        for (let j = 0; j < imagenesPequenas.length; j++) {
            imagenesPequenas[j].addEventListener('click', function () {
                // Cambia la fuente de la imagen principal del producto actual
                imagenesPrincipales[0].src = imagenesPequenas[j].src;
            });
        }
    }
});

