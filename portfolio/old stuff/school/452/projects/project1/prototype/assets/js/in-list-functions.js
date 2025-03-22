function openList(element){
    var content = $('.content');
    var pageTitle = $('.page-title');
    var jsonData = JSON.parse(localStorage.getItem('list-data'));
	pageTitle.find('span').eq(0).text($(element).find('.list-name').text());
    pageTitle.addClass('in-list');
    content.empty();
    content.addClass('list-view');
    content.html(jsonData.lists[$(element).find('.list-name').text()]);
	buttonLeft.find('i').attr('class', 'fa fa-home');
	buttonLeft.unbind().on('click',function()
	{
	    $('.menu').remove();
	    openHome();
	});
    buttonRight.find('i').attr('class', 'fa fa-pencil');
    buttonRight.unbind().on('click',function()
    {
        editList(element);
    });
    setTimeout( function(){
        $('.content').on('click', function(){editList(element)});
}, 500);
}

function editList(element){
    var content = $('.content');
    content.attr('contenteditable',true);
    content.find('em').remove();
    content.focus();
    buttonRight.find('i').attr('class', 'fa fa-save');
    buttonRight.unbind().on('click',function()
    {
        saveList(element);
    });
}

function saveList(element){
    var jsonData = JSON.parse(localStorage.getItem('list-data'));
    var content = $('.content');
    buttonRight.find('i').attr('class', 'fa fa-pencil');
    buttonRight.unbind().on('click',function()
    {
        editList(element);
    });
    content.attr('contenteditable',false);

    jsonData.lists[$(element).find('.list-name').text()] = content.html();
    localStorage.setItem('list-data', JSON.stringify(jsonData));
}