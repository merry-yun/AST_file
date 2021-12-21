
import requests
import time
url = "https://alimama2.taobao.com/account/getRealBalance.json"

payload = {
    'r': 'mx_1178',
    'bizCode': 'dkx',
    'timeStr': 1627537291204,
    'dynamicToken': '200200200228224208220228428456444416444424208208',
    'csrfID': '162753722705908007353319779826977'
}

"""
1627537291204
1627537227059
"""

headers = {
  'accept': 'application/json, text/javascript, */*; q=0.01',
  'accept-encoding': 'gzip, deflate, br',
  'cookie': 't=5aa949e8e2142d0c31a3730f016f86e4; enc=FUJGtnxMLiU2ztdhu08paBQFY%2FwLahzRFx7rVd9vOeiQZy0Pmol2LRw9fJlrd7qXik86jWWeHSKMk9%2BmdRHHLVGAwsnIpYGVy9W1%2BjHWV2o%3D; cookie2=17b5d27ef8babbec6d0df0190754198c; _tb_token_=5ee3e1ee5a859; _samesite_flag_=true; xlly_s=1; unb=2200778572057; sn=perfectdiary%E6%97%97%E8%88%B0%E5%BA%97%3Aspider; uc1=cookie14=Uoe2ytBGo%2Fn9pw%3D%3D&cookie21=VFC%2FuZ9aj3yE; csg=fec13b32; cancelledSubSites=empty; skt=c22b530acc5e3c8f; _cc_=Vq8l%2BKCLiw%3D%3D; cna=RVNkGZNjK0sCAQ4Sk+pYdYT7; tfstk=c7PRB_DObijlCyuY78BcdbO1U2i5agIKcUiH9a7vo6DMfOOHTsqQs5esITgB2jQA.; l=eBM4QXdgj6Oh7U_6BO5alurza77T6Idb8sPzaNbMiInca6tA0CXq0NCKg2GyUdtjgtCjoe-rFQx-eRn6Wgadg-nGd2xO8a0inxvO.; isg=BFNTqZerNniuR_sGb1s4Gz1f4td9COfKyU74_QVxV3JthHImjtqhGvKSvvTqJD_C',
  'origin': 'https://adbrain.taobao.com',
  'referer': 'https://adbrain.taobao.com/',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

response = requests.request("GET", url, headers=headers, params=payload)

print(response.text)