const chai = require('chai');
const expect = require("chai").expect;
const mongoose = require('mongoose');

// const db = require('../src/utils/database');
const User = require('../src/models/user');

describe('test database', () => {
    const url = 'mongodb://127.0.0.1:27017/test';
    let db;

    // before(async () => {
    //     db = mongoose.connect(url, { useNewUrlParser: true });
    // });

    // beforeEach(() => {
    //     db = mongoose.connect(url, { useNewUrlParser: true });

    //     const fakeUser = {
    //         email: 'user@mail.com',
    //         password: 'super user password'
    //     };

    //     User.create(fakeUser, (err, res) => {
    //         if(err) {
    //             console.log('db seed User error: ', err);
    //         }

    //         console.log('db seed User success: ', res);
    //     })
    // });



    it('should fetch one user from db', async (done) => {
        try {
            db = mongoose.connect(url, { useNewUrlParser: true });
            const user = new User({
                email: 'user@mail.com',
                password: 'super user password'
            });

            const result = await user.save();

            const finded = await User.findOne({ email: 'user@mail.com' });

            if(!finded) {
                throw new Error('user not found');
            }

            console.log('user: ', finded)
            done();
        } catch(err) {
            console.log(err);
            done();
        }
    })


    after(() => {
        //await mongoose.connection.collection.users.drop()
    })
});