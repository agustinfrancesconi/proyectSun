// js/views/app.js

var app = app || {};

app.AppView = Backbone.View.extend({

  el: '#top',
  
  events: {
    'click #usuarios':'adminUser',
    'click #categorias':'',
    'click #productos':'',

  },
 
  render:function () {
    
    },

  initialize: function() {

  },

  adminUser: function() {
    app.SunRouter.navigate("#/usuarios");
  },

});