var todoSchema  = require('../../schema/todos'),
    Todo        = todoSchema.Model;

exports.index = function(req, res) {
  Todo.find()
    .exec(function(err, todos) {
      if (err) return res.send(500, { message: err });
      res.send(200, { todos: todos });
    });
}

exports.create = function(req, res) {
  var todo = new Todo({
    task: req.body.todo.task,
    isCompleted: req.body.todo.isCompleted
  });

  todo.save(function(err, todo) {
    if (err) return res.send(500, { message: err });
    res.send(200, { todo: todo });
  });
};

exports.destroy = function(req, res) {
  Todo.findByIdAndRemove(req.params.id, function(err, todo) {
    if (err) return res.send(500, { message: err });
    res.send(200, { todo: todo });
  });
};

exports.update = function(req, res) {
  Todo.findByIdAndUpdate(req.params.id, req.body.todo, function(err, todo) {
    if (err) return res.send(500, { message: err });
    res.send(200, { todo: todo });
  });
};
