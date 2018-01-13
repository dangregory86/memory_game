//variables
var imageHTML1 = "<img class=\"icon\" src=\""
var imageHTML2 = "\" alt=\"icon-pic\" />"
var timer;
var stars = 3;
var previousCard = "";
var previousID = "";
var count = 0;
var numMatched = 0;
var modal = $( "#myModal" );
var won = false;
var anim = false;
//an array list of possible cards
var cards = [ 'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H' ];
//the card object using jQuery
var card = $( ".card" );

/*
 * @description A function to set the correct image to the relevent letter from the cards array
 * @params a letter from the cards array selects the relevant icon.
 * @returns {string} a string to the correct image file
 */
function setImage( card_letter ) {
	var image;
	switch ( card_letter ) {
		case "A":
			image = "images/card_icons/cloud.png"
			break;
		case "B":
			image = "images/card_icons/note.png"
			break;
		case "C":
			image = "images/card_icons/padlock.png"
			break;
		case "D":
			image = "images/card_icons/pencil.png"
			break;
		case "E":
			image = "images/card_icons/person.png"
			break;
		case "F":
			image = "images/card_icons/sun.png"
			break;
		case "G":
			image = "images/card_icons/tag.png"
			break;
		default:
			image = "images/card_icons/thunder.png"
			break;
	}
	return image;
}

/*
 * @description A function to see if the game is completed with a high enough score
 * If the game has been won then a modal is displayed showing the score and asks if you would like to play again
 * if so the game will restart.
 */
function win() {
	console.log( numMatched );
	if ( numMatched > 15 ) {
		won = true; //sets the boolean of won to true, preventing the game from carrying on
		setTimeout( function() {
			anim = true;
		} );
		clearInterval( timer );
		var endTime = $( ".Timer" ).text();
		var congratulations = winStatement( stars );
		//set the modal text
		$( "#modal-text" ).html( congratulations + "<br/>It took you " + ( count + 1 ) + " moves in " + endTime + "<br />Would you like to play again?" );
		modal.css( 'display', 'block' );
	}

}

/*
 * @description A function to decide the win statement to be shown
 * @ param {int} receives an integer of the number of stars remaining
 * @returns {string} string for the correct message to display
 */
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

/*
 * @description Functions linked to the modal buttons.
 */
function restartYes() {
	restartGame();
	modal.css( 'display', 'none' );
}

function restartNo() {
	modal.css( 'display', 'none' );
}

/*
 * @description A funtion to restart the game.
 */
function restartGame() {
	//reset the score, timer and reset the stars.
	clearInterval( timer );
	previousCard = "";
	previousID = "";
	count = 0;
	numMatched = 0;
	won = false;
	increaseScore();
	$( '.Timer' ).text( "0 Seconds" );
	showStars();
	//reshuffle the deck
	setup();
	turnAllOver();
}

/*
 * @description A function to remove cards every few moves.
 */
function removeStar() {
	if ( stars > 0 ) {
		var star = "#star-" + stars;
		$( star ).hide( "slow" );
		stars--;
	}
}

/*
 * @description A function to show all 3 stars prior to starting a game.
 */
function showStars() {
	stars = 3;
	for ( var star = 1; star < 4; star++ ) {
		var str = "#star-" + star;
		$( str ).show();
	}
}

/*
 * @description A function to increase the score on the screen.
 */
function increaseScore() {
	$( ".moves" ).text( count );
}

/*
 * @description A function to ensure the correct image is returned for each card.
 * @param {int} receives an int which is used substituded to find the array index
 * @returns {String} the letter in that position in the array.
 */
function returnCardDetail( index ) {
	return cards[ index ];
}

/*
 * @description A function to check if the cards matched.
 * @params {string, string}. strings are compared to check for a match
 * @returns {boolean} true or false depending on if they match.
 */
function cardsMatch( txta, txtb ) {
	if ( txta === txtb ) {
		return true;
	} else {
		return false;
	}
}

/*
 * @description A function to iterate through all the card objects and add the correct images
 * ready for the game to start.
 */
function setup() {
	cards = shuffle( cards );
	card.each( function( index, el ) {
		$( this ).attr( 'id', "cd" + index );
		var icon = setImage( returnCardDetail( index ) );
		$( this ).html( imageHTML1 + icon + imageHTML2 );
		$( this ).find( "img" ).hide();
	} );
}

