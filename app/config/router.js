App.Router.reopen({
  location: 'history'
});

App.Router.map(function() {
  this.resource('todos', function() {
    this.route('create');
    this.resource('todo', { path: ':todo_id' });
  });
  this.route('about');
});
