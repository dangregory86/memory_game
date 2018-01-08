/*
 * Create a list that holds all of your cards
 */ 
 //variables
 var previousCard = "";
 var previousID = "";
 var count = 0;
 var numMatched = 0;
//an array list of possible cards
var cards = [ 'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H' ];
//the card object using jQuery
var card = $( ".card" );
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//function to increase the score on the screen
function increaseScore(){
  $(".moves").text(count);
}

//function to get the detail to go on the card
function returnCardDetail( index ) {
	return cards[ index ];
}

//function to check if the cards matched
function cardsMatch( txta, txtb ) {
	if ( txta === txtb ) {
		return true;
	} else {
		return false;
	}
}

//shuffle the cards and enter the details onto each card in the page
cards = shuffle( cards );
card.each( function( index, el ) {
	$( this ).attr( 'id', "cd" + index );
	var txt = returnCardDetail( index );
	$( this ).text( txt );
} );

//highlight the card the mouse is over by adding a red border
card.mouseover( function( event ) {
	$( this ).css( {
		'border-style': 'solid',
		'border-color': 'red'
	} );
} );

//remove the highlight as the mouse moves away
card.mouseleave( function( event ) {
	$( this ).css( 'border-style', 'none' );
} );


//turn the wrong cards back over
function turnBack( previous ) {
		var previous = "#" + previous;
		$( previous ).toggleClass( 'open show' );
}

//matched
function matched( _this, previous ) {
	$( "#" + _this ).addClass( 'match' );
	$( "#" + previous ).addClass( 'match' );
}

//turn the card over on clicked
card.mousedown( function( event ) {
	turnOver( $( this ) );
  increaseScore();
} );

//turn the card over
function turnOver( _this ) {
	_this.toggleClass( 'open show' );
	var thisId = _this.attr( 'id' );
	var thisCard = _this.text();
	if ( count < 1 ) {
		previousCard = thisCard;
		previousID = thisId;
	} else {
		if ( thisId === previousID ) {
			// previousID = null;
		} else if ( thisCard === previousCard && thisId !== previousID ) {
			matched( thisId, previousID );
      numMatched += 2;
			// count = 0;
		} else {
			turnBack( previousID );
			previousCard = thisCard;
			previousID = thisId;
		}
	}
  console.log(previousID);
	++count;
}



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle( array ) {
	var currentIndex = array.length,
		temporaryValue, randomIndex;

	while ( currentIndex !== 0 ) {
		randomIndex = Math.floor( Math.random() * currentIndex );
		currentIndex -= 1;
		temporaryValue = array[ currentIndex ];
		array[ currentIndex ] = array[ randomIndex ];
		array[ randomIndex ] = temporaryValue;
	}

	return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
