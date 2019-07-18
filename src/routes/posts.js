const app = require('express').Router();
const { auth } = require('../middlewares/auth');

app.use(auth);

app.get('/', async (req, res) => {
    const email = req.userId;
    
    res.send(`you are logined like ${email}`);
});

module.exports = app;
