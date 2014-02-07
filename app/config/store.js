App.Adapter = DS.RESTAdapter.extend({
  namespace: 'api'
});

App.ApplicationSerliazer = DS.RESTSerializer.extend({
  normalize: function(type, hash, property) {
    hash.id = hash._id;
    delete hash._id;
    return this._super(type, hash, property);
  }
});

App.Store = DS.Store.extend({
  adapter: App.Adapter
});
