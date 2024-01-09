module.exports = (io) => {

    const namespace = io.of('/pedidos/repartidor');
    namespace.on('connection', function(socket){

        console.log('Usuario se conecto a socket io');

        socket.on('posicion', function(data){
            console.log('Se emitio', JSON.parse(data));

            const d = JSON.parse(data); //Debe enviarla el cliente (repartidor)
            namespace.emit(`posicion/${d.id_pedido}`,{id_pedido:d.id_pedido, lat:d.lat, lon:d.lon}); //Emite a Android

        })

        socket.on('disconnect', function(data){
            console.log('Usuario se desconecto de socket io');            
        })

    })

}