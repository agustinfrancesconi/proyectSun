  var app = app || {};
  // User Model
  app.User = Backbone.Model.extend({
    defaults: {
      user: '',
      pass: '',
      name: '',
      mail: '',
      tel: '',
      admin: false,
    }
  });