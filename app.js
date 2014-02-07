var http      = require('http'),
    path      = require('path'),
    express   = require('express'),
    mongoose  = require('mongoose'),
    api       = require('./controllers/api'),
    app       = express();

mongoose.connect('mongodb://localhost/express-todo', function(err) {
  if (err) throw err;
  console.log('Connected to MongoDB using collection `express-todo`.');
});

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

function index(req, res) {
  res.render('index');
}

app.get('/', index);

app.get('/api/todos', api.todos.index);
app.post('/api/todos', api.todos.create);
app.del('/api/todos/:id', api.todos.destroy);
app.put('/api/todos/:id', api.todos.update);

app.get(/^\/?[A-Za-z0-9\/]+$/, index);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Todo server listening on port ' + app.get('port'));
});
