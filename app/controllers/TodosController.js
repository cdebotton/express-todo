'use strict';

module.exports = App.TodosController = Ember.ArrayController.extend({
  task: null,

  content: [],

  filteredComplete: null,

  completedTasks: function() {
    return this.filterBy('isCompleted', true).length;
  }.property('content.@each.isCompleted'),

  incompleteTasks: function() {
    return this.filterBy('isCompleted', false).length;
  }.property('content.@each.isCompleted'),

  filteredTasks: function() {
    if (this.get('filteredComplete') !== null) {
      return this.get('content').filterBy('isCompleted', this.get('filteredComplete'));
    }
    return this.get('content');
  }.property('content.@each.isCompleted', 'filteredComplete'),

  actions: {
    createTodo: function() {
      var task = this.get('task'),
          todo = this.store.createRecord('todo', { task: task, isCompleted: false });
      todo.save();
      this.get('content').pushObject(todo);
      this.set('task', null);
    },

    removeTodo: function(todo) {
      todo.deleteRecord();
      todo.save();
    },

    completeTodo: function(todo) {
      todo.toggleProperty('isCompleted');
      todo.save();
    },

    showComplete: function() {
      this.set('filteredComplete', true);
    },

    showIncomplete: function() {
      this.set('filteredComplete', false);
    },

    showAll: function() {
      this.set('filteredComplete', null);
    },

    clear: function() {
      this.get('content').filter(function(record) {
        return record.get('isCompleted') === true;
      }).forEach(function(record) {
        record.deleteRecord();
        record.save();
      });
    }
  }
});
