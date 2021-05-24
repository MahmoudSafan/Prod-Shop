const mongoDb = require('mongodb');
const getDb = require('./db_connection/dbConnect').getDb;

module.exports = class Product {
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        const db = getDb();
        return db.collection('products')
            .insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });

    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products').find().toArray();

    }

    static findById(prodId) {
            const db = getDb();
            return db.collection('products').find({
                    _id: new mongoDb.ObjectId(prodId)
                })
                .next()
        }
        /*
            static deleteById(id) {

            }

            static fetchAll() {

                return db.execute('SELECT * FROM products');
            }

            static findById(id) {
                return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
                
            };
            */
};
/*
const Sequelize = require('sequelize');
const sequelize = require('./db_connection/dbConnect');

const product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING
    }
});

module.exports = product;

/**
 *  old way before using sequelize
 
const db = require('.//db_connection/dbConnect');

const Cart = require('./cart');


module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        return db.execute('INSERT INTO PRODUCTS (title,imageUrl,description,price) VALUES(?,?,?,?)', [this.title, this.imageUrl, this.description, this.price])
    }

    static deleteById(id) {

    }

    static fetchAll() {

        return db.execute('SELECT * FROM products');
    }

    static findById(id) {
        return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
    };
};

*/