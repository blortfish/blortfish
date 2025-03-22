$(document).ready(function(){
    var images = $('.mbphoto .gallery img');
    $(images).eq(0).attr('id','curPic');
    $.each(images, function(){
        $(this).css('position','absolute').css('right','150px').css('top','95px');
         $( (images).eq(0) ).css('display','inline');
    });
    
    var current = 1;
    setInterval(function(){
        if(current == images.length-1)
        {
            $(images).eq(current).fadeOut(2000);
           
            current = 0;
            $(images).eq(current).fadeIn(2000);
            
        }
        else{
            current++;
            $(images).eq(current).fadeOut(2000) 
            $(images).eq(current).fadeIn(2000);
        }
        
       
            
    
        
        $(  $(images) ).promise().done(function() {
            for(var i=0;i<images.length;i++)
            {
                if(i != current)
                {
                    $(images).eq(i).css('display','none');
                }
                else
                {
                    return;
                }
            } 
        });
        
        
        
        
    }, 10000);
       
    
});