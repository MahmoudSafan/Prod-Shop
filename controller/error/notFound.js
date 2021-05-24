exports.notFoundPage = (req, res, next) => {
    res.status(404).render('../views/index/404.ejs', { pageTitle: 'Page Not Found', path: '' });
};