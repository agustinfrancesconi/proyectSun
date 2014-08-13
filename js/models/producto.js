  var app = app || {};
  // Producto Model
  app.Producto = Backbone.Model.extend({
    defaults: {
      id:'',
      name: '',
      descripcion: '',
      descripcion2: '',
      talle: '',
      color: '',
      tamaño: '',
      tel: '',
      categoria: '',
      categoria2: '',
    }

  });