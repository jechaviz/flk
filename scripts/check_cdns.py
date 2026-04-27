import urllib.request
urls = [
    'https://unpkg.com/vue@3/dist/vue.global.js',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
]
for u in urls:
    try:
        req = urllib.request.Request(u, headers={'User-Agent':'python-urllib/3'})
        with urllib.request.urlopen(req, timeout=10) as r:
            data = r.read(1024)
            print(u, '=>', r.status, len(data), 'bytes (partial)')
    except Exception as e:
        print(u, '=> ERROR:', e)
