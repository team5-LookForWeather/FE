//MOBILE MENU
jQuery("header .nav .nav-icon").click(function () {
	jQuery(this).toggleClass("active");
	jQuery("header .navbar").toggleClass("active");
});


jQuery(document).on("click", ".nav .navbar.active>li.menu-item-has-children > a", function () {
	jQuery(this).removeAttr('href');
	let is_display = jQuery(this).next(".sub-menu").css("display");
	if (is_display == "block") {
		jQuery(this).next(".sub-menu").stop().slideUp();
		jQuery(this).parent('li').removeClass('active');
	} else {
		jQuery(".sub-menu").stop().slideUp();
		jQuery(this).next(".sub-menu").stop().slideDown();
		jQuery(".nav .navbar.active>li.menu-item-has-children").removeClass('active');
		jQuery(this).parent('li').addClass('active');
	}
	return false;
});




// let header = document.querySelector('header');
// let headerMoving = function (direction) {
//     if (direction === "up") {
//         header.className = '';
//     } else if (direction === "down") {
//         header.className = 'scrollDown';
//     }
// };


let prevScrollTop = 0;
document.addEventListener("scroll", function () {
    let nextScrollTop = window.pageYOffset || 0; // pageYOffset -> IE 8 이하 빼고 다 됨.
    if (nextScrollTop > prevScrollTop) {
        headerMoving("down");
    } else if (nextScrollTop < prevScrollTop) {
        headerMoving("up");
    }
    prevScrollTop = nextScrollTop;
});     


//footer 토글
$('footer > .layout > .site-box > .relate-site > .box-1').click(function() {
    var $this = $(this);
    $this.toggleClass('active');
});



// 댓글 좋아요

let commentLike = document.querySelectorAll('.comment-like');
commentLike.forEach(function(event) {
    event.addEventListener('click', function() {
        var likeBtn = this.querySelector('.comment-heart');
        var likedBtn = this.querySelector('.comment-heart-liked');

        if (likeBtn.style.display === 'none') {
            likeBtn.style.display = 'inline-block';
            likedBtn.style.display = 'none';
        } else {
            likeBtn.style.display = 'none';
            likedBtn.style.display = 'inline-block';
        }
    })
})