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
                    <p class="chat__message__main__image">
                      if ${message.image_url}.present
                        <img src = '${message.image_url}' width="800" height="800" if ${message.image_url}.present?>
                      end
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
      $('#new_message')[0].reset();
      $('html,body').animate({scrollTop: $('.chat__messages__bottom').offset().top},'slow');
      $('.chat__send__input-box__send-button').attr('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  })
})