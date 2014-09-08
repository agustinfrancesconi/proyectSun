var app = app || {};

app.CategoriaCheckBoxView = Backbone.View.extend({

  tagName: 'div',
  
  template: _.template( $('#categoriasCheckbox').html() ),
  
  events: {
  },
  
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html( this.template( this.model.attributes ) );
    return this;
  },  
});