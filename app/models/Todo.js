'use strict';

App.TodoSerializer = App.ApplicationSerliazer.extend();

module.exports = App.Todo = DS.Model.extend({
  task: DS.attr('string'),
  isCompleted: DS.attr('boolean')
});

