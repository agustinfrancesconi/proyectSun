var app = app || {};

app.ProductoView = Backbone.View.extend({

  template: _.template( $('#adminProductos').html() ),

  events: {
    'click #verProducto' : 'ver',
    'click #categoria-listas' : 'viewByCat',
  },
  
  initialize: function() {
     this.$id = '';
  },  
  render: function(id) {
    $(this.el).html(this.template());
    this.addAllCat();
    this.addAll(id);
    $(this.el).find('#producto-lista').addClass('magictime spaceInLeft');
    return this;
  },
  addOne:function( producto ) { 
    if(this.$id != undefined){
      if(producto.attributes.categoria == this.$id){
        var view = new app.ProductoListView({ model: producto });
        this.$('#producto-lista').append( view.render().el );
      } 
    }else{
      var view = new app.ProductoListView({ model: producto });
      this.$('#producto-lista').append( view.render().el );
    } 
  },
  addAll: function(id) {
    this.$('#producto-lista').html('');
    this.$id = id;
    app.Productos.each(this.addOne, this); 
    this.$('#categoria-lista').html('');
  },
  addOneCat: function( categoria ) {
    var view = new app.CategoriaMenuView({ model: categoria });
    $(this.el).find('#categoria-listas').append( view.render().el );
  },
  addAllCat: function() {
    $(this.el).find('#categoria-listas').html('');
    app.Categorias.each(this.addOneCat, this);  
  },
  viewByCat: function(e) {
    app.SunRouter.navigate("#/producto/"+e.toElement.id);
  }
});