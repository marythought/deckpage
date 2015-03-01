function Card(r, s) {
this.rank = r;
this.suit = s;
this.toHTML = function() {
  return "<li class='card'><br><br>" + this.rank + "-" + this.suit + "</li>";
  }
}

function Deck() {
  var thisDeck = this;
  this.suits = ['H', 'C', 'D', 'S'];
  this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  $.each(thisDeck.suits, function() {
    var suit = this;
    $.each(thisDeck.ranks, function() {
      var rank = this;
      var card = new Card(rank, suit);

      $('#deck').append(card.toHTML());
    });
  });
}

var deck = new Deck();
$( "li:contains('H')" ).addClass( "hearts" );
$( "li:contains('S')" ).addClass( "spades" );
$( "li:contains('C')" ).addClass( "clubs" );
$( "li:contains('D')" ).addClass( "diamonds" );

$('#runButton').on('click', function() {
  var Shuffle = function(m) {
    var rand, $rand;

    rand = Math.floor(Math.random() * m--);

    $("li:eq(" + m + ")").
    after($("li:eq(" + rand + ")")).
    insertBefore($("li:eq(" + rand + ")"))

    if(m) {
    setTimeout(Shuffle, 50, m);
    }
  };

  Shuffle($('.card').length);
});

$('#dealButton').on('click', function() {
  $("#runButton").css('display', 'none')
  var Deal = function() {
    $( "li:odd" ).prependTo( "#computerDeck" );
  }
  Deal();
});
