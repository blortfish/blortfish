function closeNewList(){
    $('.new-list').remove();
    $('.new-list-modal').remove();
}

function addNewList(fieldVal){
	var jsonData = JSON.parse(localStorage.getItem('list-data'));
	var newListName = fieldVal.val();
    var newList =
    $("<div class='list'>" +
        "<span class='list-name'>" + newListName + "</span>" +
        "<i class='fa fa-arrow-circle-o-right'></i>"+
    "</div>");
    $('.content').append(newList);
	$('.no-list').remove();
	var lists = jsonData.lists;
	lists[newListName] = "<em>Simply tap this box or the pencil icon in the top right to edit!</em>";
	localStorage.setItem("list-data", JSON.stringify(jsonData));
    closeNewList();
	bindLists();
}

function addNewListModal(){
    var newListModalBack =
        $("<div class='new-list' onclick='closeNewList()'></div>");
    var newListModal =
        $("<div class='new-list-modal'>" +
            "<div class='new-list-inner'>"+
             "<div class='new-list__form'>"+
                "<h3>Enter new list name:</h3>"+
                "<input class='new-list-input' type='text' maxlength='50' />"+
                    "<div class='btn btn-danger cancel-new-button' onclick='closeNewList()'>Cancel</div>"+
                    "<div class='btn btn-primary add-new-button' onclick='addNewList($(this).prev().prev())'>Add</div>"+
               "</div>"+
            "</div>"+
        "</div>");
    $('.content').prepend(newListModalBack);
    $('.content').prepend(newListModal);
    $('.new-list-input').focus();
	$('.new-list-input').keypress(function (e) {
	  if (e.which == 13) {
		e.preventDefault();
		addNewList($('.new-list-input'));
	  }
	});
}