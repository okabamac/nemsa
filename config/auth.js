module.exports = {
    ensureAuthenticatedOffice: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    },
    ensureAuthenticatedAdmin: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/adminLogin');
    },
};