const PagesControls = {
    getHomePage: function (req, res) {
        res.render('login');
    },

    adminLogin: function (req, res) {
        res.render('admin-login');
    },

    registration: function (req, res) {
        res.render('officers-panel')
    },

    login: function (req, res) {
        const {email, password } = req.body;
        console.log(req.body);
        res.render('officers-panel');
    },

    adminPanel: function (req, res) {
        res.render('admin-panel');
    },

    addUser: function (req, res) {
        console.log(req.body);
        res.send('User added successfully');
    }

};
module.exports = PagesControls;