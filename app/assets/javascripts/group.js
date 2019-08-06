$(function(){
  
  var search_list = $('#user-search-result');
  
  function searchUser(user){
    var html = `<div class="chat-group-user clearfix id="chat-group-user-22">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chatgroup-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                </div>`
    search_list.append(html);
  }
  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix id="chat-group-user-22">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`
    search_list.append(html);
  }
  $('#user-search-field').on('keyup', function(){
    var input = $(this).val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })

    .done(function(data){
      $("#user-search-result").empty();
      if (data.lengh !== 0) {
        data.forEach(function(user){
          searchUser(user);
        });
        $('.chatgroup-user__btn--add').on('click', function(){
          var user_name = $(this).attr('data-user-name');
          var user_id = $(this).attr('data-user-id');
          
        });
      }
      else {
        appendErrMsgToHTML('一致するユーザーが見つかりません');
      }
    })
    .fail(function(){
      alert('ユーザーの検索に失敗しました')
    })
  });
});