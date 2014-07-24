$(document).ready(function() {
    // Optimalisation: Store the references outside the event handler:
    var $window = $(window);

    function checkWidth() {
        var windowsize = $window.width();
        if (windowsize < 960) {
        	$('#links').css('display','none');
        	$('#hamburger').css('display', 'inline');
        } else if (windowsize >= 960) {
        	$('#links').css('display','inline-block');
        	$('#hamburger').css('display', 'none');
        }
    }

    // Execute on load
    checkWidth();
    
    // Bind event listener
    $(window).resize(checkWidth);
});