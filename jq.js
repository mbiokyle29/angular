$(document).ready(function() {
    var $window = $(window);

    function checkWidth() {
        var windowsize = $window.width();
        if (windowsize < 783) {
        	$('.link').css('display','none');
        	$('#hamburger').css('display', 'inline');
        } else if (windowsize >= 783) {
        	$('.link').css('display','inline');
        	$('#hamburger').css('display', 'none');
        }
    }

    // Execute on load
    checkWidth();
    
    // Bind event listener
    $window.resize(checkWidth);
});