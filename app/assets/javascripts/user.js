$(function() {
  //グループにいないユーザーをインクリメンタルサーチで表示
  function appendUser(user) {
    // console.log(user);
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`

    $(".chat-group-form__field--right__not-member").append(html);
    // console.log(html);
  }
  function appendErrMsgToHTML(msg) {
    // console.log(msg);
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    $(".chat-group-form__field--right__not-member").append(html);
    // console.log(html);
  }
  
  $(function() {
    $("#user-search-field").on("keyup", function() {
      $(".chat-group-form__field--right__not-member").empty();
      var input = $("#user-search-field").val();
      console.log(input);
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(users) {
        $("#user-search-field").empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else {
          appendErrMsgToHTML("一致するメンバーはいません");
        }
      })
      .fail(function() {
        alert('メンバー検索に失敗しました');
      })
    });
  });

  //グループに追加するユーザーを選択
  function appendAddUser(user_id,user_name) {
    // console.log(user_name);
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user_id}'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${ user_name }</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'　data-user-id="${user_id}" data-user-name="${user_name}">削除</div>
                </div>`

    $(".chat-group-form__field--right__member").append(html);
    // console.log(html);
  }
     
  $(".chat-group-form__field--right__not-member").on("click", ".chat-group-user__btn--add", function() {
    var user_id =  $(this).attr("data-user-id");
    // console.log(user_id);
    var user_name = $(this).attr("data-user-name");
    // console.log(user_name);
    // console.log(this);
    $(this).parent().remove();
    appendAddUser(user_id,user_name);

    // $.ajax({
    //   type: 'GET',
    //   url: '/users',
    //   data: { keyword: user_id },
    //   dataType: 'json'
    // })
    // .done(function(users) {
    //   // console.log(users);
    //   $("#user-search-field").empty();
    //   if (users.length !== 0) {
    //     users.forEach(function(user){
    //       // console.log(user);
    //       appendAddUser(user_id);
    //     });
    //   }
      //   else {
      //     appendErrMsgToHTML("一致するメンバーはいません");
      //   }
    // })
      // .fail(function() {
      //   alert('メンバー追加に失敗しました');
      // })
  });

  //グループから削除するユーザーを選択
  function appendDeleteUser(user_id,user_name) {
    // console.log(user_name);
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user_name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user_id}" data-user-name="${user_name}">追加</div>
                </div>`

    $(".chat-group-form__field--right__not-member").append(html);
    // console.log(html);
  }
     
  $(".chat-group-form__field--right__member").on("click", ".js-remove-btn", function() {
    var user_id = $(this).attr("data-user-id");
    // console.log(user_id);
    var user_name = $(this).attr("data-user-name");
    // console.log(user_name);
    // console.log(this);
    $(this).parent().remove();
    appendDeleteUser(user_id,user_name);

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      // console.log(users);
      $("#user-search-field").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          // console.log(user);
          appendAddUser(user_id);
        });
      }
        else {
          appendErrMsgToHTML("一致するメンバーはいません");
        }
    })
      .fail(function() {
        alert('メンバー追加に失敗しました');
      })
  });

  $('#group_update').on('submit', function(){
    var formData = new FormData(this);
    console.log(formData);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "PUT",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    // .done(function(data){
    //   var html = buildHTML(data);
    //   $('.chat__messages').append(html)
    //   $('#new_message')[0].reset();
    //   $('html,body').animate({scrollTop: $('.chat__messages__bottom').offset().top},'slow');
    //   $('.chat__send__input-box__send-button').attr('disabled', false);
    // })
    // .fail(function(){
    //   alert('error');
    // })
  })
});
