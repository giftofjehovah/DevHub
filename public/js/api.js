var baseUrl = 'http://localhost:3000/api/v1/'
function setHeader (xhr) {
  xhr.setRequestHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImdpZnRvZmplaG92YWgiLCJfaWQiOiI1NzBkYmIzMTkzNWZlZDA1Y2MzNTUxMzMiLCJpYXQiOjE0NjA1NTI4MTJ9.4moKMUqyu5Az59ldE3xPajN0HWiH6YsEmJGlAlFmP4s')
}

$('.btn').on('click', function (event) {
  var form = event.currentTarget.id + 'field'
  var value = $('#' + form).val()
  var load = event.currentTarget.id + 'load'
  var card = event.currentTarget.id + 'card'
  $('.code').remove()
  if (!value) {
    console.log('hi')
    $('#' + form).addClass('invalid')
  } else {
    $('<div>').addClass('progress').append($('<div>').addClass('indeterminate')).insertBefore('#' + event.currentTarget.id)
    var req = {
      url: baseUrl + 'users/' + value,
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
