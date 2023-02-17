import { Router } from 'express'

import path from 'path'
import { fileURLToPath } from 'url';
import { pathLog } from '../../logger/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authWebRouter = new Router()

authWebRouter.get('/', pathLog, (req, res) => {
    res.redirect('/home');
})

authWebRouter.get('/login', pathLog, (req, res) => {
    if (req.session?.nombre) {
        res.redirect('/home');
    } else {
        res.sendFile(path.join(__dirname, '../../', '../views/login.html'));
    }
})

authWebRouter.get('/logout', pathLog, (req, res) => {
    res.render('./pages/logout', { nombre: req.session.nombre });
    req.session.destroy();
})


authWebRouter.post('/login', pathLog, (req, res) => {
    req.session.nombre = req.body.nombre;
    res.redirect('/home');
})



export default authWebRouter