// Firebase Modular API import (CDN 사용 시 window에서 가져옴)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

const config = {
  apiKey: "AIzaSyAXZKdkx72F2GvM7qaynr5r9agAMAiVX2s",
  authDomain: "commonpjt-fd9ed.firebaseapp.com",
  databaseURL: "https://commonpjt-fd9ed-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "commonpjt-fd9ed",
  storageBucket: "commonpjt-fd9ed.firebasestorage.app",
  messagingSenderId: "653463134970",
  appId: "1:653463134970:web:8301b6f3a2bde8da201f43"
};

// Firebase 앱 및 DB 초기화
const app = initializeApp(config);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', function () {
    // 전체 ref 데이터 가져오기
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
            const div = document.createElement('div');
            div.className = 'sensor-item';
            div.innerHTML = `<h3>${key}</h3>${JSON.stringify(data[key])}`;
            sensorList.appendChild(div);
        });
    });
});