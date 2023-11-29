const URL = "http://127.0.0.1:5000/" 
// Realizamos la solicitud GET al servidor para obtener todos los productos 
fetch(URL + 'productos') 
    .then(function (response) { 
	    if (response.ok) { 
		    return response.json();
		}
		else { // Si hubo un error, lanzar explícitamente una excepción 
			   // para ser "catcheada" más adelante 
			   throw new Error('Error al obtener los productos.'); 
			}
	})
	.then(function (data) { 
	    let tablaProductos = document.getElementById('tablaProductos'); 
		// Iteramos sobre los productos y agregamos filas a la tabla 
		for (let producto of data) { 
		    let fila = document.createElement('tr'); 
			fila.innerHTML = '<td>' + producto.codigo + '</td>' + 
                '<td>' + producto.nombre + '</td>' + 
			    '<td>' + producto.descripcion + '</td>' + 
				'<td align="right">' + producto.precio + '</td>' + 
				// Mostrar miniatura de la imagen 
				'<td><img src=../static/imag/' + producto.imagen + ' alt="Imagen del producto" style="width: 100px;"></td>' 
				 + '</td>'; 
			tablaProductos.appendChild(fila); 
		} 
	})
	.catch(function (error) { 
	// Código para manejar errores 
	alert('Error al obtener los productos.'); 
	console.error('Error:', error);
	});