var app = app || {};

app.UserView = Backbone.View.extend({

  template: _.template( $('#adminUsuarios').html() ),

  events: {
    'click #agregarUser' : 'add',
    'click #new-user' : 'guardar',
    'click #verUser' : 'ver',
  },
  
  
  initialize: function() {
    this.listenTo(app.Users, 'reset', this.addAll);
    this.listenTo(app.Users, 'change', this.addAll);
    app.Users.fetch();
    this.render();
  },
  
  render: function() {
    $(this.el).html(this.template());
    this.$name  = this.$('#new-user-name');
    this.$user  = this.$('#new-user-user');
    this.$mail  = this.$('#new-user-mail');
    this.$tel   = this.$('#new-user-tel');
    this.$pass  = this.$('#new-user-pass');
    $(this.el).find('#addUser').hide();
    // $(this.el).find('#user-list').hide();
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
    app.Users.create( this.newAttributes() ); 
    this.$name.val('');
    this.$user.val('');
    this.$pass.val('');
    this.$mail.val('');
    this.$tel.val('');
    $(this.el).find('#addUser').hide();
  },
  add: function () {
    $(this.el).find('#user-list').hide();
    $(this.el).find('#addUser').show();
  },
  ver: function () {
    this.addAll();
    $(this.el).find('#addUser').hide();
    $(this.el).find('#user-list').show();
    //cargo el formulario de vista + edicion para modificar el usuario
  },
  addOne: function( user ) {
    var view = new app.UserListView({ model: user });
    $('#user-list').append( view.render().el );
  },
  addAll: function() {
    this.$('#user-list').html('');
    app.Users.each(this.addOne, this);
  },
});