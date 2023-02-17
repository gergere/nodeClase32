import { Router } from 'express'
import { webAuth } from '../../auth/index.js'

import path from 'path'
import { fileURLToPath } from 'url';
import { pathLog } from '../../logger/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productosWebRouter = new Router()

productosWebRouter.get('/home', webAuth, pathLog, (req, res) => {
  res.render(('./pages/home'), { nombre: req.session.nombre })
})

productosWebRouter.get('/productos-vista-test', pathLog, (req, res) => {
  res.sendFile(path.join(__dirname, '../../', '../views/productos-vista-test.html'))
})

export default productosWebRouter