
const express = require('express');
const app = express();
const db = require('./model/mongodb');


app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(express.json());

app.use('/api/carros', require('./routes/carros'));
app.use('/api/upload', require('./routes/upload'));
app.use(express.static(__dirname+ '/view'))

app.use(function (req, res, next){
    let err = new Error;
    res.status(404);
    res.json({err:"Não encontrado"});
    next(err);
});

app.use(function (err, req, res, next){
    res.status(500);
    res.json({erro : "Erro na transação"})
});

/* let server = app.listen(3000, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log("Servidor iniciado em http://%s:%s" , host ,  port);
}); */

db.connect(function(err){
    if(err){
        console.log('Erro ao conectar no mongo Mongo.');
        process.exit(1);
    } else {
        console.log('MongoDB conectado: ', db);
        let server = app.listen(3000, function() {
            let host = server.address().address;
            let port = server.address().port;
        console.log("Servidor iniciado em http://%s:%s" , host ,  port);
        });
    };
});