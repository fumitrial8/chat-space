$(function() {
  //ページ遷移直後でイベントが発火できるようにする
  document.addEventListener("turbolinks:load", function() {
    //送信したメッセージを表示するためのHTMLを返すfunction
    function  appendMessage(message) {
      var image_html = `<img class='image' src=${message.image.url} alt ='Top'></img>`
      var html = `<div class="message-container" data-message-group-id="${message.group_id}" data-message-id="${message.id}" >
                    <div class="message-container-user">
                      <h1>${message.user_name}</h1>
                      <h2> ${message.created_at}</h2>
                    </div>
                    <div class="message-container-text">
                      <p> ${message.text}</p>
                      ${message.image.url != null ? image_html : ""}
                    </div>
                  </div>`;
      return html;
    }
    //submitボタンを押したら、メッセージ一覧に、メッセージを非同期通信で表示する
    $('#text_form').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var href = $('.new_message').attr('action');
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
        $('.group-messages').append(add_html);
      })
      .fail(function() {
        alert("テキストを入力してください");
      })
      .always(function(){
        $('#text_form')[0].reset();
        $('.text-form__submit__button').removeAttr('disabled');
      })
    });
    //group/:id/messagesの時のみ、メッセージを受け取ったら、表示用のHTMLに変換する
    var url = location.href;
    if (url.match(/\/groups\/\d*\/messages/)){
      
      var buildMessageHTML = function(message){
        var image_html = `<img class='image' src=${message.image.url} alt ='Top'></img>`
        var html = `<div class="message-container" data-message-group-id="${message.group_id}" data-message-id="${message.id} ">
                      <div class="message-container-user" >
                        <h1>${message.name}</h1>
                        <h2> ${message.created_at}</h2>
                      </div>
                      <div class="message-container-text">
                        <p> ${message.text}</p>
                        ${message.image.url != null ? image_html : ""}
                      </div>
                    </div>`
        return html;
      };
      //表示しているメッセージの中で最新のメッセージIDを取得し、それ以降の新規メッセージを取得して、表示する
      var reloadMessages = function(){
        var last_message_id = $('.message-container:last').data('message-id');
        var group_id = $('.message-container:first').data('message-group-id');
        $.ajax({
          url: `/groups/${group_id}/api/messages`, //api/indexコントローラーに送信
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages){
          $('.group-messages').animate({scrollTop: $('.group-messages')[0].scrollHeight}, 1000);
          var insertHTML = '';
          if (messages.length !== 0) {
            messages.forEach(function(message){
              insertHTML = buildMessageHTML(message);
              $('.group-messages').append(insertHTML);
            })
          }
        })
        .fail(function(){
          console.log('error');
        });
      };
      setInterval(reloadMessages, 10000);
      reloadMessages();
    } else {
      console.log('its not group message index page');
    };    
  });
});