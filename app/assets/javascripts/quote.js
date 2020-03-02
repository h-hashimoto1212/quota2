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
  appendOrigin(json.quote, 0);
  $('li.edit_quote').append(`<a href="/quotes/${ json.quote.id }/edit">edit quote</a>`)
  addButtonEvents(0, json.quote);

  function addButtonEvents(i, q){
    $(`.qButton.${ i }`).on("click", { text: q.text, id: i }, copyQuote);
    $(`.qButton.${ i }`).on("mouseover", function(){
      $(`.popup.${i}`).replaceWith(`<div class="popup ${i} shown">copy Quote</div>`);
    })
    $(`.qButton`).on("mouseout", function(){
      $(`.popup.${i}`).removeClass("shown");
    })
  }

  $(".qName").on("click", { top: true, name: json.quote.userName }, showOtherQuotes);
  // $(".aName").on("click", { top: true, name: json.quote.authorName }, showOtherQuotes);
  // $(".sName").on("click", { top: true, name: json.quote.sourceName }, showOtherQuotes);

  function copyQuote(e){

    let copyText = document.createElement("textarea");

    copyText.textContent = e.data.text;

    $("body").append(copyText);

    $(`.quote__content__text.${e.data.id}`).addClass("active");
    $(`.quote__content__text.${e.data.id}`).on("animationend", function(){
      $(`.quote__content__text.${e.data.id}`).removeClass("active");
    });

    copyText.select();
    document.execCommand("copy");

    $(copyText).remove();

    $(`.popup.${e.data.id}`).replaceWith(`<div class="popup ${e.data.id} shown">Quote copied to clipboard</div>`);

  }
  let buildQuote = function(q, i){
    let html = 
    `<div class="quote add">
      <div class="quote__header ${i}">
        <div class="quote__header__btns">
          <button class="qButton ${i}" type="button">
            Q
          </button>
          <button class="gButton" type="button">
            G
          </button>
          <button class="sButton" type="button">
            S
          </button>
        </div>
        <div class="popup ${i}"></div>
      </div>
      <div class="quote__content">
        <div class="quote__content__left"></div>
        <div class="quote__content__text ${i}">
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


  function showOtherQuotes(e){

    if (json.quote.userName != e.data.name || e.data.top) {
      $.each(json.uQuotes, function(i, q) {
        if (json.quote.id != q.id){
          let html = buildQuote(q, i + 1);
          $(".main__text").append(html);
          appendOrigin(q, i + 1);
          
          $(`.qName.${ i + 1 }`).on("click", {name: q.userName}, showOtherQuotes);
          $(".qName.0").on("click", function(){
            $(".add").remove();
            $(".qName.0").off();
            $(".qName.0").on("click", {top: true, name: q.userName}, showOtherQuotes);
          })
          addButtonEvents(i + 1, q);
        }
      })

    }else{
      $(".add").remove();
      $(".qName.0").off();
      $(".qName.0").on("click", {top: true, name: json.quote.userName}, showQuotaQuotes);
    }

  }


  function appendOrigin(q, i){
    if(q.selfquote){
      $(`.quote__content__origin.${i}`).append(`<div class="origin__name">
                                                <a href="#qName" class="qName ${i}">${q.userName}</a>
                                              </div>`);
    }else{
      if(q.authorName){
        $(`.quote__content__origin.${i}`).append(`<div class="origin__name">
                                                    <a href="#aName" class="aName ${i}">${q.authorName}</a>
                                                  </div>`);
      }
      if(q.authorName && q.sourceName){
        $(`.quote__content__origin.${i}`).append(",")
      }
      if(q.sourceName){
        $(`.quote__content__origin.${i}`).append(`<div class="origin__source">
                                                    <a href="#sName" class="sName ${i}">${q.sourceName}</a>
                                                  </div>`);
      }
    }
  }
})
