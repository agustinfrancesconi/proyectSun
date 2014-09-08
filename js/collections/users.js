var app = app || {};
// User Collection
// ---------------
var UserList = Backbone.Collection.extend({
  // Reference to this collection's model.
  model: app.User,
 // url: 'php/userController.php/usuario'
  localStorage: new Backbone.LocalStorage('user-backbone'),
});

// Create our global collection of **users**.
app.Users = new UserList();
