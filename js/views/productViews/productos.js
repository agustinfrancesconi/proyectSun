var app = app || {};

app.ProductoView = Backbone.View.extend({

  template: _.template( $('#adminProductos').html() ),

  events: {
    'click #agregarProducto' : 'add',
    'click #new-producto' : 'guardar',
    'click #verProducto' : 'ver',
  },
  
  
  initialize: function() {
    this.listenTo(app.Productos, 'reset', this.addAll);
    this.listenTo(app.Productos, 'change', this.addAll);
    app.Productos.fetch();
    this.render();
  },
  
  render: function() {
    $(this.el).html(this.template());
    this.$name  = this.$('#new-producto-name');
    this.$producto  = this.$('#new-producto-producto');
    this.$mail  = this.$('#new-producto-mail');
    this.$tel   = this.$('#new-producto-tel');
    this.$pass  = this.$('#new-producto-pass');
    $(this.el).find('#addproducto').hide();
    return this;
  },
   newAttributes: function() {
    return { 
      //armo el producto con lo proveniente del formulario
      name: this.$name.val().trim(),
      producto: this.$producto.val().trim(),
      mail: this.$mail.val().trim(),
      tel:  this.$tel.val().trim(),
      pass: this.$pass.val().trim(),
    };
  },
  guardar : function (event) {
    app.Productos.create( this.newAttributes() ); 
    this.$name.val('');
    this.$producto.val('');
    this.$pass.val('');
    this.$mail.val('');
    this.$tel.val('');
    $(this.el).find('#addproducto').hide();
  },
  add: function () {
    $(this.el).find('#producto-list').hide();
    $(this.el).find('#addproducto').show();
  },
  ver: function () {
    this.addAll();
    $(this.el).find('#addproducto').hide();
    $(this.el).find('#producto-list').show();
    //cargo el formulario de vista + edicion para modificar el usuario
  },
  addOne: function( producto ) {
    var view = new app.ProductoListView({ model: producto });
    $('#producto-list').append( view.render().el );
  },
  addAll: function() {
    this.$('#producto-list').html('');
    app.Productos.each(this.addOne, this);
  },
});