// js/views/app.js

var app = app || {};

app.AppView = Backbone.View.extend({

  el: '#top',
  
  events: {
    'click #usuarios':'adminUser',
    'click #categorias':'adminCategoria',
    'click #productos':'adminProducto',

  },
 
  render:function () {
    
    },

  initialize: function() {

  },

  adminUser: function() {
    app.SunRouter.navigate("#/usuarios");
  },
  adminCategoria: function() {
    app.SunRouter.navigate("#/categorias");
  },
  adminProducto: function() {
    app.SunRouter.navigate("#/productos");
  },
});