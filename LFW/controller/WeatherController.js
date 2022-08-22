const models = require("../model");
const axios = require("axios")

//* weather메뉴
exports.get = (req, res) => {
    res.render("weather");
}

//* 위치검색
//^ 현위치 검색
exports.post("/getlocation", async function (req, res) {
    try {
        var { latitude, longitude } = req.data;

        // LCC DFS 좌표변환 ( code : "toXY"(위경도->좌표, v1:위도, v2:경도))
        function dfsXYConv(code, v1, v2) {
            const { PI, tan, log, cos, pow, floor, sin, sqrt, atan, abs, atan2 } = Math;

            // LCC DFS 좌표변환을 위한 기초 자료
            const RE = 6371.00877; // 지구 반경(km)
            const GRID = 5.0; // 격자 간격(km)
            const SLAT1 = 30.0; // 투영 위도1(degree)
            const SLAT2 = 60.0; // 투영 위도2(degree)
            const OLON = 126.0;// 기준점 경도(degree)
            const OLAT = 38.0; // 기준점 위도(degree)
            const XO = 43; // 기준점 X좌표(GRID)
            const YO = 136; // 기1준점 Y좌표(GRID)

            const DEGRAD = PI / 180.0;
            const RADDEG = 180.0 / PI;

            const re = RE / GRID;
            const slat1 = SLAT1 * DEGRAD;
            const slat2 = SLAT2 * DEGRAD;
            const olon = OLON * DEGRAD;
            const olat = OLAT * DEGRAD;

            let sn = tan(PI * 0.25 + slat2 * 0.5) / tan(PI * 0.25 + slat1 * 0.5);
            sn = log(cos(slat1) / cos(slat2)) / log(sn);
            let sf = tan(PI * 0.25 + slat1 * 0.5);
            sf = pow(sf, sn) * cos(slat1) / sn;
            let ro = tan(PI * 0.25 + olat * 0.5);
            ro = re * sf / pow(ro, sn);
            const rs = {};
            let ra, theta;


            if (code === 'toXY') {
                rs.lat = v1;
                rs.lon = v2;
                ra = tan(PI * 0.25 + (v1) * DEGRAD * 0.5);
                ra = re * sf / pow(ra, sn);
                theta = v2 * DEGRAD - olon;
                if (theta > PI) theta -= 2.0 * PI;
                if (theta < -PI) theta += 2.0 * PI;
                theta *= sn;
                rs.nx = floor(ra * sin(theta) + XO + 0.5);
                rs.ny = floor(ro - ra * cos(theta) + YO + 0.5);
            } else {
                rs.nx = v1;
                rs.ny = v2;
                const xn = v1 - XO;
                const yn = ro - v2 + YO;
                ra = sqrt(xn * xn + yn * yn);
                if (sn < 0.0) ra = -ra;
                let alat = pow((re * sf / ra), (1.0 / sn));
                alat = 2.0 * atan(alat) - PI * 0.5;

                if (abs(xn) <= 0.0) {
                    theta = 0.0;
                } else {
                    if (abs(yn) <= 0.0) {
                        theta = PI * 0.5;
                        if (xn < 0.0) theta = -theta;
                    } else theta = atan2(xn, yn);
                }
                const alon = theta / sn + olon;
                rs.lat = alat * RADDEG;
                rs.lon = alon * RADDEG;
            }
            return rs;
        }
        var rs = await dfsXYConv("toXY", latitude, longitude);
        Number(rs.nx); Number(rs.ny);

        // 날씨정보 요청
        function reqURL(nx, ny) {
            var today = new Date();
            var yyyy = today.getFullYear();
            var mm = today.getMonth() + 1;
            var dd = today.getDate();
            var hours = today.getHours();
            var minutes = today.getMinutes();

            //basetime: 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300
            if (hours < 2 || (hours == 2 && minutes < 10)) {    //새벽2시 이전은 전날로 계산
                today.setDate(today.getDate() - 1);
                yyyy = today.getFullYear();
                mm = today.getMonth() + 1;
                dd = today.getDate();
                hours = 23;
            } else if (hours < 5 || (hours == 5 && minutes < 10)) {
                hours = 2;
            } else if (hours < 8 || (hours == 8 && minutes < 10)) {
                hours = 5;
            } else if (hours < 11 || (hours == 11 && minutes < 10)) {
                hours = 8;
            } else if (hours < 14 || (hours == 14 && minutes < 10)) {
                hours = 11;
            } else if (hours < 17 || (hours == 17 && minutes < 10)) {
                hours = 14;
            } else if (hours < 20 || (hours == 20 && minutes < 10)) {
                hours = 17;
            } else if (hours < 23 || (hours == 23 && minutes < 10)) {
                hours = 20;
            } else { hours = 23; }

            if (mm < 10) { mm = '0' + mm }
            if (dd < 10) { dd = '0' + dd }
            if (hours < 10) { hours = '0' + hours }


            var serviceKey = "Su%2FjD4AQWu0vPPnQkcm0dVbiPxWqLgUu6AN6Snk4oK0JGGr38kehRNwGQtPIWP9iZ7BzO%2FQccEWTlb5yAxsUPw%3D%3D",
                numOfRows = 12,
                base_date = yyyy + "" + mm + "" + dd,
                base_time = hours + "00",
                _nx = nx, _ny = ny;
            let requrl = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
            requrl += "?serviceKey=" + serviceKey;
            requrl += "&pageNo=1&numOfRows=" + numOfRows;
            requrl += "&dataType=JSON";
            requrl += "&base_date=" + base_date;
            requrl += "&base_time=" + base_time;
            requrl += "&nx=" + _nx + "&ny=" + _ny;

            return requrl;
        }
        var reqMSG = await reqURL(rs.nx, rs.ny);
        console.log(reqMSG);

        await axios({
            method: "get",
            url: reqMSG,
        }).then((result) => {
            return result.data.response.body;
        }).then((data) => {
            console.log(data.items);
            res.json(data.items);
        })
    } catch (error) {
        if (error.response) {
            //요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        }
        else if (error.request) {
            //요청이 이루어 졌으나 응답을 받지 못했습니다.
            //`error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는 Node.js의 http.ClientRequest 인스턴스입니다.
            console.log(error.request);
        }
        else {
            //오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
            console.log('Error', error.message);
        }
        console.log(error.config);
    };
})


//^ 지역 검색
exports.searchlocation = (req, res) => {

}

//* 날씨api 요청 


//* 날씨정보 전송




// function getAxios() {
//     let params = {
//         serviceKey: "Su%2FjD4AQWu0vPPnQkcm0dVbiPxWqLgUu6AN6Snk4oK0JGGr38kehRNwGQtPIWP9iZ7BzO%2FQccEWTlb5yAxsUPw%3D%3D",
//         numOfRows: 3,
//         pageNo: 1,
//         base_date: "20220817",
//         dataType: "JSON",
//         base_time: "0600",
//         nx: 55,
//         ny: 127
//     }

//     axios({
//         method: "get",
//         url: "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst",
//         params: params
//     }).then((result) => {
//         console.log(result);
//     })
// }





 // await axios({
    //     method: "get",
    //     url: "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=Su%2FjD4AQWu0vPPnQkcm0dVbiPxWqLgUu6AN6Snk4oK0JGGr38kehRNwGQtPIWP9iZ7BzO%2FQccEWTlb5yAxsUPw%3D%3D&numOfRows=10&pageNo=2&dataType=JSON&base_date=20220818&base_time=2000&nx=55&ny=127"
    // }).then((result) => {
    //     return result.data;
    // }).then((data) => {
    //     // console.log(data);
    //     console.log(data.response.body.items);
    //     // console.log("items - item : ", data.items.item);

    //     let item = data.response.body.items;
    //     res.json(item);
    // })
