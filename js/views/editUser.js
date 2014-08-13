var app = app || {};


app.EditUserView = Backbone.View.extend({
  
  tagName: 'div',
  template: _.template( $('#adminUsuariosEdit').html() ),

  events: {
    'click #edit-movie': 'save', 
  },

  initialize: function() {
    this.$input1 = this.$('#edit-movie-title');
    this.$input2 = this.$('#edit-movie-year');
    this.$input3 = this.$('#edit-movie-genre');
    this.$el.html( this.template( this.model.attributes ) );
    this.listenTo(app.Movies, 'change', this.close);
    return this;
  },
    
  newAttributes: function() {
   return {
     title: this.$input1.val().trim(),
     year: this.$input2.val().trim(),
     genre: this.$input3.val().trim(),
    };
  },

  save: function() {
    this.$input1 = this.$('#edit-movie-title');
    this.$input2 = this.$('#edit-movie-year');
    this.$input3 = this.$('#edit-movie-genre');
    this.model.save( this.newAttributes());
  },
  close: function() {
    // Remove view from DOM
    this.remove();  
    Backbone.View.prototype.remove.call(this);
  }

});