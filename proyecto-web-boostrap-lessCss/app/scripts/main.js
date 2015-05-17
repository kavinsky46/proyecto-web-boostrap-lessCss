	//'use strict';		
	$(document).ready(function () {		
		$(".scroll a, .navbar-brand, .gototop,.explore").click(function(event){
			event.preventDefault();
			$('html,body').animate({scrollTop:$(this.hash).offset().top}, 600,'swing');
			$(".scroll li").removeClass('active');
			$(this).parents('li').toggleClass('active');
		});
	
		//Boton para reservar
		$('#btnContact').click(function (e) {
			e.preventDefault();
			var name = $('#name').val();
			var tel = $('#tel').val();
			var msg = $('#msg').val();
			if( name!="" && msg!="" && tel!="" ){
				$('#name').val("");
				$('#tel').val("");
				$('#msg').val("");
				alert("Reserva realizada por "+name+", con teléfono "+tel+".\n\nGracias por reservar previamente, esperamos que disfruten.");
			}
			else{
				alert("Debe rellenar todos los campos.");
			}
		});
	
		//Modal de los thumbnail
		$('#courses img').on('click',function(){
			var src = $(this).attr('src');
			var img = '<img src="' + src + '" class="img-responsive"/>';
			$('#myModalGallery').modal();
			$('#myModalGallery').on('shown.bs.modal', function(){
				$('#myModalGallery .modal-body').html(img);
			});
			$('#myModalGallery').on('hidden.bs.modal', function(){
				$('#myModalGallery .modal-body').html('');
			});
		});
	   
	});

	//Cargar el mapa con google maps
	google.maps.event.addDomListener(window, 'load', init);
    function init() {
        var mapOptions = {
            center: new google.maps.LatLng(42.1365422,-0.4070153),
            zoom: 15,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.DEFAULT,
            },
            disableDoubleClickZoom: true,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            },
            scaleControl: true,
            scrollwheel: false,
            panControl: true,
            streetViewControl: true,
            draggable : true,
            overviewMapControl: true,
            overviewMapControlOptions: {
                opened: false,
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        }
        var mapElement = document.getElementById('map');
        var map = new google.maps.Map(mapElement, mapOptions);
        var locations = [['Coffee Pizza', 'C/ Padre Huesca, nº 7. Huesca', '974214586', 42.1365422, -0.4070153, 'https://mapbuildr.com/assets/img/markers/solid-pin-blue.png']];
        for (i = 0; i < locations.length; i++) {
            if (locations[i][1] =='undefined'){ description ='';} else { description = locations[i][1];}
            if (locations[i][2] =='undefined'){ telephone ='';} else { telephone = locations[i][2];}
			if (locations[i][5] =='undefined'){ markericon ='';} else { markericon = locations[i][5];}
            marker = new google.maps.Marker({
                icon: markericon,
                position: new google.maps.LatLng(locations[i][3], locations[i][4]),
                map: map,
                title: locations[i][0],
                desc: description,
                tel: telephone,
            });
            bindInfoWindow(marker, map, locations[i][0], description, telephone);
		}
		function bindInfoWindow(marker, map, title, desc, telephone) {
			var html= "<div style='color:#000;background-color:#fff;padding:5px;width:150px;'><h4>"+title+"</h4><p>"+desc+"<p><p>"+telephone+"<p></div>";
			var iw = new google.maps.InfoWindow({content:html});
			google.maps.event.addListener(marker, 'click', function() {
					iw.open(map,marker);
			});
			google.maps.event.addListener(iw, 'closeclick', function () {
				iw.close(map,marker);
			});
		}
	}

