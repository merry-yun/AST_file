
import contextlib
import os
import tempfile
import requests
from urllib import request
import re
import execjs

def Myurlretrieve(url, filename=None, reporthook=None, data=None, mode="ab"):
    (url_type, path) = url.split(':', 1)
    with contextlib.closing(request.urlopen(url=url, data=data)) as fp:
        headers = fp.info()

        # Just return the local path and the "headers" for file://
        # URLs. No sense in performing a copy unless requested.
        if url_type == "file" and not filename:
            return os.path.normpath(path), headers

        # Handle temporary file setup.
        if filename:
            tfp = open(filename, mode)
        else:
            tfp = tempfile.NamedTemporaryFile(delete=False)
            filename = tfp.name

        with tfp:
            result = filename, headers
            bs = 1024 * 8
            size = -1
            read = 0
            blocknum = 0
            if "content-length" in headers:
                size = int(headers["Content-Length"])

            if reporthook:
                reporthook(blocknum, bs, size)

            while True:
                block = fp.read(bs)
                if not block:
                    break
                read += len(block)
                tfp.write(block)
                blocknum += 1
                if reporthook:
                    reporthook(blocknum, bs, size)

    if size >= 0 and read < size:
        raise Exception(
            "retrieval incomplete: got only %i out of %i bytes"
            % (read, size), result)

    return result

class Url_ts():
    """
    通过一条url获取m3u8文件并下载其ts文件合并到.MP4
    """
    def __init__(self, url, filename="defualt.mp4"):
        """
        :param url: 下载m3u8文件地址
        :param filename: 文件名如."defualt.mp4"
        """
        url = 'https:'+url if 'http' != url[:4] else url
        self.url = url
        self.server = self.url.rsplit("/", 2)[0] + "/"
        info = re.findall('(.*?)(\d+).m3u8\?.*?',url)
        self.head = info[0][0]
        self.id = info[0][1]
        os.makedirs('download', exist_ok=True)
        if filename:
            self.filename = filename
        else:
            self.filename = 'download/'+str(self.id)+'.mp3'

    def getVideoTsUrl(self):
        """
        通过url 下载m3u8文件，读取m3u8文件获取.ts文件链接
        :param url: 下载m3u8文件的地址
        :return: yeild :ts文件地址
        """
        all_content = requests.get(url=self.url).text  # 获取M3U8的文件内容
        file_line = all_content.split("\n")  # 读取文件里的每一行
        # 通过判断文件头来确定是否是M3U8文件
        if file_line[0] != "#EXTM3U":
            raise BaseException(u"非M3U8的链接")
        else:
            unknow = True  # 用来判断是否找到了下载的地址
            for index, line in enumerate(file_line):
                #print(index,line)
                if "EXT" in line:
                    unknow = False
                else:
                    if line != "":
                        pd_url = self.head + line
                        yield pd_url

            if unknow:
                raise BaseException("未找到对应的下载链接")

    def download_ts(self):
        """
        下载ts文件
        :return:
        """
        for url in self.getVideoTsUrl():
            # print(url)
            Myurlretrieve(url=url, filename=self.filename, reporthook=self.Schedule, mode="ab")

    def Schedule(self, a, b, c):
        """
        进度条
        :param a:
        :param b:
        :param c:
        :return:
        """
        per = 100.0 * a * b / c
        if per > 100:
            per = 1
        print("  " + "%.2f%% 已经下载的大小:%ld 文件大小:%ld" % (per, a * b, c) + '\r')

    def run(self):
        self.download_ts()

class vvvdj:
    headers = {
        'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.26 '
                     'Safari/537.36 Core/1.63.6821.400 QQBrowser/10.3.3040.400',
        'Cookie':'PLAYSTYLE=0; bf=1; cnzz_eid=21216903-1317289499-; '
                 'musicls=%7C171140%7C%2C%7C164533%7C%2C%7C74038%7C%2C%7C171136%7C%2C; '
                 'qf_musiclog=%7C171140%7C%2C%7C164533%7C%2C%7C74038%7C%2C%7C171136%7C%2C; sin44053=; rtime=2; '
                 'Hm_lvt_d89009fe03c70c3c98531373f1b90625=1547208642,1547274108,1547466115; '
                 'Hm_lvt_597685a72dadb90d39ad0191f13b72af=1547208642,1547274108,1547466115; '
                 'Hm_lpvt_d89009fe03c70c3c98531373f1b90625=1547466130; '
                 'Hm_lpvt_597685a72dadb90d39ad0191f13b72af=1547466130; cnzz_a44053=6; ltime=1547467897127',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
    }

    def js(self, s):
        ctx = execjs.compile(s)
        x = ctx.call('getUrl')
        return x

    def getHtml(self, url):
        try:
            html = requests.get(url=url, headers=self.headers)
            html = html.content.decode('utf-8')
            self.title = re.findall('<title>(.*?)</title>', html)[0].split(',', -1)[0]
            jsxStr = html.find(r'function DeCode() {')
            jsyStr = html.find('function  Playall(num)')
            funcCode = html[jsxStr:jsyStr]
            s = 'function getUrl(){ var playurl=""; var XCODE=new DeCode();'+funcCode+ ';return playurl;}'
            urlString = self.js(s)
            bl = True
            return urlString, bl
        except Exception as e:
            bl = False
            return e.args[0], bl

if __name__ == '__main__':
    while True:
        number = int(input("输入音频码："))
        url = 'https://www.vvvdj.com/play/{}.html'.format(number)
        _id = re.findall('play/(.*?).html', url)[0]
        print(_id)
        vvv = vvvdj()
        url, bl = vvv.getHtml(url)
        os.makedirs('download', exist_ok=True)
        fileName = 'download/{}.mp3'.format(vvv.title)
        if os.path.exists(fileName):
            if v:=input('已经存在，是否覆盖(y/n):'):
                if v == 'n':
                    break
        x = Url_ts(url, filename=fileName)
        x.run()
        print('下载{}完成'.format(fileName))