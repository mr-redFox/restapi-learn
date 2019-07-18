
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'mongoose connection error: '));

db.once('open', () => console.log('connected to db') );

module.exports = db;
