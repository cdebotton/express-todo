'use strict';

module.exports = App.TodosRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('todo');
  },

  setupController: function(controller, model) {
    controller.set('content', model);
  }
});
