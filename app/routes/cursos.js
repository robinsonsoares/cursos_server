var express = require('express');
var router = express.Router();

module.exports = function (app) {
  var Controller = app.controllers.cursos;

  router.get('/', Controller.listAll);
  router.post('/', Controller.create);
  router.delete('/:id', Controller.remove);

  app.use('/cursos', router);

}

