var app = app || {};

app.LoginView = Backbone.View.extend({
    
    template: _.template( $('#loginAut').html() ),
    
    render:function () {
        $(this.el).html(this.template());
        return this;
    },
    initialize:function () {
      var url = '../api/login';
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
        if(formValues.email != '' && formValues.password != ''){
        
        $.ajax({
            url:url,
            type:'POST',
            dataType:"json",
            data: formValues,
            success:function (data) {
                console.log(["Login request details: ", data]);
               
                if(data.error) {  // If there is an error, show the error messages
                    $('.alert-error').text(data.error.text).show();
                }
                else { // If not, send them back to the home page
                    window.location.replace('#');
                }
            }
        });
        }
    
    }
});