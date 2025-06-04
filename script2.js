var config = {
    apiKey: "AIzaSyCV5BVKfxxNJb2cpDprjBboFcnF9tBsU_U",
    authDomain: "myweb-4e1aa.firebaseapp.com",
    databaseURL: "https://myweb-4e1aa-default-rtdb.firebaseio.com",
    projectId: "myweb-4e1aa",
    storageBucket: "myweb-4e1aa.firebasestorage.app",
    messagingSenderId: "752714726741",
    appId: "1:752714726741:web:ddb0e966c08d1f3b2143dc"
};

//Firebase 데이터베이스 만들기
firebase.initializeApp(config);
database = firebase.database();

// Firebase 데이터베이스 정보 가져오기
var sensorRef = database.ref("sensor");
var messageRef = database.ref("message");

// sensor 데이터 리스트로 출력
document.addEventListener('DOMContentLoaded', function () {
    sensorRef.once('value', function (snapshot) {
        const sensorList = document.getElementById('sensorList');
        sensorList.innerHTML = '';
        const data = snapshot.val();
        if (!data) {
            sensorList.innerHTML = '<div>센서 데이터가 없습니다.</div>';
            return;
        }
        const dateStr = data.timestamp
            ? new Date(data.timestamp * 1000).toLocaleString('ko-KR')
            : '';
        const div = document.createElement('div');
        div.className = 'sensor-item';
        div.innerHTML = `
            <div>
              <span class="sensor-label">온도:</span> ${data.temperature} ℃<br>
              <span class="sensor-label">습도:</span> ${data.humidity} %<br>
              <span class="sensor-label">기압:</span> ${data.pressure} hPa<br>
              <span class="sensor-label">기울기:</span> x : ${data.x}°, y : ${data.y}°, z : ${data.z}° <br>
              <span class="sensor-label">업데이트: ${dateStr}</span> 
              </div>
          `;
        sensorList.appendChild(div);
    });
// ...existing code...

// 8x8 매트릭스 DOM 준비
const matrix = document.getElementById('senseMatrix');
let dots = [];
if (matrix) {
  matrix.innerHTML = '';
  dots = [];
  for (let i = 0; i < 64; i++) {
    const dot = document.createElement('div');
    dot.className = 'sensehat-dot';
    matrix.appendChild(dot);
    dots.push(dot);
  }
}

// 메시지를 8x8 매트릭스에 스크롤링 (캔버스 버전)
function scrollMessage(msg) {
  // 각 문자 비트맵을 이어붙임
  let bitmap = [];
  for (let i = 0; i < 8; i++) bitmap[i] = '';
  for (let i = 0; i < msg.length; i++) {
    const charBmp = getCharBitmapCanvas(msg[i]);
    for (let row = 0; row < 8; row++) {
      bitmap[row] += charBmp[row] + '0'; // 문자 사이에 1칸 공백
    }
  }
  // 스크롤 애니메이션
  let pos = 0;
  const totalLen = bitmap[0].length;
  function draw() {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const idx = y * 8 + x;
        if (bitmap[y][x + pos] === '1') {
          dots[idx].classList.add('on');
          dots[idx].style.background = '#2196f3'; // 파란색
        } else {
          dots[idx].classList.remove('on');
          dots[idx].style.background = '#ddd'; // 회색
        }
      }
    }
    pos++;
    if (pos <= totalLen - 8) {
      setTimeout(draw, 120);
    }
  }
  draw();
}

// ...existing code...
    // 메시지 입력폼 처리
    const form = document.getElementById('messageForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const msg = document.getElementById('messageInput').value.trim();
            if (!msg) {
                alert('메시지를 입력하세요.');
                return;
            }
            messageRef.set({
                message: msg
            }, function(error) {
                if (error) {
                    alert('메시지 저장 실패');
                } else {
                    form.reset();
                    scrollMessage(msg);
                }
            });
        });
    }
});