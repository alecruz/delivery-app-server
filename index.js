const express = require('express');
const displayRoutes = require("express-routemap");
const cors = require("cors");
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const pedidosSocket = require('./sockets/pedidos_socket');

const PORT = process.env.PORT || 3000;

app.use(express.json()); // sin esto no podemos ver el req.body
app.use(express.urlencoded({ extended: true })); // sino se agrega no podremos tomar los parametros de la url del request, req.query
app.use(cors());

app.get(`/`, (req, res) => {
  return res.json({ message: `API DEPLOY SUCCESS` });
});

app.disable('x-powered-by');
app.set('port', PORT);

//LLAMAR A LOS SOCKETS
pedidosSocket(io);

app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`API RUNNING ON PORT ${PORT}`);
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


/*server.listen(3000, '192.168.1.18' || 'localhost', function (){
    console.log('Aplicacion de NodeJS ' + process.pid + ' Iniciada...')
});*/

