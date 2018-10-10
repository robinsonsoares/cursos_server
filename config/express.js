var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var load = require('express-load');
var cors = require('cors');

module.exports = function () {
    var app = express();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    load('models', { cwd: 'app' })
        .then('controllers')
        .then('routes')
        .into(app)

    return app;
}
