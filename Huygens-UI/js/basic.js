$(document).ready(function() {

"use strict";

$( ".close-left-bar" ).click(function() {
  $( "#right-bar" ).fadeOut( "fast", function() {
    // Animation complete
  	});
  });
  
  $( "#b-card" ).click(function() {
  $( "#right-bar" ).fadeIn( "fast", function() {
    // Animation complete
  	});
  });
  
$(".facet").hover(
    function(e) {
            e.stopPropagation();
			$(".facet-extra", this).fadeIn( "fast", function() {
				// Animation complete
			});
        },
        function() {
		$(".facet-extra", this).fadeOut( "fast", function() {
				// Animation complete
			});
        }
);

  
  


});


