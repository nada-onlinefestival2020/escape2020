$(function () {
  var current = 0;
  //模範解答群
  var correct_answers_set = [
    ['google','GOOGLE','ｇｏｏｇｌｅ','ＧＯＯＧＬＥ','Google','Ｇｏｏｇｌｅ','グーグル','ぐーぐる'],
    ['stayhome', 'stay home', 'STAYHOME', 'STAY HOME', 'ｓｔａｙｈｏｍｅ', 'ｓｔａｙ ｈｏｍｅ', 'ＳＴＡＹＨＯＭＥ', 'ＳＴＡＹ ＨＯＭＥ', 'stay　home', 'STAY　HOME', 'ｓｔａｙ　ｈｏｍｅ', 'ＳＴＡＹ　ＨＯＭＥ', 'Stayhome', 'Stay home', 'StayHome', 'Stay Home', 'Ｓｔａｙｈｏｍｅ', 'Ｓｔａｙ　ｈｏｍｅ', 'ＳｔａｙＨｏｍｅ', 'Ｓｔａｙ　Ｈｏｍｅ', 'Ｓｔａｙ ｈｏｍｅ', 'Ｓｔａｙ Ｈｏｍｅ', 'Stay　home', 'Stay　Home','すていほーむ','ステイホーム'],
    ['vivid', 'VIVID', 'ｖｉｖｉｄ', 'Vivid', 'Ｖｉｖｉｄ','ビビッド','びびっど']
  ];
  //Answerって押したら
  $(".ansbutton").click(function () {
    //種々の情報取得
    var i = $(".ansbutton").index($(this));
    var correct_answers = correct_answers_set[i];
    var textinput = $(".ansinput").eq(i);
    var userans = textinput.val();
    var ansbutton = $(".ansbutton").eq(i);
    var solved = $(".solved").eq(i);
    var imgwrapper = $(".imgwrapper").eq(i);
    var qimg = $(".q-img").eq(i);
    var hint = $(".hint").eq(i);
    var hintheader = $(".hint-header").eq(i * 2);
    //テキストエリアのフォーカス解除
    textinput.blur();
    //正解なら
    if (correct_answers.indexOf(userans) >= 0) {
      current += 2;
      //第一問と第二問の処理
      if (i === 0 || i === 1) {
        //問題の場所まで戻って
        $("html,body").animate({
          scrollTop: imgwrapper.offset().top + imgwrapper.height() / 2 - $(window).height() / 2
        });
        //問題を解決された状態に
        solved.delay(1000).queue(function () {
          $(this).fadeIn().dequeue();
          qimg.animate({
            'opacity': '0.7'
          });
          ansbutton.animate({
            'opacity': '0.7'
          });
          textinput.animate({
            'opacity': '0.7'
          });
          hint.animate({
            'opacity': '0.7'
          });
          if (hintheader.hasClass('open')) {
            hintheader.next(".slider").slideUp(500);
          }
          hintheader.removeClass("valid-hint-header");
          textinput.prop("disabled", true);
          ansbutton.prop("disabled", true);
          ansbutton.removeClass("validbutton");
        })
        //次の問題を開いて飛ぶ
        $("html,body").delay(2000).queue(function () {
          $(".question").eq(i + 1).slideDown();
          $("html,body").animate({
            scrollTop: $(".question").eq(i + 1).offset().top
          }).dequeue();
        });
      } else {
        //最後の謎をクリアしたらクリアページに飛ぶ
        window.location.href ="clear.html"
      };
    } else {
      //間違っとたら揺らす
      $(".question").eq(i).effect("shake",{distance:15},500);
    }
  });
  //入力フォーム上でエンター押したら
  $(".ansinput").keypress(function (e) {
    var i = $(".ansinput").index($(this));
    if (e.which == 13) {
      $(".ansbutton").eq(i).click();
    }
  });
  //アコーディオン実装
  $(".hint-header").click(function () {
    if ($(".hint-header").index($(this)) >= current) {
      if ($(this).hasClass('open')) {
        $(this).next(".slider").slideUp(500);
        $(this).removeClass("open");
      } else {
        $(this).next(".slider").slideDown(500);
        $(this).addClass("open");
      }
    }
  });
});