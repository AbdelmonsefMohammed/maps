


function initMap() {
    var sydney = {lat: -33.863276, lng: 151.107977};
    map = new google.maps.Map(document.getElementById('map'), {
      center: sydney,
      zoom: 11,
      mapTypeId: 'roadmap',
      mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
    });
}