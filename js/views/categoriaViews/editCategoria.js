var app = app || {};


app.EditCategoriaView = Backbone.View.extend({
  
  tagName: 'div',
  template: _.template( $('#adminCategoriasEdit').html() ),

  events: {
    'click .destroy': 'clear', 
    'click #edit-categoria': 'save',
    'click #edit-close': 'close',  
  },
  
  initialize: function() {
    this.listenTo(app.Categorias, 'change', this.close);
    this.$el.html( this.template( this.model.attributes ) );
    this.$name  = this.$('#edit-categoria-name');
    this.$cod  = this.$('#edit-categoria-cod');
    this.$descripcion  = this.$('#edit-categoria-descripcion');
    return this;
  },   
  newAttributes: function() {
    return { 
     //armo el usuario con lo proveniente del formulario
      name: this.$name.val().trim(),
      cod: this.$cod.val().trim(),
      descripcion: this.$descripcion.val().trim(),

    };
  },
  save: function() {
    this.model.save( this.newAttributes());
  },
  close: function() {
    // Remove view from DOM
    this.remove();  
    Backbone.View.prototype.remove.call(this);
  }

});