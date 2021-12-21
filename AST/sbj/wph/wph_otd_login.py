
import sys
import json
import requests
import re
from common import cookiesmodule
import time
from get_auto_sign import Sign

class WphOtdLogin():

    def __init__(self, login_name):
        self.skey = "3c5ad16dbc06cd16ae1fd3344d87f16b"
        self.api_key = "70f71280d5d547b2a7bb370a529aeea1"
        self.login_name = login_name
        self.password = ""
        self.init_url = "https://passport.vip.com/mobileLogin/v2/initSmsFlow"
        self.get_code_url = "https://captcha.vip.com/getURL"
        self.check_url = "https://captcha.vip.com/check"
        self.check_sms_ticket_url = "https://passport.vip.com/mobileLogin/v2/checkSmsTicket"
        self.login_url = "https://passport.vip.com/mobileLogin/v2/login"
        self.sess = requests.Session()

    def init_data(self):
        """
        初始化，获取用到的初始值
        :return:
        """
        api = "/mobileLogin/v2/initSmsFlow"
        fpData = "{\"canvas\":\"P/sotxCjouhKVrIxz3c/7nFMrwCmzbeefdA8cku1PJPp44zA9alMRk4nIgHVxvBJs91z+tAX3NN8kKSoo8RRExKfWlBnKQWyBL0eZLV+mTxfGx+Wp/hAd6FzBsfa69uJ3BtR4c0xGSLolTErf3o7DJcGqOerZZBnxDtfaheAylYvijo2Hi9GtWtTpuJgxb2JzydLDe8iyMyeJX5jtJsGaPv8Fnri73Euohwf8TB1Jhym95kzZ/63Yo5G4glFlbil2TgOMo9ibGaZy1IvXoNtg5uk/8BMMKyp3cZy1QlfQ8u9suK1SXan1FAd+8oEbMtc\",\"browser\":\"om0FVJhHLDB+ukdaIk+VDhyR18h02VmV3friKNs4mtmB38AHVLiHcm4zpaomVJ2n/XGZirleBOMwRQfqset0daHyWd0lIXHQSMfEuSxgVq6CWAIKzLUQt6138RCJxKl90es4y/HvXDp46lbVJ0CYbcuNRyjRp9WNNGTk0SEMK6tmd9/NVcpsdUjYwDw9LvHE9i+vzAVhgX1146k0IBKH1AreJPKAxIi8dbtcDSSc+Zdt5jJdlP3WkMpp7L1wm/J3AJMyzZNrM5LBhue8SpasAltJ95oRIzlhbjsl83EgnYCxQfZiaO86X1Ea5MoKuvTGkq7Hn28Etb1R/vzEoBzwY0sBVFIRs/bbimfqtMCCcOhZljRTpsbTP6qp1L7t/lgJ+uK1Gk5xk071tHVyzQYs/xrBqbkRxRun8uBSsUIijdagEoOWB+PpVqF2glACo5TubFbrqgRgyw8a01YFJYTQQ82qJgJBzgw0U2oYWuVYh/Vg6boeIGehvdO2KAXP+T1MKHQp/dg3Tt35T7Ki/ICTXw==\",\"screen\":\"YFs2O5AeV70AFsg5iyPoEXFMrwCmzbeefdA8cku1PJP+DnmYmrHWOiFeFhPsa2WspNXkMtno49mLgADP3Lva9Jubi1bGbGSCJtHHFlBS6wJM8/UwJf8Y61EzI/0iuJtYEWX27gaHe1qik7qyvGQ8XnwxLGGi/nS2B1rONPx6C4eTXJnJh/Z7AizWvdVA9z0I3fiwL7plLoLmwt2GEV5eLwRe8vUhLNSyXC4t8m/6MOadKpoUmMozNmhmKUyUlAyIVlJnJzaIsO9m9u75ghmDQHArTvIuTzl/zGB1Plh3JK3yvMCShdsw6VLA+gBY86XjW/RYUO6qzYcE/XoZ8js/4gAEp/MLtMKGHXeocm5o6euVLsRN8H9HnRuS4CrauS9oetuDJIcz2CuQ48Wi8J4lkg==\",\"click\":[\"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\"]}"
        timestemp = int(time.time() * 1000)
        params_str = '--mobile=%s --fpData=%s --_t=%s --api_key=%s' % (self.login_name, fpData, timestemp, self.api_key)
        pc_edata = run.get_pc_edata(params_str)
        params = {
            "api_key": self.api_key,
            "pc_eversion": 1,
            "skey": self.skey,
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
        response = self.sess.post(self.init_url, headers=headers, cookies=cookies, data=params)
        return response, cid, sid

    def send_code(self, captchaId, templateId, cid):
        """
        请求发送验证码
        :param cid:
        :return:
        """
        headers = {
            "referer": "https://passport.vip.com/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
        browser_data = {
            "type": ["browser", "screen", "mars", "bootstrap"],
            "browser": {"ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"},
            "screen": {"width": 1920, "height": 1080},
            "mars": {"cid": cid},
            "bootstrap": {"version": "vsc-58dcbcc1.js"}
        }
        data = {
            "v": 1,
            "source": 0,
            "captchaId": captchaId,
            "captchaType": 2,
            "data": json.dumps(browser_data),
            "templateId": templateId,
            "extend[contact_phone]": self.login_name
        }
        response = self.sess.post(self.get_code_url, headers=headers, data=data)
        return response

    def check_code(self, captchaId, templateId,  code, cid):
        """
        验证验证码是否正确
        :param captchaId:
        :param templateId:
        :param code:
        :param cid:
        :return:
        """
        headers = {
            "referer": "https://passport.vip.com/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
        data = {
                "type": ["browser", "screen", "mars", "bootstrap"],
                "browser": {"ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"},
                "screen": {"width": 1920, "height": 1080},
                "mars": {"cid": cid},
                "bootstrap": {"version": "vsc-58dcbcc1.js"},
                "captchaCode": code,
                "antiCacheTime": int(time.time() * 1000)
            }
        check_data = {
            "v": 1,
            "source": 0,
            "captchaId": captchaId,
            "captchaType": 2,
            "data": json.dumps(data),
            "templateId": templateId,
            "extend[contact_phone]": self.login_name
        }
        response = self.sess.post(self.check_url, headers=headers, data=check_data)
        return response

    def get_common_code(self, phone):
        url = "http://120.78.225.199:8000/msgs_info"
        data = {
            "csrftoken": "86edb3f55ac1e8c62f814339bc8792c2",
            "channel": "唯品会",
            "phone": phone,
            "name": "wmy"
        }
        response = requests.post(url, data=data)
        data = json.loads(response.text)
        code = data['code']
        if code == "200":
            msg = data['msg']
            verify_code = re.findall(r'验证码(\d+?)。', msg).pop()
            return verify_code
        return None

    def check_sms_ticket(self, pid, ticket):
        """
        检测 ticket
        :param pid:
        :param ticket:
        :return:
        """
        headers = {
            "referer": "https://passport.vip.com/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
        data = {
            "pid": pid,
            "passportType": 1,
            "setPwd": "true",
            "whereFrom": "vipotd",
            "smsTicket": ticket,
            "_t": int(time.time() * 1000),
            "api_key": self.api_key
        }
        api = "/mobileLogin/v2/checkSmsTicket"
        sign, sid, cid = run.main(data, api)
        cookies = {
            "mars_sid": sid,
            "mars_cid": cid
        }
        headers['authorization'] = "OAuth api_sign=%s" % sign
        response = self.sess.post(self.check_sms_ticket_url, headers=headers, cookies=cookies, data=data)
        return response

    def login_verfiry(self, api, pid):
        """
        登录验证
        :param pid:
        :return:
        """
        timstemp = int(time.time() * 1000)
        whereFrom = "vipotd"
        setPwd = "true"
        params_str = '--pid=%s --whereFrom=%s --setPwd=%s --_t=%s --api_key=%s' % (pid, whereFrom, setPwd, timstemp, self.api_key)
        pc_edata = run.get_pc_edata(params_str)
        params = {
            "api_key": self.api_key,
            "pc_eversion": 1,
            "skey": self.skey,
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
        response = self.sess.post(self.login_url, headers=headers, cookies=cookies, data=params)
        return response

    def finally_verfiry(self, kname, redirectUrl):
        """
        otd最终验证，保存cookie
        :param token:
        :return:
        """
        url = "https://e.vip.com/login"
        token = re.findall(r'token=(.*)', redirectUrl).pop()
        data = {
            "token": token
        }
        headers = {
            "accept": "application/json, text/plain, */*",
            "accept-language": "zh-CN,zh;q=0.9",
            "advid": "",
            "content-type": "application/json;charset=UTF-8",
            "origin": "https://e.vip.com",
            "referer": redirectUrl,
            "requestid": "eade24d2-b9ad-44ce-98ee-0e5d13cbe930",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "x-requested-with": "XMLHttpRequest"
        }
        response = self.sess.post(url, headers=headers, json=data)
        resp_json = json.loads(response.text)
        if resp_json['data']['code'] == 1:
            cookie_dict = requests.utils.dict_from_cookiejar(self.sess.cookies)
            rdb = cookiesmodule.RedisCookies()
            cookies_str = cookiesmodule.dict2str(cookie_dict)
            print("save cookies: %s succeed" % kname)
            rdb.save_cookies2hash_withtime(kname, cookies_str)
        else:
            print("save cookies: %s fail" % kname)

    def main(self, kname, phone):
        response, cid, sid = self.init_data()
        resp_json = json.loads(response.text)
        if resp_json['code'] == 200:
            pid = resp_json['data']['pid']
            captcha_flow_data = resp_json['data']['smsCaptchaFlowData']
            captchaId = captcha_flow_data['captchaId']
            templateId = captcha_flow_data['templateId']
            # 获取验证码
            self.send_code(captchaId, templateId, cid)
            print("input check code")
            time.sleep(30)
            code = self.get_common_code(phone)
            print(code)
            if not code:
                sys.exit()
            # code = int(input())
            # 判断验证码是否正确，获取ticket
            response = self.check_code(captchaId, templateId, code, cid)
            resp_json = json.loads(response.text)
            ticket = resp_json['data']['ticket']
            # 根据ticket进行二次验证
            response = self.check_sms_ticket(pid, ticket)
            resp_json = json.loads(response.text)
            if resp_json['code'] == 200:
                pid = resp_json['data']['pid']
                api = "/mobileLogin/v2/login"
                response = self.login_verfiry(api, pid)
                resp_json = json.loads(response.text)
                redirectUrl = resp_json['data']['redirectUrl']
                self.finally_verfiry(kname, redirectUrl)

if __name__ == "__main__":
    run = Sign()
    login_name = sys.argv[1]
    kname = sys.argv[2]
    phone = sys.argv[3]
    login = WphOtdLogin(login_name)
    login.main(kname, phone)