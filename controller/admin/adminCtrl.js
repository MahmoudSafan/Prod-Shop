const Product = require('../../model/product');

exports.getProduct = (req, res, next) => {
    res.render('../views/index/admin/edit-product.ejs', {
        pageTitle: 'Admin Products',
        path: '/admin/add-product',
        editing: false,
        isAuthenticated: true
    });

};

exports.postProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(title, imageUrl, price, description);
    product.save()
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });

    // we add user parameter in request in app file (middleware) and make relation between user and product so node add methods automaticly like createProduct, so this method when we add product userId will added to product table
    /* req.user.createProduct({
             title: title,
             imageUrl: imageUrl,
             price: price,
             description: description

         })*/

    /* sequelize
    Product.create({
            title: title,
            imageUrl: imageUrl,
            price: price,
            description: description,
            userId: req.User[0].id // we used userId variable because it added to db automaticly when we add relation between product and user
        })
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        })
        */

    /* old wat before sequelize 
    const product = new Product(null, title, imageUrl, description, price);
     product.save()
         .then(result => {
             res.redirect('/');
         })
         .catch(err => {
             console.log(err);
         });
         */
};

exports.getAdminPanal = (req, res) => {
    Product.fetchAll()
        .then((result) => {
            res.render('../views/index/admin/adminPanal.ejs', {
                pageTitle: 'AdminPanal',
                path: '/admin/adminPanal',
                prods: result,
                isAuthenticated: false
            })
        })
        .catch(err => {
            console.log(err);
        });

};

exports.getEditProduct = (req, res) => {
    const flagEdit = req.query.edit;
    const prodId = req.params.productId;
    Product.findAll({ where: { id: prodId } })
        .then(result => {
            res.render('../views/index/admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: flagEdit,
                product: result[0],
                isAuthenticated: false
            });
        })
        .catch(err => {
            console.log(err);
        });
};


exports.postEditProduct = (req, res) => {
    const id = req.body.id;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;

    Product.update({
        title: updatedTitle,
        imageUrl: updatedImageUrl,
        price: updatedPrice,
        description: updatedDescription
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/admin/adminPanal');
    }).catch(err => { console.log(err); });
};


exports.postDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    Product.destroy({ where: { id: prodId } })
        .then(() => {
            res.redirect('/admin/adminPanal');
        })
        .catch(err => {
            console.log(err);
        });

};