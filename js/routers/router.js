// Movie Router
var Workspace = Backbone.Router.extend({
  routes: {
  	'' 				: 'login', 
  	'producto/:id' 	: 'viewProduct', 
  	'productos' 	: 'mainProductos',
  	'categorias' 	: 'mainCategorias',
    'usuarios'  : 'mainUsuarios',
  }, 
  validate : function () { 
    //valida usuario logueado
    //en caso de ser falso lo manda al login
    return true;
  },
  login: function() {
    if(!this.validate()){
    $('body').html(new app.LoginView().render().el);
  }else{
    
  }
  },
  mainUsuarios: function() {
    if(this.validate()){
      $('#mainapp').html(new app.UserView().render().el);
    }  
  },
  mainProductos: function() {
    if(this.validate()){
      $('#mainapp').html(new app.ProductoView().render().el);
    }  
  },
  mainCategorias: function() {
    if(this.validate()){
      $('#mainapp').html('');
      $('#mainapp').html(new app.CategoriaView().render().el);
    }  
  },
  viewProduct: function (id) { 
    alert('you are viewing the product ' + id); 
  },
});

app.SunRouter = new Workspace();
Backbone.history.start();