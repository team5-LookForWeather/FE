
function weatherwriter(item) {
    let num = 254 + (hours * 12);
    let currentTMP = "";
    if (item[num].category == "TMP") { currentTMP = item[num].fcstValue }
    else if (item[num + 1].category == "TMP") { currentTMP = item[num + 1].fcstValue }
    else if (item[num + 2].category == "TMP") { currentTMP = item[num + 2].fcstValue };
    console.log("current : ", currentTMP);

    let TMN = "";
    let num2 = 338;
    if (item[num2].category == "TMN") { TMN = item[num2].fcstValue }
    else if (item[num2 - 290].category == "TMN") { TMN = item[num2 - 290].fcstValue }
    console.log("일최저온도 : ", TMN);

    let TMX = "";
    let num3 = 447;
    if (item[num3].category == "TMX") { TMX = item[num3].fcstValue }
    else if (item[num3 - 290].category == "TMX") { TMX = item[num3 - 290].fcstValue }
    console.log("일최고온도 : ", TMX);

    let REH = "";
    let num4 = 264 + (hours * 12);
    if (item[num4].category == "REH") { REH = item[num4].fcstValue }
    else if (item[num4 + 1].category == "REH") { REH = item[num4 + 1].fcstValue }
    else if (item[num4 + 2].category == "REH") { REH = item[num4 + 2].fcstValue };
    console.log("습도 : ", REH);

    let SKY = "";
    let num5 = 259 + (hours * 12);
    if (item[num5].category == "SKY") { SKY = item[num5].fcstValue }
    else if (item[num5 + 1].category == "SKY") { SKY = item[num5 + 1].fcstValue }
    else if (item[num5 + 2].category == "SKY") { SKY = item[num5 + 2].fcstValue };
    console.log("맑음or 흐림 : ", SKY)

    let PTY = "";
    let num6 = 260 + (hours * 12);
    if (item[num6].category == "PTY") { PTY = item[num6].fcstValue }
    else if (item[num6 + 1].category == "PTY") { PTY = item[num6 + 1].fcstValue }
    else if (item[num6 + 2].category == "PTY") { PTY = item[num6 + 2].fcstValue };
    console.log("비 or 눈 : ", PTY)
    //현재 시간의 기온,습도,최저/고온도 하늘상태 가져오기
    /*
    - 하늘상태(SKY) 코드 : 맑음(1), 구름많음(3), 흐림(4)
    - 강수형태(PTY) 코드 : (초단기) 없음(0), 비(1), 비/눈(2), 눈(3), 빗방울(5), 빗방울눈날림(6), 눈날림(7) 
    **/

    var iconnum = null;
    if (PTY == "0") iconnum = `0_${SKY}`
    else iconnum = PTY;

    var A = document.getElementById("icon");
    A.innerHTML = `<img src="image/weathericon/${iconnum}.png">`;
    var B = document.getElementById('temp');
    B.innerHTML = `${currentTMP}° <p class="summary"><span class="weather">맑음</span>어제보다 <span class="temperature up">0.2° <span class="blind">↓</span></span></p>`;
    var C = document.getElementById('lowtemp');
    C.innerHTML = `최저 ${TMN} <span class="weather2">미세</span> <span class="temperature up2">좋음</span> <span class="weather2">초미세</span> <span class="temperature up2">좋음</span>`;
    var D = document.getElementById('hightemp');
    D.innerHTML = `최고 ${TMX} <span class="weather3">체감</span> <span class="temperature up3">27.2°</span> <span class="weather3">동풍</span> <span class="temperature up3">2.5m/s</span>`;
    var E = document.getElementById('humidity');
    E.innerHTML = `습도 : ${REH}`;
    return currentTMP;
};// weather writers

let thetimearr = []
for (var i=0; i<12; i++ ){
    var thetime = hours + i;
    
    if (thetime >24) {
        thetime = thetime-24;
    }
    thetimearr.push(thetime);
}


