// Movie Router
var Workspace = Backbone.Router.extend({
  routes: {
    ''         : 'main', 
  	'#' 				: 'main', 
    'login'         : 'login', 
  	
    'producto/:id' 	: 'viewProduct', 
  	'productos' 	: 'viewProduct',
    'productosname/:name'   : 'viewProductName',
    'addproductos'   : 'addProductos',
  	
    'addcategorias' 	: 'addCategorias',
    'vercategorias'  : 'verCategorias',
    
    'addusuario'  : 'addUsuarios',
    'verusuarios'  : 'verUsuarios',

    'userxcat'  : 'mainUserXcat',
  }, 

  initialize: function() {
      app.Categorias.fetch();
      app.Productos.fetch();
      app.Users.fetch();
  },
  validate : function () { 
    //valida usuario logueado
    //en caso de ser falso lo manda al login
    return true;
  },
  login: function() {
    if(this.validate()){
      $('body').html(new app.LoginView().render().el);
    }else{
      
    }
  },
  main: function () {
    if(this.validate()){
      $('#mainapp').html('');
      $('#mainapp').html(new app.ProductoView().render().el);
    }  
  },
  addUsuarios:function() {
    if(this.validate()){
      $('#mainapp').html('');
      $('#mainapp').html(new app.UserView().render().el);
    }  
  },
  verUsuarios:function() {
    if(this.validate()){
      $('#mainapp').html('');
      $('#mainapp').html(new app.UserListaView().render().el);
    }  
  },
  addCategorias: function() {
    if(this.validate()){
      $('#mainapp').html('');
      $('#mainapp').html(new app.CategoriaView().render().el);
    }  
  },
  verCategorias: function() {
    if(this.validate()){
      $('#mainapp').html('');
      $('#mainapp').html(new app.CategoriaListaView().render().el);
    }  
  },
  viewProduct: function (id) { 
    if(this.validate()){
      $('#mainapp').html('');
      $('#mainapp').html(new app.ProductoView().render(id).el);
    }   
  },
  viewProductName: function (name) { 
    if(this.validate()){
      $('#mainapp').html('');
      $('#mainapp').html(new app.ProductoView().render('',name).el);
    }   
  },
  addProductos: function () {
    if(this.validate()){
      $('#mainapp').html('');
      $('#mainapp').html(new app.ProductoAddView().render().el);
    }   
  },
});

app.SunRouter = new Workspace();

Backbone.history.start();