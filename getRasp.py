import requests
from sense_hat import SenseHat
import time
import datetime

# Sense HAT 초기화
sense = SenseHat()

# Firebase Realtime Database URL 설정
FIREBASE_URL = 'https://commonpjt-fd9ed.firebaseapp.com/박승채.json'

while True:
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
            "humidity": {'humidity': round(humidity, 4)},
            "pressure": {'pressure': round(pressure, 4)},
            "temperature": {'temperature': round(temp, 4)},
            "timestamp": {'timestamp': datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        }
    }
    try:
        requests.put(FIREBASE_URL, json=data)
    except Exception as e:
        print("데이터 전송 오류:", e)

    time.sleep(5)
