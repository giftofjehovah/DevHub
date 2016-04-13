var baseUrl = 'http://localhost:3000/api/v1/'
function setHeader (xhr) {
  xhr.setRequestHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImdpZnRvZmplaG92YWgiLCJfaWQiOiI1NzBkYmIzMTkzNWZlZDA1Y2MzNTUxMzMiLCJpYXQiOjE0NjA1NTI4MTJ9.4moKMUqyu5Az59ldE3xPajN0HWiH6YsEmJGlAlFmP4s')
}


$('.btn').on('click', function (event) {
  var form = event.currentTarget.id + 'field'
  var value = $('#' + form).val()
  var load = event.currentTarget.id + 'load'
  if (!value) {
    console.log('hi')
    $('#' + form).addClass('invalid')
  }
  else {
    $('#' + load).before($('<div>').addClass('progress').append($('<div>').addClass('indeterminate')))
    // $('<div>').addClass('indeterminate').appendTo($('<div>').addClass('progress')).appendTo($('#' + load))
    var req = {
      url: baseUrl + 'users/' + value,
      beforeSend: setHeader
    }
    console.log(req)
    $.ajax(req)
      .done(function (data) {
        $('#' + load + ' .progress').remove()
      console.log(data)
      })
      .fail(function (error) {
        console.log(error)
      })
  }
})
