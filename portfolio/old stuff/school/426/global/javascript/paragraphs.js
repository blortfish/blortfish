function tagit()
{
	var wrapperClass = document.getElementById('wrapper');
	var paragraphs = wrapperClass.getElementsByTagName("p");
	
	$(paragraphs[0]).attr('id','firstParagraph');
	for (var i=1;i<paragraphs.length -1;i++)
	{
		$(paragraphs[i]).addClass('bodyParagraph');
	}
	$(paragraphs[paragraphs.length-1]).attr('id','lastParagraph');
}

$(document).ready(tagit); 
	
