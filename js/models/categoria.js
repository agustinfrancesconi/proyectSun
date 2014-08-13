  var app = app || {};
  // Categoria Model
  app.Categoria = Backbone.Model.extend({
    defaults: {
      id:'',
      name: '',
      descripcion: '',
    }
  });