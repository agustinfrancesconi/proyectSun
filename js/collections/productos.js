var app = app || {};
// Productos Collection
// ---------------
var ProductoList = Backbone.Collection.extend({
  // Reference to this collection's model.
  model: app.Producto,
  //url: 'php/productoController.php/producto'
   localStorage: new Backbone.LocalStorage('productos-backbone'),
});

// Create our global collection of **productos**.
app.Productos = new ProductoList();