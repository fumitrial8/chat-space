$(function() {
  var messages_index = $(".message-container");
  function  appendMessage(message) {
    var html = `.message-container-user
                  %h1 ${message.user.name}
                  %h2 ${message.created_at.strftime("%Y-%m-%d %H:%M")}
                .message-container-text
                  %p ${message.text}`
    messages_index.append(html);
  }

  $('.text-form__submit__button').on('click', function(e){
    e.preventDefault(e);
    var text = $('.text-form__text').val();
    var href = $("#new_message").attr('action');
    $.ajax({
      url: href,
      type: 'POST',
      data: text,
      dataType: 'json',
      processData: false,
      contentType: false
          })
    .done(function(data) {
        console.log(data);
        appendMessage(data);
    })
    .fail(function() {
      alert("テキストを入力してください");
    })
  });
});