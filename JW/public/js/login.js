/*=========================================================
    로그인&비밀번호 포커스 시 관련 
=========================================================*/
$(document).ready(function () {
    $("input#id").focus(function () {
        $(this.parentNode).css('border', '1px solid #0359AE');
        $(".fa1").css('color', '#0359AE');
    })

    $("input#id").blur(function () {
        $(this.parentNode).css('border', '1px solid #dadada');
        $(".fa1").css('color', '#999');
    })

    $("input#pw").focus(function () {
        $(this.parentNode).css('border', '1px solid #0359AE');
        $(".fa2").css('color', '#0359AE');
    })

    $("input#pw").blur(function () {
        $(this.parentNode).css('border', '1px solid #dadada');
        $(".fa2").css('color', '#999');
    })
});



/*=========================================================
    배너 슬라이드 관련
=========================================================*/