/*
 * @description A function to turn al the cards back over ready to start the game again.
 */
function turnAllOver() {
	card.each( function( index, el ) {
		$( this ).removeClass( 'match open show' );
	} );
}

/*
 * @description A listener function to add a red border to the card as the mouse pases over.
 */
card.mouseover( function( event ) {
	$( this ).css( {
		'border-style': 'solid',
		'border-color': 'red'
	} );
} );

/*
 * @description A listener function to remove the border as the mouse leaves the card.
 */
card.mouseleave( function( event ) {
	$( this ).css( 'border-style', 'none' );
} );


/*
 * @description A function to turn back the previous card if it didn't match
 * @params It takes a card HTML object.
 */
function turnBack( previous ) {
	var previous = "#" + previous;
	thisCard = $( previous );
	wrongCard( thisCard ).done( function() {
		thisCard.removeClass( 'open show' );
		thisCard.find( "img" ).hide();
		anim = false;
	} );
}

/*
 * @description a function to change the card look when matched
 * @params. it takes 2 card HTML objects as parameters
 */
function matched( _this, previous ) {
	numMatched += 2;
	win();
	setTimeout( function() {
		anim = false;
	}, 1000 );
	previousCard = "";
	previousID = "";
	++count;
	var _thisCard = $( "#" + _this );
	var _previousCard = $( "#" + previous );
	_thisCard.addClass( 'match' );
	_previousCard.addClass( 'match' );
	_thisCard.find( "img" ).show();
	_previousCard.find( "img" ).show();
}

/*
 * @description When a card is clicked on it should turn over.
 * It checks to see if the game has been finished.
 */
card.mousedown( function( event ) {
	if ( won != true || anim != true ) {
		var thisId = $( this );
		turnCardOver( thisId ).done( function() {
			turnOver( thisId );
			increaseScore();
			turnCardOver( thisId ).done( function() {
				if ( count < 2 && won != true ) {
					anim = false;
				}
			} );
		} );
	}
} );

/*
 * @description a function to turn the card over
 * @params. It takes a card HTML object as it's input
 */
function turnOver( _this ) {
	_this.find( "img" ).show();
	completeMove( _this );
}

/*
 * @description a function to complete the moves
 * @params is a card object
 */
function completeMove( card_object ) {
	var thisId = card_object.attr( 'id' ); //gets the id of the current card html object
	var thisCard = card_object.html(); //gets the letter of the current card
	if ( count < 1 ) { // starting the game timer/score/previous variables
		var start = new Date;
		startTimer( start );
		card_object.addClass( 'open show' );
		previousCard = thisCard;
		previousID = thisId;
		++count;
	} else {
		if ( thisId === previousID ) { // ensuring nothing happens is the same card is clicked twice

		} else if ( thisCard === previousCard && thisId !== previousID ) { // if the cards match
			card_object.addClass( 'open show' );
			matched( thisId, previousID );
		} else { // if the cards don't match turn the previous card back over
			card_object.addClass( 'open show' );
			if ( previousCard !== "" ) {
				turnBack( previousID );
			}
			previousCard = thisCard;
			previousID = thisId;
			++count;
		}
	}
	checkClicks();
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

// @description set interval taken from a stack overflow thread
function startTimer( time ) {
	timer = setInterval( function() {
		$( '.Timer' ).text( Math.round( ( new Date - time ) / 1000, 0 ) + " Seconds" );
	}, 1000 );
}

/*
 * @description function to check if the clicks have reached enough to remove a star
 */
function checkClicks() {
	if ( count > 1 && count % 20 === 0 ) {
		removeStar();
	}
}

/*
 * @description All the functions for the animation.
 *@params for them al is a card HTML object
 * @returns {promise}
 */
function turnCardOver( cardObject ) {
	anim = true;
	return cardObject.slideToggle( "fast" ).promise();
}

/*
 * @description All the functions for the animation.
 * @params for them al is a card HTML object
 * @returns {promise}
 */
function wrongCard( cardObject ) {
	var interval = 100;
	var distance = 10;
	var times = 4;
	anim = true;
	for ( var iter = 0; iter < ( times + 1 ); iter++ ) {
		cardObject.animate( {
			left: ( ( iter % 2 == 0 ? distance : distance * -1 ) )
		}, interval );
	}
	return cardObject.animate( {
		left: 0
	}, interval ).promise();
}

setup();