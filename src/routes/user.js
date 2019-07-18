const app = require('express').Router();
const User = require('../models/user');

//crypto.randomBytes(20).toString('hex');
const generateTokens = (payload) => {
    return 'some_token';
}

//registration
app.get('/signup', async (req, res) => {
    //validate user input
    const { email, password } = req.body;

    console.log(req.body);

    //save into db
    try {
        const user = new User({ email, password });
        const savedUser = await user.save();

        if(savedUser) {
            const token = generateTokens(savedUser);
        }
        
        return res.status(201).json({
            userName: 'dfd',
        })

    } catch (error) {
        return res.status(400).send('Fail registration');
    }
    
});

//login
// app.get('/singin')

module.exports = app;