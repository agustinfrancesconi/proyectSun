var app = app || {};

app.ProductoView = Backbone.View.extend({

  template: _.template( $('#adminProductos').html() ),

  events: {
    'click #' : 'checkTamaños',
    'click #agregarProducto' : 'add',
    'submit #addProducto' : 'guardar',
    'click #verProducto' : 'ver',
  },
  
  initialize: function() {
    $(this.el).html(this.template());
 
    this.checkZapas();
    this.checkTamaño();
    this.checkNiño();
    this.listenTo(app.Productos, 'reset', this.addAll);
    this.listenTo(app.Productos, 'change', this.addAll);
    app.Productos.fetch();
    app.Categorias.fetch();
    this.chargeCategorias();
    this.render();
  },  
  render: function() {
    $('input[type="checkbox"]').checkbox();
    for(x = 1 ; x<6 ; x++){this.imagenes(x);}
    $(this.el).find('#addproducto').hide();
    return this;
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
    var x= 0;
    formData[ 'imagen' ] = '';
    $("canvas").each( 
      function(i, el, x) { 
        x++;
        if(el.width < 300 ){
          formData[ 'imagen' ] += el.id + ',';     
        }
      }   
    );
    app.Productos.create( formData );
  },
  imagenes : function (x){
    require(["dojo/dom", "dojo/domReady!"], function(dom){
    var MAX_HEIGHT = 200;
    var target = dom.byId("preview"+x),
      preview = dom.byId("preview"+x),
      canvas = dom.byId("imagen"+x);

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
    target.addEventListener("dragover", function(e) {e.preventDefault();}, true);
    target.addEventListener("drop", function(e){
      e.preventDefault(); 
      readImage(e.dataTransfer.files[0]);
    }, true);
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
    for(x=1;x<6;x++){
      var canvas = document.getElementById("imagen"+x);
      if(canvas.width < 300 ){
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
   //$('#categoria-select').html('');
   $("#categoria-select").append("<option value='31'>31</option>");
    app.Categorias.each(
      function (i, categoria){
        console.log($("#categoria-select"));
        $("#categoria-select").append($("<option>").attr("value", categoria).text(categoria));
      }
    );
  },  

  
});