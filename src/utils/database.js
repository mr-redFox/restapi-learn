const mongoose = require('mongoose');
const logger = require('../utils/logger');

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', () => logger.fatal('mongoose connection fail'));

db.once('open', () => logger.info('connected to db'));

module.exports = db;
