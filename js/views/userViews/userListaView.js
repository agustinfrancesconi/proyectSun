var app = app || {};

app.UserListaView = Backbone.View.extend({

  template: _.template( $('#adminUsuariosListaView').html() ),

  events: {
  },
  initialize: function() {
  },
  render: function(x) {
    $(this.el).html(this.template());
    this.addAll();
    return this;
  },
   addOne: function( user ) {
    var view = new app.UserListView({ model: user });
    $(this.el).find('#user-lista').append( view.render().el );
  },
  addAll: function() {
    $(this.el).find('#user-lista').html('');
    app.Users.each(this.addOne, this);
  },
  close: function() {
     this.ver();
  },
});


