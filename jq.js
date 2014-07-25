$(document).ready(function() {
    var $window = $(window);

    function checkWidth() {
        var windowsize = $window.width();
        if (windowsize < 900) {
        	$('.link').css('display','none');
            $('.small-nav').css('display', 'inline');
        } else if (windowsize >= 900) {
        	$('.link').css('display','inline');
            $('.small-nav').css('display', 'none');
        }
    }

    // Execute on load
    checkWidth();
    
    // Bind event listener
    $window.resize(checkWidth);
});