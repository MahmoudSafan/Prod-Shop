exports.getLogin = (req, res) => {
    const isLoggedIn = req.get('Cookie').split(';')[2].split('=')[1];
    res.render('../views/index/auth/auth.ejs', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: isLoggedIn
    });
};

exports.postLogin = (req, res) => {
    res.setHeader('Set-Cookie', 'loggedIn = true; HttpOnly');
    res.redirect('/');
};