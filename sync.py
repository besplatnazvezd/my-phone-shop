# Файл: sync.py

import requests
import json

# <<< ВОТ ОНА, ТВОЯ ССЫЛКА НА API ДОНОРА >>>
API_URL = "https://sms-pro.guru/buy/api/accounts/?category=TG_ACCOUNTS" 

def sync():
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        # Здесь также будут твои Cookie, если понадобятся для доступа к API
    }

    try:
        response = requests.get(API_URL, headers=headers) # Python отправляет запрос по этой ссылке
        data = response.json() # Получает ответ в формате JSON

        stock_result = {}
        for item in data:
            country_name = item.get('name', 'Неизвестно')
            accounts_list = item.get('accounts', [])
            count = len(accounts_list)
            if country_name:
                stock_result[country_name] = count

        # <<< И ЗДЕСЬ ОН ЗАПИСЫВАЕТ АКТУАЛЬНЫЕ ДАННЫЕ В stock.json >>>
        with open("stock.json", "w", encoding="utf-8") as f:
            json.dump(stock_result, f, ensure_ascii=False, indent=4)
        
        print("✅ Синхронизация прошла успешно! Данные обновлены в stock.json.")

    except Exception as e:
        print(f"❌ Ошибка: {e}")

if __name__ == "__main__":
    sync()
