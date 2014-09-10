var app = app || {};

app.ProductoView = Backbone.View.extend({

  template: _.template( $('#adminProductos').html() ),

  events: {
    'click #verProducto' : 'ver',
    'click #categoria-listas' : 'viewByCat',
  },
  
  initialize: function() {
     this.$id = '';
      this.$name = '';
  },  
  render: function(id, name) {

    $(this.el).html(this.template());
    this.addAllCat();
    this.addAll(id,name);
    $(this.el).find('#producto-lista').addClass('magictime spaceInLeft');
    return this;
  },
  addOne:function( producto ) { 
    if(this.$id != ''){
       console.log('id: ' + this.$name);
      if(producto.attributes.categoria == this.$id){
        var view = new app.ProductoListView({ model: producto });
        this.$('#producto-lista').append( view.render().el );
      } 
      if(this.$id == undefined ){
        var view = new app.ProductoListView({ model: producto });
        this.$('#producto-lista').append( view.render().el );
      }
    }else{
      console.log('name: ' + this.$name);
      if(this.$name != ''){
        if(producto.attributes.name == this.$name){
          var view = new app.ProductoListView({ model: producto });
          this.$('#producto-lista').append( view.render().el );
        } else{ }
    }else{

      var view = new app.ProductoListView({ model: producto });
      this.$('#producto-lista').append( view.render().el );
    }
      
    }
    
  },
  addAll: function(id,name) {
    this.$('#producto-lista').html('');
    this.$id = id;
    this.$name = name;
  
    app.Productos.each(this.addOne, this); 
    this.$('#categoria-lista').html('');
    this.$id = ''; 
     this.$name = ''; 
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