var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema;

var todoSchema = new Schema({
  task: { type: String, required: true },
  isCompleted: { type: Boolean, default: false }
});

exports.Schema  = todoSchema;
exports.Model   = mongoose.model('Todo', todoSchema);
