var app = app || {};

app.CategoriaView = Backbone.View.extend({

  template: _.template( $('#adminCategorias').html() ),

  events: {
    'submit #addCategoria' : 'guardar',
    'click #new-close' : 'close',
  },
   
  initialize: function() {
    this.render();
  },
  render: function(x) {
    $(this.el).html(this.template());
    this.$name  = this.$('#new-categoria-name');
    this.$cod  = this.$('#new-categoria-cod');
    this.$descripcion  = this.$('#new-categoria-descripcion');
    $(this.el).find('#addCategoria').addClass('magictime spaceInLeft');
    return this;
  },
  newAttributes: function() {
    return { 
      //armo el producto con lo proveniente del formulario
      name: this.$name.val().trim(),
      cod: this.$cod.val().trim(),
      descripcion: this.$descripcion.val().trim(),
    };
  },
  guardar : function (event) {
    event.preventDefault();
    app.Categorias.create( this.newAttributes() ); 
    this.$name.val('');
    this.$cod.val('');
    this.$descripcion.val('');
    $(this.el).find('#addCategoria').hide();
  },

  close: function() {
    this.ver();
  }
});