
from hashlib import sha1
import json
import math
import random
import requests
import os
import time
import execjs

class Sign():

    def get_pc_edata(self, params_str):
        """
        根据传入参数，调用nodejs获取pc_edata
        :param: params_str
        :return: pc_edata
        """
        pc_edata = os.popen("node wph_crypt.js {}".format(params_str)).read()
        return pc_edata.replace("\n", "")

    def sha1_encrypt(self, word):
        """
        进行sha1加密
        :param word:
        :return: result
        """
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
    # param = '{"pid":"24000","age":"12"}'
    # print(str(param))
    # param = '{"pid":"24000-e55767d4692f439f86878e904da13cf5","set_Pwd":"true","t":162694,"apikey":"70"}'
    # pid = "24000-e55767d4692f439f86878e904da13cf5"
    # _t = 1626946386547
    # param = '{"pid":"%s","whereFrom":"vipotd","setPwd":"true","_t":%d,"api_key":"70f71280d5d547b2a7bb370a529aeea1"})' % (pid, _t)
    # result = os.popen("node test.js '{}'".format(param)).read()
    # print(result)
    # params_str = '{"mobile":"%s","fpData":"%s,"_t":"%s","api_key":"%s"}' % (1, 2, 3, 4)
    params_str = '--mobile=%s --fpData=%s --_t=%s --api_key=%s' % (1, 2, 3, 4)
    result = os.popen("node test.js {} ".format(params_str)).read()
    print(result)