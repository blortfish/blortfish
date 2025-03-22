var buttonLeft, buttonRight, lists;

$(document).ready(function(){
    if (localStorage.getItem('list-data')) {
		var data = JSON.parse(localStorage.getItem('list-data'));
		renderHome();
    }
	else{
		var baseJson = {
			"lists": {},
			"settings" : {"color-scheme" : "dark"}
		};
		localStorage.setItem('list-data', JSON.stringify(baseJson));
		renderHome();
	}
    buttonLeft = $(".button-left").eq(0);
    buttonRight = $(".button-right").eq(0);
    lists = document.getElementsByClassName("list");
    buttonLeft.on('click', openMenu);
    buttonRight.on('click', addNewListModal);
    bindLists();
    setScheme();
});

function bindLists(){
	var lists = $('.content').find('.list');
	lists.unbind();
	lists.on('click', function(){openList(this)});
    lists.mousedown(function() {
        var list = this;
        timeoutId = setTimeout(function(){$(this).unbind();removeListPrompt(list);}, 1000);
    }).bind('mouseup', function() {
        clearTimeout(timeoutId);
    });
}

function removeListPrompt(list){
    var content = $('.content');
    var newListModalBack =
        $("<div class='new-list' onclick='closeNewList()'></div>");
    var newListModal =
        $("<div class='new-list-modal'>" +
            "<div class='new-list-inner'>"+
            "<div class='new-list__form'>"+
            "<h3 style='text-align: center'>Remove "+ $(list).find('.list-name').text()+ "?</h3>"+
            "<div class='btn btn-danger cancel-new-button' onclick='cancelRemove()'>Cancel</div>"+
            "<div class='btn btn-primary remove-button add-new-button'>Remove</div>"+
            "</div>"+
            "</div>"+
            "</div>");
    content.prepend(newListModalBack);
    content.prepend(newListModal);
    $('.remove-button').on('click', function(){removeList(list);cancelRemove();});
}

function removeList(list){
    var key = $(list).find('.list-name').text();
    var data = JSON.parse(localStorage.getItem('list-data'));
    delete data.lists[key];
    localStorage.setItem('list-data', JSON.stringify(data));
    openHome();
}

function cancelRemove(){
    $('.new-list-modal').remove();
    $('.new-list').remove();
}

function openHome(){
    var content = $('.content');
    content.unbind();
    content.empty();
    content.attr('contenteditable',false);
	buttonLeft.unbind().on('click', openMenu);
	buttonLeft.find('i').attr('class', 'fa fa-align-justify');
	buttonRight.unbind().on('click', addNewListModal);
	buttonRight.find('i').attr('class', 'fa fa-plus');
	$('.page-title').find('span').eq(0).text('Nuance');
	renderHome();
    setScheme();
	bindLists();
}

function renderHome(){
    $('.page-title').removeClass('in-list');
    $('.content').removeClass('list-view');
    if (localStorage.getItem('list-data')) {
		var jsonData = JSON.parse(localStorage.getItem('list-data'));
		var homeContent = $('.content').eq(0);
		homeContent.empty(0);
		if($.isEmptyObject(jsonData.lists))
		{
			homeContent.append('<p class="no-list">No Lists</p>');
		}
		else{
			for (var key in jsonData.lists) {
			  if (jsonData.lists.hasOwnProperty(key)) {
				homeContent.append(
				"<div class='list'>"+
					"<span class='list-name'>"+
					key +
					"</span>" +
						"<i class='fa fa-arrow-circle-o-right'></i>"+
					"</div>"
				);
			  }
			}
		}
	}
}