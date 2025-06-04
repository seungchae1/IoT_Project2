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
var ref = database.ref("login");

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('loginForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // 이메일 형식 검증 (간단한 정규식)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('올바른 이메일 형식을 입력하세요.');
      document.getElementById('email').focus();
      return;
    }

    // 여기서 실제 로그인 검증 로직을 추가할 수 있습니다.
    // 예시에서는 바로 성공 처리
    // 입력받은 이메일과 비밀번호를 firebase의 login 안에 저장
    ref.set({
      email: email,
      password: password
    }, function(error) {
      if (error) {
        alert('로그인 정보 저장 중 오류가 발생했습니다.');
      } else {
        window.location.href = 'login_success.html';
      }
    });
    window.location.href = 'login_success.html';
  });
});
