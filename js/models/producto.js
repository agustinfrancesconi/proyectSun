  var app = app || {};
  // Producto Model
  app.Producto = Backbone.Model.extend({
    defaults: {
      name: '',
      descripcion: '',
      descripcion2: '',
      color: '',
      tamano: '',
      medidas: '',
      categoria: '',
      marca: '',
      imagen1: '',
      imagen2: '',
      imagen3: '',
      imagen4: '',
      imagen5: '',
      imagen6: '',
    },
    
    idAttribute: 'id'

  });