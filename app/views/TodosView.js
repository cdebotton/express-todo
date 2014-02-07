'use strict';

module.exports = App.TodosView = Ember.View.extend({
  focusInput: function() {
    this.$('#new-todo').focus();
  }.on('didInsertElement'),

  boldFilter: function() {

  }.observes('controller.filteredComplete')
});
