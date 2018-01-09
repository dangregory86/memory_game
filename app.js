/*
 * Create a list that holds all of your cards
 */
//variables
var timer;
var stars = 3;
var previousCard = "";
var previousID = "";
var count = 0;
var numMatched = 0;
var modal = $( "#myModal" );
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
//function to restart the Game
function win() {
	console.log( numMatched );
	if ( numMatched > 15 ) {
		clearInterval( timer );
		var endTime = $( ".Timer" ).text();
		var congratulations = winStatement( stars );
		//set the modal text
		$( "#modal-text" ).html( congratulations + "<br/>It took you " + ( count + 1 ) + " moves in " + endTime + "<br />Would you like to play again?" );
		modal.css( 'display', 'block' );
	}

}

//function to form the winner winStatement
function winStatement( num ) {
	if ( num === 3 ) {
		return "Wow, 3 stars, what a champ";
	} else if ( num === 2 ) {
		return "Nearly there... 2 stars";
	} else if ( num === 1 ) {
		return "Better luck next time... 1 star";
	} else {
		return "What happened out there... no stars";
	}
}

//functions to close the modal
function restartYes() {
	restartGame();
	modal.css( 'display', 'none' );
}

function restartNo() {
	modal.css( 'display', 'none' );
}

//function to restart the Game
function restartGame() {
	//reset the score, timer and reset the stars.
	clearInterval( timer );
	previousCard = "";
	previousID = "";
	count = 0;
	numMatched = 0;
	increaseScore();
	$( '.Timer' ).text( "0 Seconds" );
	showStars();
	//reshuffle the deck
	setup();
	turnAllOver();
}

//function to remove starts every few Moves
function removeStar() {
	if ( stars > 0 ) {
		var star = "#star-" + stars;
		$( star ).hide( "slow" );
		stars--;
	}
}

function showStars() {
	stars = 3;
	for ( var star = 1; star < 4; star++ ) {
		var str = "#star-" + star;
		$( str ).show();
	}
}

//function to increase the score on the screen
function increaseScore() {
	$( ".moves" ).text( count );
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
function setup() {
	cards = shuffle( cards );
	card.each( function( index, el ) {
		$( this ).attr( 'id', "cd" + index );
		var txt = returnCardDetail( index );
		$( this ).text( txt );
	} );
}

function turnAllOver() {
	card.each( function( index, el ) {
		$( this ).removeClass( 'match open show' );
	} );
}

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
	$( previous ).removeClass( 'open show' );
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
	var thisId = _this.attr( 'id' ); //gets the id of the current card html object
	var thisCard = _this.text(); //gets the letter of the current card
	if ( count < 1 ) { // starting the game timer/score/previous variables
		var start = new Date;
		startTimer( start );
		_this.addClass( 'open show' );
		previousCard = thisCard;
		previousID = thisId;
	} else {
		if ( thisId === previousID ) { // ensuring nothing happens is the same card is clicked twice

		} else if ( thisCard === previousCard && thisId !== previousID ) { // if the cards match
			_this.addClass( 'open show' );
			matched( thisId, previousID );
			numMatched += 2;
			win();
		} else { // if the cards don't match turn the previous card back over
			_this.addClass( 'open show' );
			turnBack( previousID );
			previousCard = thisCard;
			previousID = thisId;
		}
	}
	checkClicks();
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
//set interval taken from a stack overflow thread
function startTimer( time ) {
	timer = setInterval( function() {
		$( '.Timer' ).text( Math.round( ( new Date - time ) / 1000, 0 ) + " Seconds" );
	}, 1000 );
}

//function to check if the clicks have reached enough to remove a star
function checkClicks() {
	if ( count > 1 && count % 15 === 0 ) {
		removeStar();
	}
}

setup();
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