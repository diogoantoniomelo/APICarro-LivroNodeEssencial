const { ObjectId } = require('mongodb');
var mysql = require('mysql');
let db = require('./mongodb');

class CarroDB{
   /*  static connect(){
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'livro',
            password: 'livro',
            database: 'livro'
        });

        connection.connect();
        return connection;
    } */

    static getCarros(){
        return new Promise(function (resolve, reject) {
            let carros = db.get().collection('carros');
            carros.find({}).toArray(function(error, results){
                if (error)
                reject(error);
            else
                resolve(results);
            });
        });
        }

    static getCarrosByTipo(tipo){
        return new Promise(function (resolve, reject){
            let carros = db.get().collection('carros');
            carros.find({"tipo" : tipo}).toArray(function(error, results){
            if (error)
                reject(error);
            else
                resolve(results);
        });
    })
    }

    static getCarrosById(id){
        return new Promise(function (resolve, reject) {
            let carros = db.get().collection('carros');
            carros.findOne({"_id" : ObjectId(id)},function(error, result){
                console.log(error);
                console.log(result);
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
                
            });
        });

    };

    static save(carro) {
        return new Promise(function (resolve, reject) {
            let carros = db.get().collection('carros');
            carros.insert(carro, function(error, response){
                if (error) {
                    reject(error);
                } else {
                    resolve(carro);
                }
            });
        })
    };

    static update(carro){
        return new Promise(function (resolve, reject){
            let carros = db.get().collection('carros');
            let id = carro._id;
            carros.update({"_id": ObjectId(id)},function(error, response){
            if(error) {
            reject(error);
            } else {
                resolve(carro);
            }
        });
        });
    };

        static deleteById(id){
        return new  Promise(function (resolve, reject){
            let carros = db.get().collection('carros');
            carros.removeOne({"_id": ObjectId(id)} ,function(error, results){
            if(error) {
                reject(error);
            } else {
                resolve(results.affectedRows)
            }
        });
    });
    }
}

module.exports = CarroDB;
