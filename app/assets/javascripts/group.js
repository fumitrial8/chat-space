$(function(){
  
  var search_list = $('#user-search-result');
  
  function searchUser(user){
    var html = `<div class="chat-group-user clearfix id="chat-group-user-22">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
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
    $(document).on('click','.chat-group-user__btn--add', function(){
      var user_name_add = $(this).attr('data-user-name');
      var user_id_add = $(this).attr('data-user-id');
      var group_users_list = $('#chat-group-users');
      var appended_user = `<div class="chat-group-user clearfix">
                            <p class="chat-group-user__name">${user_name_add}</p>
                            <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id=${user_id_add} data-user-name=${user_name_add}>削除</a>
                          </div>`
      $(`#group_user_ids_${user_id_add}`).attr('checked', "checked");
      group_users_list.append(appended_user);

      $(this).closest('div').remove('div');
    });
    $(document).on('click', '.chat-group-user__btn--remove',function(){
      var user_id_removed = $(this).attr('data-user-id');
      $(`#group_user_ids_${user_id_removed}`).removeAttr('checked', "checked");
      $(this).parent().remove();
    });
  });
});