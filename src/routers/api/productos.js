import { Router } from 'express'
import { pathLog } from '../../logger/index.js'
import { createNFakeProducts } from '../../mocks/productos.js'

const productosApiRouter = new Router()

productosApiRouter.get('/api/productos-test', pathLog, (req, res) => { res.json(createNFakeProducts(5)) })

export default productosApiRouter