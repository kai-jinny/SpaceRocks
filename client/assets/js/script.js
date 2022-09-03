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
        $('.closeTab').css("display", "flex");
        animateMenu();
    });

    $('.hamburger').on('click', dateQuery);

    $('.mobileNav a').on('click', function() {
        $('.hamburger').toggleClass('open');
        $('.closeTab').css("display", "flex");
        animateMenu();
    });

    $('#overlay').on('click', function() {
        console.log('works');
        $('.closeTab').prop("display", "none");
    });
});