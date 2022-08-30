// 답글 달기 클릭
function clickshow(elem, id) {
    let menu = document.getElementById(id);
    if (elem.className != 'reply_closed') {
        elem.className = 'reply_closed';
        menu.style.display = "block";
    } else {
        elem.className = 'reply_opened';
        menu.style.display = "none";
    }
}


// 
let replyForm = document.querySelector('.reply_comment');
let comments = document.querySelector('#post_comment_input');
let submitBtn = document.querySelector('.post_comment_btn');


function replyUpdate(){
    const ulbox = document.querySelector(".comments_info.comment_list_ul")
    const liBox =  document.createElement("li");
    const pBox =  document.createElement("div");
    const userBox = document.createElement("span");
    const commentCtnBox = document.createElement("span");
    let user ="작성한 아이디";

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


submitBtn.addEventListener("click",replyUpdate);