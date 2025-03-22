var resume = '<object data="Flint_Daniel.pdf" type="application/pdf" width="1080" height="1000"><a href="Flint_Daniel/resume.pdf"></a></object>'

$(document).ready(
  function () {
    $('#portfolio').css('display', 'none')
    $('#resume').css('display', 'none')
    $('#nav ul li').eq(2).attr('id', 'current')
    $.each($('#nav ul li'), function () {
      $(this).on('click', function () {
        setCurrent($(this))
      })
    })

  })

function setCurrent (which) {
  var switchTo = $(which).html()
  $('#nav').removeClass('about-me')
  if (switchTo == $('#current').text()) {
    return
  } else {
    $.each($('#nav ul li'), function () {
      $(this).unbind('click')
    })

    $.each($('#nav ul li'), function () {
      $(this).attr('id', '')
    })
    $(which).attr('id', 'current')
    $('#wrapper_content').animate({ height: 'toggle', opacity: 'toggle' }, 'slow').promise().done(function () {

      $('#bio').css('display', 'none')
      $('#portfolio').css('display', 'none')
      $('#resume').css('display', 'none')

      if (switchTo == 'About Me') {
        $('#bio').css('display', 'inline')
        $('#nav').addClass('about-me')
      } else if (switchTo == 'Portfolio') {
        $('#portfolio').css('display', 'inline')
        $('#resobj').empty()

      } else if (switchTo == 'Resume') {
        $('#resume').css('display', 'inline')
      }

      $('#wrapper_content').animate({ height: 'toggle', opacity: 'toggle' }, 'slow').promise().done(function () {

        if ($('#resume').css('display') == 'inline') {
          $('#resobj').append(resume)
        }

        $.each($('#nav ul li'), function () {
          $(this).on('click', function () {
            setCurrent($(this))
          })
        })
      })
    })
  }
}
