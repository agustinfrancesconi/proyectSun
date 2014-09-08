var app = app || {};
// UserXcat Collection
// ---------------
var UserXcatList = Backbone.Collection.extend({
  // Reference to this collection's model.
  model: app.UserXcat,
 // url: 'php/userXcatController.php/'
});

// Create our global collection of **usersxcat**.
app.UserXcatS = new UserXcatList();
