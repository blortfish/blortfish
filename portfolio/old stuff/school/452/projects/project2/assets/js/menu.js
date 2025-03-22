$(document).ready(function(){
    var menu = $('.expand-button');
    var dropDown = menu.find('.drop-down');
    menu.on('click', function()
                {
                    menu.toggleClass('open');
                    toggleMenu(menu, dropDown);
                });
    dropDown.on('click', function()
                {
                    toggleDropOption();
                });
});

function toggleMenu(menu, dropDown){
    (menu.hasClass('open')) ?
        dropDown.stop().slideDown() :
        dropDown.stop().slideUp();
}

function toggleDropOption(){
    event.stopPropagation();
}