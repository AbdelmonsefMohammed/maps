var map;
var markers = [];
var infoWindow;
var locationSelect;


function initMap() {
    var losAngeles = {lat: 34.063380, lng: -118.358080};
    map = new google.maps.Map(document.getElementById('map'), {
      center: losAngeles,
      zoom: 11,
      mapTypeId: 'roadmap',
      mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU}
    });
    infoWindow = new google.maps.InfoWindow();
    searchStores();
}

function searchStores(){
  var foundStores = [];
  var zipCode  = document.getElementById('zip-code-input').value.substring(0,5);
  if(zipCode){
    if(isNaN(zipCode)){
      foundStores = stores;
      alert(zipCode + ' Not a valid zip code');
    }else{
        stores.forEach(function(store, index){
          var postal = store.address.postalCode.substring(0,5);

          if(postal == zipCode){
            foundStores.push(store);
          }

        });
        if(foundStores.length == 0){
              foundStores = stores;
              alert(zipCode + ' Not a valid zip code');
        }

    }
  }else{
    foundStores = stores;
  }
  clearLocations();
  displayStores(foundStores);
  showStoreMarkers(foundStores);
  setOnClickListener();
}


function setOnClickListener(){
  var storeElements = document.querySelectorAll('.store-container');
  storeElements.forEach(function(elem, index){
    elem.addEventListener('click',function(){
      new google.maps.event.trigger(markers[index],'click');
    })
  });
}

function displayStores(stores){
  var storeHtml = '';
  stores.forEach(function(store, index){
      var address = store.addressLines;
      var phone = store.phoneNumber
      storeHtml += `
        <div class="store-container">
        <div class="store-container-background">
            <div class="store-info-container">
                <div class="store-address">
                    <span>${address[0]}</span>
                    <span>${address[1]}</span>
                </div>
                <div class="store-phone-number">
                    ${phone}
                </div>
            </div>
            <div class="store-number-container">
                <div class="store-number">
                    ${index+1}
                </div>
            </div>
        </div>
      </div>
      `
  });
  document.querySelector('.stores-list').innerHTML = storeHtml;
}

function clearLocations() {
  infoWindow.close();
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers.length = 0;
}

function showStoreMarkers(stores){

  var bounds = new google.maps.LatLngBounds();
  stores.forEach(function(store,index) {
    var latlng = new google.maps.LatLng(
      store.coordinates.latitude,
      store.coordinates.longitude);
    var name = store.name;
    var address = store.addressLines[0];
    createMarker(latlng, name, address, index); 
    bounds.extend(latlng);
  })
  map.fitBounds(bounds);
}

function createMarker(latLng, name, address, index){
  var html = "<b>" + name + "</b> <br/>" + address;
  var marker = new google.maps.Marker({
    map: map,
    position: latLng,
    label: `${index+1}`
  });
  google.maps.event.addListener(marker, 'click', function() {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);

}