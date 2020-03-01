$(function(){

  var json;
  $.ajax({
    url: 'quotes.json',
    dataType: 'json',
    async: false,
    success: function(data){
      json = data
    }
  });


  $(".quote__content__text").append(json.quote.text);
  $(".quote__content__text").attr("data-Text", json.quote.text);
  appendOrigin(json.quote, 0);

  $(".qButton").on("click", copyQuote);

  $(".qName").on("click", {top: true, name: json.quote.userName}, showQuotaQuotes);
  $(".aName").on("click", showAuthorQuotes);
  $(".sName").on("click", showDocumentQuotes);

  function copyQuote(){

    let copyText = document.createElement("textarea");

    copyText.textContent = json.quote.text;

    $(".quote__content__text").append(copyText);

    $(".quote__content__text").toggleClass("active");

    copyText.select();
    document.execCommand("copy");

    $(copyText).remove();

    $("#copied").toggleClass("active");
    $("#copied").on('animationend', function(){
      $("#copied").removeClass("active");
    })

  }
  let buildQuote = function(q, i){
    let html = 
    `<div class="quote add">
      <div class="quote__header">
        <div class="quote__header__btns">
          <button class="qButton ${i}" type="button">
            Q
          </button>
          <div class="popup" id="copied">
            Quote copied to clipboard
          </div>
          <button class="gButton" type="button">
            G
          </button>
          <button class="sButton" type="button">
            S
          </button>
        </div>
      </div>
      <div class="quote__content">
        <div class="quote__content__left"></div>
        <div class="quote__content__text ${i}" data-Text=${q.text}>
          "${q.text}"
          <div class="quote__content__text__jp"></div>
        </div>
        <div class="quote__content__origin ${i}">

        </div>
      </div>
      <div class="quote__footer">
        <div class="quote__footer__like">
          <button id="like">
            L
          </button>
          <div class="quote__footer__like__times">
            0
          </div>
        </div>
      </div>
    </div>
    `;

    return html;
  }


  function showQuotaQuotes(e){

    if (json.quote.userName != e.data.name || e.data.top) {
      $.each(json.uQuotes, function(i, q) {
        if (json.quote.id != q.id){
          let html = buildQuote(q, i + 1);
          $(".main__text").append(html);
          appendOrigin(q, i + 1);
          
          $(`.qName.${i + 1}`).on("click", {name: q.userName}, showQuotaQuotes);
          $(".qName.0").on("click", function(){
            $(".add").remove();
            $(".qName.0").off();
            $(".qName.0").on("click", {top: true, name: q.userName}, showQuotaQuotes);
          })
        }
      })

    }else{
      $(".add").remove();
      $(".qName.0").off();
      $(".qName.0").on("click", {top: true, name: json.quote.userName}, showQuotaQuotes);
    }

  }

  function showAuthorQuotes(){

    quotes.forEach(function(q) {
      if (quote.id != q.id && user.id == q.quota_id){
        let html = buildQuote(q);
        $(".main__text").append(html);
      }
    })
    appendOrigin(quote);
    $(".qName").off();

  }

  function showDocumentQuotes(){

    quotes.forEach(function(q) {
      if (quote.id != q.id && user.id == q.quota_id){
        let html = buildQuote(q);
        $(".main__text").append(html);
      }
    })
    appendOrigin(quote);
    $(".dName").off();

  }

  function appendOrigin(q, i){
    if(q.selfquote){
      $(`.quote__content__origin.${i}`).append(`<div class="origin__name">
                                                <a href="#qName" class="qName ${i}" data=${q.userName}>${q.userName}</a>
                                              </div>`);
    }
  }
})
