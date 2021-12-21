const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const options =  {
  url: "https://login.taobao.com/",
  referer: "",
  contentType: "text/html",
  userAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
  includeNodeLocations: true,
  runScripts: "dangerously"
}
const E = {
    "ExTarget": [
        "fm-login-password"
    ],
    "FormId": "login-form",
    "LogVal": "_n",
    "Token": "1624441595698:5cbf9037db449b8b5e3b30a0c937879e68a17525",
    "SendInterval": 5,
    "SendMethod": 8,
    "MaxMCLog": 12,
    "MaxKSLog": 14,
    "MaxMPLog": 5,
    "MaxGPLog": 1,
    "MaxTCLog": 12,
    "GPInterval": 50,
    "MPInterval": 4,
    "MaxFocusLog": 6,
    "isSendError": 1,
    "Flag": 2980046,
    "_LogVal": "_n",
    "_LogVals": {
        "_n": 1
    },
    "fromCompatibility": 1
}

// 滑块

var me = {
    "SendInterval": 5,
    "SendMethod": 8,
    "isSendError": 1,
    "MaxMCLog": 12,
    "MaxKSLog": 14,
    "MaxMPLog": 5,
    "MaxGPLog": 1,
    "MaxTCLog": 12,
    "GPInterval": 50,
    "MPInterval": 4,
    "MaxFocusLog": 6,
    "Flag": 2980046,
    "OnlyHost": 1,
    "MaxMTLog": 500,
    "MinMTDwnLog": 30,
    "MaxNGPLog": 1,
    "sIDs": [
        "_n1t|_n1z|nocaptcha|-stage-1"
    ],
    "mIDs": [
        "nc-canvas",
        "click2slide-btn"
    ],
    "hook": 1,
    "font": 1,
    "api": 1
}


var uaSign = null;
JSDOM.fromFile( "./decode-login.html", options).then(dom => {
//  console.log(dom.window.CheckScript());
//  console.log(dom.window.location)
//  console.log(dom.window.navigator.userAgent)
//  console.log(dom.window._render_config_);
dom.window._render_config_ = {
    "customImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAFklEQVQYGWN49/7jf2TMgMwBsQkLAAAStDzR4wnhAgAAAABJRU5ErkJggg==",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAFklEQVQYGWN49/7jf2TMgMwBsQkLAAAStDzR4wnhAgAAAABJRU5ErkJggg==",
    "NCTOKENSTR": "c8053bb05f23c52be734b9b902fb0429",
    "action": "captcha",
    "HOST": "login.taobao.com:443",
    "PATH": "/newlogin/login.do",
    "FORMACTIOIN": "/_____tmd_____/verify/",
    "BXSTEP": "100",
    "SECDATA": "5e0c8e1365474455070961b803bd560607b52cabf5960afff39b64ce58073f781623b2d284642db9fe9b0acd67b3def9a276aaeee5767421bdc9d7c5af795ea4896945aa9e4478a7b9211d36e18d582df7a9960ea00c81f59290bf2683bc6c362082acd8171d60b934765feb4c0a3f662d800f83de3a51b3141b8b1e0b9b776eae810c33b03e9e301a8b7313941c3ba852e943664f2df8fc466b9aad4b74288b5d2bb51bf1c7d7cfa4e74eaa251c0145052582cfce64b7411b387c9c0c2aed3631d18ce548cb7abb31f72075b039416957007c83f5fa37c2a678f977580e5c0d951881578f6d451ff315008447a0a18b44da64f03c41f95cf35ccb1dbd797ce236c6e576b381999617f699880b5b0853ac62b8c07ac9734d6799e4f8b11e11a59dab80f89293688707c3aec5d53b80edd3206f76297f12acbb90edfb95fa73e3f9c4c5d50e8f1cf9be09a64288c1b905e3c6dc0da44cdf07b26038e398b20681d1cfbe85f55e03a004f4ba3340cffb84a7960d6b7280c545211dcab96766e92e1149ae8e03fac1bb2fd9b03377b20417a58cf606127fdd5f964904488c0028fcacc0e46f712d1e4c79f4ebc4d537175d8abe1fac5d6bc4bf6ea3fc81ad404f3d",
    "NCAPPKEY": "X82Y__7e1df458d6ae3c7825a008e24c818dcb"

}
  uaSign = dom.window.e ;
  console.log(me)
//  console.log(uaSign(1, me))
});


