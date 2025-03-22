function closeNewList(){
    $('.new-list').remove();
    $('.new-list-modal').remove();
}

function addNewList(fieldVal){
    var newList =
    $("<div class='list'>" +
        "<span class='list-name'>" + fieldVal.val() + "</span>" +
        "<i class='fa fa-arrow-circle-o-right'></i>"+
    "</div>");
    $('.content').append(newList);
    closeNewList();
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
}