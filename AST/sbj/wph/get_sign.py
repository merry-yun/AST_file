
from hashlib import sha1
import json
import math
import random
import requests
import re
import os
from common import cookiesmodule
sess = requests.Session()
import time

class AUTOSIGN():

    def get_pc_edata(self, skey, timestemp):
        loginName = "15521603820"
        password = "5d93ceb70e2bf5daa84ec3d0cd2c731a"
        pc_edata = os.popen('node wph_crypt.js {skey} {loginName} {password} {timestemp}'.format(skey=skey, loginName=loginName, password=password, timestemp=timestemp)).read().replace("\n", "")
        return pc_edata

    def sha1_encrypt(self, word):
        encode_word = sha1(word.encode('utf-8'))
        result = encode_word.hexdigest()
        return result

    def hash_Param(self, params):
        """
        :param params: 传入参数params
        :return: 经过字母排序后的字符串
        """
        word_list = []
        middle = json.dumps(params, sort_keys=True)
        params = json.loads(middle)
        for key, value in params.items():
            if key == "api_key":
                continue
            word = '{}={}'.format(key, value)
            word_list.append(word)
        result = '&'.join(i for i in word_list)
        return result

    def get_mars_sid(self):
        """
        :return: mars_sid
        """
        encode_list = "0123456789abcdef"
        a = []
        for _ in range(32):
            index = math.ceil(1E8 * random.random()) % 16
            a.append(encode_list[index])
        result = ''.join(i for i in a)
        return result

    def get_secret(self, param):
        data = {
            "secret": "qyrohlf5sjazleru",
            "enString": {
                "70f71280d5d547b2a7bb370a529aeea1": "U2FsdGVkX197SM3Eh62XyjAwTXznW9DdALdNR1gKNsewAg3fzwA0x/+UQldlbi3oYBn8eFHgTtBUcGneYPCjIA==",
                "8cec5243ade04ed3a02c5972bcda0d3f": "U2FsdGVkX1+ZmG8rT/n9qDbrWBnK0K3G0gsoPo0N6/6qx8AklnZmXLyulj0KAy07ixFAu6oMKmOY0+VH3DjQ2Q==",
                "adf779847ac641dd9590ccc5674e25d2": "U2FsdGVkX1/VI+95aRUsSZCDB3rmMe2DPSUO+rSH7U/tlNnA5u9anTM3oHI+XgIeHWA5XDAo0Z19ddwzFeHFXA=="
                        }
                }
        word = data['enString'][param['api_key']]
        secret = data['secret']

    def get_mars_cid(self, mars_sid):
        """
        params: mars_sid
        :return: mars_cid
        """
        date = str(int(time.time() * 1000))
        d = 0
        l = 0
        for i in range(len(date)):
            d += int(date[i])
        index = d % 32
        for i in range(len(mars_sid)):
            if i == index:
                continue
            l += int(mars_sid[i], 16)
        g = self.baseN(l % 16, 16)
        a = date + "_" + mars_sid[0: index] + g + mars_sid[1 + index: d]
        return a

    def baseN(self, num, b):
        """
        进制转换
        :param num:
        :param b:
        :return:
        """
        return ((num == 0) and "0") or (self.baseN(num // b, b).lstrip("0") + "0123456789abcdefghijklmnopqrstuvwxyz"[num % b])

    def main(self, param, api):
        sid = self.get_mars_sid()
        cid = self.get_mars_cid(sid)
        hashParam = self.sha1_encrypt(self.hash_Param(param))
        secret_key = "ea6f62dad8ee40638832f3bd125f1a37"
        word = api + hashParam + sid + cid + secret_key
        sign = self.sha1_encrypt(word)
        return sign, sid, cid

if __name__ == "__main__":
    url = "https://passport.vip.com/login/postLogin"
    run = AUTOSIGN()
    api = "/login/postLogin"
    skey = "3c5ad16dbc06cd16ae1fd3344d87f16b"
    timestemp = int(time.time() * 1000)
    sess = requests.Session()
    pc_edata = run.get_pc_edata(skey, timestemp)
    params = {
        "api_key": "70f71280d5d547b2a7bb370a529aeea1",
        "pc_eversion": 1,
        "skey": "3c5ad16dbc06cd16ae1fd3344d87f16b",
        "pc_edata": pc_edata
    }
    sign, sid, cid = run.main(params, api)
    headers = {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9",
        "authorization": "OAuth api_sign=%s" % sign,
        "origin": "https://passport.vip.com",
        "referer": "https://passport.vip.com/login?whereFrom=vipotd&src=https%3A%2F%2Fe.vip.com%2Fmain.html%3Fclchash%3D1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "x-requested-with": "XMLHttpRequest"
    }
    cookies = {
        "mars_sid": sid,
        "mars_cid": cid
    }
    data = {
        "api_key": "70f71280d5d547b2a7bb370a529aeea1",
        "pc_eversion": "1",
        "skey": skey,
        "pc_edata": pc_edata
    }
    response = sess.post(url, headers=headers, cookies=cookies, data=data)
    resp_json = json.loads(response.text)
    redirectUrl = resp_json['redirectUrl']
    print(redirectUrl)
    challengeId = re.findall(r'challengeId=(.*?)&', redirectUrl).pop()
    sign = re.findall(r'sign=(.*?)&', redirectUrl).pop()
    phone_check_url = "https://safe.vip.com/Challenge/getData"
    headers = {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "referer": "https://defend.vip.com/"
    }
    param = {
        "sign": sign,
        "challengeId": challengeId,
        "challengeWayName": "VerifyBoundPhone",
        "_": int(time.time() * 1000)
    }
    sess.get(redirectUrl, headers=headers)
    time.sleep(0.5)
    response = sess.get(phone_check_url, cookies=cookies, headers=headers, params=param)
    print(response.text)
    print(response.url)