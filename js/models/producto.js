  var app = app || {};
  // Producto Model
  app.Producto = Backbone.Model.extend({
    defaults: {
      cod: '',
      name: '',
      descripcion: '',
      descripcion2: '',
      color: '',
      tamaño: '',
      medidas: '',
      categoria: '',
      marca: '',
      imagen: '',
    }

  });