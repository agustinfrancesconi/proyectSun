var app = app || {};

app.LoginView = Backbone.View.extend({
    
    template: _.template( $('#loginAut').html() ),
    
    render:function () {
        $(this.el).html(this.template());
        return this;
    },
    initialize:function () {
        this.render();
    },
    events: {
        "click #loginButton": "login"
    },
    login:function (event) {
        event.preventDefault(); // Don't let this button submit the form
        var formValues = {
            email: $('#user').val(),
            password: $('#pass').val()
        };  
        if(formValues){
            //set the user 
            //mando al home
            app.SunRouter.navigate("");
        }
    
    }
});