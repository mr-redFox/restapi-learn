const app = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//crypto.randomBytes(20).toString('hex');

//registration route
app.post('/signup', async (req, res) => {
    //validate user input
    const { email, password } = req.body;
    let token;

    //save into db
    try {
        //chek if user with this email exist
        const emailTaken = await User.find({ email });
        if(emailTaken) {
            return res.status(400).send('email alredy taken');
        }

        const user = new User({ email, password });
        const savedUser = await user.save();

        if(savedUser) {
            token = jwt.sign({
                _id: savedUser._id,
                email: savedUser.email
            }, process.env.TOKEN_SECRET, {expiresIn: '2h'});
        }
        
        return res.status(201).json({
            userName: savedUser.email,
            token
        })

    } catch (error) {
        return res.status(400).send('Fail registration');
    }
    
});

// login route
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if(user) {
            if(password !== user.password) {
                return res.status(403).send('email or password are wrong');
            }

            const token = jwt.sign({
                _id: user._id,
                email: user.email
            }, process.env.TOKEN_SECRET, {expiresIn: '2h'});

            return res.status(200).send({
                userName: user.email,
                token
            });
        }
    } catch (error) {
        return res.status(403).send('email or password are wrong');
    }
});

// get list of all users
app.get('/all', async (req, res) => {

    try {
        // get all users
        const users = await User.find({}, 'name email');
        return res.status(200).json(users);
    } catch (error) {
        return res.status(200).send('have not users yet, please create the firstone');
    }
});

module.exports = app;
