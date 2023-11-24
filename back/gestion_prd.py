import mysql.connector

class GestionProductos:
    productos = []


    def __init__(self, host, user, password, db):
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=db
        )

    def agregar_producto(self, codigo, nombre, descripcion, precio, imagen):
        if self.consultar_producto(codigo):
            return False

        nuevo_producto = {
            'nombre': nombre,
            'codigo': codigo,
            'descripcion': descripcion,
            'precio': precio,
            'imagen': imagen,
        }
        self.productos.append(nuevo_producto)
        return True

    def consultar_producto(self, codigo):
        for producto in self.productos:
            if producto['codigo'] == codigo:
                return producto
        return False

    def listar_productos(self):
        print()
        print("-" * 80)
        for producto in self.productos:
            print(f'Codigo...: {producto["codigo"]}')
            print(f'Nombre...: {producto["nombre"]}')
            print(f'Descripcion...: {producto["descripcion"]}')
            print(f'Precio...: {producto["precio"]}')
            print(f'Imagen...: {producto["imagen"]}')
            print("-" * 80)

    def modificar_producto(self, codigo, nuevo_nombre, nueva_descripcion, nuevo_precio, nueva_imagen):
        for producto in self.productos:
            if producto['codigo'] == codigo:
                producto['nombre'] = nuevo_nombre
                producto['descripcion'] = nueva_descripcion
                producto['precio'] = nuevo_precio
                producto['imagen'] = nueva_imagen
                return True
        return False

    def eliminar_producto(self, codigo):
        for producto in self.productos:
            if producto['codigo'] == codigo:
                self.productos.remove(producto)
                return True
        return False


# Programa principal
gestion = GestionProductos()

gestion.agregar_producto(1,'MacBook Pro 13"', 'M2 256 GB - Gris Espacial (2020). Vendo por mudanza.', '2.300.000', 'imagen.jpg')
gestion.agregar_producto(2,'Consola de sonido', 'Onax Pro Mix8 Consola Mixer Audio Interface +48 Fx Bt Usb Eq', '150.000', 'imagen.jpg')
gestion.agregar_producto(3,'Lámpara de pie', 'Lámpara De Pie Arco Gigante para living o escritorio', '110.000', 'imagen.jpg')
gestion.agregar_producto(4,'Tabla Snowboard', 'No incluye fijaciones. En la parte posterior tiene algunas rayas y desgastes', '113.000', 'imagen.jpg')

print(gestion.productos)

codigo_prod = int(input("Ingrese el código del producto: "))
producto = gestion.consultar_producto(codigo_prod)
print(f'Resultado: {producto}')
if producto:
    print(f'Producto encontrado: {producto["codigo"]} - {producto["descripcion"]}')
else:
    print(f'Producto {codigo_prod} no encontrado')

gestion.listar_productos()

gestion.modificar_producto(4, 'Scooter Eléctrico', 'Uber Scoot, se entrega en su caja original', '200000', 'nueva_imagen.jpg')
gestion.agregar_producto(5, 'Set de ski', 'Botas, bastones, esquíes. Desgaste normal', '100000', 'imagen.jpg')
gestion.listar_productos()

gestion.eliminar_producto(5)
gestion.listar_productos()
