function openMenu(){
    var content = $('.content');
    var jsonData = JSON.parse(localStorage.getItem('list-data'));
    content.empty();
    content.append('<div class="settings-row"><span>Color Scheme: </span>'+
    '<div class="on-off__wrapper"><div class="onoffswitch"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox color" id="myonoffswitch"><label class="onoffswitch-label" for="myonoffswitch"><div class="onoffswitch-inner"></div><div class="onoffswitch-switch"></div></label>'
     +'</div>');
    content.append('<div class="settings-row"><h4>Help</h4><ul><li><span class="help-title">To add a list:</span> Hit the + sign in the top right</li><li><span class="help-title">To remove a list:</span> Press and hold the list on the main screen</li><li><span class="help-title">To edit a list:</span> Press the pencil icon when editing a list.</li><li><span class="help-title">To save changes to a list:</span>Click the save icon in the top right after edits are finished</li></ul></div>');
    content.append("<div class='clearfix'></div><div class='btn btn-primary save-settings' onclick='saveSettings()'>Save Settings</div>");

    $('.page-title').find('span').eq(0).text('Menu');
    var color = $('.color');
    (jsonData.settings['color-scheme'] ==  'dark') ?  document.getElementsByClassName('color')[0].checked = false : document.getElementsByClassName('color')[0].checked = true;

    color.change(function(){setScheme(true)});
    buttonLeft.on('click',
        function()
        {
            $('.menu').remove();
            openHome();
        }
    );
    buttonRight.find('i').attr('class', 'fa fa-home');
    buttonRight.unbind().on('click',function()
    {
        $('.menu').remove();
        openHome();
    });
}


function saveSettings(){
    var jsonData = JSON.parse(localStorage.getItem('list-data'));
    jsonData.settings['color-scheme'] =  (document.getElementsByClassName('color')[0].checked) ? 'light' : 'dark';
    localStorage.setItem('list-data', JSON.stringify(jsonData));
    setScheme();
    openHome();
}

//document.getElementsByClassName('color')[0].checked = false



function setScheme(toggle){
    var sheet = document.getElementById('stylesheet');
    if(toggle){
        if( sheet.href.substring(sheet.href.lastIndexOf('/')+1) == 'prototype-dark.css'){
            sheet.href = 'assets/css/prototype-light.css';
        }
        else if(sheet.href.substring(sheet.href.lastIndexOf('/')+1) == 'prototype-light.css'){
            sheet.href = 'assets/css/prototype-dark.css';
        }
    }
    else{
        var jsonData = JSON.parse(localStorage.getItem('list-data'));
        var style = jsonData.settings['color-scheme'];
        if(style == 'dark'){
            sheet.href = 'assets/css/prototype-dark.css';
        }
        else if(style == 'light'){
            sheet.href = 'assets/css/prototype-light.css';
        }
    }
}

