var app = app || {};
// User Collection
// ---------------
var CategoriaList = Backbone.Collection.extend({
  // Reference to this collection's model.
  model: app.Categoria,
//  url: 'php/categoriaController.php/categoria'
 localStorage: new Backbone.LocalStorage('categorias-backbone'),
});

// Create our global collection of **users**.
app.Categorias = new CategoriaList();