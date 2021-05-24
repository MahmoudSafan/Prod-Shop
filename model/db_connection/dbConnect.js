/*const Sequelize = require('sequelize');
const sequelize = new Sequelize('marketnode', 'root', 'Ms2012000', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
*/
/* old conection before using sequelize

const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'marketnode',
    password: 'Ms2012000',
});

module.exports = pool.promise();
*/

const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient; // constractor
let db;

const mongoConnection = (callback) => {
    mongoClient.connect('mongodb+srv://kamal:UZtedXoGw8MgZqKN@cluster0.pzhpb.mongodb.net/nodeShop?retryWrites=true&w=majority', { useUnifiedTopology: true }, { useNewUrlParser: true })
        .then(result => {
            console.log('db connected');
            db = result.db();
            callback();

        })
        .catch(err => {
            console.log(err);
        });
};

const getDb = () => {
    if (db) {
        return db;
    } else {
        throw 'DB not connected';
    }
};

exports.mongoConnection = mongoConnection;
exports.getDb = getDb;