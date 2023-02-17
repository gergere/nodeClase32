process.on('message', cant => {
  const obj = {};
  for (let i = 0; i < cant; i++) {
    const rdm = Math.round(Math.random() * 1000);
    if (!obj[rdm]) {
      obj[rdm] = 1;
    } else {
      obj[rdm]++;
    }
  }
  process.send(obj);
  process.exit();
})

process.send('done!');