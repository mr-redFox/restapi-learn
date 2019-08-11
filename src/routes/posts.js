const app = require('express').Router();
const { auth } = require('../middlewares/auth');

// app.use(auth);

const posts = [
    {name: "super post"},
    {name: "second post"}
];

// get all posts
app.get('/', async (req, res) => {
    
    res.status(200).json(posts);
});

app.get('/all', async (req, res) => {
    const email = req.userId;
    
    res.status(200).json(posts);
});

module.exports = app;
