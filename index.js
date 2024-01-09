const express = require("express");
const app = express();
const displayRoutes = require("express-routemap");
const http = require('http');
const server = http.createServer(app);
const cors = require("cors");
const io = require('socket.io')(server);
const pedidosSocket = require('./sockets/pedidos_socket');

const PORT = process.env.PORT || 3000;

app.use(express.json()); // sin esto no podemos ver el req.body
app.use(express.urlencoded({ extended: true })); // sino se agrega no podremos tomar los parametros de la url del request, req.query
app.use(cors());

app.disable('x-powered-by');

app.set('port', PORT);

//LLAMAR A LOS SOCKETS
pedidosSocket(io);

app.get(`/`, (req, res) => {
  return res.json({ message: `API DEPLOY SUCCESS` });
});

app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`API RUNNING ON PORT ${PORT}`);
});

/*server.listen(3000, '192.168.1.18' || 'localhost', function (){
    console.log('Aplicacion de NodeJS ' + process.pid + ' Iniciada...')
});*/
