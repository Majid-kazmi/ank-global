import urllib.request
import json
import os

os.makedirs('frontend/public/animations', exist_ok=True)

urls = [
    ('growth-chart', 'https://assets2.lottiefiles.com/packages/lf20_m64r7cwa.json'),
    ('security-shield', 'https://assets9.lottiefiles.com/packages/lf20_1LdQFl.json'),
    ('success-check', 'https://assets10.lottiefiles.com/packages/lf20_jbrwfy9x.json'),
    ('calendar-schedule', 'https://assets3.lottiefiles.com/packages/lf20_x62chjtu.json'),
]

for name, url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=8) as resp:
            content = resp.read()
            data = json.loads(content.decode('utf-8'))
            file_path = f'frontend/public/animations/{name}.json'
            with open(file_path, 'wb') as f:
                f.write(content)
            print(f'{name}: SAVED ({len(content)} bytes), layers={len(data.get("layers", []))}')
    except Exception as e:
        print(f'{name}: FAILED - {e}')
