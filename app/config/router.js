App.Router.reopen({
  location: 'history'
});

App.Router.map(function() {
  this.resource('todos');
  this.route('about');
});
