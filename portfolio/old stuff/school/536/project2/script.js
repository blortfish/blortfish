
var paths;
var spans;
var mainSVG;
var svgns="http://www.w3.org/2000/svg";


//gets paths and spans to change colors when dark/light is selected
function init()
{
    paths = document.getElementsByTagName('path');
    spans = document.getElementsByTagName('span');
}



//clears canvas area
function clearAll()
{
   
    var dyn = document.getElementById('dynamic');
    while(dyn.hasChildNodes)
    {
        dyn.removeChild(dyn.lastChild);
    }
    
}


//creates random sized shape according to which button was pressed
function newShape( shapeName ){
    
    if(shapeName=="circle"){
        var shape=document.createElementNS(svgns,'circle');
        shape.setAttributeNS(null,"r",parseInt(Math.random()*100)+20);
        shape.setAttributeNS(null,"cx",parseInt(Math.random()*600));
        shape.setAttributeNS(null,"cy",parseInt(Math.random()*400));
        document.getElementById('dynamic').appendChild(shape);
    }
    else if(shapeName=="square"){
        var shape=document.createElementNS(svgns,'rect');
        var dimen = parseInt(Math.random()*100)+20;
        shape.setAttributeNS(null,"width",dimen);
        shape.setAttributeNS(null,"height",dimen);
        shape.setAttributeNS(null,"x",parseInt(Math.random()*600));
        shape.setAttributeNS(null,"y",parseInt(Math.random()*400));
        document.getElementById('dynamic').appendChild(shape);
    }
    else if(shapeName=="rect"){
        var shape=document.createElementNS(svgns,'rect');
        shape.setAttributeNS(null,"width",parseInt(Math.random()*100)+5);
        shape.setAttributeNS(null,"height",parseInt(Math.random()*100)+5);
        shape.setAttributeNS(null,"x",parseInt(Math.random()*600));
        shape.setAttributeNS(null,"y",parseInt(Math.random()*400));
        document.getElementById('dynamic').appendChild(shape);
    }
    
    myFill=getCol();
    myStroke=getCol();
    shape.setAttributeNS(null,"style","fill:rgb("+myFill+");stroke:rgb("+myStroke+");stroke-width:"+Math.random()*40);
    shape.setAttributeNS(null,"opacity",Math.random()/2+.5);
    
}


//gets a random color for generated shapes
function getCol()
{
    return parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255);
}

//animates a random shape on the canvas by generating random numbers then appending animateTransform to shape
function animateSomething()
{
    var shapes = document.getElementById('dynamic').childNodes ;
    
    if (shapes.length > 0)
    {
        var shapeNum = parseInt(Math.random()*shapes.length);
        if(shapeNum == 1 && shapes.length == 1)
        {
            shapeNum = 0;
        }
        
        var currentShape = shapes[shapeNum];
        delete shapes[shapeNum];
        var ani = document.createElementNS("http://www.w3.org/2000/svg","animateTransform");

        var plusOrMinusX = Math.random() < 0.5 ? -1 : 1;
        var plusOrMinusY = Math.random() < 0.5 ? -1 : 1;
        var toX = String(Math.random()*600*plusOrMinusX);
        var toY = String(Math.random()*400*plusOrMinusY);
        var dur = String(Math.random()*50);
        
        var to = "0 0;"+toX+" "+toY;
        ani.setAttribute("attributeName", "transform");

        ani.setAttribute("type", "translate" );
        ani.setAttribute("values", to);
        ani.setAttribute("begin", "0s");
        ani.setAttribute("dur", dur);
        ani.setAttribute("fill", "freeze");
        
        currentShape.appendChild(ani);

    }
    else
    {
        alert('Add a shape first');    
    }
    
}

//changes colors from dark to light or light to dark, adjusts path fill as well
function switchColors( color ){
    if(color == 'd'){
         document.body.style.backgroundColor = "#575757";
         document.body.style.color = "#fff";
         
         for(var i=0 ; i<spans.length; i++)
         {
            spans[i].style.color = "#fff";
            
            spans[i].onmouseover = function() {
            this.style.color = "#A3A3A3";
            }
            spans[i].onmouseout = function() {
            this.style.color = "#fff";
            }
         }
         
         for(var i=0 ; i<paths.length; i++)
         {
            paths[i].style.fill = "#A3A3A3";
         }
    }
    else{
         document.body.style.backgroundColor = "#fff";
         document.body.style.color = "#000";
         
         for(var i=0 ; i<spans.length; i++)
         {
            spans[i].style.color = "#575757";
            spans[i].onmouseover = function() {
            this.style.color = "#000";
            }
            spans[i].onmouseout = function() {
            this.style.color = "#575757";
            }
         }
         
         for(var i=0 ; i<paths.length; i++)
         {
            paths[i].style.fill = "#000";
         }
    }
}