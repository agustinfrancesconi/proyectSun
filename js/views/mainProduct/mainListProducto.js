
var app = app || {};

app.ProductoListView = Backbone.View.extend({

  tagName: 'div',

  template: _.template( $('#productoVista').html() ),

  events: {

    'click .edit': 'edit', 
  },
  
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html( this.template( this.model.attributes ) );
    return this;
  },  
  edit: function( user ) {
    var view = new app.BigProductView( { model: this.model } );
    $('#ViewBigProduct').html( view.render().el );
  },

});