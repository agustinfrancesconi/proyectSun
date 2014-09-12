var app = app || {};

app.ProductoAddView = Backbone.View.extend({

  template: _.template( $('#productoAdd').html() ),


  events: {
    'submit #addProducto' : 'guardar',
    'focus #name' : 'fixImagenes',
  },
  
  initialize: function() {
  },  
  render: function(y,id) {
    $(this.el).html(this.template());
    this.checkZapas();
    this.checkZapasNino();
    this.checkTamano();
    this.checkMalla();

    this.checkIndNino();
   
    $('input[type="checkbox"]').checkbox();
    for(x = 1 ; x<7 ; x++){this.imagenes(x);}
    this.chargeCategorias();
    $(this.el).find('#addProducto').addClass('magictime spaceInLeft');
    
    return this;
  },
  fixImagenes : function () {
    for(x = 1 ; x<7 ; x++){
      this.imagenes(x);
    }
  },
  guardar : function (event) {
    event.preventDefault();
    var formData = {};
    $( '#addProducto div' ).children( 'input' ).each( function( i, el ) {
        if( $( el ).val() != '' && $(el).val() != 'on' )
        {
          formData[ el.id ] = $( el ).val();
        }
    });



    this.imagePhp(formData[ 'name' ] );
    
    formData[ 'tamano' ]  = '';
    $("input[type='checkbox']:checked").each( 
      function(i, el) { 
        if($(el).attr('class') != 'checkbox all'){
          formData[ 'tamano' ] += el.id + ',';
        }
      }   
    );
    
    var x= 1;
    $("canvas").each( 
      function(i, el) { 
        formData[ 'imagen'+x ] = '';
        if(el.width < 300 ){
          formData[ 'imagen' +x]  = formData[ 'id' ]+'_'+x+'.jpg' ;     
        }
        x++;
      }   
    );

    $("#categoria option:selected").each( 
      function(i, el) { 
        formData['categoria']  = el.value ;
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
  checkZapasNino:function (){
    var isCheck=true;
     this.$('#zapasn-all').click(function () {
      if(isCheck){$('#zapasn-all').closest('fieldset').find('input').prop('checked','checked');}
      else{$('#zapasn-all').closest('fieldset').find('input').prop('checked','');}
      isCheck=!isCheck;
    });
  },
  checkTamano:function (){
    var isCheck=true;
      this.$('#tamano-all').click(function () {
      if(isCheck){$('#tamano-all').closest('fieldset').find('input').prop('checked','checked');}
      else{$('#tamano-all').closest('fieldset').find('input').prop('checked','');}
      isCheck=!isCheck;
    });  
  },
  checkMalla:function (){
    var isCheck=true;
      this.$('#malla-all').click(function () {
      if(isCheck){$('#malla-all').closest('fieldset').find('input').prop('checked','checked');}
      else{$('#malla-all').closest('fieldset').find('input').prop('checked','');}
      isCheck=!isCheck;
    });  
  },
  checkIndNino:function (){
    var isCheck=true;
     this.$('#ninoi-all').click(function () {
      if(isCheck){$('#ninoi-all').closest('fieldset').find('input').prop('checked','checked');}
      else{$('#ninoi-all').closest('fieldset').find('input').prop('checked','');}
      isCheck=!isCheck;
    });
  },
  imagePhp:function (id) {
    var x = 1;
    for(x=1;x<7;x++){
      var canvas = document.getElementById("imagen"+x);
      if(canvas.width < 300 ){
        //tengo que mandar el id + x
        require(["dojo/request"], function(request){
          request.post("php/saveImage.php", {
            data: {
              imageName: id+"_"+x+".jpg",
              imageData: canvas.toDataURL("image/jpg")
            }
          }).then(function(text){
              console.log("The server returned: ", text);
          });
        });
      }   
    } 
  },
  chargeCategorias:function(){
    var x = $(this.el).find("#categoria");
    app.Categorias.each(
      function (categoria){
        x.append($("<option>").attr("value", categoria.get('id') ).text(categoria.get('name')).val(categoria.get('id')));
      }
    );
  }, 
});