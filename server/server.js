import http from 'http';
import express from 'express';
import config from './config';

const app = express();
const server  = http.createServer(app)

app.use(express.static(config.staticUrl));

app.all('/*', (req, res) => {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('index.html', { root: config.distFolder });
});

server.listen(config.listenPort);

console.log('Server started on port: ', config.listenPort);
