import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const config = {
  apiKey: "AIzaSyAXZKdkx72F2GvM7qaynr5r9agAMAiVX2s",
  authDomain: "commonpjt-fd9ed.firebaseapp.com",
  databaseURL: "https://commonpjt-fd9ed-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "commonpjt-fd9ed",
  storageBucket: "commonpjt-fd9ed.firebasestorage.app",
  messagingSenderId: "653463134970",
  appId: "1:653463134970:web:8301b6f3a2bde8da201f43"
};

const app = initializeApp(config);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', function () {
    const rootRef = ref(database);
    get(rootRef).then((snapshot) => {
        const data = snapshot.val();
        const sensorList = document.getElementById('sensorList');
        sensorList.innerHTML = '';
        if (!data) {
            sensorList.innerHTML = '<div>데이터가 없습니다.</div>';
            return;
        }
        Object.keys(data).forEach((key) => {
            const value = data[key];
            // ref 이름(키) 출력
            const refTitle = document.createElement('div');
            refTitle.style.fontWeight = 'bold';
            refTitle.style.fontSize = '1.1em';
            refTitle.style.margin = '16px 0 4px 0';
            refTitle.textContent = `${key}`;
            sensorList.appendChild(refTitle);

            if (value.info && value.sensehat) {
                const sense = value.sensehat;
                const info = value.info;
                const item = document.createElement('div');
                item.className = 'sensor-item';
                item.innerHTML = `
                    <div>
                        <span class="sensor-label">학번</span> ${info.학번}
                    </div>
                    <div>
                        <span class="sensor-label">온도</span> ${sense.temperature ?? '-'} ℃
                        <span class="sensor-label">습도</span> ${sense.humidity ?? '-'} %
                        <span class="sensor-label">기압</span> ${sense.pressure ?? '-'} hPa
                    </div>
                    <div>
                        <span class="sensor-label">가속도</span>
                        x: ${sense.accel?.x ?? '-'}, y: ${sense.accel?.y ?? '-'}, z: ${sense.accel?.z ?? '-'}
                    </div>
                    <div>
                        <span class="sensor-label">자이로</span>
                        roll: ${sense.gyro?.x ?? '-'}, pitch: ${sense.gyro?.y ?? '-'}, yaw: ${sense.gyro?.z ?? '-'}
                    </div>
                    <div class="timestamp">
                        ${sense.timestamp?.timestamp ?? ''}
                    </div>
                `;
                sensorList.appendChild(item);
            } else {
                // 기타 데이터는 JSON으로 출력
                const item = document.createElement('div');
                item.className = 'sensor-item';
                item.innerHTML = `<pre>${JSON.stringify(value, null, 2)}</pre>`;
                sensorList.appendChild(item);
            }
        });
    });
});