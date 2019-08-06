$(function(){
  document.addEventListener("turbolinks:load", function() {
  
    var search_list = $('#user-search-result');
    var group_users_list = $('#chat-group-users');    
    function searchUser(user){
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
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
        }
        else {
          appendErrMsgToHTML('一致するユーザーが見つかりません');
        }
      })
      .fail(function(){
        alert('ユーザーの検索に失敗しました')
      })
    });
    
    $(document).on('click','.chat-group-user__btn--add', function(){
      var user_name_add = $(this).data('user-name');
      var user_id_add = $(this).data('user-id');
      var appended_user = `　<div class='chat-group-user clearfix'>
                              <input name='group[user_ids][]' type='hidden' value='${user_id_add}'>
                              <p class='chat-group-user__name'>${user_name_add}</p>
                              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                            </div>`
      group_users_list.append(appended_user);
      $(this).parent().remove();
    });

    $(document).on('click', '.chat-group-user__btn--remove', function(){
      $(this).parent().remove();
    });
  });
});