const express = require('express');
const cluster = require('cluster');
const os = require('os');

const app = express();

function delay(duration) {
  const startTime = Date.now();
  while(Date.now() - startTime < duration) {
    //event loop is blocked...
  }
}

app.get('/', (req, res) => {
  // JSON.stringify({}) => "{}"
  // JSON.parse("{}") => {}
  // [5,1,2,3,4].sort()
  res.send(`Performance example: ${process.pid}`);
});

app.get('/timer', (req, res) => {
  delay(1000);
  res.send(`Ding ding ding! ${process.pid}`);
  // cluster.worker.kill()
});

console.log('Running server.js...');
// if (cluster.isMaster) {
//   console.log('Master has been started...');
//   const NUM_WORKERS = os.cpus().length;
//   for (let i = 0; i < NUM_WORKERS; i++) {
//     cluster.fork();
//   }
//   cluster.on("exit", (worker, code, signal) => {
//     console.log(
//       `worker with id:${worker.id} & pid:${worker.process.pid} died with code:${code} and signal:${signal}`
//     )
//     console.log("forking new worker becasue one of my worker died")
//     cluster.fork()
//   })
// } else {
  console.log('Worker process started.');
  app.listen(3000);
// }