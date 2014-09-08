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

    'click #categorias':'adminCategoria',
    'click #productos':'adminProducto',
  },
 
  render:function () {
  

    },

  initialize: function() {

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
  adminCategoria: function() {
    app.SunRouter.navigate("#/categorias");
  },
  adminProducto: function() {
    app.SunRouter.navigate("#/productos");
  },
 
});