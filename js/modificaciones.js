const URL = "http://127.0.0.1:5000/"

const app = Vue.createApp({
    data() {
        return {
            codigo: '',
            nombre: '',
            descripcion: '',
            precio: '',
            imagen: '',
            imagenUrlTemp: null,
            mostrarDatosProducto: false,
        };
    }, methods: {
        obtenerProducto() {
            fetch(URL + 'productos/' + this.codigo)
                .then(response => response.json())
                .then(data => {
                    this.nombre = data.nombre;
                    this.descripcion = data.descripcion;
                    this.precio = data.precio;
                    this.imagen = data.imagen;
                    this.mostrarDatosProducto = true;
                }).catch(error => console.error('Error:', error));
        },
        seleccionarImagen(event) {
            const file = event.target.files[0];
            this.imagenSeleccionada = file;
            this.imagenUrlTemp = URL.createObjectURL(file); // Crea una URL temporal para la vista previa 
        }, 
        guardarCambios() {
            const formData = new FormData();
            formData.append('codigo', this.codigo);
            formData.append('nombre', this.nombre);
            formData.append('descripcion', this.descripcion);
            formData.append('precio', this.precio);
            if (this.imagenSeleccionada) {
                formData.append('imagen', this.imagenSeleccionada, this.imagenSeleccionada.name);
            }

            fetch(URL + 'productos/' + this.codigo, {
                method: 'PUT',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    alert('Producto actualizado correctamente');
                    this.limpiarFormulario();
                }).catch(error => {
                    console.error('Error:', error);
                    alert('Error al actualizar el producto');
                });
        },
        limpiarFormulario() {
            this.codigo = '';
            this.nombre = '';
            this.descripcion = '';
            this.precio = '';
            this.imagen = '';
            this.imagenSeleccionada = null;
            this.imagenTemp = null;
            this.mostrarDatosProducto = false;
        }
    }
});

app.mount('#app');