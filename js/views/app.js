// js/views/app.js

var app = app || {};

app.AppView = Backbone.View.extend({

  el: '#top',
  
  events: {
    'click #logo':'home',
    
    'click #categorias':'adminCategoria',
    'click #productos':'adminProducto',
 
    'click #logo':'home',

    'click #agregarUser':'addUser',
    'click #verUser':'verUser',


    'click #agregarCategoria':'addCategoria',
    'click #verCategoria':'verCategoria',

    'click #productosVer': 'adminProducto',
    'click #productosAdd': 'addProducto',

    'submit #searchform': 'viewProductoName',
  },
 
  initialize: function() {
  },
  render:function () {
  },
  home: function() {
    app.SunRouter.navigate("#/");
  },
  verUser: function() {
    app.SunRouter.navigate("#/verusuarios");
  },
  addUser: function() {
    app.SunRouter.navigate("#/addusuario");
  },
  addCategoria: function() {
    app.SunRouter.navigate("#/addcategorias");
  },
  verCategoria: function() {
    app.SunRouter.navigate("#/vercategorias");
  },
  adminProducto: function() {
    app.SunRouter.navigate("#/productos");
  },
  addProducto: function() {
    app.SunRouter.navigate("#/addproductos");
  },
  viewProductoName: function(event) {
    app.SunRouter.navigate("#/productosname/"+ $('#searchform').find('#inputsearch').val());
  },
  
});