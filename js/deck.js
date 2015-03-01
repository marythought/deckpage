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
  $('#runButton, #dealButton').addClass('hide')
  $('#compareButton').removeClass('hide')
  var Deal = function() {
    $( "li:odd" )
      .prependTo( "#computerDeck" )
      .addClass('computerCard')
      .removeClass('card');
  }
  Deal();
});

var WhoWins = function(card1,card2) {
  //takes in 2 numbers or strings and returns the winner, or zero for war
  if (card1[0] == card2[0]) {
    return false;
  } else if (card1[0] == "A") {
    return card1;
  } else if (card2[0] == "A") {
    return card2;
  } else if (card1[0] == "K") {
    return card1;
  } else if (card2[0] == "K") {
    return card2;
  } else if (card1[0] == "Q") {
    return card1;
  } else if (card2[0] == "Q") {
    return card2;
  } else if (card1[0] == "J") {
    return card1;
  } else if (card2[0] == "J") {
    return card2;
  } else if (card1[1] == "0") {
    return card1;
  } else if (card2[1] == "0") {
    return card2;
  } else if (card1 > card2) {
    return card1;
  } else {
    return card2;
  }
}

$('#compareButton').on('click', function() {
  var Compare = function() {
    var youplay = $(".card:first-child").text();
    var computerplays = $(".computerCard:first-child").text();
    var message = "You play " + String(youplay) + " Computer plays " + String(computerplays);
    var winner = WhoWins(youplay, computerplays);
    if (winner == youplay) {
      $(".card:first-child, .computerCard:first-child").appendTo( "#deck" );
      var result = "You win the round! Cards moved to your hand";
    } else if (winner == computerplays) {
      $(".card:first-child, .computerCard:first-child").appendTo( "#computerDeck" );
      result = "Computer wins the round. Cards moved to computer's hand";
    } else {
      $(".card:first-child, .computerCard:first-child").remove();
      result = "A tie! Nobody gets these cards..."
    }
  $("#playtext").text(message);
  $("#resultstext").text(result);
  }
  Compare();
});
