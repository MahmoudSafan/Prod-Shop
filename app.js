const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const adminRoutes = require('./routing/admin/adminRoute');
const productsRoutes = require('./routing/products/home')
const errorRoutes = require('./routing/error/notFound');
const authenticaionRoutes = require('./routing/auth/auth');
/*
const sequelize = require('./model/db_connection/dbConnect');
const Product = require('./model/product');
const User = require('./model/user');
const Cart = require('./model/cart');
const CartItem = require('./model/cart-item');
*/

const mongoConnection = require('./model/db_connection/dbConnect').mongoConnection;

const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'views')));

/*  mysql middleware 

app.use((req, res, next) => { // middleware to make user in every reques comming to accsess it everywhere
    User.findAll({ where: { name: 'Admin' } })
        .then((result) => {
            req.User = result;
            //console.log(req.user);
            next();
        }).catch((err) => {
            console.log(err);
        });
});
*/

app.use('/admin', adminRoutes);
app.use(authenticaionRoutes);
app.use(productsRoutes);
app.use(errorRoutes);

/*
app.use(session({
    secret: 'should be long text to be hashed',
    resave: false,
    saveUninitialized: 'false'
}));
*/


mongoConnection(() => {
    app.listen(3000);
});



/*
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product); //can be deleted without any side effect but it's here to shape the releation between user and his product
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize.sync()
    .then(result => {
        return User.findAll({ where: { name: 'Admin' } });
    })

.then(result => {
    if (result.length == 0) {
        User.create({ name: 'Admin', email: 'test@test.com' });
    }
    return result;
})

.then(user => {
    return Cart.create({ userId: user.id });
})

.then(result => {
    //  console.log(result);
    app.listen(3000);
})

.catch(err => {
    console.log(err);
});
*/