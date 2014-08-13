var app = app || {};

app.LoginView = Backbone.View.extend({
    
    template: _.template( $('#loginAut').html() ),
    
    render:function () {
        $(this.el).html(this.template());
        return this;
    },
    initialize:function () {
        console.log('Initializing Login View');
        this.render();
    },
    events: {
        "click #loginButton": "login"
    },
    login:function (event) {
        event.preventDefault(); // Don't let this button submit the form
        var formValues = {
            email: $('#inputEmail').val(),
            password: $('#inputPassword').val()
        };  
        if(formValues){
            //set the user 
            //mando al home
            app.SunRouter.navigate("");
        }
    
    }
});