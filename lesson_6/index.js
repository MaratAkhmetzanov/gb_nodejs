import { Server } from 'socket.io';
import path from 'path';
import http from 'http';
import fs, { createReadStream } from 'fs';

const __dirname = path.resolve();

const users = [];

const server = http.createServer((request, response) => {
  const indexPath = path.join(__dirname, '/lesson_6/index.html');

  if (request.method === 'GET') {
    const readStream = fs.createReadStream(indexPath);
    readStream.pipe(response);
  } else if (request.method === 'POST') {
    let data = '';
    request.on('data', chunk => {
      data += chunk;
    });
    request.on('end', () => {
      const parsedData = JSON.parse(data);
      console.log(parsedData);
      response.writeHead(200, { 'Content-Type': 'json' });
      response.end(data);
    });
  } else {
    response.statusCode = 405;
    response.end();
  }
});

const socket = new Server(server);

socket.on('connection', (socket) => {
  socket.emit('SERVER_CONNECTIONS', socket.server.eio.clientsCount);
  socket.broadcast.emit('SERVER_CONNECTIONS', socket.server.engine.clientsCount);

  socket.on('CLIENT_CONNECT', (data) => {
    socket.broadcast.emit('SERVER_CONNECT', `${data} connected`);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('SERVER_DISCONNECT', `${socket.id} disconnected`);
  });

  socket.on('CLIENT_MSG', (data) => {
    socket.emit('SERVER_MSG', { msg: data.msg, name: data.name });
    socket.broadcast.emit('SERVER_MSG', { msg: data.msg, name: data.name });
  });
});

server.listen(3000, 'localhost');
