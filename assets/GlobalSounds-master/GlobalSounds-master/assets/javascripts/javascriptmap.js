 // Map script to link map markers to the firebase.
 function initMap() {
    var infowindow = new google.maps.InfoWindow();

    var pierre = { lat: 46.932008, lng: 2.625380 };
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
            console.log(country);
            database.ref("Countries").orderByKey().equalTo(country).on("value", function (childSnapshot) {

                console.log(childSnapshot.val());
                searchResults = childSnapshot.val();
                searchKey = childSnapshot.key;
                music.renderSearchResults(searchResults, country);
            })

            $("#results").html("");
            var artistData = searchResults[country];
            // console.log(searchResults[country]);
            var url = "artistInfo.html?artist=";
            $("#results").append("<h2>Artists: </h2>");
            $("#results").append("<div class='artists'><p><a class='artistlist' href='#'>♫ " + artistData.Artist1 + "</a></p></div>");
            $("#results").append("<div class='artists'><p><a class='artistlist' href='#'>♫ " + artistData.Artist2 + "</a></p></div>");
            $("#results").append("<div class='artists'><p><a class='artistlist' href='#'>♫ " + artistData.Artist3 + "</a></p></div>");
            $("#results").append("<div class='artists'><p><a class='artistlist' href='#'>♫ " + artistData.Artist4 + "</a></p></div>");
            $("#results").append("<div class='artists'><p><a class='artistlist' href='#'>♫ " + artistData.Artist5 + "</a></p></div>");

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