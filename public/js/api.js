var baseUrl = 'http://devhub-.herokuapp.com/api/v1/'
function setHeader (xhr) {
  xhr.setRequestHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImdpZnRvZmplaG92YWgiLCJfaWQiOiI1NzBkYmIzMTkzNWZlZDA1Y2MzNTUxMzMiLCJpYXQiOjE0NjA1NTI4MTJ9.4moKMUqyu5Az59ldE3xPajN0HWiH6YsEmJGlAlFmP4s')
}

$('.btn').on('click', function (event) {
  var type = ''
  if (event.currentTarget.id === 'getusersbtn' || event.currentTarget.id === 'getuserbtn') type = 'users/'
  else type = 'companies/'
  var form = event.currentTarget.id + 'field'
  var value = $('#' + form).val()
  var load = event.currentTarget.id + 'load'
  var card = event.currentTarget.id + 'card'
  $('.code').remove()
  if (!value && (event.currentTarget.id === 'getuserbtn' || event.currentTarget.id === 'getcompanybtn')) {
    $('#' + form).addClass('invalid')
  } else {
    $('<div>').addClass('progress').append($('<div>').addClass('indeterminate')).insertBefore('#' + event.currentTarget.id)
    if(event.currentTarget.id === 'getusersbtn' || event.currentTarget.id === 'getcompaniesbtn') var url = baseUrl + type
    else var url = baseUrl + type + value
    var req = {
      url: url,
      beforeSend: setHeader
    }
    console.log(req)
    $.ajax(req)
      .done(function (data) {
        $('#' + load + ' .progress').remove()
        var str = JSON.stringify(data, undefined, 2)
        $('#' + card).append($('<pre>').text(str).addClass('code'))
        console.log(data)
      })
      .fail(function (error) {
        console.log(error)
      })
  }
})
