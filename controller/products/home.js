const Product = require('../../model/product');
const cart = require('../../model/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(result => {
            res.render('../views/index/shop/product-list.ejs', {
                prods: result,
                pageTitle: 'All Products',
                path: '/products'
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getDetails = (req, res) => {
    const id = req.params.productId;
    Product.findById(id)
        .then((result) => {
            res.render('../views/index/shop/product-detail.ejs', {
                product: result,
                pageTitle: result.title,
                path: '/products',
                isAuthenticated: false
            })
        })
        .catch(err => {
            console.log(err);
            res.redirect('/');
        })

};

exports.getHome = (req, res) => {
    Product.fetchAll()
        .then((result) => {
            res.render('../views/index/shop/index.ejs', {
                prods: result,
                pageTitle: 'Shop',
                path: '/',
                isAuthenticated: false
            })
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCart = (req, res) => {
    res.render('../views/index/shop/cart.ejs', { pageTitle: 'Cart', path: '/cart', isAuthenticated: false });
};

exports.postCart = (req, res) => {
    const id = req.body.productId;
    /*Product.findById(id, product => {
        cart.addProduct(id, product.price);
    });*/
    res.redirect('/');
}

exports.getOrders = (req, res) => {
    res.render('../views/index/shop/orders.ejs', { pageTitle: 'Orders', path: '/orders', isAuthenticated: false });
};

exports.getCheckout = (req, res) => {
    res.render('../views/index/shop/checkout.ejs', { pageTitle: 'Checkout', path: '/checkout', isAuthenticated: false });
};