'use strict';

module.exports = App.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.transitionTo('todos');
  }
});
