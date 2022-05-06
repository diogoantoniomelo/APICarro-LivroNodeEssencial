let AWS = require('aws-sdk');
const { param } = require('./upload');
let accessKey = 'AKIA2KYGT7SB5PCFXG77';
let secretKey = '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';
let bucket = 'livro-node-aws';

class S3Helper {
    /**
    @param buffer 
    @param path
    **/
    static upload(buffer, path){
        AWS.config.update({ accessKeyId: accessKey, secretAccessKey: secretKey});

        let s3 = new AWS.S3()

        s3.putObject({
            Bucket: bucket,
            Key: path,
            Body: buffer,
            ACL: 'public-read',
            ContentType: 'image/jpeg'
        }, function (resp){
            console.log("Arquivo enviado com sucesso " + resp);
        });
    }
}

module.exports = S3Helper;