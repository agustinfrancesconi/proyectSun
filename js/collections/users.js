var app = app || {};
// User Collection
// ---------------
var UserList = Backbone.Collection.extend({
  // Reference to this collection's model.
  model: app.User,
  
    // Save all of the movie items under the `"movies-backbone"` namespace.
  localStorage: new Backbone.LocalStorage('users-testooo'),
});

// Create our global collection of **users**.
app.Users = new UserList();
