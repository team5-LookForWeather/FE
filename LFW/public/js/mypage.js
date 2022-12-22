/*=========================================================
    달력 날짜 정의
=========================================================*/
let currentTitle = document.getElementById('current-year-month');
let calendarBody = document.getElementById('calendar-body');
let today = new Date();
let first = new Date(today.getFullYear(), today.getMonth(), 1);
let dayList = ['일', '월', '화', '수', '목', '금', '토'];
let monthList = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
let leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let notLeapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let pageFirst = first;
let pageYear;
let mainTodayDay = document.getElementById('main-day');
let mainTodayDate = document.getElementById('main-date');


if (first.getFullYear() % 4 === 0) {
    pageYear = leapYear;
} else {
    pageYear = notLeapYear;
}


/*=========================================================
    달력 날짜 화면에 정의
=========================================================*/
function showCalendar() {
    let monthCnt = 100;
    let cnt = 1;
    for (let i = 0; i < 6; i++) {
        let $tr = document.createElement('tr');
        $tr.setAttribute('id', monthCnt);
        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < first.getDay()) || cnt > pageYear[first.getMonth()]) {
                let $td = document.createElement('td');
                $tr.appendChild($td);
            } else {
                let $td = document.createElement('td');
                $td.textContent = cnt;
                $td.setAttribute('id', cnt);
                $tr.appendChild($td);
                cnt++;
            }
        }
        monthCnt++;
        calendarBody.appendChild($tr);
    }
}

showCalendar();


function removeCalendar() {
    let catchTr = 100;
    for (var i = 100; i < 106; i++) {
        var $tr = document.getElementById(catchTr);
        $tr.remove();
        catchTr++;
    }
}


/*=========================================================
    달력 화살표 정의
=========================================================*/
function prev() {
    inputBox.value = "";
    const $divs = document.querySelectorAll('#input-list > div');
    $divs.forEach(function (e) {
        e.remove();
    });
    const $btns = document.querySelectorAll('#input-list > button');
    $btns.forEach(function (e1) {
        e1.remove();
    });
    if (pageFirst.getMonth() === 1) {
        pageFirst = new Date(first.getFullYear() - 1, 12, 1);
        first = pageFirst;
        if (first.getFullYear() % 4 === 0) {
            pageYear = leapYear;
        } else {
            pageYear = notLeapYear;
        }
    } else {
        pageFirst = new Date(first.getFullYear(), first.getMonth() - 1, 1);
        first = pageFirst;
    }
    today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    currentTitle.innerHTML = monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;' + first.getFullYear();
    removeCalendar();
    showCalendar();
    showMain();
    clickedDate1 = document.getElementById(today.getDate());
    clickedDate1.classList.add('cal_active');
    clickStart();
    reshowingList();
}


function next() {
    inputBox.value = "";
    const $divs = document.querySelectorAll('#input-list > div');
    $divs.forEach(function (e) {
        e.remove();
    });
    const $btns = document.querySelectorAll('#input-list > button');
    $btns.forEach(function (e1) {
        e1.remove();
    });
    if (pageFirst.getMonth() === 12) {
        pageFirst = new Date(first.getFullYear() + 1, 1, 1);
        first = pageFirst;
        if (first.getFullYear() % 4 === 0) {
            pageYear = leapYear;
        } else {
            pageYear = notLeapYear;
        }
    } else {
        pageFirst = new Date(first.getFullYear(), first.getMonth() + 1, 1);
        first = pageFirst;
    }
    today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    currentTitle.innerHTML = monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;' + first.getFullYear();
    removeCalendar();
    showCalendar();
    showMain();
    clickedDate1 = document.getElementById(today.getDate());
    clickedDate1.classList.add('cal_active');
    clickStart();
    reshowingList();
}


/*=========================================================
    달력 화살표 가운데 월/년도 정의
=========================================================*/
currentTitle.innerHTML = monthList[first.getMonth()] + '&nbsp;&nbsp;&nbsp;&nbsp;' + first.getFullYear();
function showMain() {
    mainTodayDay.innerHTML = dayList[today.getDay()];
    mainTodayDate.innerHTML = today.getDate();
}
showMain();



