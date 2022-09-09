function animateMenu() {
    var menu = $('.menuBg');
    var nav = $('.mobileNav');

    if (menu.hasClass('showMenu')) { // Hide menu if it's open
        menu.removeClass('showMenu').addClass('hideMenu');
        nav.removeClass('fadeIn');
    } else if (menu.hasClass('hideMenu')) { // Show menu and remove hideMenu
        menu.removeClass('hideMenu').addClass('showMenu');
        nav.addClass('fadeIn')
    } else {
        menu.addClass('showMenu'); // Initial show menu
        nav.addClass('fadeIn');
    }
};

$(document).ready(function() {

    $('.hamburger').on('click', function() {
        $(this).toggleClass('open');
        $(".tableWrapper").css("pointer-events", "all")
        $('.tableWrapper').css('display', 'block');
        $('#downScroll').css('display', 'block');
        $('#rightScroll').css('display', 'block');
        setTimeout(function() {
            $('#downScroll').css('display', 'none');
            $('#rightScroll').css('display', 'none');
          }, 20000)
        animateMenu();
    });

    $('.hamburger').on('click', function() {
        dateQuery();
    });

    $('#close').on('click', function() {
        $('.hamburger').toggleClass('open');
        animateMenu(); 
    });


    $('#close').on('click', function() {
        console.log('works');
        $('#header').toggleClass('header-hidden');

        if ($('.tableWrapper').css('display')=="block") {
            $('.tableWrapper').css('display', 'none');
        }
        else {
            $('.tableWrapper').css('display', 'block');
        };
        
    });  

    $('.tableWrapper').click(function(event) {
        // prevent default behavior of click
        event.preventDefault();
        return false;
    });
});
