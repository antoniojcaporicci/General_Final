

$('.btn').on('click',function(){
  $(this).siblings("ul").toggle();
});


var reservationData = {};


var config = {
  apiKey: "AIzaSyDyL5jFOa72BrC5k22HL7BPEwFzR-zsyz0",
  authDomain: "reservation-site-cfea4.firebaseapp.com",
  databaseURL: "https://reservation-site-cfea4.firebaseio.com",
  projectId: "reservation-site-cfea4",
  storageBucket: "reservation-site-cfea4.appspot.com",
  messagingSenderId: "881728859465"
};
firebase.initializeApp(config);

var database = firebase.database();

$('.reservation-day').click(function() {
  reservationData.day = $(this).text();
});

//Post reservation data to firebase
$('.reservations').on('submit', function(event) {
  event.preventDefault();
  reservationData.name = $('.reservation-name').val();
  database.ref('reservations').push(reservationData);
});


//Get information from the template and apppend to page
database.ref('reservations').on('child_added', function(snapshot) {
  var reservationList = $('.reservation-list');
  var reservations = snapshot.val();
  var source   = $("#reservation-template").html();
  var template = Handlebars.compile(source);
  reservationList.append(reservationTemplate);
});

// initialize the configuration of map
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7128, lng: -74.0059},
    zoom: 10,
    scrollwheel: false,
    styles: [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}]
  });

//Place marker on the map
  var marker = new google.maps.Marker({
    position: {lat: 40.7128, lng: -74.0059},
    map: map,
    title: 'Monks Café'
  });
}
