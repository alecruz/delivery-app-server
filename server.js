const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const io = require('socket.io')(server);
const pedidosSocket = require('./sockets/pedidos_socket');

const PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

app.disable('x-powered-by');

app.set('port', PORT);

//LLAMAR A LOS SOCKETS
pedidosSocket(io);

server.listen(PORT, () => {
  console.log(`API RUNNING ON PORT ${PORT}`);
});

/*server.listen(3000, '192.168.1.18' || 'localhost', function (){
    console.log('Aplicacion de NodeJS ' + process.pid + ' Iniciada...')
});*/

app.get('/', (req, res) => {
    res.send('Ruta raiz del backend');
});

//ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server
}
