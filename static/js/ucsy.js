/**
 * @author Thinzar
 */
$(document).ready(function() {
var spacing = 140;
$('#uni').css({
'width': spacing * 7,
'height': '100px',
'overflow': 'hidden'
}).find('.covers a').css({
	'float': 'none',
	'position': 'absolute',
	'width' : 'inherit',
	'left': 1000
});
var $leftRollover = $('<img/>')
.attr('src', 'img/left.jpg')
.addClass('control')
.css('opacity', 0.6)
.css('display', 'none');



var $rightRollover = $('<img/>')
.attr('src', 'img/right.jpg')
.addClass('control')
.css('opacity', 0.6)
.css('display', 'none');
var setUpCovers = function() {
var $covers = $('#uni .covers a');





$covers.unbind('click mouseenter mouseleave');
// Left image; scroll right (to view images on left).
$covers.eq(0).css('left', 0).click(function(event) {
	$covers.eq(0).animate({'left': spacing}, 'fast');
	$covers.eq(1).animate({'left': spacing * 2}, 'fast');
	$covers.eq(2).animate({'left': spacing * 3}, 'fast');
	$covers.eq(3).animate({'left': spacing * 4}, 'fast');
	$covers.eq(4).animate({'left': spacing * 5}, 'fast');
	$covers.eq(5).animate({'left': spacing * 6}, 'fast');
	$covers.eq(6).animate({'left': spacing * 7}, 'fast');
	$covers.eq($covers.length - 1).css('left', -spacing).animate({'left': 0}, 'fast', function() {
		$(this).prependTo('#uni .covers');
		setUpCovers();
	});
event.preventDefault();
}).hover(function() {
$leftRollover.appendTo(this).show();
}, function() {
$leftRollover.hide();
});
// Right image; scroll left (to view images on right).
$covers.eq(6).css('left', spacing * 6).click(function(event) {
	$covers.eq(0).animate({'left': -spacing}, 'fast', function() {
		$(this).appendTo('#uni .covers');
		setUpCovers();
	});
	$covers.eq(1).animate({'left': 0}, 'fast');
	$covers.eq(2).animate({'left': spacing}, 'fast');
	$covers.eq(3).css('left', spacing * 3).animate({'left': spacing * 2}, 'fast');
	$covers.eq(4).css('left', spacing * 4).animate({'left': spacing * 3}, 'fast');
	$covers.eq(5).css('left', spacing * 5).animate({'left': spacing * 4}, 'fast');
	$covers.eq(6).css('left', spacing * 6).animate({'left': spacing * 5}, 'fast');
	$covers.eq(7).css('left', spacing * 7).animate({'left': spacing * 6}, 'fast');
	/*$covers.eq($covers.length - 1).css('left', -6*spacing).animate({'left': 6*spacing}, 'fast', function() {
		$(this).prependTo('#uni .covers');
		setUpCovers();
	});*/
	event.preventDefault();
}).hover(function() {
$rightRollover.appendTo(this).show();
}, function() {
$rightRollover.hide();
});
$covers.eq(1).css('left', spacing);
$covers.eq(2).css('left', spacing*2);
$covers.eq(3).css('left', spacing*3);
$covers.eq(4).css('left', spacing*4);
$covers.eq(5).css('left', spacing*5);
};
setUpCovers();
});

/* slide show
 *
 *
 */
	$(document).ready(function() {

				//Execute the slideShow
				slideShow();

			});
			function slideShow() {
				//Set the opacity of all images to 0
				$('#gallery a').css({
					opacity : 0.0
				});

				//Get the first image and display it (set it to full opacity)
				$('#gallery a:first').css({
					opacity : 1.0
				});

				//Set the caption background to semi-transparent
				$('#gallery .caption').css({
					opacity : 0.7
				});

				//Resize the width of the caption according to the image width
				$('#gallery .caption').css({
					width : $('#gallery a').find('img').css('width')
				});

				//Get the caption of the first image from REL attribute and display it
				$('#gallery .img-content').html($('#gallery a:first').find('img').attr('rel')).animate({
					opacity : 0.7
				}, 400);

				//Call the gallery function to run the slideshow, 6000 = change to next image after 6 seconds
				setInterval('gallery()', 6000);

			}

			function gallery() {
				//if no IMGs have the show class, grab the first image
				var current = ($('#gallery a.show') ? $('#gallery a.show') : $('#gallery a:first'));
				//Get next image, if it reached the end of the slideshow, rotate it back to the first image
				var next = ((current.next().length) ? ((current.next().hasClass('caption')) ? $('#gallery a:first') : current.next()) : $('#gallery a:first'));

				//Get next image caption
				var caption = next.find('img').attr('rel');

				//Set the fade in effect for the next image, show class has higher z-index
				next.css({
					opacity : 0.0
				}).addClass('show').animate({
					opacity : 1.0
				}, 1000);

				//Hide the current image
				current.animate({
					opacity : 0.0
				}, 1000).removeClass('show');

				//Set the opacity to 0 and height to 1px
				$('#gallery .caption').animate({
					opacity : 0.0
				}, {
					queue : false,
					duration : 0
				}).animate({
					height : '1px'
				}, {
					queue : true,
					duration : 300
				});

				//Animate the caption, opacity to 0.7 and heigth to 100px, a slide up effect
				$('#gallery .caption').animate({
					opacity : 0.7
				}, 80).animate({
					height : '80px'
				}, 500);

				//Display the content
				$('#gallery .img-content').html(caption);

			}

	//////////////////

