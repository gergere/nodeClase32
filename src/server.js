import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import compression from 'compression';

import config from './config.js';

import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';

import authWebRouter from './routers/web/auth.js';
import homeWebRouter from './routers/web/home.js';
import productosApiRouter from './routers/api/productos.js';
import info from './routers/api/processInfo.js';
import * as logger from './logger/index.js';

import addProductosHandlers from './routers/ws/productos.js';
import addMensajesHandlers from './routers/ws/mensajes.js';
import random from './routers/api/randoms.js';

//--------------------------------------------
export const server = () => {

    // instancio servidor, socket y api
    const app = express()
    const httpServer = new HttpServer(app)
    const io = new Socket(httpServer)

    //--------------------------------------------
    // configuro el socket

    io.on('connection', async socket => {
        addMensajesHandlers(socket, io.sockets);
        addProductosHandlers(socket, io.sockets);
    });

    //--------------------------------------------
    // configuro el servidor

    app.use(compression())
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static('public'))

    app.set('view engine', 'ejs');

    app.use(session({
        store: MongoStore.create({
            mongoUrl: config.mongoRemote.cnxStr,
            mongoOptions: config.mongoRemote.options
        }),
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 30000
        }
    }))

    //--------------------------------------------
    // rutas del servidor API REST

    app.use(productosApiRouter);
    app.use(info);
    app.use(random);

    //--------------------------------------------
    // rutas del servidor web

    app.use(authWebRouter);
    app.use(homeWebRouter);

    //--------------------------------------------
    // logger

    app.use('*', (req, res, next) => {
        logger.warnLog(`Ruta inexistente solicitada con el método ${req.method} (${req.originalUrl})`);
        next();
    })

    //--------------------------------------------
    // inicio el servidor
    return {

        listen: new Promise((res, rej) => {
            const connectedServer = httpServer.listen(config.PORT, () => {
                res(connectedServer);
            })
            connectedServer.on('error', error => {
                rej(error);
            })
        })
    }
}