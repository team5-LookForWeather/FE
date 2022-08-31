/*=========================================================
    아이디&비밀번호 변수 정의
=========================================================*/
let pw1 = document.querySelector('#pswd1');
let pwMsg = document.querySelector('#alertTxt');
let pwImg1 = document.querySelector('#pswd1_img1');


let pw2 = document.querySelector('#pswd2');
let pwImg2 = document.querySelector('#pswd2_img1');
let pwMsgArea = document.querySelector('.int_pass');


/*=========================================================
    에러 변수 정의
=========================================================*/
let error = document.querySelectorAll('.error_next_box');



/*=========================================================
    비밀번호 함수 정의
=========================================================*/
pw1.addEventListener("change", checkPw);


function checkPw() {
    let pwPattern = /[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}/;
    if(pw1.value === "") {
        error[0].innerHTML = "필수 정보입니다.";
        pwMsg.style.display = "none";
        pwMsgArea.style.paddingRight = "40px";
        pwImg1.src = "../image/icon/check-2.png";
        error[0].style.display = "block";
    } else if(!pwPattern.test(pw1.value)) {
        error[0].innerHTML = "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.";
        pwMsg.innerHTML = "사용불가";
        pwMsgArea.style.paddingRight = "93px";
        error[0].style.display = "block";
        pwMsg.style.color = "red";
        pwMsg.style.display = "block";
        pwImg1.src = "../image/icon/check-2.png";
    } else {
        error[0].style.display = "none";
        pwMsg.innerHTML = "안전";
        pwMsgArea.style.paddingRight = "93px";
        pwMsg.style.color = "#03c75a";
        pwMsg.style.display = "block";
        pwImg1.src = "../image/icon/check-3.png";
    }
}



/*=========================================================
    비밀번호 재확인 함수 정의
=========================================================*/
pw2.addEventListener("change", comparePw);


function comparePw() {
    if(pw2.value === pw1.value) {
        pwImg2.src = "../image/icon/check-3-2.png";
        error[1].style.display = "none";
    } else if(pw2.value !== pw1.value) {
        pwImg2.src = "../image/icon/check-1-2.png";
        error[1].innerHTML = "비밀번호가 일치하지 않습니다.";
        error[1].style.display = "block";
    } 

    if(pw2.value === "") {
        error[1].innerHTML = "필수 정보입니다.";
        error[1].style.display = "block";
    }
}