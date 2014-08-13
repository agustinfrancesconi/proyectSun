var app = app || {};
// Productos Collection
// ---------------
var ProductoList = Backbone.Collection.extend({
  // Reference to this collection's model.
  model: app.Producto,
    // Save all of the movie items under the `"movies-backbone"` namespace.
  localStorage: new Backbone.LocalStorage('productos-backbone'),
});

// Create our global collection of **productos**.
app.Productos = new ProductoList();