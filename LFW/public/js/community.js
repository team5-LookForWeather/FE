// 답글 달기 클릭
// function clickshow(elem) {
//     let menu = document.querySelector("#reply_comment");
//     if (elem.className != 'reply_closed') {
//         elem.className = 'reply_closed';
//         menu.style.display = "block";
//     } else {
//         elem.className = 'reply_opened';
//         menu.style.display = "none";
//     }
// }


// 
let replyForm = document.querySelector('.reply_comment');

let comments = document.querySelector('#post_comment_input');
let comments2 = document.querySelector('#post_comment_input2');
let comments3 = document.querySelector('#post_comment_input3');

let $submitBtn = document.getElementsByClassName('post_comment_btn')[0];
let $$submitBtn = document.getElementsByClassName('post_comment_btn2')[0];
let $$$submitBtn = document.getElementsByClassName('post_comment_btn3')[0];


function replyUpdate() {
    const ulbox = document.querySelector(".comments_info.comment_list_ul");
    const liBox = document.createElement("li");
    const pBox = document.createElement("div");
    const userBox = document.createElement("span");
    const commentCtnBox = document.createElement("span");
    let user = "작성 아이디1";



    userBox.setAttribute("class", "user_id");
    commentCtnBox.setAttribute("class", "comment_contents");
    pBox.setAttribute("class", "comments_tit");

    userBox.innerHTML = user;
    commentCtnBox.innerHTML = comments.value;

    pBox.appendChild(userBox);
    userBox.style.cssText = 'padding:0 10px 0 0';
    pBox.appendChild(commentCtnBox);
    liBox.appendChild(pBox);
    ulbox.appendChild(liBox);
    comments.value = "";
}


function replyUpdate2() {
    const ulbox = document.querySelector(".comments_info.comment_list_ul2");
    const liBox = document.createElement("li");
    const pBox = document.createElement("div");
    const userBox = document.createElement("span");
    const commentCtnBox = document.createElement("span");
    let user = "작성 아이디2";



    userBox.setAttribute("class", "user_id2");
    commentCtnBox.setAttribute("class", "comment_contents2");
    pBox.setAttribute("class", "comments_tit2");

    userBox.innerHTML = user;
    commentCtnBox.innerHTML = comments2.value;

    pBox.appendChild(userBox);
    userBox.style.cssText = 'padding:0 10px 0 0';
    pBox.appendChild(commentCtnBox);
    liBox.appendChild(pBox);
    ulbox.appendChild(liBox);
    comments2.value = "";
}


function replyUpdate3() {
    const ulbox = document.querySelector(".comments_info.comment_list_ul3");
    const liBox = document.createElement("li");
    const pBox = document.createElement("div");
    const userBox = document.createElement("span");
    const commentCtnBox = document.createElement("span");
    let user = "작성 아이디3";



    userBox.setAttribute("class", "user_id3");
    commentCtnBox.setAttribute("class", "comment_contents3");
    pBox.setAttribute("class", "comments_tit3");

    userBox.innerHTML = user;
    commentCtnBox.innerHTML = comments3.value;

    pBox.appendChild(userBox);
    userBox.style.cssText = 'padding:0 10px 0 0';
    pBox.appendChild(commentCtnBox);
    liBox.appendChild(pBox);
    ulbox.appendChild(liBox);
    comments3.value = "";
}


$submitBtn.addEventListener("click", replyUpdate);
$$submitBtn.addEventListener("click", replyUpdate2);
$$$submitBtn.addEventListener("click", replyUpdate3);