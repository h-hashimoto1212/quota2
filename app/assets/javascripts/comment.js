$(function(){

  function buildHTML(q){
    var html = `<div class="comments__each">
                  ${ q.comment.text }
                  <div class="comments__each__quota">
                    ${ q.comments.quota }
                  </div>
                </div>`
    return html;
  }
  $('.comment_form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action')
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
      $(`.comments.${ i }`).append(html);
      $('#comment_text').val('');
      $('.submit').prop('disabled', false);
    })
    .fail(function(data){
      alert('error');
      console.log(data);
    })

  })
})