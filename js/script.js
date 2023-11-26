let header = `
<div class="top-bar"> Con tu primera compra un 10% de descuento</div>
    <nav class="navbar">
        <img src="images/logo.svg" alt="Garage Sale" title="Garage Sale" class="logo">
        
        <input type="checkbox" id="menu-toggle" class="menu-toggle">
        <label for="menu-toggle" class="menu-icon">&#9776;</label>
        
        <ul class="menu">
            <li><a href="index.html">Inicio</a></li>&nbsp &nbsp
            <li><a href="productos.html">Productos</a></li>&nbsp &nbsp
            <li><a href="quienes_somos.html">Quienes Somos</a></li>&nbsp &nbsp
            <li><a href="como_vender.html">Cómo Vender</a></li>&nbsp &nbsp
            <li><a href="contacto.html">Contacto</a></li>&nbsp &nbsp
            <li><a href="template/gestion_prd.html">Gestión de Productos</a></li>&nbsp &nbsp
        </ul>


        <div class="nav-icons">
            <button class="search-button"><i class="fa-solid fa-magnifying-glass"></i></button>
            <button class="login-button">
                <a href="login.html">
                    <i class="fa-solid fa-user fa-xl" type="button"></i>
                </a>
            </button>
            <div class="cart">
                <span class="cart-icon"><i class="fa-solid fa-cart-shopping"></i></span>
                <span class="cart-count">0</span>
            </div>
        </div>
    </nav>
`
document.getElementById("idheader").innerHTML = header

let footer = `
<div class="container__footer">
        <div class="box__footer">
            <div class="logo">
                <img src="images/logo.svg" alt="">
            </div>
            <div class="terms">
                <p>Tienda de venta de artículos usados creada por cuatro amigos que comparten una misma visión: darle una segunda oportunidad a lo que otros descartan.</p>
            </div>
        </div>
        <div class="box__footer">
            <h2>Categorías</h2>
            <a href="deportes.html">Deportes</a>
            <a href="muebles.html">Muebles</a>
            <a href="electro.html">Electrodomésticos</a>
            <a href="#">Jardín</a>
            <a href="#">Antigüedades</a>
        </div>

        <div class="box__footer">
            <h2>Secciones</h2>
            <a href="productos.html">Productos</a>
            <a href="quienes_somos.html">Quienes Somos</a>
            <a href="como_vender.html">Como Vender</a>
            <a href="contacto.html">Contacto</a>              
        </div>

        <div class="box__footer">
            <h2>Redes Sociales</h2>
            <a href="https://www.facebook.com/" target="_blank"> <i class="fab fa-facebook-square"></i> Facebook</a>
            <a href="https://www.linkedin.com/" target="_blank"><i class="fab fa-linkedin"></i> Linkedin</a>
            <a href="https://www.instagram.com/" target="_blank"><i class="fab fa-instagram-square"></i> Instagram</a>
        </div>

    </div>

    <div class="box__copyright">
        <hr>
        <p>Copyright © 2023 &nbsp;&nbsp;&nbsp; <b>Garage Sale</b> &nbsp;&nbsp;&nbsp;All Rights Reserved.</p>
    </div>
`
document.getElementById("idfooter").innerHTML = footer;

/* Funcion para llamado de Api con Axios para testimonials */

const getComments = async () => {
    try {
        const resPost = await axios(`https://jsonplaceholder.typicode.com/comments?_start=0&_limit=5`)
        console.log(resPost) //traemos el objeto completo
        let resHtml=''
        for (let i = 0; i < resPost.data.length; i++){
            resHtml+=`   
            <div class="item">
                <h2 style="font-family: "Font Awesome 6 Free";><i class="fa-solid fa-quote-right"></i></h2>
                <h3>${resPost.data[i].name}</h3>
                <p>${resPost.data[i].body}</p>
            </div>                  
            `

        }
        carousel.innerHTML = resHtml
        carouselRadios.innerHTML =resRadios
        } catch (error) {
        console.log('Ocurrió un error grave', error)
    }
    
}

getComments() // llamada a la función para api testimonials