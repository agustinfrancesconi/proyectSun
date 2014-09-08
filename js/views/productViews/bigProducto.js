var app = app || {};

app.BigProductoView = Backbone.View.extend({
  
  template: _.template( $('#productoVistaBig').html() ),

  events: {

  },

  initialize: function() {
    this.$el.html( this.template( this.model.attributes ) );
  },   
    render: function() {
      return this;
  },
});