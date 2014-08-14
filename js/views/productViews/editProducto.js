var app = app || {};


app.EditProductoView = Backbone.View.extend({
  
  tagName: 'div',
  template: _.template( $('#adminUsuariosEdit').html() ),

  events: {
    'click .destroy': 'clear', 
    'click #edit-user': 'save', 
  },

  initialize: function() {
    this.listenTo(app.Users, 'change', this.close);
    this.$el.html( this.template( this.model.attributes ) );
    this.$name  = this.$('#edit-user-name');
    this.$user  = this.$('#edit-user-user');
    this.$mail  = this.$('#edit-user-mail');
    this.$tel   = this.$('#edit-user-tel');
    this.$pass  = this.$('#edit-user-pass');
    return this;
  },   
  newAttributes: function() {
    return { 
      //armo el usuario con lo proveniente del formulario
      name: this.$name.val().trim(),
      user: this.$user.val().trim(),
      mail: this.$mail.val().trim(),
      tel:  this.$tel.val().trim(),
      pass: this.$pass.val().trim(),
    };
  },
  save: function() {
    this.model.save( this.newAttributes());
  },
  close: function() {
    // Remove view from DOM
    this.remove();  
    Backbone.View.prototype.remove.call(this);
  }

});