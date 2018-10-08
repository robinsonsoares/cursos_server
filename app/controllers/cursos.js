module.exports = function (app) {

    var Curso = app.models.cursos

    var Controller = {
        listAll: function (req, res) {
            Curso.find({}, [], { sort: { name: 1 } })
                .exec()
                .then(cursos => {
                    res.json(cursos);
                })
        },
        create: function (req, res) {
            var newItem = new Curso(req.body);
            newItem.save(function(err,resp){
                if(err){
                    res.status(500).end();
                    console.log(err);
                }else{
                    res.json(resp);
                }
            })
        },
        remove: function (req, res) {
            Curso.remove({_id: req.params['id']}, function(err){
                if(!err){
                    res.json({'message': 'success'});
                }else{
                    res.status(500).end();
                }
            })
        }
    }

    return Controller;
}
