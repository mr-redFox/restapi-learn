const chai = require('chai');
const expect  = require("chai").expect;
const mongoose = require('mongoose');

// const db = require('../src/utils/database');
const User = require('../src/models/user');

describe('test database', async () => {
    const url = 'mongodb://127.0.0.1:27017/test';

    before(async () => {
        await mongoose.connect(url, { useNewUrlParser: true });
    });

    beforeEach(() => {
        const fakeUser = {
            email: 'user@mail.com',
            password: 'super user password'
        };

        User.create(fakeUser, (err, res) => {
            if(err) {
                console.log('db seed User error: ', err);
            }

            console.log('db seed User success: ', res);
        })
    });

    after(async () => {
        await mongoose.connection.collection('users').drop()
    })

    it('should fetch one user from db', (done) => {
        User.findOne({email: 'user@mail.com'}, (err, user) => {
            //expect(err).to.be.null;
            console.log('an error ', err);
            console.log('user ', user);

            expect(user).to.be.an('object');
            done();
        });
        

        
    })
});