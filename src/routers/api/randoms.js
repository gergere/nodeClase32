import { Router } from 'express';
import { fork } from 'child_process';
import { pathLog } from '../../logger/index.js';

const random = new Router();

// const forked = fork(process.cwd() + '/src/api/randomCalc.js')

// const execChild = (cant) => {
//   return new Promise((res, rej) => {
//     forked.on('message', msg => {
//       if (msg === 'done!') {
//         forked.send(cant)
//       } else {
//         res(msg);
//       }
//     })
//   })
// }
const calcrdm = (cant) => {
  const obj = {};
  for (let i = 0; i < cant; i++) {
    const rdm = Math.round(Math.random() * 1000);
    if (!obj[rdm]) {
      obj[rdm] = 1;
    } else {
      obj[rdm]++;
    }
  }
  return obj;
}


random.get('/api/randoms', pathLog, async (req, res) => {
  // const result = await execChild(req.query.cant || 100000);
  const result = calcrdm(req.query.cant || 100000);
  res.json(result);
})

export default random;