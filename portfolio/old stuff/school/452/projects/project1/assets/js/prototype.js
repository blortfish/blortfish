var buttonLeft, buttonRight, lists;


$(document).ready(function(){
    buttonLeft = document.getElementsByClassName("button-left")[0];
    buttonRight = document.getElementsByClassName("button-right")[0];
    lists = document.getElementsByClassName("list");
    bindButtons();
    bindLists();
});

function bindButtons(){
    $(buttonLeft).on('click', openMenu);
    $(buttonRight).on('click', addNewListModal);
}

function bindLists(){
}


function openHome(){
	$('.content').empty();
	$(buttonLeft).unbind().on('click', openMenu);
	$(buttonRight).unbind().on('click', addNewListModal);
	$(buttonRight).find('i').attr('class', 'fa fa-plus');
	$('.page-title').find('span').eq(0).text('Nuance');
	$('.content').append('<div class="content"><div class="list"><span class="list-name">Grocery List</span><i class="fa fa-arrow-circle-o-right"></i></div><div class="list"><span class="list-name">Shopping List</span><i class="fa fa-arrow-circle-o-right"></i></div><div class="list"><span class="list-name">Test List</span><i class="fa fa-arrow-circle-o-right"></i></div><div class="list"><span class="list-name">More List</span><i class="fa fa-arrow-circle-o-right"></i></div><div class="list"><span class="list-name">Much List</span><i class="fa fa-arrow-circle-o-right"></i></div><div class="list"><span class="list-name">Such Wow</span><i class="fa fa-arrow-circle-o-right"></i></div><div class="list"><span class="list-name">Shopping List</span><i class="fa fa-arrow-circle-o-right"></i></div><div class="list"><span class="list-name">Test List</span><i class="fa fa-arrow-circle-o-right"></i></div><div class="list"><span class="list-name">More List</span><i class="fa fa-arrow-circle-o-right"></i></div><div class="list"><span class="list-name">Much List</span><i class="fa fa-arrow-circle-o-right"></i></div><div class="list"><span class="list-name">Such Wow</span><i class="fa fa-arrow-circle-o-right"></i></div></div>');
}

function openMenu(){
	$('.content').empty();
	$('.content').append(
	"<div class='menu'>"+
			"something"+
		"</div>");
	$('.page-title').find('span').eq(0).text('Menu');
	$(buttonLeft).on('click', 
		function()
		{
			$('.menu').remove();
			openHome();
		}
	);
	$(buttonRight).find('i').attr('class', 'fa fa-home');
	$(buttonRight).unbind().on('click',function()
		{
			$('.menu').remove();
			openHome();
		});
}

