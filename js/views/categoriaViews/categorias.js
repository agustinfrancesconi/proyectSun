var app = app || {};

app.CategoriaView = Backbone.View.extend({

  template: _.template( $('#adminCategorias').html() ),

  events: {
    'click #agregarCategoria' : 'add',
    'submit #addCategoria' : 'guardar',
    'click #verCategoria' : 'ver',
    'click #new-close' : 'close',
  },
   
  initialize: function() {
    this.listenTo(app.Categorias, 'reset', this.addAll);
    this.listenTo(app.Categorias, 'change', this.addAll);
    app.Categorias.fetch();
    this.render();
  },
  render: function() {
    $(this.el).html(this.template());
    this.$name  = this.$('#new-categoria-name');
    this.$cod  = this.$('#new-categoria-cod');
    this.$descripcion  = this.$('#new-categoria-descripcion');
    //$(this.el).find('#addCategoria').hide();
    $(this.el).find('#categoria-list').hide();
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
  add: function () {
    $(this.el).find('#categoria-list').hide();
    $(this.el).find('#addCategoria').show();
    $(this.el).find('#addCategoria').addClass('magictime spaceInLeft');
  },
  ver: function () {
    this.addAll();
    $(this.el).find('#addCategoria').hide();
    $(this.el).find('#categoria-lista').show();
    $(this.el).find('#categoria-lista').addClass('magictime spaceInLeft');
  },
  addOne: function( categoria ) {
    var view = new app.CategoriaListView({ model: categoria });
    $('#categoria-lista').append( view.render().el );
  },
  addAll: function() {
    this.$('#categoria-lista').html('');
    app.Categorias.each(this.addOne, this);
    this.$('#categoria-list').show();
  },
  close: function() {
    this.ver();
  }
});