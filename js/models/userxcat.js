var app = app || {};
  // User Model
  app.UserXcat = Backbone.Model.extend({
    defaults: {
      id: '',
      catcod: '',
      usercod: '',
    },

    idAttribute: 'id'
  });