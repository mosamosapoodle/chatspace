$(document).on('turbolinks:load', function(){
//メッセージの仮HTML
  function insertedHtml(message){
    if(data.image){
      var insertImage = "<br><img src='" + message.image + "' class='message_img'>"
    }else{
      var insertImage = "";
    };
    var html = "<li class='chat-message'>\n"                    +
               "<div class='message__information clearfix'>\n"  +
               "<span class='name'>\n"                          +
                 message.name                                   +
               "</span>\n"                                      +
               "<span class='time'>\n"                          +
                 message.date                                   +
               "</span>\n"                                      +
               "</div>\n"                                       +
               "<span class='message__body'>\n"                 +
                 message.body                                   +
               "\n"                                             +
                 insertImage                                    +
               "</span>\n"                                      +
               "</li>"
    return $(html);
  };

//メッセージ投稿時にAjax通信
  $('.chat__form').on('submit', function(e) {
    e.preventDefault();
    // .はクラス指定、#はid指定
    var data = new FormData($(this)[0]);
    $.ajax({
      url: './messages.json',
      type: 'POST',
      data: data,
      processData: false,
      contentType: false
    })
    .done(function(res) {
      $('.messages').append(insertedHtml(res));
      // ↓ 投稿したら、投稿フォームを空にする。
      $('#message_body').val('');
      scrollBottom();
    })
    .fail(function() {
      alert('エラーが発生しました(´・ω・｀)')
    });
    return false;
  });

  function scrollBottom(){
    $('html, body').animate({
      scrollTop: $(".messages").height()
    }, "slow", "swing");
  };
});