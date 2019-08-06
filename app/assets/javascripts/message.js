$(function() {
  document.addEventListener("turbolinks:load", function() {
    function  appendMessage(message) {
      var image_html = `<img class='image' src=${message.image.url} alt ='Top'></img>`
      var html = `<div class="message-container">
                    <div class="message-container-user">
                      <h1>${message.name}</h1>
                      <h2> ${message.created_at}</h2>
                    </div>
                    <div class="message-container-text">
                      <p> ${message.text}</p>
                      ${message.image.url != null ? image_html : ""}
                    </div>
                  </div>`;
      return html;
    }
    $('#text_form').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var href = $('#new_message').attr('action');
      $.ajax({
        type: 'POST',
        url: href,
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data) {
        var add_html = appendMessage(data);
        $('.group-messages').prepend(add_html);
      })
      .fail(function() {
        alert("テキストを入力してください");
      })
      .always(function(){
        $('#text_form')[0].reset();
        $('.text-form__submit__button').removeAttr('disabled');
      })
    });
  });
});