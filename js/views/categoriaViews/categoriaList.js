
var app = app || {};

app.CategoriaListView = Backbone.View.extend({

  tagName: 'div',

  template: _.template( $('#adminCategoriasView').html() ),

  events: {
    'click .destroy': 'clear', 
    'click .edit': 'edit', 
  },
  
  initialize: function() {
    this.listenTo(this.model, 'destroy', this.remove);
    this.render();
  },
  render: function() {
    this.$el.html( this.template( this.model.attributes ) );
    return this;
  },  
  
  clear: function() {
    this.model.destroy();
  },
  edit: function( categoria ) {
    var view = new app.EditCategoriaView( { model: this.model } );
    $('#edit-list').html( view.render().el );
  },

});