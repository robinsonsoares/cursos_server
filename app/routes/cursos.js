var express = require('express');
var router = express.Router();

var auth =  require('../../config/authentication').auth;

module.exports = function (app) {
  var Controller = app.controllers.cursos;


  router.get('/', Controller.listAll);
  router.post('/', auth.authenticate, Controller.create);
  router.delete('/:id', Controller.remove);

  router.post('/login', Controller.login);

  app.use('/cursos', router);

}

