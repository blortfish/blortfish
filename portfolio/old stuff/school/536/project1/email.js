var userName;
var email;
var emailReg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

function userInfo()
{
    userName = document.getElementById('un').value;
    email = document.getElementById('mail').value;
    
    if(userName == null || userName == "")
    {
        alert("Please enter a valid username.");
    }
    else
    {
        userName = userName;
    }
    
    if(emailReg.test(email))
    {
        email = email;
    }
    else
    {
      alert('Please enter a valid e-mail address.');
    }  
    if(window.localStorage)
    {
        localStorage.setItem( 'user', userName);
        localStorage.setItem( 'email', email);
    }
    else
    {
        SetCookie('user', userName);
	SetCookie('email', email);
    }
    
}

function sendMessage()
{
    if(window.localStorage)
    {
        if(localStorage.email == null || localStorage.title == null ||  localStorage.user == null)
        {
            alert('Please enter user info and select a movie to send movie info.');
        }
        else
        {
            var emailBody =  "Hello "+localStorage.user+","+"%0D%0A%0D%0ATitle: "+ localStorage.title +"%0D%0A%0D%0ADescription: "+localStorage.description;
            var emailString = "mailto:"+localStorage.email+"?subject=Your Movie Selection&body="+emailBody;
            
            window.open(emailString);
        }
    }
    else
    {
        if(GetCookie(email) == null || GetCookie(title) == null ||  GetCookie(user) == null)
        {
            alert('Please enter user info and select a movie to send movie info.');
        }
        else
        {
            var emailBody = "Hello "+GetCookie(user)+","+"%0D%0A%0D%0ATitle: "+  GetCookie(title) +"%0D%0A%0D%0ADescription: "+GetCookie(description);
            var emailString = "mailto:"+GetCookie(email)+"?subject=Your Movie Selection&body="+emailBody;
            
            window.open(emailString);
        }
    }
}