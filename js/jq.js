$(document).ready(function() {

    // Width stuff
    var $window = $(window);
    function checkWidth() {
        var windowsize = $window.width();
        if (windowsize < 1000) {
        	$('.link').css('display','none');
            $('.small-nav').css('display', 'inline');
        } else if (windowsize >= 1000) {
        	$('.link').css('display','inline');
            $('.small-nav').css('display', 'none');
        }
    }
    // Execute on load
    checkWidth();   
    // Bind event listener
    $window.resize(checkWidth);

    // Scroll Pane Styler
    //$('.map-container').jScrollPane();
    url = "http://lab-feeder.herokuapp.com/feed/";
    $.get(url,function(data) 
    { 
        data.forEach(function(data) {
            $(".list-group").append(data);
        })
    });
});

vex.defaultOptions.className = 'vex-theme-os';