import mensajesApi from '../../api/mensajes.js';
import { normalizarMensajes } from '../../normalizacion/index.js';
import { errorLog } from '../../logger/index.js';

const traerMensajes = async () => {
  try {
    return normalizarMensajes(await mensajesApi.listarAll());
  } catch (error) {
    errorLog(`Error al cargar mensajes: ${error.message}`);
    return [];
  }
}

const guardarMensaje = async (mensaje) => {
  try {
    return await mensajesApi.guardar(mensaje);
  } catch (error) {
    errorLog(`Error al guardar el mensaje: ${error.message}`);
  }
}


export default async function configurarSocket(socket, sockets) {
  socket.emit('mensajes', await traerMensajes());

  socket.on('nuevoMensaje', async mensaje => {
    await guardarMensaje(mensaje);
    sockets.emit('mensajes', await traerMensajes());
  })
}