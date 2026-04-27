import urllib.request
from pathlib import Path
url = 'https://unpkg.com/vue@3/dist/vue.global.js'
out = Path(__file__).parent.parent / 'vendor' / 'vue.global.js'
out.parent.mkdir(parents=True, exist_ok=True)
print('Fetching', url)
req = urllib.request.Request(url, headers={'User-Agent':'python-urllib/3'})
with urllib.request.urlopen(req, timeout=20) as r:
    data = r.read()
    out.write_bytes(data)
    print('Wrote', out, len(data), 'bytes')
