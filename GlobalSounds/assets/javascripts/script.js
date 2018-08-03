// for panels
function openPage(pageName, elmnt, color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = color;
}

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBk2E-sl-lDdc5sBCNvLn8p1zBVcELoJ7I",
    authDomain: "globalmusicsearch.firebaseapp.com",
    databaseURL: "https://globalmusicsearch.firebaseio.com",
    projectId: "globalmusicsearch",
    storageBucket: "globalmusicsearch.appspot.com",
    messagingSenderId: "958799204537"
};
firebase.initializeApp(config);
var database = firebase.database();
//hide the Artist Description tab on page load
$("#btn_ArtistInfo").hide();
$("#defaultOpen").hide();
var music = {
    searchCountry: "",
    searchArtist: "",

    search: function (country) {
        var searchResults;
        console.log(country);
        database.ref("Countries").orderByKey().equalTo(country).on("value", function (childSnapshot) {

            console.log(childSnapshot.val());
            searchResults = childSnapshot.val();
            searchKey = childSnapshot.key;
            music.renderSearchResults(searchResults, country);
        })
    },

    

    renderSearchResults: function (searchResults, country) {
        $("#results").html("");
        var artistData = searchResults[country];
        console.log(searchResults[country]);
        var url = "artistInfo.html?artist=";
        $("#results").attr("style:border= 'white solid 1px'");
        $("#results").append("<h2>Artists: </h2>");
        $("#results").append("<div class='artists'><button class='al'><a class='artistlist' href='#'>♫ " + artistData.Artist1 + "</a></button></div>");
        $("#results").append("<div class='artists'><button class='al'><a class='artistlist' href='#'>♫ " + artistData.Artist2 + "</a></button></div>");
        $("#results").append("<div class='artists'><button class='al'><a class='artistlist' href='#'>♫ " + artistData.Artist3 + "</a></button></div>");
        $("#results").append("<div class='artists'><button class='al'><a class='artistlist' href='#'>♫ " + artistData.Artist4 + "</a></button></div>");
        $("#results").append("<div class='artists'><button class='al'><a class='artistlist' href='#'>♫ " + artistData.Artist5 + "</a></button></div>");

    }

}

document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    music.searchCountry = $("#query").val().trim().toUpperCase();
    if (music.searchCountry.length >= 1) {

        music.search(music.searchCountry);
        $("#query").val("");    
    }
   
}, false);

//Clicking on artist search results - show Artist Info tab
$("#results").on('click','.artistlist',function(event){
    $("#btn_ArtistInfo").show();
    $("#defaultOpen").show();
    var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablink");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].style.backgroundColor = "";
            }
            //change highlight color of tab/button
            document.getElementById("ArtistInfo").style.display = "block";
            document.getElementById("btn_ArtistInfo").style.backgroundColor = '#005e52';

            var artist = event.target.text.substring(2);

$("#heading").html("<h1 class='text-center'><strong>" + artist + "</strong></h1>");
console.log(artist);

//API call to last.fm to get artist bio, similar and tags
var artistQueryURL = "https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=" +
  artist + "&api_key= 32a9db80bc64463d6bbf529e71003b2c&format=json";
console.log(artistQueryURL);
$.ajax({
  url: artistQueryURL,
  method: "GET"
})
  .then(function (artistResponse) {
    $("#bio").html("");
    $("#tags").html("");
    $("#suggestions").html("");
    $("#bio").append("<p>"+artistResponse.artist.bio.summary+"</p>");
    var bioImg = $("<img>");
    bioImg.addClass('bioImage');
    bioImg.attr('src',artistResponse.artist.image[2]["#text"]);
    $("#bio").prepend(bioImg);

    
    console.log(artistResponse);
    //  console.log(artistResponse.artist.tags.tag[0]);
    //  console.log(artistResponse.artist.similar.artist[0].image[0]);
    for (var i = 0; i < 5; i++) {
      var tagLink = $("<a>");
      var tagButton = $("<button>");
      tagLink.attr("href", artistResponse.artist.tags.tag[i].url);
      tagLink.attr('title', artistResponse.artist.tags.tag[i].name);
      tagLink.attr('target', '_blank');
      tagLink.text(artistResponse.artist.tags.tag[i].name);
      tagLink.addClass('tagLink');
      tagButton.addClass('btn btn-secondary');
      tagButton.html(tagLink);
      var similarDiv = $("<div>");
      similarDiv.addClass("similarArtist");
      var simLink = $("<a>");
      simLink.attr("href", artistResponse.artist.similar.artist[i].url);
      simLink.attr('title', artistResponse.artist.similar.artist[i].name);
      simLink.attr('target', '_blank');
      simLink.text(artistResponse.artist.similar.artist[i].name);
      simLink.addClass('similarLink');

      var similarImg = $("<img>");
      similarImg.addClass('similarImage');
      similarImg.attr('src', artistResponse.artist.similar.artist[i].image[0]["#text"]);
      similarDiv.append(similarImg);
      similarDiv.append(simLink);

      
      $("#tags").append(tagButton);
      $("#suggestions").append(similarDiv);

    }
  });

  //API call to youtube to get top 7 videos
var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=7&q="
  + artist + "&key=AIzaSyC3e0VoI78wamBroxN91-tKo_MvglEUAKQ";
console.log(queryURL);
var videoURL = "https://www.youtube.com/embed/";
$.ajax({
  url: queryURL,
  method: "GET"
})
  .then(function (response) {
    console.log(response);
    var results = response.items;
    //$("#results").append(JSON.stringify(results));
    console.log(results);
    $("#video-results").html("");
    for (var i = 0; i < results.length; i++) {
      var iFrame = $("<iframe id='vidIframe' width='400' height='300'>");

      var videoDiv = $("<div>");
      videoDiv.addClass('video');
      var videoId = results[i].id.videoId;
      var videoLink = videoURL + videoId;
      var videoTitle = results[i].snippet.title;
      var link = $("<a>");
      link.attr("href", videoLink);
      link.attr('title', videoTitle);
      link.attr('target', '_blank');
      link.text(videoTitle);
      link.addClass('link');

      iFrame.attr('src', videoLink);
      videoDiv.append(link);
      videoDiv.append("<br>");
      videoDiv.append(iFrame);


      $("#video-results").append(videoDiv);

    }
  })



})


