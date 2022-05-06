const express = require('express');

const CarroDB = require('../model/CarroDB');
const router = express.Router();
const exec = require('./utils');

router.get('/id/:id', exec(async( req, res, next ) =>{
    let id = req.params.id;
    let carro = await CarroDB.getCarrosById(id);
        res.json(carro);
    })
);

router.get('/', exec(async (req, res, next) => {
    try {
        let carros = await CarroDB.getCarros()
        res.json(carros);
    } catch (error) {
        next(error);
    }
}));

router.delete('/id/:id', exec(async (req, res, next ) =>{
    let id = req.params.id;
    let carro = await CarroDB.deleteById(id);
        res.json({msg: affectedRows > 0 ? 'Carro deletado com sucesso' : "Nenhum carro excluído" });
    })
);

router.get('/:tipo', exec(async (req, res, next) => {
    let tipo = req.params.tipo;
    let carros = await CarroDB.getCarrosByTipo(tipo);
        res.json(carros);
    })
);

router.post('/', exec(async(req, res, next) =>{
    let carro =  await CarroDB.save(req.body)
        res.json(carro);
    })
);

router.put('/', exec (async(req, res, next) =>{
    let carro = await CarroDB.update(req.body)
        res.json({msg: "Carro atualizado com sucesso"})
})
);

module.exports = router;