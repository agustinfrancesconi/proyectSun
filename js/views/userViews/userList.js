
var app = app || {};

app.UserListView = Backbone.View.extend({

  tagName: 'tr',

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
     this.$el.addClass('magictime spaceInLeft');
    return this;
  },  
  
  clear: function() {
    var x = this.model; 
    bootbox.confirm("Seguro de borrar a " + this.model.attributes.name + "?", function(result) {
    if(result){
      x.destroy();
    }
    });
  
  },
  edit: function( user ) {
    var view = new app.EditUserView( { model: this.model } );
    $('#user-list').hide();
    $('#edit-list').html( view.render().el );
  },

});