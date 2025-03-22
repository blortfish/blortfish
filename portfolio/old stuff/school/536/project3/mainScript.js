
var body;

//array of columns
var cols;
//array of headings
var headings;
//all blocks
var blocks;

//counter for col number, used to assign class for heading and
//multiplyier for assigning point values
var m = 1;
var pointVal = 100;

var currentXML;
var roundID;
var reqURL = 'http://nova.it.rit.edu/~539_group4/get_game_instance.php?';
var score = 0;
var played1 = false;
var globalGameNumber;

$(document).ready(function(){
    if(verIE == 7 || verIE == 8)
    {
        alert('Please update your browser to at least IE9.');    
    }
    else{
    body = $('body');
    $(body).append($('<div id="wrapper"></div>'));
    $(body).append($('<div id="foot"></div>'));
    $('#foot').append($('<ul id="footlinks"></ul>'));
    $("#footlinks").append($('<li><a href="#" onclick="location.reload();">Reset</a></li>'));
    $("#footlinks").append($('<li><a href="submit.html" target="_blank">Add Questions</a></li>'));
    $("#footlinks").append($('<li><a href="help.html" target="_blank">Help</a></li>'));
    $(window).keydown(function(event)
    {
        if(event.keyCode == 13)
        {
          event.preventDefault();
          return false;
        }
        else
        {
            return true;
        }
    });
    }
});

function init() {
    var tempURL = 'http://nova.it.rit.edu/~539_group4/get_games_list.php';
    // FIRST REQUEST USED TO POPULATE START SCREEN WITH ABILITY TO CHOOSE GAME
    if (isIE)
    {
            
            var xdr = new XDomainRequest();
            xdr.open("get", tempURL);
            xdr.onload = function() {
            var dom = new ActiveXObject("Microsoft.XMLDOM");
            dom.async = false;
            dom.loadXML(xdr.responseText);  
            };
            xdr.send();
            buildInterface(xdr.responseText);
          ;
    }
    else {
        var xmlRequest = 
        $.ajax({
            url: tempURL,
            type: 'GET',
            cache: false,
            dataType : 'xml',
            success: function(data){
            buildInterface(data);
            },
            error: function(data) {
            alert('ajax error');
            }  
        }); 
    }
}

function buildInterface(data)
{
    var xml = data;
    var games = $(xml).find('game');
    

    $('#wrapper').empty();
    $('#wrapper').append('<div id="selectGame"></div>');
    $('#selectGame').append('<img src="jeopardytitle.gif" alt="jtitle" />');
    $('#selectGame').append('<p>Select a game below to begin.</p>');
    
    $.each(games, function(index){
        var currentGame = $(this);
        var cats = $(this).find('category');
        var currentGameID = 'game' + (parseInt(index)+1);
        $('#selectGame').append('<div id="'+currentGameID+'"></h1>');
        
        $('#'+currentGameID).append('<h1 id="gameTitle">Game '+(parseInt(index)+1)+'</h1>');
        
        $('#'+currentGameID).append('<h3 class="selectRound '+currentGameID+'" " id="roundtitle1">Round 1</h3>');
        $('#'+currentGameID).append('<ul class="gameCats" id="round1"></ul>');
        
        $('#'+currentGameID).append('<h3 class="selectRound '+currentGameID+'" id="roundtitle2">Round 2</h3>');
        $('#'+currentGameID).append('<ul class="gameCats" id="round2"></ul>');
       
       /*
         I broke it.... this was going to append Catagories to each Round
         
         Server side came out with more game material at 10pm not much we could do
         
        for(var i= 0; i < $(cats).size();i++)
        {
            alert(currentGame);
            var title = $(cats).eq(i).attr('title');
            alert(title); 
        }
           
        */

        
    });
    $('.selectRound').on('click', function(){
                buildBoard( $(this).attr('id').charAt($(this).attr('id').length-1), $(this).attr('class').charAt($(this).attr('class').length-1))
        });
}


