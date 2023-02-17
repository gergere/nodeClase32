import productosApi from '../../api/productos.js'
import { errorLog } from '../../logger/index.js';

const traerProductos = async () => {
  try {
    return await productosApi.listarAll();
  } catch (error) {
    errorLog(`Error al cargar productos ${error.message}`);
    return [];
  }
}

const guardarProducto = async (producto) => {
  try {
    return await productosApi.guardar(producto);
  } catch (error) {
    errorLog(`Error al guardar el producto: ${error.message}`);
  }
}

export default async function configurarSocket(socket, sockets) {
  socket.emit('productos', await traerProductos());

  socket.on('update', async producto => {
    await guardarProducto(producto);
    sockets.emit('productos', await traerProductos());
  })
}