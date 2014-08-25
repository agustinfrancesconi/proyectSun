var app = app || {};

app.MainProducto = Backbone.View.extend({
 template: _.template( $('#productos-tabla').html() ),

  events: {
  
  },
  
  initialize: function() {

    this.listenTo(app.Productos, 'reset', this.addAll);
    this.listenTo(app.Productos, 'change', this.addAll);
    app.Productos.fetch();
     this.addAll();
    this.render();
  },
  render: function() {
    $(this.el).html(this.template());
    return this;
  },
  ver: function () {
    this.addAll();
  },
  addOne: function( producto ) {
   
    var view = new app.ProductoListView({ model: producto });
     console.log(view.render().el );
    $('#tabla-productos').append( view.render().el );
  },
  addAll: function() {
    this.$('#tabla-productos').html('');
    app.Productos.each(this.addOne, this);
    $('#tabla-productos').show();
  },
});