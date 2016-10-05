$(function(){
  //ask the server for songs, and draw them
  getSongs();
  //listen for submit events and send new songs to the server
  $('form').on('submit', function(event){
    event.preventDefault();
    var formData = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: '/songs',
      data: formData,
      success: getSongs,
      error: function (entry){
        console.log("status", entry.status);
        console.log("there was an error!");
        if(entry.status === 404){
          alert("You have already submitted that song!");
        }else {
        alert("Please fill out the form.");
      }
    }
    });
    $(this).find('input[type=text]').val('');
  });
});

function getSongs() {
$.ajax({
  type: 'GET',
  url: '/songs',
  success: function (songs){
    $('#songs').empty();
    songs.forEach(function(song){
      var $li =$('<li></li>');
      //title and artist correspond to the input name attributes
      $li.append('<p>'+song.title+'</p>');
      $li.append('<p>by: '+song.artist+'</p>');
      //this adds the new date to the DOM
      $li.append('<p>date added: '+song.date+'</p>')
      $('#songs').append($li);
    });
  }
});
}
