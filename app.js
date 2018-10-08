var app = require('./config/express')();
require('./config/database')('mongodb://localhost:27017/treinaweb');
module.exports =  app;