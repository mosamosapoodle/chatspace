$(document).on('turbolinks:load', function(){

//インクリメンタルサーチ時のユーザリストのHTML
  function buildUsersList(id, name) {
    var list = $(`<div class='chat-group-user users_list clearfix'>
                    <p class='chat-group-users__name'>
                      ${name}
                      <a class='user-search-add add_users chat-group-user__btn chat-group-user__btn--add'
                         data-user-id=${id}
                         data-user-name=${name}
                        >追加
                      </a>
                    </p>
                  </div>`);
    return list;
  };

//追加ボタンを押した時のユーザーリストのHTML
  function buildUser(id, name) {
    var buildUserHtml = $(`<div class='chat-group-user remove_list clearfix'>
                            <input type='hidden' name='group[user_ids][]' value=${id}>
                            <p class='chat-group-users__name'>
                              ${name}
                              <a class='user-search-remove remove_users chat-group-user__btn chat-group-user__btn--remove'>削除
                              </a>
                            </p>
                          </div>`);
    return buildUserHtml;
  };



//ajax通信
  function ajaxSearch(input) {

    var result = $('#user-render-field');

    $.ajax({
      url:      '/groups/search',
      type:     'GET',
      dataType: 'json',
      data:     { keyword:  input }
    })

    .done(function(data) {
      console.log("incremental ok");
      $('.users_list').remove();
      $.each(data, function(i, user) {
        result.append(buildUsersList(user.id, user.name));
      });
    })
    .fail(function(data) {
      alert("エラーが発生しました")
    });
  };


//削除ボタンを押した時
  $("#chat-group-users").on("click", ".remove_users", function() {
    $(this).parents(".remove_list").remove();
  });


//追加ボタンを押した時
  $("#user-render-field").on("click", ".add_users", function() {
    console.log("add ok");
    var id = $(this).data("userId");
    var name = $(this).data("userName");
    $(this).parents(".users_list").remove();
    $("#chat-group-users").append(buildUser(id, name));
  });


//incrementalサーチ検索欄にキー入力した時
  var preFunc = null;
  var preInput = '';
  var input = '';

  $('#user-search-field').on("keyup", function(e) {

    var input = $.trim($(this).val());
    if(preInput !== input) {
      clearTimeout(preFunc);
      preFunc = setTimeout(ajaxSearch(input), 1000);
    }
    preInput = input;
  });
});