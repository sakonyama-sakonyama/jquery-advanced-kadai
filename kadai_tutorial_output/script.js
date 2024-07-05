$(function(){
  //.button-moreの要素に、マウスオーバーしたら、アニメーション
  $('.button-more').on('mouseover',function(){
    $(this).animate({
      //↑上記「.button-more」の個別の要素が代入される　※イベントが発生した要素自身のみに対して処理することができる
      opacity: 0.5,
      marginLeft: 20, 
    },100);
  });

  //.button-moreの要素から、マウスアウトしたら、元に戻す
  $('.button-more').on('mouseout',function(){
    $(this).animate({
      marginLeft: 0,
      opacity: 1,
    },100);
  });

  //.carouselにスリックを適用する
  $('.carousel').slick({
    autoplay: true,
    dots: true,
    infinite: true,
    autoplaySpeed: 5000,
    arrows: false,
  });

  //送信ボタンクリック時の処理　　　　　　　↓clickした＃submitに関するオブジェクトが引数として渡されている。引数名は任意
$('#submit').on('click',function(event){
  //formタグによる送信を拒否
  event.preventDefault();
  //入力チェックをした結果をresultに格納
  let result = inputCheck();

  //エラー判定とメッセージを取得
  let error = result.error;
  let message = result.message;

  //エラー判定がなかったらフォームを送信する
  if(error == false) {
    //フォーム送信は実際に行わず、送信成功のメッセージのみ表示する
    alert('お問合せを送信しました。')
  } else {
    //エラーメッセージを表示する
    alert(message);
  }
});
  
  //フォーカスが外れたとき（blur）にフォームの入力チェックをする
  $('#name').blur(function(){
    inputCheck();
  });
  $('#furigana').blur(function(){
    inputCheck();
  });
  $('#email').blur(function(){
    inputCheck();
  });
  $('#tel').blur(function(){
    inputCheck();
  });
  $('#message').blur(function(){
    inputCheck();
  });
  $('#agree').click(function(){
    inputCheck();
  });

  //お問合せフォームの入力チェック
  function inputCheck(){
    //エラーのチェック結果
    let result;
    //エラーメッセージのテキスト
    let message ='';
    //エラーがなければfalse、エラーがあればtrue
    let error = false;

    //お名前のチェック
    if($('#name').val()==''){
      //エラーあり
      $('#name').css('background-color','#f79999');
      error = true;
      message += 'お名前を入力してください。\n';
    } else {
      //エラーなし
      $('#name').css('background-color','#fafafa');
    }

    //フリガナのチェック
    if ($('#furigana').val() == '') {
      // エラーあり
      $('#furigana').css('background-color', '#f79999');
      error = true;
      message += 'フリガナを入力してください。\n';
    } else {
      // エラーなし
      $('#furigana').css('background-color', '#fafafa');
    }

    //お問い合わせのチェック
    if($('#message').val()==''){
      //エラーあり
      $('#message').css('background-color','#f79999');
      error = true;
      message += 'お問合せ内容を入力してください。\n';
    } else {
      //エラーなし
      $('#message').css('background-color','#fafafa');
    }

    //メールアドレスのチェック
    if($('#email').val() == '' || $('#email').val().indexOf('@') == -1 || $('#email').val().indexOf('.') == -1) {
      // || 「or」
      //エラーあり
      $('#email').css('background-color','#f79999');
      error = true;
      message += 'メールアドレスが未記入、または「@」「.」が含まれていません。\n';
    } else {
      //エラーなし
      $('#email').css('background-color','#fafafa');
    }

    //電話番号のチェック（未入力はOK,未入力でない場合は-が必要）
    if($('#tel').val() != '' && $('#tel').val().indexOf('-') == -1){
      // !=　「右辺と左辺が異なる」　　&&　「and」
      $('#tel').css('background-color', '#f79999');
      error = true;
      message += '電話番号に「-」が含まれていません。\n';
    } else {
      //エラーなし
      $('#tel').css('background-color','#fafafa');
    }

    //都道府県のセレクトのチェック
    if($('#prefecture').val() == ''){
      $('#prefecture').css('background-color', '#f79999');
      error = true;
      message += '都道府県を選択してください。\n';
    } else {
      $('#prefecture').css('background-color','#fafafa');
    }
  
    //個人情報のチェックボックスのチェック
    if($('#agree').prop('checked') == false){
      error = true;
      message += '個人情報の取り扱いについてご同意いただける場合は、チェックボックスにチェックしてください。\n';
    }

    //エラーの有無で送信ボタンを切り替え
    if(error == true){
      $('#submit').attr('src','images/button-submit.png');
    } else {
      $('#submit').attr('src','images/button-submit-blue.png');
    }

    //オブジェクトでエラー判定とメッセージを返す
    result = {
      error: error,
      message: message
    }
    //戻り値としてエラーがあるかどうかを返す
    return result;
  }
});