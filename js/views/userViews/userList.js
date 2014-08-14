
var app = app || {};

app.UserListView = Backbone.View.extend({

  tagName: 'div',

  template: _.template( $('#adminUsuariosView').html() ),

  events: {
    'click .destroy': 'clear', 
    'click .edit': 'edit', 
  },
  
  initialize: function() {
    this.listenTo(this.model, 'destroy', this.remove);
    this.render();
  },
  render: function() {
    this.$el.html( this.template( this.model.attributes ) );
    return this;
  },  
  edit: function( user ) {
    var view = new app.EditUserView( { model: this.model } );
    $('#edit-list').html( view.render().el );
  },

});