/*=========================================================
    아이디&비밀번호 변수 정의
=========================================================*/
let id = document.querySelector('#id');

let pw1 = document.querySelector('#pswd1');
let pwMsg = document.querySelector('#alertTxt');
let pwImg1 = document.querySelector('#pswd1_img1');


let pw2 = document.querySelector('#pswd2');
let pwImg2 = document.querySelector('#pswd2_img1');
let pwMsgArea = document.querySelector('.int_pass');


let userName = document.querySelector('#name');


let nickname = document.querySelector('#nick');


/*=========================================================
    생년월일 변수 정의
=========================================================*/
let userAge = document.querySelector('#age');


/*=========================================================
    성별 변수 정의
=========================================================*/
let gender = document.querySelector('#gender');



/*=========================================================
    이메일 변수 정의
=========================================================*/
let email = document.querySelector('#email');



/*=========================================================
    모바일 변수 정의
=========================================================*/
let mobile = document.querySelector('#mobile');




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
        error[1].innerHTML = "필수 정보입니다.";
        pwMsg.style.display = "none";
        pwMsgArea.style.paddingRight = "40px";
        pwImg1.src = "../image/icon/check-2.png";
        error[1].style.display = "block";
    } else if(!pwPattern.test(pw1.value)) {
        error[1].innerHTML = "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.";
        pwMsg.innerHTML = "사용불가";
        pwMsgArea.style.paddingRight = "93px";
        error[1].style.display = "block";
        pwMsg.style.color = "red";
        pwMsg.style.display = "block";
        pwImg1.src = "../image/icon/check-2.png";
    } else {
        error[1].style.display = "none";
        pwMsg.innerHTML = "사용가능";
        pwMsgArea.style.paddingRight = "93px";
        pwMsg.style.color = "#03c75a";
        pwMsg.style.display = "block";
        pwImg1.src = "../image/icon/check-3.png";
    }
}



/*=========================================================
    이름 함수 정의
=========================================================*/
userName.addEventListener("change", checkName);


function checkName() {
    let namePattern = /[a-zA-Z가-힣]/;
    if(userName.value === "") {
        error[2].innerHTML = "필수 정보입니다.";
        error[2].style.display = "block";
    } else if(!namePattern.test(userName.value) || userName.value.indexOf(" ") > -1) {
        error[2].innerHTML = "한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)";
        error[2].style.display = "block";
    } else {
        error[2].style.display = "none";
    }
}



/*=========================================================
    닉네임 함수 정의
=========================================================*/
nickname.addEventListener("change", checkNick);


function checkNick() {
    let nickPattern = /[a-zA-Z0-9_-]{5,20}/;
    if(nickname.value === "") {
        error[3].innerHTML = "필수 정보입니다.";
        error[3].style.display = "block";
        error[3].style.color = "#e00012";
    } else if(!nickPattern.test(nickname.value)) {
        error[3].innerHTML = "5~20자의 영문 대 소문자, 숫자만 사용 가능합니다.";
        error[3].style.display = "block";
    } else {
        error[3].innerHTML = "사용가능";
        error[3].style.color = "#08A600";
        error[3].style.display = "block";
    }
}



/*=========================================================
    전화번호 함수 정의
=========================================================*/
mobile.addEventListener("change", checkPhoneNum);


function checkPhoneNum() {
    let isPhoneNum = /([01]{2,})([01679]{1,})([0-9]{3,4})([0-9]{4})/;

    if(mobile.value === "") {
        error[4].innerHTML = "필수 정보입니다.";
        error[4].style.display = "block";
    } else if(!isPhoneNum.test(mobile.value)) {
        error[4].innerHTML = "형식에 맞지 않는 번호입니다.";
        error[4].style.display = "block";
    } else {
        error[4].style.display = "none";
    }  
}



/*=========================================================
    이메일 함수 정의
=========================================================*/
email.addEventListener("change", isEmailCorrect);


function isEmailCorrect() {
    let emailPattern = /[a-z0-9]{2,}@[a-z0-9-]{2,}\.[a-z0-9]{2,}/;

    if(email.value === ""){ 
        error[5].style.display = "none"; 
    } else if(!emailPattern.test(email.value)) {
        error[5].style.display = "block";
    } else {
        error[5].style.display = "none"; 
    }
}



/*=========================================================
    성별 함수 정의
=========================================================*/
gender.addEventListener("change", isGenderCompleted);

function isGenderCompleted(){
    if(gender.value === "성별") {
        error[6].style.display = "block";
    } else {
        error[6].style.display = "none";
    }    
}



/*=========================================================
    생년월일 함수 정의
=========================================================*/
userAge.addEventListener("change", isAgeCompleted);

function isAgeCompleted(){
    let agePattern = /[0-9_-]{1,2}/;
    if(userAge.value === ""){
        error[7].innerHTML = "필수 정보입니다.";  
        error[7].style.display = "block";
        error[7].style.color = "#e00012";      
    } else if(!agePattern.test(userAge.value)){
        error[7].innerHTML = "숫자만 사용 가능합니다.";
        error[7].style.display = "block";       
        error[7].style.color = "#e00012";  
    } else{
        error[7].style.display = "none";        
    }
}