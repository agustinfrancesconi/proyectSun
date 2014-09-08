var app = app || {};

app.ProductoListView = Backbone.View.extend({

  tagName: 'div',

  template: _.template( $('#productoVista').html() ),

  events: {
      'click #contenedor-producto': 'big', 
  },
  
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html( this.template( this.model.attributes ) );
    $(this.el).find('.testt').each( function(i, el ) {
      $(el).addClass('magictime spaceInLeft');
    });
    return this;
  },  
  big: function( producto ) {
    var view = new app.BigProductoView( { model: this.model } );
    $('#producto-big').html( view.render().el );
  },
  

});