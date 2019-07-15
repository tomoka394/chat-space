$(function(){
  function buildHTML(message){
    var html = `<div class="chat__message">
                  <div class="chat__message__label">
                    <p class="chat__message__label__member">
                      ${message.user_name}
                    </p>
                    <p class="chat__message__label__time">
                      ${message.created_at}
                    </p>
                  </div>  
                  <p class="chat__message__main">
                    <p class="chat__message__main__text">
                      ${message.content}
                    </p>
                  </p>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat__messages').append(html)
      $('.chat__send__input-box__text').val('')
    })
    
  })
})