//BUILDS BOARD BASED ON THE ROUND NUMBER SELECTED FROM START SCREEN
function buildBoard(roundNumber, gameNumber) {
    $('#selectGame').fadeOut('slow').promise().done(function(){
        $('#wrapper').css('height', '675px');
        $('#wrapper').empty();
        
        roundID = roundNumber;
        reqURL += "game="+gameNumber+"&round="+roundNumber;
        if (isIE)
        {
            var xdr2;
                xdr2 = new XDomainRequest();
                xdr2.onload=function()
                {
                    generateBoard(xdr2.responseText, gameNumber);
                }
                xdr2.open("GET", reqURL);
                xdr2.send();
        }
        else {
            var xmlRequest = 
            $.ajax({
                url: reqURL,
                type: 'GET',
                cache: false,
                dataType : 'xml',
                success: function(data){
                generateBoard(data, gameNumber);
                },
                error: function(data) {
                alert('ajax error');
                }  
            });
        }
    });
}

//GENERATES BOARD BASED ON XML INPUT FROM buildBoard();
function generateBoard(x, gameNumber)
{
    var gameNum = gameNumber;
    var temp = x;
    reqURL = 'http://nova.it.rit.edu/~539_group4/get_game_instance.php?';
    //loop for creating columns
    for(var i=0;i<5;i++){
        $('#wrapper').append($('<div class="col"></div>'))
    }
    cols = $('.col');
    
    var roundTitles = $(x).find('category[roundId="'+roundID+'"]');
    //loop for adding headings
    $.each(cols, function(){
        $(this).append($('<div class="cat"><p class="head heading'+m+'">'+$(roundTitles).eq(m-1).attr('title')+'</p></div>'));
        m++;
    });
    var headings = $('.cat p');
    
    //reset counter
    m=1;
    
    //loop to create boxes with values
    $.each(cols, function(){
        for(var j=0;j<5;j++){
            if(roundID == 2 )
            {
                $(cols.eq(j)).append(  $('<div class="block"> <p class="pointVal">'+ pointVal*(m)*2 +'</p></div>').fadeIn(1500));
            }
            else
            {
                 $(cols.eq(j)).append(  $('<div class="block"><p class="pointVal">'+ pointVal*(m) +'</p></div>').fadeIn(1500));
            }
            
        }
        m++;
    });
    m=1;
    $('.block').on('click', function(){openQuestion(this, temp, gameNum)});
    $('#wrapper').append('<div id="scoreCard"></div>');
    $('#scoreCard').append('<p id="score">Score: '+score+'</p>');
}


