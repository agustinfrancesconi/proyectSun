var app = app || {};

app.UserView = Backbone.View.extend({

  template: _.template( $('#adminUsuarios').html() ),

  events: {
    'submit #addUser' : 'guardar',
    'click #new-close' : 'close',
    'focus #new-user-name': 'addAllCat',
  },
  initialize: function() {
    this.listenTo(app.Users, 'reset', this.addAll);
    this.listenTo(app.Users, 'change', this.addAll);
    app.Users.fetch();
    this.render();
  },
  render: function(x) {

    $(this.el).html(this.template());
    this.addAllCat();
    this.$name  = this.$('#new-user-name');
    this.$user  = this.$('#new-user-user');
    this.$mail  = this.$('#new-user-mail');
    this.$tel   = this.$('#new-user-tel');
    this.$pass  = this.$('#new-user-pass');
    if(x){
    this.ver1();
    }else{
        this.add1();
    }
   
    return this;
  },
  newAttributes: function() {
    return { 
      //armo el producto con lo proveniente del formulario
      name: this.$name.val().trim(),
      user: this.$user.val().trim(),
      mail: this.$mail.val().trim(),
      tel:  this.$tel.val().trim(),
      pass: this.$pass.val().trim(),
    };
  },
  guardar : function (event) {
    event.preventDefault();
    app.Users.create( this.newAttributes() ); 
    this.$name.val('');
    this.$user.val('');
    this.$pass.val('');
    this.$mail.val('');
    this.$tel.val('');
    $(this.el).find('#addUser').hide();
  },
  add1: function () {
    $(this.el).find('#user-list').hide();
    $(this.el).find('#addUser').show();
    $(this.el).find('#addUser').addClass('magictime spaceInLeft');
  },
  ver1: function () {
    app.Users.reset();
    this.addAll();
    $(this.el).find('#addUser').hide();
    $(this.el).find('#user-lista').show();
    $(this.el).find('#user-lista').addClass('magictime spaceInLeft');
    //cargo el formulario de vista + edicion para modificar el usuario
  },
  addOne: function( user ) {
    var view = new app.UserListView({ model: user });
    $('#user-lista').append( view.render().el );
  },
  addAll: function() {
    console.log("addll");
    this.$('#user-lista').html('');
    app.Users.each(this.addOne, this);
    $('#user-list').show();
  },
  addOneCat: function( categoria ) {
    var view = new app.CategoriaCheckBoxView({ model: categoria });
    this.$('#categorias-permisos').append( view.render().el );
  },
  addAllCat: function() {
    this.$('#categorias-permisos').html('');
    app.Categorias.each(this.addOneCat, this);  
  },
  close: function() {
     this.ver();
  },
});

