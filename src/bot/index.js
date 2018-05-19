<<<<<<< HEAD
const { RiekoClient } = require('../core/index');

const client = new RiekoClient(process.env.TOKEN, {
  maxShards: 'auto',
  disableEveryone: true,
  defaultImageFormat: 'png',
  getAllUsers: true,
  autoReconnect: true
});
client.load();

process.on('unhandledRejection', (err) => {
    console.error(err.stack);
=======
const { RiekoClient } = require('../core/index');

const client = new RiekoClient(process.env.TOKEN, {
  maxShards: 'auto',
  disableEveryone: true,
  defaultImageFormat: 'png',
  getAllUsers: true,
  autoReconnect: true
});
client.load();

process.on('unhandledRejection', (err) => {
    console.error(err.stack);
>>>>>>> 900bae64de5b33996f01a427b6f870c75003e083
});