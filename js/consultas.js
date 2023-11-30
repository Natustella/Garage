//const URL = "http://127.0.0.1:5000/" 
const URL = "https://natustella.pythonanywhere.com/" 

const app = Vue.createApp({
    data() {
        return {
            codigo: '',
            nombre: '',
            descripcion: '',
            precio: '',
            imagen: '',
            mostrarDatosProducto: false,
        };
    }, methods: {
        consultarProducto() {
            fetch(URL + 'productos/' + this.codigo)
                .then(response => response.json())
                .then(data => {
                    this.nombre = data.nombre;
                    this.descripcion = data.descripcion;
                    this.precio = data.precio;
                    this.imagen = data.imagen;
                    this.mostrarDatosProducto = true;
                }).catch(error => {
                    console.error('Error:', error);
                    alert('Error al consultar el producto');
                });
        }
    }
});

app.mount('#app');
