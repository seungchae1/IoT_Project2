import requests
from sense_hat import SenseHat
import time
import datetime

# Sense HAT 초기화
sense = SenseHat()

# Firebase Realtime Database URL 설정
FIREBASE_URL = 'https://commonpjt-fd9ed-default-rtdb.asia-southeast1.firebasedatabase.app/박승채.json'
MESSAGE_URL = 'https://commonpjt-fd9ed-default-rtdb.asia-southeast1.firebasedatabase.app/message.json'

last_message = None

def get_firebase_message():
    try:
        response = requests.get(MESSAGE_URL)
        if response.status_code == 200:
            return response.json()
        else:
            print("Firebase에서 메시지 가져오기 실패:", response.status_code)
            return None
    except Exception as e:
        print("Firebase 요청 오류:", e)
        return None

while True:
    # 센서 데이터 업로드
    temp = sense.get_temperature()          
    humidity = sense.get_humidity()        
    pressure = sense.get_pressure()        
    acceleration = sense.get_accelerometer_raw()
    orientation = sense.get_orientation()  
    data = {
        "info": {
            '학번' : '2024800006',  
        },
        "sensehat" : {
            "accel": {
                'x': round(acceleration['x'], 4),
                'y': round(acceleration['y'], 4),
                'z': round(acceleration['z'], 4)
            },
            "gyro": {
                'x': round(orientation['roll'], 4),
                'y': round(orientation['pitch'], 4),
                'z': round(orientation['yaw'], 4)
            },
            "humidity": round(humidity, 4),
            "pressure":round(pressure, 4),
            "temperature": round(temp, 4),
            "timestamp": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
    }
    try:
        requests.put(FIREBASE_URL, json=data)
    except Exception as e:
        print("데이터 전송 오류:", e)

    # message 값 가져와 Sense HAT에 출력 (script2.js 참고)
    message = get_firebase_message()
    if message and message != last_message:
        try:
            sense.show_message(str(message), scroll_speed=0.08, text_colour=[0, 128, 255])
            last_message = message
        except Exception as e:
            print("Sense HAT 메시지 출력 오류:", e)
    
    time.sleep(5)