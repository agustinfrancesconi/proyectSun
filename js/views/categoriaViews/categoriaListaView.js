  var app = app || {};

app.CategoriaListaView = Backbone.View.extend({
  
  template: _.template( $('#adminCategoriasListaView').html() ),

  events: {
    'click #new-close' : 'close',
  },
   
  initialize: function() {
  },
  render: function(x) {
    $(this.el).html(this.template());
    this.addAll()
    $(this.el).find('#categoria-lista').addClass('magictime spaceInLeft');
    return this;
  },
  addOne: function( categoria ) {
    var view = new app.CategoriaListView({ model: categoria });
     $(this.el).find('#categoria-lista').append( view.render().el );
  },
  addAll: function() {
    $(this.el).find('#categoria-lista').html('');
    app.Categorias.each(this.addOne, this);
    $(this.el).find('#categoria-list').show();
  },
  close: function() {
    this.ver();
  }
});