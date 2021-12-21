import requests

headers = {
    'authority': 'www.zhipin.com',
    'pragma': 'no-cache',
    'cache-control': 'no-cache',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-user': '?1',
    'sec-fetch-dest': 'document',
    'referer': 'https://www.zhipin.com/c101280100/?ka=sel-city-101280100',
    'accept-language': 'zh-CN,zh;q=0.9',
    'cookie': 'Hm_lvt_194df3105ad7148dcf2b98a91b5e727a=1630908224; lastCity=100010000; __g=-; __l=l=^%^2Fwww.zhipin.com^%^2Fjob_detail^%^2F^&s=3^&friend_source=0^&s=3^&friend_source=0; Hm_lpvt_194df3105ad7148dcf2b98a91b5e727a=1630943440; __c=1630908482; __a=32190464.1630908482..1630908482.4.1.4.4; __zp_stoken__=FcURDdSQCJlcQFRB1HCVMbyxwXlUfMyAWGEAWcTYABVwrZyQRDD9^%^2BYFYtBmdHeDol',
}

params = (
    ('ka', 'sel-city-101010100'),
)

response = requests.get('https://www.zhipin.com/c101010100/', headers=headers, params=params)
print(response.text)

#NB. Original query string below. It seems impossible to parse and
#reproduce query strings 100% accurately so the one below is given
#in case the reproduced version is not "correct".
# response = requests.get('https://www.zhipin.com/c101010100/?ka=sel-city-101010100', headers=headers)
