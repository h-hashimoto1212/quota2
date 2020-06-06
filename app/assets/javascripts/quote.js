$(function(){

  let url = document.URL

  $.getJSON(url, function(data){
    var json = data;
    appendOrigin(json.quote, 0);

    addButtonEvents(0, json.quote);

    $(".qName").on("click", { top: true, name: json.quote.userName }, showQuotaQuotes);
    $(".aName").on("click", { top: true, name: json.quote.authorName }, showAuthorQuotes);
    $(".sName").on("click", { top: true, name: json.quote.sourceName }, showSourceQuotes);

    function addButtonEvents(i, q){
      $(`.qButton.${ i }`).on("click", { text: q.text, id: i }, copyQuote);
      $(`.qButton.${ i }`).on("mouseover", function(){
        $(`.popup.${i}`).replaceWith(`<div class="popup ${i} shown">copy Quote</div>`);
      })
      $(`.qButton`).on("mouseout", function(){
        $(`.popup.${i}`).removeClass("shown");
      })

      $(`.cButton.${ i }`).on("click", { text: q.comments.text, id: i }, showComments);
      $(`.cButton.${ i }`).on("mouseover", function(){
        $(`.popup.${i}`).replaceWith(`<div class="popup ${i} shown">Show comments</div>`);
      })
      $(`.cButton`).on("mouseout", function(){
        $(`.popup.${i}`).removeClass("shown");
      })
      $(`.nButton.${ i }`).on("click", {}, function(){
        $(`.comments.${ i } input`).addClass('active');
        $(`.comments.${ i } input`).focus();
      })
    }

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

    function showComments(e){
      $(`.comments.${e.data.id}`).addClass("active")
      $('.close').on('click', function(){
        $(`.comments.${ e.data.id }`).removeClass("active")
        $(`.comments.${ e.data.id } input`).removeClass('active');
      })
    }
    let buildQuote = function(q, i){
      let html = 
      `<div class="quote add ${i}">
        <div class="quote__header ${i}">
          <div class="quote__header__btns">
            <button class="qButton ${i}" type="button">
              Q
            </button>
            <button class="gButton" type="button">
              G
            </button>
            <button class="cButton ${i}" type="button">
              C
            </button>
          </div>
          <div class="popup ${i}"></div>
        </div>
        <div class="quote__content ${i}">
          <div class="quote__content__left"></div>
          <div class="quote__content__text ${i}">
            ${q.text}
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
      $(".add").remove();
      let top = $(`.quote.0`).position().top;
      if (json.quote.userName != e.data.name || e.data.top) {
        $.each(json.uQuotes, function(i, q) {

          let html = buildQuote(q, i + 1);
          $(".main__text").append(html);
          appendOrigin(q, i + 1);

          top += $(`.quote.${ i }`).height();

          $(`.quote.${ i + 1}`).css("z-index", `${100 - (i + 1)}`);
          
          $(`.qName.${ i + 1 }`).on("click", {name: q.userName}, showQuotaQuotes);
          $(".qName.0").on("click", function(){
            $(".add").remove();
            $(".qName.0").off();
            $(".qName.0").on("click", {top: true, name: q.userName}, showQuotaQuotes);
          })

          $(`.quote.${ i + 1 }`).animate({
            top: `${top}`
          }, 500,);

          addButtonEvents(i + 1, q);
          appendComments(i + 1, q);

        })

      }else{
        $(".add").remove();
        $(".qName.0").off();
        $(".qName.0").on("click", {top: true, name: json.quote.userName}, showQuotaQuotes);
      }

    }

    function showAuthorQuotes(e){
      $(".add").remove();
      let top = $(`.quote.0`).position().top;
      if (json.quote.authorName != e.data.name || e.data.top) {
        $.each(json.aQuotes, function(i, q) {

          let html = buildQuote(q, i + 1);
          $(".main__text").append(html);
          appendOrigin(q, i + 1);

          top += $(`.quote.${ i }`).height();

          $(`.quote.${ i + 1}`).css("z-index", `${100 - (i + 1)}`);

          $(`.aName.${ i + 1 }`).on("click", {name: q.authorName}, showAuthorQuotes);
          $(".aName.0").on("click", function(){
            $(".add").remove();
            $(".aName.0").off();
            $(".aName.0").on("click", {top: true, name: q.authorName}, showAuthorQuotes);
          })

          $(`.quote.${ i + 1 }`).animate({
            top: `${top}`
          }, 500,);

          addButtonEvents(i + 1, q);

        })

      }else{
        $(".add").remove();
        $(".aName.0").off();
        $(".aName.0").on("click", {top: true, name: json.quote.authorName}, showAuthorQuotes);
      }

    }


    function showSourceQuotes(e){
      $(".add").remove();
      let top = $(`.quote.0`).position().top;
      if (json.quote.sourceName != e.data.name || e.data.top) {
        $.each(json.sQuotes, function(i, q) {

          let html = buildQuote(q, i + 1);
          $(".main__text").append(html);
          appendOrigin(q, i + 1);

          top += $(`.quote.${ i }`).height();

          $(`.quote.${ i + 1}`).css("z-index", `${100 - (i + 1)}`);


          $(`.sName.${ i + 1 }`).on("click", {name: q.sourceName}, showSourceQuotes);
          $(".sName.0").on("click", function(){
            $(".add").remove();
            $(".sName.0").off();
            $(".sName.0").on("click", {top: true, name: q.sourceName}, showSourceQuotes);
          })

          $(`.quote.${ i + 1 }`).animate({
            top: `${top}`
          }, 500,);

          addButtonEvents(i + 1, q);

        })

      }else{
        $(".add").remove();
        $(".sName.0").off();
        $(".sName.0").on("click", {top: true, name: json.quote.sourceName}, showSourceQuotes);
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
    let buildComment = function(q, i){
      let html = 
      `<div class="comments ${ i }">
        <div class="comments__header">
          <h3>Comments</h3>
          <button class="close" type="button">X</button>
        </div>
        <form class="comment_form" action="/quotes/${ q.id }/comments" accept-charset="UTF-8" method="post">
          <button class="nButton ${ q.id }" type="button">N</button>
          <input type="text" name="comment[text]" id="comment_text" class="active">
          <input type="submit" name="commit" value="" class="submit" data-disable-with="">
        </form>
      </div>
      `
      return html;
    }
    function appendComments(i, q){
      let html = buildComment(q, i);
      $(`.quote.${ i }`).append(html);
      $.each(q.comments, function(i, q){
        $(`.comments.${ i }`).append(`<div class="comments__each">
                                      ${ q.text}
                                      <div class="comments__each__quota">
                                        ${ q.quota }
                                      </div>
                                    </div>`)
      })
    }
  })
})


