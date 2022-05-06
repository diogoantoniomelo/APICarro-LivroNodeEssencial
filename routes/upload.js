let express = require('express');
const router = express.Router();
const exec  = require('./utils');
let fs = require('fs');

const s3 = require('./s3');

router.post('/', exec(async (req, res, next) => {
    
    let fileName =  req.body.fileName;
    let base64 =  req.body.base64;

    let buf =  Buffer.from(base64, 'base64');
    
    fs.writeFile("./fotos/" + fileName, buf, "binary", function (err){
        if(err){
            next(err);
            res.json({msg: 'Erro ao salvar o arquivo.'});
        } else {
            res.json({msg:'Arquivo salvo com sucesso'});
        }
    });

    let path = "fotos/"+fileName;
    s3.upload(buf, path)
}));

module.exports = router;