function drawWeatherChart(arr) {
    var context = document.getElementById('myChart').getContext('2d');
    new Chart(context, {
        type: 'line', // 차트의 형태
        data: { // 차트에 들어갈 데이터
            labels: //x 축
                [thetimearr[0] + "시", thetimearr[1] + "시" , thetimearr[2] + "시", thetimearr[3] + "시", thetimearr[4] + "시", thetimearr[5] + "시", thetimearr[6] + "시", thetimearr[7] + "시", thetimearr[8] + "시",  thetimearr[9] + "시", thetimearr[10] + "시", thetimearr[11] + "시"                ],
            fontColor: "", fontSize: 18,
            datasets: //데이터
                [{ 
                    label: '기온', //차트 제목
                    fill: false, // line 형태일 때, 선 안쪽을 채우는지 안채우는지
                    data: arr, //x축 label에 대응되는 데이터 값
                    borderWidth: 2, //경계선 굵기
                    backgroundColor:"rgba(255, 201, 14, 1)", //배경색
                    borderColor: 'rgb(75, 192, 192)', //경계선 색상
                    tension: 0.1
                }]
        },

        
        

        options: {
				legend: {
			        display: false
			    },
            responsive: false,
            title: {
                display: false,
                // text: '시간별 기온'
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
    });
}

function getTempArr(item, hours) {
    let grpTMParr = [];
    let grpTMP = null;
    for (var i = 0; i < 12; i++) {
        var num7 = 254 + (hours * 12) + (i * 12)
        if (item[num7].category == "TMP") { grpTMP = item[num7].fcstValue }
        else if (item[num7 + 1].category == "TMP") { grpTMP = item[num7 + 1].fcstValue }
        else if (item[num7 + 2].category == "TMP") { grpTMP = item[num7 + 2].fcstValue }
        else if (item[num7 + 3].category == "TMP") { grpTMP = item[num7 + 3].fcstValue }
        else if (item[num7 + 4].category == "TMP") { grpTMP = item[num7 + 4].fcstValue }
        else if (item[num7 + 5].category == "TMP") { grpTMP = item[num7 + 5].fcstValue }
        else if (item[num7 + 6].category == "TMP") { grpTMP = item[num7 + 6].fcstValue }
        grpTMParr.push(grpTMP)
    }
    return grpTMParr;
}

function setCodi(temp) {
    var folder = "";
    if (temp < 0) folder = "00";
    else if (temp < 6) folder = "0-5";
    else if (temp < 12) folder = "6-11";
    else if (temp < 17) folder = "12-16";
    else if (temp < 23) folder = "17-22";
    else if (temp < 28) folder = "23-27";
    else folder = "28";

    var codiImg = document.querySelectorAll(".codiImg");
    for (var i = 0; i < codiImg.length; i++) {
        if (i == 0) $(codiImg[i]).attr("src", `./image/codi/male/${folder}/5.png`);
        else if (i == codiImg.length - 1) $(codiImg[i]).attr("src", `./image/codi/male/${folder}/1.png`);
        else $(codiImg[i]).attr("src", `./image/codi/male/${folder}/${i}.png`);
    }
}



function setCodi2(temp) {
    var folder = "";
    if (temp < 0) folder = "00";
    else if (temp < 6) folder = "0-5";
    else if (temp < 12) folder = "6-11";
    else if (temp < 17) folder = "12-16";
    else if (temp < 23) folder = "17-22";
    else if (temp < 28) folder = "23-27";
    else folder = "28";

    var codiImg = document.querySelectorAll(".codiImg");
    for (var i = 0; i < codiImg.length; i++) {
        if (i == 0) {
            $(codiImg[i]).attr("src", `./image/codi/male/${folder}/5.png`);
            // $(codiImg[i]).innerHTML(`<div><p></p></div>`)
        }
        else if (i == codiImg.length - 1) $(codiImg[i]).attr("src", `./image/codi/male/${folder}/1.png`);
        else $(codiImg[i]).attr("src", `./image/codi/male/${folder}/${i}.png`);
    }
}