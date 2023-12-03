//const URL = "http://127.0.0.1:5000/" 
const URL = "https://natustella.pythonanywhere.com/"
// Capturamos el evento de envío del formulario 
document.getElementById('formulario').addEventListener('submit', function (event) {
	event.preventDefault(); // Evitamos que se envie el form 

	// Validamos que el campo "Código" solo contenga números
	var codigoInput = document.getElementById('codigo');
	var codigoValue = codigoInput.value;
	
	if (!/^\d+$/.test(codigoValue)) {
		alert('Por favor, ingrese solo números en el campo "Código".');
		return;
	}

	var formData = new FormData();
	formData.append('codigo', codigoValue);
	formData.append('nombre', document.getElementById('nombre').value);
	formData.append('descripcion', document.getElementById('descripcion').value);
	formData.append('precio', document.getElementById('precio').value);;
	formData.append('imagen', document.getElementById('imagenProducto').files[0]);

	fetch(URL + 'productos', {
		method: 'POST',
		body: formData // Aquí enviamos formData en lugar de JSON 
	})
		.then(function (response) {
			if (response.ok) {
				return response.json();
			}
			else {
				throw new Error('Error al agregar el producto');
			}
		})
		.then(function () { 
			// En caso de éxito 
			alert('Producto agregado correctamente.'); 
		}) 
		.catch(function (error) { 
			// En caso de error 
			alert('Error al agregar el producto.'); 
			console.error('Error:', error); 
		})
		.finally(function () {
			// Limpiar el formulario para el proximo producto 
			document.getElementById('codigo').value = "";
			document.getElementById('nombre').value = "";
			document.getElementById('descripcion').value = "";
			document.getElementById('precio').value = "";
			document.getElementById('imagen').value = "";
		})
})