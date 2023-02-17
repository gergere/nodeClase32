import { Router } from "express";
import os from 'os';
import { pathLog } from "../../logger/index.js";

const info = new Router();


const processData = {
  argumentos: process.argv.slice(2),
  plataforma: process.platform,
  nodeVersion: process.version,
  rss: process.memoryUsage().rss,
  path: process.execPath,
  IDProcess: process.pid,
  folder: process.cwd(),
  cpuCores: os.cpus().length
}

info.get('/info', pathLog, (req, res) => {
  res.json(processData)
})

export default info;