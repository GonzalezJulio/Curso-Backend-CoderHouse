// Array de productos en el carrito de compras
let carrito = [
    { id: 1, nombre: 'Camiseta', precio: 20 },
    { id: 2, nombre: 'Pantalón', precio: 30 },
    { id: 3, nombre: 'Zapatos', precio: 50 }
  ];

  // Función para eliminar un producto del carrito de compras
  function eliminarDelCarrito(idProducto) {
    // Encontrar el índice del producto en el carrito
    let indiceProducto = carrito.findIndex(function(producto) {
      return producto.id === idProducto;
    });

    if (indiceProducto !== -1) {
      // Si se encontró el producto, eliminarlo del carrito
      carrito.splice(indiceProducto, 1);
      console.log('El producto se eliminó del carrito.');
    } else {
      console.log('El producto no se encontró en el carrito.');
    }
  }

  // Ejemplo de uso
  eliminarDelCarrito(2); // El producto se eliminó del carrito.
  eliminarDelCarrito(4); // El producto no se encontró en el carrito.

  console.log(carrito);
  // Resultado: [{ id: 1, nombre: 'Camiseta', precio: 20 }, { id: 3, nombre: 'Zapatos', precio: 50 }]