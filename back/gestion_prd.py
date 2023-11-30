from flask import Flask, request, jsonify, render_template
from flask import request
from flask_cors import CORS
import mysql.connector
from werkzeug.utils import secure_filename
import os
import time

app = Flask(__name__)
CORS(app)  # esto habilita el CORS para todas las rutas

class GestionProductos:

    #Constructor de la clase
    def __init__(self, host, user, password, database):
        #se establece conexión sin especificar la base de datos
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
        )
        self.cursor = self.conn.cursor()
        
        # Intentamos seleccionar la base de datos 
        try: 
            self.cursor.execute(f"USE {database}") 
        except mysql.connector.Error as err: 
        # Si la base de datos no existe, la creamos 
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR: 
                self.cursor.execute(f"CREATE DATABASE {database}") 
                self.conn.database = database 
            else: 
                raise err
            
        # Una vez que la base de datos está establecida, creamos la tabla si no existe
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS productos (
                codigo INT,
                nombre VARCHAR(255) NOT NULL,
                descripcion VARCHAR(500) NOT NULL,
                precio DECIMAL(10,2) NOT NULL,
                imagen VARCHAR(300) NOT NULL
                );'''
            )
        self.conn.commit()
        self.cursor.close() 
        self.cursor = self.conn.cursor(dictionary=True)

    #Listar Productos
    def listar_productos(self):
        self.cursor.execute("SELECT * FROM productos")
        productos = self.cursor.fetchall()
        return productos
    
    #Consultar Producto
    def consultar_producto(self, codigo):
        self.cursor.execute(f"SELECT * FROM productos WHERE codigo = {codigo}")
        return self.cursor.fetchone()
    
    #Mostrar Producto
    def mostrar_producto(self, codigo): 
        # Mostramos los datos de un producto a partir de su código 
        producto = self.consultar_producto(codigo) 
        if producto: 
            print("-" * 80) 
            print(f'Codigo........: {producto["codigo"]}')
            print(f'Nombre........: {producto["nombre"]}')
            print(f'Descripcion...: {producto["descripcion"]}')
            print(f'Precio........: {producto["precio"]}')
            print(f'Imagen........: {producto["imagen"]}')
            print("-" * 80)
        else: 
            print("Producto no encontrado.")

    # Agregar Producto
    def agregar_producto(self, codigo, nombre, descripcion, precio, imagen):
        #Verificamos si ese producto ya existe (por su codigo)
        self.cursor.execute(f"SELECT * FROM productos WHERE codigo = {codigo}")
        producto_existe = self.cursor.fetchone()
        if producto_existe:
            return False
        #Si no existe, lo agregamos
        sql = "INSERT INTO productos (codigo, nombre, descripcion, precio, imagen) VALUES (%s, %s, %s, %s, %s)"
        valores = (codigo, nombre, descripcion, precio, imagen)

        self.cursor.execute(sql, valores)
        self.conn.commit()
        return True

    
    #Modificar Producto
    def modificar_producto(self, codigo, nuevo_nombre, nueva_descripcion, nuevo_precio, nueva_imagen):
        sql = "UPDATE productos SET nombre = %s, descripcion = %s, precio = %s, imagen = %s WHERE codigo = %s"
        valores = (nuevo_nombre, nueva_descripcion, nuevo_precio, nueva_imagen, codigo)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.rowcount > 0
    
    #Eliminar Producto
    def eliminar_producto(self, codigo):
        self.cursor.execute(f"DELETE FROM productos WHERE codigo = {codigo}")
        self.conn.commit()
        return self.cursor.rowcount > 0

#Cuerpo del Programa  
#Crear una instancia de la clase GestionProductos
#gestion = GestionProductos(host='localhost', user='root', password='Bemitos2102!', database='miapp')
gestion = GestionProductos(host='Natustella.mysql.pythonanywhere-services.com', user='Natustella', password='8enjamiN*', database='Natustella$miapp')
#Carpeta para guardar las imagenes, la ruta donde colocarás las imágenes puede se modificada de acuerdo a tu preferencia.
#ruta_destino = './static/imag/'
ruta_destino = '/home/Natustella/mysite/statis/imag/'

if not os.path.exists(ruta_destino):
    os.makedirs(ruta_destino)

#RUTAS
#Ruta para listar productos
@app.route("/productos", methods=["GET"])
def listar_productos():
    productos = gestion.listar_productos()
    return jsonify(productos)

#Ruta para consultar productos
@app.route("/productos/<int:codigo>", methods=["GET"])
def mostrar_producto(codigo):
    producto = gestion.consultar_producto(codigo)
    if producto:
        return jsonify(producto)
    else:
        return "Producto no encontrado", 404

#Ruta para agregar productos
@app.route("/productos", methods=["POST"])
def agregar_producto():
    # Recojo los datos del form
    codigo = request.form['codigo']
    nombre = request.form['nombre']
    descripcion = request.form['descripcion']
    precio = request.form['precio']
    imagen = request.files['imagen']
    
    nombre_imagen = None  # Definir una variable nombre_imagen con un valor predeterminado
    
    # Verifica si la imagen se ha seleccionado en el formulario
    if imagen and imagen.filename:
        nombre_imagen = secure_filename(imagen.filename)
        nombre_base, extension = os.path.splitext(nombre_imagen)
        nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
        imagen.save(os.path.join(ruta_destino, nombre_imagen))
    else:
        return jsonify({"mensaje": "No se ha proporcionado una imagen"}), 400

    if gestion.agregar_producto(codigo, nombre, descripcion, precio, nombre_imagen):
        return jsonify({"mensaje": "Producto agregado"}), 201
    else:
        return jsonify({"mensaje": "Producto ya existe"}), 400


#Ruta para modificar productos   
@app.route("/productos/<int:codigo>", methods=["PUT"]) 
def modificar_producto(codigo):
    # Recojo los datos del form 
    nuevo_nombre = request.form.get("nombre")
    nueva_descripcion = request.form.get("descripcion") 
    nuevo_precio = request.form.get("precio") 
    
    # Procesamiento de la imagen 
    imagen = request.files['imagen'] 
    nombre_imagen = secure_filename(imagen.filename) 
    nombre_base, extension = os.path.splitext(nombre_imagen) 
    nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}" 
    imagen.save(os.path.join(ruta_destino, nombre_imagen))
    
    # Actualización del producto 
    if gestion.modificar_producto(codigo, nuevo_nombre, nueva_descripcion, nuevo_precio, nombre_imagen): 
        return jsonify({"mensaje": "Producto modificado"}), 200 
    else: 
        return jsonify({"mensaje": "Producto no encontrado"}), 404

#Ruta para Eliminar productos
@app.route("/productos/<int:codigo>", methods=["DELETE"]) 
def eliminar_producto(codigo): 
    # Primero obtengo la información del producto para encontrar la imagen 
    producto = gestion.consultar_producto(codigo) 
    if producto: 
        # Eliminar la imagen asociada si existe 
        ruta_imagen = os.path.join(ruta_destino, producto['imagen']) 
        if os.path.exists(ruta_imagen): 
            os.remove(ruta_imagen) 
            
        # Luego, elimina el producto del catálogo 
        if gestion.eliminar_producto(codigo): 
            return jsonify({"mensaje": "Producto eliminado"}), 200 
        else: 
            return jsonify({"mensaje": "Error al eliminar el producto"}), 500 
    else: 
        return jsonify({"mensaje": "Producto no encontrado"}), 404
    
# Bloque para ejecutar la aplicación
if __name__ == "__main__":
    app.run(debug=True)


# Programa principal
#gestion = GestionProductos('localhost', 'root', 'Bemitos2102!', 'prd1')

#gestion.agregar_producto(1,'MacBook Pro 13"', 'M2 256 GB - Gris Espacial (2020). Vendo por mudanza.', 2300000 , 'imagen.jpg')
#gestion.agregar_producto(2,'Consola de sonido', 'Onax Pro Mix8 Consola Mixer Audio Interface +48 Fx Bt Usb Eq', '150.000', 'imagen.jpg')
#gestion.agregar_producto(3,'Lámpara de pie', 'Lámpara De Pie Arco Gigante para living o escritorio', '110.000', 'imagen.jpg')
#gestion.agregar_producto(4,'Tabla Snowboard', 'No incluye fijaciones. En la parte posterior tiene algunas rayas y desgastes', '113.000', 'imagen.jpg')
#gestion.eliminar_producto(4)
#print(gestion.consultar_producto(3))
#print(gestion.modificar_producto(4, 'Scooter Eléctrico', 'Uber Scoot, se entrega en su caja original', '200000', 'nueva_imagen.jpg'))
#print(gestion.listar_productos())