/*=========================================================
    달력 선택한 항목 원 표시
=========================================================*/
let clickedDate1 = document.getElementById(today.getDate());
clickedDate1.classList.add('cal_active');
let prevBtn = document.getElementById('prev');
let nextBtn = document.getElementById('next');
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);
let tdGroup = [];

function clickStart() {
    for (let i = 1; i <= pageYear[first.getMonth()]; i++) {
        tdGroup[i] = document.getElementById(i);
        tdGroup[i].addEventListener('click', changeToday);
    }
}


/*=========================================================
    달력 숫자 클릭시 해당 요일 출력
=========================================================*/
function changeToday(e) {
    for (let i = 1; i <= pageYear[first.getMonth()]; i++) {
        if (tdGroup[i].classList.contains('cal_active')) {
            tdGroup[i].classList.remove('cal_active');
        }
    }
    clickedDate1 = e.currentTarget;
    clickedDate1.classList.add('cal_active');
    today = new Date(today.getFullYear(), today.getMonth(), clickedDate1.id);
    showMain();
    keyValue = today.getFullYear() + '' + today.getMonth() + '' + today.getDate();
    reshowingList();
}

clickStart();



/*=========================================================
    달력 
=========================================================*/
function reshowingList() {
    keyValue = today.getFullYear() + '' + today.getMonth() + '' + today.getDate();
    if (todoList[keyValue] === undefined) {
        inputList.textContent = '';
        todoList[keyValue] = [];
        const $divs = document.querySelectorAll('#input-list > div');
        $divs.forEach(function (e) {
            e.remove();
        });
        const $btns = document.querySelectorAll('#input-list > button');
        $btns.forEach(function (e1) {
            e1.remove();
        });
    } else if (todoList[keyValue].length === 0) {
        inputList.textContent = "";
        const $divs = document.querySelectorAll('#input-list > div');
        $divs.forEach(function (e) {
            e.remove();
        });
        const $btns = document.querySelectorAll('#input-list > button');
        $btns.forEach(function (e1) {
            e1.remove();
        });
    } else {
        const $divs = document.querySelectorAll('#input-list > div');
        $divs.forEach(function (e) {
            e.remove();
        });
        const $btns = document.querySelectorAll('#input-list > button');
        $btns.forEach(function (e1) {
            e1.remove();
        });
        let $div = document.createElement('div');
        for (let i = 0; i < todoList[keyValue].length; i++) {
            let $div = document.createElement('div');
            $div.textContent = '-' + todoList[keyValue][i];
            let $btn = document.createElement('button');
            $btn.setAttribute('type', 'button');
            $btn.setAttribute('id', 'del-ata');
            $btn.setAttribute('id', dataCnt + keyValue);
            $btn.setAttribute('class', 'del-data');
            $btn.textContent = delText;
            inputList.appendChild($div);
            inputList.appendChild($btn);
            $div.addEventListener('click', checkList);
            $btn.addEventListener('click', deleteTodo);
            inputBox.value = '';
            function deleteTodo() {
                $div.remove();
                $btn.remove();
            }
        }
    }

}



/*=========================================================
    달력 화살표 클릭 시 달 변경
=========================================================*/
var inputBox = document.getElementById('input-box');
var inputDate = document.getElementById('input-data');
var inputList = document.getElementById('input-list');
var delText = 'X';
inputDate.addEventListener('click', addTodoList);
var dataCnt = 1;
var keyValue = today.getFullYear() + '' + today.getMonth() + '' + today.getDate();
let todoList = [];
todoList[keyValue] = [];
function addTodoList() {
    let $div = document.createElement('div');
    $div.textContent = '-' + inputBox.value;
    let $btn = document.createElement('button');
    $btn.setAttribute('type', 'button');
    $btn.setAttribute('id', 'del-ata');
    $btn.setAttribute('id', dataCnt + keyValue);
    $btn.setAttribute('class', "del-data");
    $btn.textContent = delText;
    inputList.appendChild($div);
    inputList.appendChild($btn);
    todoList[keyValue].push(inputBox.value);
    dataCnt++;
    inputBox.value = '';
    $div.addEventListener('click', checkList);
    $btn.addEventListener('click', deleteTodo);
    function deleteTodo() {
        $div.remove();
        $btn.remove();
    }
}
console.log(keyValue);
function checkList(e) {
    e.currentTarget.classList.add('checked');
}
