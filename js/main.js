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


    // Citations
    var citations = [
        "Iempridee T, Reusch JA, Riching A, et al. Epstein-Barr virus utilizes Ikaros in regulating its latent-lytic switch in B cells. J Virol. 2014;88(9):4811-27.",
        "Jiang S, Willox B, Zhou H, et al. Epstein-Barr virus nuclear antigen 3C binds to BATF/IRF4 or SPI1/IRF4 composite sites and recruits Sin3A to repress CDKN2A. Proc Natl Acad Sci USA. 2014;111(1):421-6.",
        "Duarte M, Wang L, Calderwood MA, et al. An RS motif within the Epstein-Barr virus BLRF2 tegument protein is phosphorylated by SRPK2 and is important for viral replication. PLoS ONE. 2013;8(1):e53512.",
        "Johannsen E, Lambert PF. Epigenetics of human papillomaviruses. Virology. 2013;445(1-2):205-12.",
        "Heilmann AM, Calderwood MA, Portal D, Lu Y, Johannsen E. Genome-wide analysis of Epstein-Barr virus Rta DNA binding. J Virol. 2012;86(9):5151-64."
    ];
});