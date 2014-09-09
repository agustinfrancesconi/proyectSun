var app = app || {};

app.UserView = Backbone.View.extend({

  template: _.template( $('#adminUsuarios').html() ),

  events: {
    'submit #addUser' : 'guardar',
    'click #new-close' : 'close',
  },
  initialize: function() {
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
    $(this.el).find('#addUser').hide();
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