//ON CLICK FUNCTION CALLED WHEN A QUESTION IS SELECTED
function openQuestion(box, x, gameNum)
{
    globalGameNumber = gameNum;
    var pointValue = $(box).text();
    var catSelected = $('div', $(box).parent()).eq(0).text();
    $(box).attr('class', 'inactive');
    $(box).attr('onclick','').unbind('click');
    $(box).empty();
    var value = $(box).index();
    var cat = $('div', $(box).parent()).eq(0).children(0).attr('class').split(' ')[1];
    cat = cat.substr( cat.indexOf('g')+1,1);

    if(gameNum == 1)
    {
        if(roundID == 1)
        {
            cat = (parseInt(cat));
        }
        else if(roundID > 1)
        {
            cat = (parseInt(cat) + 5);
        }
    }
    else if(gameNum > 1)
    {
        var base = gameNum*5;
        if(roundID == 1)
        {
               cat = base + (parseInt(cat));
        }
        else if(roundID > 1)
        {

            cat =  base + (parseInt(cat) + 5);
        }
    }

    var selectionId = "round"+roundID+"cat"+cat;

    currentXML = $('#'+selectionId, x);
    var currentQuestion = $(currentXML).find('question[value="'+value+'"]');
    var currentAnswer = $(currentQuestion).next().text();
    var hasAttachment = $(currentQuestion).next().next().text();
    var cleanAnswer = currentAnswer.toLowerCase();
    if(hasAttachment.substr(-4) == '.mp3' || hasAttachment.substr(-4) == '.jpg')
    {
        if(hasAttachment.substr(-4) == '.mp3')
        {
            $(body).append('<div id="openQ"></div>');
            $('#openQ').append('<h3>'+catSelected+' for '+pointValue+'</h3>');
            $('#openQ').append('<p>Name where this audio clip is from.</p>');
            $('#openQ').append('<p>'+$(currentQuestion).text()+'</p>');
            $('#openQ').append('<embed autoplay="false" height="50" width="100" src="'+hasAttachment+'">');
            $('#openQ').append('<form>Your Answer: <input type="text" id="answer" name="answer"><button id="submit" type="button">Submit</button></form>');
            $('#submit').on('click',function(){
            var userAnswer = $('#answer').val().toLowerCase();
            userAnswer = userAnswer.split(' ').join('');
            cleanAnswer = cleanAnswer.split(' ').join('');
            if(userAnswer == cleanAnswer)
            {
                alert('Correct Answer');
                $('#openQ').remove();
                updateScore(pointValue);
                checkForEnd();
            }
            else
            {
                alert('Incorrect Answer, the correct answer was '+currentAnswer);
                $('#openQ').remove();
                updateScore(parseInt(pointValue)*(-1));
                checkForEnd();
            }
        });
            
        }
        else if(hasAttachment.substr(-4) == '.jpg')
        {
            $(body).append('<div id="openQ"></div>');
            $('#openQ').append('<h3>'+catSelected+' for '+pointValue+'</h3>');
            $('#openQ').append('<p>'+$(currentQuestion).text()+'</p>');
            $('#openQ').append('<img alt="pic" src="'+hasAttachment+'"/>');
            $('#openQ').append('<form>Your Answer: <input type="text" id="answer" name="answer"><button id="submit" type="button">Submit</button></form>');
            $('#submit').on('click',function(){
            var userAnswer = $('#answer').val().toLowerCase();
            userAnswer = userAnswer.split(' ').join('');
            cleanAnswer = cleanAnswer.split(' ').join('');
            if(userAnswer == cleanAnswer)
            {
                alert('Correct Answer');
                $('#openQ').remove();
                updateScore(pointValue);
                checkForEnd();
            }
            else
            {
                alert('Incorrect Answer, the correct answer was '+currentAnswer);
                $('#openQ').remove();
                updateScore(parseInt(pointValue)*(-1));
                checkForEnd();
            }
        });
            
        }
    }
    else
    {
        $(body).append('<div id="openQ"></div>');
        $('#openQ').append('<h3>'+catSelected+' for '+pointValue+'</h3>');
        $('#openQ').append('<p class="questionP">'+currentQuestion.text()+'</p>');
        $('#openQ').append('<form>Your Answer: <input type="text" id="answer" name="answer"><button id="submit" type="button">Submit</button></form>');
        $('#submit').on('click',function(){
        var userAnswer = $('#answer').val().toLowerCase();
        userAnswer = userAnswer.split(' ').join('');
        cleanAnswer = cleanAnswer.split(' ').join('');
        if(userAnswer == cleanAnswer)
        {
            alert('Correct Answer');
            $('#openQ').remove();
            updateScore(pointValue);
            checkForEnd();
        }
        else
        {
            alert('Incorrect Answer, the correct answer was '+currentAnswer);
            $('#openQ').remove();
            updateScore(parseInt(pointValue)*(-1));
            checkForEnd();
        }
    });
    }
}

function checkForEnd()
{
    if($('.pointVal').size() == 0)
    {
        promptAfterGame(roundID);
    }
    else
    {
        return;
    }
}

//FUNCTION TO BE CALLED WHEN CURRENT GAME BOARD HAS BEEN COMPLETELY CLEARED
function promptAfterGame()
{
    
    if(roundID == 1)
    {
        if(!played1)
        {
            
            var r=confirm("This round is over, would you like to go to round 2?");
            if (r==true)
              {
                roundID = 2;
                buildBoard(2,globalGameNumber);
              }
            else
              {
                location.reload();
              } 
            
            played1 = true;
        }
        else
        {
            alert('You have finished the game with a score of '+score);
            location.reload();
        }
    }
    else if (roundID == 2)
    {
        if(!played1)
        {
            var r=confirm("This round is over, would you like to go to round 1?");
            if (r==true)
            {
               roundID = 1;
                buildBoard(1,globalGameNumber);
            }
            else
            {
              location.reload();
            } 
            played1 = true;
        }
        else
        {
            alert('You have finished the game with a score of '+score);
            location.reload();
        }
    }
}


function updateScore(pointValue)
{
    score = parseInt(score) + parseInt(pointValue);
    $('#score').text('Score: '+score);
}



