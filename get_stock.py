import requests
import json

# Ссылка, которую мы нашли в Network
url = "https://sms-pro.guru/buy/api/accounts/?category=TG_ACCOUNTS"
response = requests.get(url)
data = response.json()

# Выбираем нужные данные (например, для первой страны в списке)
# Здесь можно настроить логику под твой сайт
with open('stock.json', 'w') as f:
    json.dump(data, f)
