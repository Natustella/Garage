let header = `
<div class="top-bar"> Con tu primera compra un 10% de descuento</div>
    <nav class="navbar">
        <img src="images/logo.svg" alt="Garage Sale" title="Garage Sale" class="logo">
        <ul class="menu">
            <li><a href="index.html">Inicio</a></li>&nbsp &nbsp
            <li><a href="quienes_somos.html">Quienes Somos</a></li>&nbsp &nbsp
            <li><a href="como_vender.html">Cómo Vender</a></li>&nbsp &nbsp
            <li><a href="productos.html">Productos</a></li>&nbsp &nbsp
            <li><a href="contacto.html">Contacto</a></li>&nbsp &nbsp
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
            <a href="#">Muebles</a>
            <a href="#">Electrodomésticos</a>
            <a href="#">Jardín</a>
            <a href="#">Antigüedades</a>
        </div>

        <div class="box__footer">
            <h2>Secciones</h2>
            <a href="quienes_somos.html">Quienes Somos</a>
            <a href="como_vender.html">Como Vender</a>
            <a href="productos.html">Productos</a>
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
