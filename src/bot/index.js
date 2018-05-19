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
});