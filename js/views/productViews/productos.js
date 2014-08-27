var app = app || {};

app.ProductoView = Backbone.View.extend({

  template: _.template( $('#adminProductos').html() ),


  events: {
    'click #agregarProducto' : 'add',
    'submit #addProducto' : 'guardar',
    'click #verProducto' : 'ver',
    'focus #categoria' : 'chargeCategorias',
    'focus #cod' : 'fixImagenes',
  },
  
  initialize: function() {
    this.listenTo(app.Productos, 'reset', this.addAll);
    this.listenTo(app.Productos, 'change', this.addAll);
    app.Productos.fetch();
    app.Categorias.fetch();
  },  
  render: function(y) {
    $(this.el).html(this.template());
    this.checkZapas();
    this.checkTamaño();
    this.checkNiño();
    $('input[type="checkbox"]').checkbox();
    for(x = 1 ; x<7 ; x++){this.imagenes(x);}
    
    this.addAll();
    this.addAllCat();
    
    if(y != "admin"){
      $(this.el).find('#addProducto').hide();
    }else{
      $(this.el).find('#producto-lista').hide();
      $(this.el).find('#addProducto').show();

    }
    return this;
  },
  fixImagenes : function () {
    for(x = 1 ; x<7 ; x++){this.imagenes(x);}
  },
  guardar : function (event) {
    event.preventDefault();
    this.imagePhp();
    var formData = {};
    $( '#addProducto div' ).children( 'input' ).each( function( i, el ) {
        if( $( el ).val() != '' && $(el).val() != 'on' )
        {
          formData[ el.id ] = $( el ).val();
        }
    });
    formData[ 'tamaño' ]  = '';
    $("input[type='checkbox']:checked").each( 
      function(i, el) { 
       formData[ 'tamaño' ] += el.id + ',';
      }   
    );
    var x= 1;

    $("canvas").each( 
      function(i, el) { 
        formData[ 'imagen'+x ] = '';
        if(el.width < 300 ){
          formData[ 'imagen' +x]  = formData[ 'cod' ]+'_'+x+'.jpg' ;     
        }
        x++;
      }   
    );

    app.Productos.create( formData );
    $(this.el).find('#addProducto').hide();
  },
  imagenes : function (x){
    require(["dojo/dom", "dojo/domReady!"], function(dom){
      var MAX_HEIGHT = 200;
      
      var target = dom.byId("preview"+x),
        preview = dom.byId("preview"+x),
        canvas = dom.byId("imagen"+x),
        input = dom.byId("file"+x);


      var render = function(src){
        var img = new Image();

        img.onload = function(){
          if(img.height > MAX_HEIGHT) {
            img.width *= MAX_HEIGHT / img.height;
            img.height = MAX_HEIGHT;
          }
          var ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          preview.style.width = img.width + "px";
          preview.style.height = img.height + "px";
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
        };
        img.src = src;
      };
    
      var readImage = function(imgFile){
        if(!imgFile.type.match(/image.*/)){
          console.log("The dropped file is not an image: ", imgFile.type);
          return;
        }

        var reader = new FileReader();
        reader.onload = function(e){
          render(e.target.result);
        };
        reader.readAsDataURL(imgFile);
      };
      //  DOMReady setup
      if(target != undefined && input != undefined) {
        target.addEventListener("dragover", function(e) {e.preventDefault();}, true);
        target.addEventListener("drop", function(e){
   
          e.preventDefault(); 
          readImage(e.dataTransfer.files[0]);
        }, true);
        input.addEventListener("change", function(e){
   
          e.preventDefault(); 
          readImage( this.files[0]);
        }, true);

      }
    });
  },
  checkZapas:function (){
    var isCheck=true;
     this.$('#zapas-all').click(function () {
      if(isCheck){$('#zapas-all').closest('fieldset').find('input').prop('checked','checked');}
      else{$('#zapas-all').closest('fieldset').find('input').prop('checked','');}
      isCheck=!isCheck;
    });
  },
  checkTamaño:function (){
    var isCheck=true;
     this.$('#tamaño-all').click(function () {

      if(isCheck){$('#tamaño-all').closest('fieldset').find('input').prop('checked','checked');}
      else{$('#tamaño-all').closest('fieldset').find('input').prop('checked','');}
      isCheck=!isCheck;
    });  
  },
  checkNiño:function (){
    var isCheck=true;
     this.$('#niño-all').click(function () {
    
      if(isCheck){$('#niño-all').closest('fieldset').find('input').prop('checked','checked');}
      else{$('#niño-all').closest('fieldset').find('input').prop('checked','');}
      isCheck=!isCheck;
    });
  },
  imagePhp:function () {
    var x = 1;
    for(x=1;x<7;x++){
      var canvas = document.getElementById("imagen"+x);
      if(canvas.width < 300 ){
        //tengo que mandar el cod + x
    /*  require(["dojo/request"], function(request){
          request.post("../php/saveImage.php", {
            data: {
              imageName: "myImage.png",
              imageData: encodeURIComponent(document.getElementById("canvas").toDataURL("image/png"))
            }
          }).then(function(text){
              console.log("The server returned: ", text);
          });
        });*/
      }   
    } 
  },
  chargeCategorias:function(){
    this.$("#categoria").html('');
    this.$("#categoria").append($("<option>").text('---'));
     
    app.Categorias.each(
      function (categoria){
       this.$("#categoria").append($("<option>").attr("value", categoria.get('cod') ).text(categoria.get('name')));
      }
    );
  },  
  addOne: function( producto ) {
    var view = new app.ProductoListView({ model: producto });
    this.$('#producto-lista').append( view.render().el );
  },
  addAll: function() {
    this.$('#producto-lista').html('');
    app.Productos.each(this.addOne, this);  
    this.$('#categoria-lista').html('');
  },
    addOneCat: function( categoria ) {
    var view = new app.CategoriaMenuView({ model: categoria });
    this.$('#categoria-lista').append( view.render().el );
  },
  addAllCat: function() {
    this.$('#categoria-lista').html('');
    app.Categorias.each(this.addOneCat, this);  
  },
});