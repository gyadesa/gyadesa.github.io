// Map script to link map markers to the firebase.
function initMap() {
    var infowindow = new google.maps.InfoWindow();

    var pierre = { lat: 46.932008, lng: 2.625380 };
    var country;
    var map = new google.maps.Map(
        document.getElementById('map'), { zoom: 1.75, center: pierre });
    // The marker, positioned at Uluru


    for (var i = 0; i < countryData.length; i++) {
        var marker = new google.maps.Marker({ position: { lat: +countryData[i].lat, lng: +countryData[i].lng }, map: map, title: countryData[i].countryName })

        console.log(countryData[i].lat, countryData[i].lng)

        console.log(countryData[i].countryName)

        marker.addListener('click', function () {
            country = this.title.toUpperCase();
            console.log(country)


            var searchResults;
            database.ref("Countries").orderByKey().equalTo(country).on("value", function (childSnapshot) {

                searchResults = childSnapshot.val();
                console.log(searchResults);

                searchKey = childSnapshot.key;
                music.renderSearchResults(searchResults, country);
            })


        });

    }
}


// script load buttons
$(document).ready(function () {

    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();
    // script loads the map in the id #map-view and position it as a word map.
    // Initialize and add the map

})