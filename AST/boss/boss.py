
import requests_html
import random
import time
import base64
from urllib import parse

def unsignright(i, q):
    i = bin(i)[2:]
    while len(i) < 32:
        i = '0' + i
    i = i[-32:]
    if q != 0:
        i = i[:q * -1]
    i = int(i, 2)
    return i

def YT(c):
    if len(c) <= 1:
        return None
    else:
        h = []
        for i in range(len(c)):
            h.append(c[i])
        h.sort()
        for i in range(len(h) - 1):
            if h[i] == h[i + 1]:
                return h[i]
    return None

def MUH(c):
    h = YT(c)
    if h:
        A = ''.join(c).find(h)
        B = ord(h)
        while True:
            B = B + 1
            D = chr(B)
            if ''.join(c).find(D) == -1:
                c[A] = D
                break
        c = MUH(c)
    return c

def zp_token(seed, ts):
    key = '1fa1ad648e098d74'  # 按照版本变化，每天一变  建议通过ast方式获取
    key_table = {"0": "{", "1": "E", "2": "=", "3": "v", "4": "y", "5": "B", "6": ">", "7": "g", "8": "%", "9": "-",
                 " ": "4", "!": "+", "\"": "n", "#": "!", "$": "l", "%": "V", "&": "R", "'": "?", "(": "L", ")": "<",
                 "*": "'", "+": "O", ",": "d", "-": "D", ".": "A", "/": "w", ":": "z", ";": ",", "<": "j", "=": "*",
                 ">": "2", "?": "_", "@": "t", "A": "J", "B": "5", "C": "P", "D": "|", "E": "\\", "F": "0", "G": "}",
                 "H": "e", "I": ":", "J": "9", "K": "I", "L": "F", "M": "f", "N": ";", "O": "X", "P": "1", "Q": "h",
                 "R": "8", "S": "$", "T": "b", "U": "K", "V": "p", "W": "`", "X": "N", "Y": "&", "Z": "^", "[": "a",
                 "\\": "]", "]": "k", "^": "#", "_": ".", "`": "3", "a": "M", "b": "r", "c": "U", "d": "C", "e": "Y",
                 "f": "c", "g": "\"", "h": "m", "i": "o", "j": "Z", "k": "@", "l": "7", "m": "G", "n": "[", "o": "(",
                 "p": ")", "q": "Q", "r": "u", "s": "~", "t": "6", "u": "W", "v": "H", "w": "x", "x": "i", "y": "s",
                 "z": " ", "{": "T", "|": "S", "}": "/", "~": "q"}
    key_mapping = list(map(lambda n: ord(key_table[n]), list(key)))
    key_table_2 = {"0": "F", "1": "P", "2": ">", "3": "`", "4": " ", "5": "B", "6": "t", "7": "l", "8": "R", "9": "J",
                   " ": "z", "!": "#", "\"": "g", "#": "^", "$": "S", "%": "8", "&": "Y", "'": "*", "(": "o", ")": "p",
                   "*": "=", "+": "!", ",": ";", "-": "9", ".": "_", "/": "}", ":": "I", ";": "N", "<": ")", "=": "2",
                   ">": "6", "?": "'", "@": "k", "A": ".", "B": "5", "C": "d", "D": "-", "E": "1", "F": "L", "G": "m",
                   "H": "v", "I": "K", "J": "A", "K": "U", "L": "(", "M": "a", "N": "X", "O": "+", "P": "C", "Q": "q",
                   "R": "&", "S": "|", "T": "{", "U": "c", "V": "%", "W": "u", "X": "O", "Y": "e", "Z": "j", "[": "n",
                   "\\": "E", "]": "\\", "^": "Z", "_": "?", "`": "W", "a": "[", "b": "T", "c": "f", "d": ",", "e": "H",
                   "f": "M", "g": "7", "h": "Q", "i": "x", "j": "<", "k": "]", "l": "$", "m": "h", "n": "\"", "o": "i",
                   "p": "V", "q": "~", "r": "b", "s": "y", "t": "@", "u": "r", "v": "3", "w": "/", "x": "w", "y": "4",
                   "z": ":", "{": "0", "|": "D", "}": "G", "~": "s"}
    key_mapping_2 = list(map(lambda n: ord(key_table_2[chr(n)]), key_mapping))
    key_mapping_3 = list(map(lambda n: key_mapping[n] ^ key_mapping_2[n], range(len(key))))

    seed_table = {"0": "u", "1": "]", "2": "T", "3": "5", "4": "k", "5": "p", "6": "|", "7": "o", "8": " ", "9": "_",
                  " ": "m", "!": "V", "\"": "6", "#": "^", "$": "\"", "%": "K", "&": "8", "'": "-", "(": "S", ")": "a",
                  "*": "R", "+": "9", ",": "G", "-": "D", ".": "b", "/": "<", ":": "{", ";": "i", "<": "B", "=": "q",
                  ">": "x", "?": "7", "@": "L", "A": "t", "B": "@", "C": "v", "D": "l", "E": "g", "F": "n", "G": "X",
                  "H": "$", "I": "&", "J": "=", "K": "\\", "L": "!", "M": "e", "N": "F", "O": "P", "P": ":", "Q": "(",
                  "R": "/", "S": "O", "T": "#", "U": "j", "V": "[", "W": "+", "X": "C", "Y": "w", "Z": "*", "[": ".",
                  "\\": ";", "]": "4", "^": "M", "_": "1", "`": "h", "a": "Z", "b": "?", "c": ")", "d": "J", "e": "r",
                  "f": "0", "g": "`", "h": "Q", "i": "f", "j": "3", "k": ",", "l": "z", "m": "H", "n": "c", "o": "U",
                  "p": "W", "q": "%", "r": "E", "s": ">", "t": "A", "u": "2", "v": "I", "w": "N", "x": "d", "y": "y",
                  "z": "'", "{": "~", "|": "}", "}": "Y", "~": "s"}
    seed_mapping = list(map(lambda n: ord(seed_table[n]), list(seed)))

    cipher = '7226'  # 按照版本变化，每天一变  建议通过ast方式获取  放置在头部
    cipher_table = {"0": "^", "1": "'", "2": ">", "3": "3", "4": "x", "5": "~", "6": "2", "7": "W", "8": ")", "9": "D",
                    " ": "/", "!": "l", "\"": "]", "#": "a", "$": "b", "%": "N", "&": "_", "'": "i", "(": "&", ")": "#",
                    "*": "`", "+": "C", ",": "p", "-": "}", ".": ";", "/": "T", ":": "1", ";": "P", "<": "V", "=": "j",
                    ">": "?", "?": ".", "@": "B", "A": "U", "B": "J", "C": "c", "D": "n", "E": "m", "F": "u", "G": "$",
                    "H": "Y", "I": "K", "J": "e", "K": "[", "L": "o", "M": "L", "N": "4", "O": "\\", "P": "S", "Q": "(",
                    "R": "M", "S": "|", "T": "Z", "U": "h", "V": "y", "W": "t", "X": " ", "Y": "k", "Z": ",", "[": "F",
                    "\\": "{", "]": "z", "^": "w", "_": "7", "`": "f", "a": "Q", "b": "g", "c": "O", "d": "*", "e": "0",
                    "f": "H", "g": "\"", "h": "E", "i": "I", "j": "<", "k": "A", "l": "8", "m": "v", "n": "s", "o": "X",
                    "p": ":", "q": "%", "r": "6", "s": "=", "t": "G", "u": "5", "v": "@", "w": "d", "x": "9", "y": "-",
                    "z": "q", "{": "!", "|": "r", "}": "R", "~": "+"}
    cipher_mapping = list(map(lambda n: ord(cipher_table[n]), list(cipher)))
    href = 'w.zhipin.com'.encode()  # 定值
    cipher_split = MUH(list(cipher))
    cipher_sort = cipher_split[:]
    cipher_sort.sort()
    cipher_sort_key = [cipher_sort.index(cipher_split[i]) for i in range(len(cipher_split))]
    cipher_table = []
    for i in range(len(seed) // len(cipher_split)):
        linelist = seed_mapping[i * len(cipher_split): i * len(cipher_split) + len(cipher_split)]
        templist = [0 for _ in range(len(cipher_split))]
        for j in range(len(cipher_split)):
            templist[j] = linelist[cipher_sort_key[j]]
        cipher_table.append(templist)
    cipher_list = []
    for cr in range(len(cipher_split)):
        for cs in range(len(seed) // len(cipher_split)):
            cipher_list.append(cipher_table[cs][cipher_sort_key[cr]])
    l0l = []
    l0l.append(len(href))
    for ai in range(len(href)):
        l0l.append(href[ai] ^ cipher_list[len(cipher_list) - 1 - ai % len(cipher_list)])
    href_table = {"0": "N", "1": "\\", "2": "!", "3": "W", "4": "*", "5": "~", "6": "-", "7": "m", "8": "T", "9": "I",
                  " ": "E", "!": "u", "\"": "A", "#": "|", "$": "'", "%": "k", "&": "J", "'": "M", "(": "8", ")": "G",
                  "*": "%", "+": "j", ",": "5", "-": ",", ".": "H", "/": "3", ":": ".", ";": "C", "<": "l", "=": "`",
                  ">": "7", "?": " ", "@": ";", "A": "w", "B": "a", "C": "V", "D": "t", "E": "{", "F": "n", "G": "h",
                  "H": "^", "I": "D", "J": "r", "K": "?", "L": "i", "M": "e", "N": "[", "O": "2", "P": "#", "Q": "y",
                  "R": "/", "S": "Z", "T": "(", "U": "=", "V": "$", "W": "+", "X": "&", "Y": "f", "Z": "_", "[": "<",
                  "\\": "X", "]": "]", "^": "\"", "_": "S", "`": "4", "a": "x", "b": "Q", "c": "}", "d": "v", "e": "B",
                  "f": "Y", "g": "U", "h": "p", "i": "K", "j": ">", "k": ")", "l": "L", "m": "1", "n": "@", "o": "q",
                  "p": "0", "q": "9", "r": "o", "s": "P", "t": "d", "u": "6", "v": "c", "w": ":", "x": "g", "y": "b",
                  "z": "R", "{": "F", "|": "s", "}": "O", "~": "z"}
    l0l.append(len(href))
    l0l += list(map(lambda n: ord(href_table[chr(n)]), list(href)))
    # 下面是一些环境校验，直接把正确的逻辑扣出来
    Zq = 0
    e = int(time.time() * 1000)
    j = unsignright(e - 28393, 6)
    eL = j
    eL = (eL * 9301 + 49297) % 233280
    j += 1
    mo = []
    for eM in range(int(eL / 233280 * (50 - 30 + 4 - 3) + 30)):
        eO = j
        j += 1
        eO = (eO * 9301 + 49297) % 233280
        mo.append(int(eO / 233280 * (127 - 80 + 4 - 3) + 80))
    for eM in range(0, 20, 2):
        mo[eM] = int(mo[eM] / 2) ^ l0l[Zq]
    Zq += 1

    lJH = []
    for f6 in range(int(random.random() * (53 - 32 + 2 - 1) + 32)):
        lJH.append(int(random.random() * (127 - 80 + 2 - 1) + 80))
    for f6 in range(1, 20, 2):
        lJH[f6] = int(lJH[f6] - 48) ^ l0l[Zq]
    Zq += 1

    F = []
    for fO in range(int(random.random() * (51 - 34 + 1) + 34)):
        F.append(int(random.random() * (127 - 80 + 1) + 80))
    for fO in range(0, 20, 2):
        F[fO] = int(F[fO] / 3) ^ l0l[Zq]
    Zq += 1
    vT = []
    g = j
    j += 1
    g = (g * 9301 + 49297) % 233280
    for fO in range(int(g / 233280 * (45 - 39 + 4 - 3) + 39)):
        gb = j
        j += 1
        gb = (gb * 9301 + 49297) % 233280
        vT.append(int(gb / 233280 * (127 - 80 + 4 - 3) + 80))
    for fO in range(1, 20, 2):
        vT[fO] = int(vT[fO] - 48) ^ l0l[Zq]
    Zq += 1
    EMW = []
    for fO in range(int(random.random() * (52 - 33 + 1) + 33)):
        EMW.append(int(random.random() * (127 - 80 + 1) + 80))
    for fO in range(0, 20, 2):
        EMW[fO] = int(EMW[fO] - 50) ^ l0l[Zq]
    Zq += 1
    CS = []
    for fO in range(int(random.random() * (58 - 37 + 2 - 1) + 37)):
        CS.append(int(random.random() * (127 - 80 + 2 - 1) + 80))
    for fO in range(1, 20, 2):
        CS[fO] = int(CS[fO] - 53) ^ l0l[Zq]
    Zq += 1
    randon_table_1 = [int(random.random() * (159 - 81 + 2 - 1) + 81) for _ in range(30)]
    randon_table_2 = [int(random.random() * (169 - 91 + 1) + 91) for _ in range(32)]
    randon_table_3 = []
    for jM in range(35):
        jO = j
        j += 1
        jO = (jO * 9301 + 49297) % 233280
        randon_table_3.append(int(jO / 233280 * (179 - 101 + 4 - 3) + 101))
    s_key = []
    jW = 0
    Zq = 6
    s_key.append(randon_table_1[int(random.random() * (len(randon_table_1) - 1 - 0 + 1) + 0)] - 80 - jW ^ l0l[Zq])
    jW += 1
    Zq += 1
    s_key.append(
        randon_table_2[int(random.random() * (len(randon_table_2) - 1 - 0 + 2 - 1) + 0)] - 30 - 50 - jW * 10 ^ l0l[Zq])
    jW += 1
    Zq += 1
    ki = j
    j += 1
    ki = (ki * 9301 + 49297) % 233280
    s_key.append(
        randon_table_3[int(ki / 233280 * (len(randon_table_3) - 1 - 0 + 4 - 3) + 0)] - 30 - 50 - jW * 10 ^ l0l[Zq])
    jW += 1
    Zq += 1
    H5 = int(random.random() * (79 - 1 + 1) + 1)
    upZ = int(random.random() * (70 - 1 + 1) + 1)
    p74 = int(random.random() * (65 - 1 + 1) + 1)
    s_key.append(H5 ^ l0l[Zq])
    Zq += 1
    s_key.append(upZ ^ l0l[Zq])
    Zq += 1
    s_key.append(p74 ^ l0l[Zq])
    Zq += 1
    SpJ = []
    for mJ in range(5):
        mL = j
        j += 1
        mL = (mL * 9301 + 49297) % 233280
        SpJ.append(int(mL / 233280 * (15 - 1 + 4 - 3) + 1))
    SIW = []
    for o8 in range(5):
        SIW.append(int(random.random() * (14 - 2 + 1) + 2))
    tl = []
    for oM in range(5):
        tl.append(int(random.random() * (13 - 3 + 2 - 1) + 3))
    m = [mo[0], lJH[1], F[2], vT[3], EMW[4], CS[5]]
    for p1 in range(6):
        m.append(s_key[p1])
    p2 = Zq
    p3 = 0
    for p1 in range(5):
        p3 += SpJ[p1]
    m.append(p3 ^ l0l[p2])
    p2 += 1
    p3 = 0
    for p1 in range(5):
        p3 += SIW[p1]
    m.append(p3 ^ l0l[p2])
    p2 += 1
    p3 = 0
    for p1 in range(5):
        p3 += tl[p1]
    m.append(p3 ^ l0l[p2])
    p2 += 1
    m.append(23 ^ l0l[p2])
    p2 += 1
    ts_table = {"0": "A", "1": "k", "2": "M", "3": "c", "4": "?", "5": "5", "6": "B", "7": "*", "8": "0", "9": "4",
                " ": ":", "!": "o", "\"": "[", "#": "Z", "$": "<", "%": "_", "&": "X", "'": "z", "(": "E", ")": "s",
                "*": "]", "+": "p", ",": "I", "-": "r", ".": "'", "/": "O", ":": "j", ";": "8", "<": "y", "=": "S",
                ">": " ", "?": "R", "@": "\"", "A": "i", "B": "Q", "C": "f", "D": "(", "E": "@", "F": "3", "G": "d",
                "H": "=", "I": "h", "J": "q", "K": "J", "L": "N", "M": "H", "N": "n", "O": "D", "P": "C", "Q": ")",
                "R": "t", "S": "w", "T": "Y", "U": "$", "V": ",", "W": "T", "X": ";", "Y": "V", "Z": "e", "[": "1",
                "\\": "\\", "]": "b", "^": "~", "_": "P", "`": "6", "a": "F", "b": "}", "c": "%", "d": "`", "e": ".",
                "f": "#", "g": "{", "h": "L", "i": "W", "j": "7", "k": "9", "l": "x", "m": ">", "n": "2", "o": "!",
                "p": "v", "q": "|", "r": "g", "s": "/", "t": "l", "u": "-", "v": "+", "w": "a", "x": "K", "y": "G",
                "z": "&", "{": "u", "|": "^", "}": "U", "~": "m"}
    ts_mapping = list(map(lambda n: ord(ts_table[n]), list(ts[:10])))
    # 拼接请求内容
    jfj = []
    jfj.append(len(cipher_list))
    jfj += cipher_list
    jfj.append(len(ts_mapping))
    jfj += ts_mapping
    jfj.append(len(m))
    jfj += m
    jfj.append(len(cipher_mapping))
    jfj += cipher_mapping
    jfj += l0l
    c3 = []
    for n in range(len(jfj)):
        c3.append(key_mapping_3[n % len(key_mapping_3)] ^ jfj[n])
    zp_token = cipher + 'd' + base64.b64encode(bytes(c3)).decode()
    return zp_token


def main():
    requests = requests_html.HTMLSession()
    url = 'https://www.zhipin.com/job_detail/?query=python'
    cookies = {}
    response = requests.get(url, allow_redirects=False)
    params = parse.parse_qs(parse.urlparse(response.headers['location']).query)
    for each in response.cookies:
        cookies[each.name] = each.value
    cookies['__zp_stoken__'] = zp_token(params['seed'][0], params['ts'][0])
    response = requests.get(url, allow_redirects=False, cookies=cookies)
    print(response.status_code)


if __name__ == '__main__':
    main()
