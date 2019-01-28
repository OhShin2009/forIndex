var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.checkStringArgs = function(a, b, c) {
    if (null == a)
        throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
    if (b instanceof RegExp)
        throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
    return a + ""
}
;
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
    a != Array.prototype && a != Object.prototype && (a[b] = c.value)
}
;
$jscomp.getGlobal = function(a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
}
;
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, b, c, d) {
    if (b) {
        c = $jscomp.global;
        a = a.split(".");
        for (d = 0; d < a.length - 1; d++) {
            var e = a[d];
            e in c || (c[e] = {});
            c = c[e]
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d && null != b && $jscomp.defineProperty(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
}
;
$jscomp.polyfill("String.prototype.startsWith", function(a) {
    return a ? a : function(a, c) {
        var b = $jscomp.checkStringArgs(this, a, "startsWith");
        a += "";
        var e = b.length
          , f = a.length;
        c = Math.max(0, Math.min(c | 0, b.length));
        for (var g = 0; g < f && c < e; )
            if (b[c++] != a[g++])
                return !1;
        return g >= f
    }
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.fill", function(a) {
    return a ? a : function(a, c, d) {
        var b = this.length || 0;
        0 > c && (c = Math.max(0, b + c));
        if (null == d || d > b)
            d = b;
        d = Number(d);
        0 > d && (d = Math.max(0, b + d));
        for (c = Number(c || 0); c < d; c++)
            this[c] = a;
        return this
    }
}, "es6", "es3");
function $(a) {
    return document.getElementById(a)
}
function $$(a) {
    a = document.querySelectorAll(a);
    try {
        return Array.prototype.slice.call(a)
    } catch (d) {
        for (var b = [], c = 0; c < a.length; c++)
            b.push(a[c]);
        return b
    }
}
function Core() {
    var a = this;
    this.getDevice = function() {
        var b = window.navigator.userAgent;
        window.opera && (a.IsPresto = !0);
        -1 != b.indexOf("Gecko/") && (a.IsGecko = !0);
        -1 != b.indexOf("WebKit") && (a.IsWebkit = !0);
        -1 != b.indexOf("MSIE") && (a.IsMSIE = !0);
        -1 != b.indexOf("Trident/") && (a.IsTrident = !0);
        -1 != b.indexOf("Edge") && (a.IsEdge = !0);
        -1 != b.indexOf("rv:11") && (a.IsMSIE11 = !0);
        -1 != b.indexOf("Firefox") && (a.IsFirefox = !0);
        a.IsMobile = -1 != b.indexOf("Windows CE") || -1 != b.indexOf("Windows Mobile") || -1 != b.indexOf("Android") && -1 != b.toLowerCase().indexOf("mobi") || -1 != b.indexOf("Symbian") || -1 != b.indexOf("iPhone");
        a.IsIOS = navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i);
        a.IsPresto && (a.IsGecko = a.IsWebkit = a.IsMSIE = !1);
        a.IsWebkit && (a.IsGecko = !1)
    }
    ;
    this.getDevice();
    this.StopProp = function(a) {
        (a = a || window.event) && a.stopPropagation ? a.stopPropagation() : window.event && window.event.cancelBubble && (window.event.cancelBubble = !0)
    }
    ;
    this.geFileSizeString = function(a) {
        var b = -1;
        do
            a /= 1024,
            b++;
        while (1024 < a);return Math.max(a, .1).toFixed(1) + " kB; MB; GB; TB;PB;EB;ZB;YB".split(";")[b]
    }
    ;
    this.AddHandler = function(a, c, d, e) {
        if (!a)
            return !1;
        a.attachEvent ? a.attachEvent("on" + c, d) : a.addEventListener && a.addEventListener(c, d, e ? e : !1)
    }
    ;
    this.RemoveHandler = function(a, c, d) {
        a.detachEvent ? a.detachEvent("on" + c, d) : a.removeEventListener && a.removeEventListener(c, d, !1)
    }
    ;
    this.Unwrap = function(a) {
        for (var b = a.parentNode; a.firstChild; )
            b.insertBefore(a.firstChild, a);
        b.removeChild(a)
    }
    ;
    this.Clone = function(a) {
        if (null == a || "object" != typeof a)
            return a;
        var b = a.constructor(), d;
        for (d in a)
            a.hasOwnProperty(d) && (b[d] = a[d]);
        return b
    }
    ;
    this.Bind = function(a, c) {
        return function() {
            return a.apply(c, arguments)
        }
    }
    ;
    this.isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i)
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i)
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i)
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i)
        },
        any: function() {
            return Core.isMobile.Android() || Core.isMobile.BlackBerry() || Core.isMobile.iOS() || Core.isMobile.Opera() || Core.isMobile.Windows()
        }
    };
    this.addAncersToH3 = function() {
        for (var a = document.getElementsByTagName("h3"), c = 0; c < a.length; c++) {
            var d = a[c].getAttribute("id");
            if (d) {
                var e = document.createElement("a");
                e.innerHTML = "#";
                e.setAttribute("href", "#" + d);
                e.className = "anchor";
                a[c].insertBefore(e, null)
            }
        }
    }
    ;
    this.IsTouchDevice = function() {
        return "ontouchstart"in window || 0 < navigator.MaxTouchPoints || 0 < navigator.msMaxTouchPoints
    }
    ;
    this.isLocalStorageSupported = function() {
        try {
            if (!window.localStorage)
                return !1;
            var a = window.localStorage;
            a.setItem("test_local_storage_support", "1");
            a.removeItem("test_local_storage_support");
            return !0
        } catch (c) {
            return !1
        }
    }
    ;
    this.PreventSelection = function() {
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection && document.selection.clear && document.selection.clear()
    }
    ;
    this.SelectAllCheckboxes = function(a, c) {
        var b = document.getElementsByTagName("INPUT");
        if (b && null != b && !(1 > b.length)) {
            a = a.checked;
            for (var e = 0; e < b.length; e++)
                "checkbox" == b[e].type && b[e].name == c && (b[e].checked = a)
        }
    }
    ;
    this.FormatNumber = function(a) {
        a = Math.round(a);
        a = a.toString();
        for (var b = "", d = 0, e = a.length; 0 < e; e--)
            3 === d++ && (b = " " + b,
            d = 1),
            b = a.substring(e, e - 1) + b;
        return b
    }
    ;
    this.utf8_encode = function(a) {
        if (null === a || "undefined" === typeof a)
            return "";
        a += "";
        var b = "", d;
        var e = d = 0;
        var f = a.length;
        for (var g = 0; g < f; g++) {
            var l = a.charCodeAt(g)
              , m = null;
            if (128 > l)
                d++;
            else if (127 < l && 2048 > l)
                m = String.fromCharCode(l >> 6 | 192, l & 63 | 128);
            else if (55296 != (l & 63488))
                m = String.fromCharCode(l >> 12 | 224, l >> 6 & 63 | 128, l & 63 | 128);
            else {
                if (55296 != (l & 64512))
                    return "";
                m = a.charCodeAt(++g);
                if (56320 != (m & 64512))
                    return "";
                l = ((l & 1023) << 10) + (m & 1023) + 65536;
                m = String.fromCharCode(l >> 18 | 240, l >> 12 & 63 | 128, l >> 6 & 63 | 128, l & 63 | 128)
            }
            null !== m && (d > e && (b += a.slice(e, d)),
            b += m,
            e = d = g + 1)
        }
        d > e && (b += a.slice(e, f));
        return b
    }
    ;
    this.Crc32 = function(a) {
        a = this.utf8_encode(a);
        var b = -1;
        for (var d = 0, e = a.length; d < e; d++) {
            var f = (b ^ a.charCodeAt(d)) & 255;
            f = "0x" + "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D".substr(9 * f, 8);
            b = b >>> 8 ^ f
        }
        return (b ^ -1) >>> 0
    }
    ;
    this.ParseJson = function(a) {
        try {
            return window.JSON ? window.JSON.parse(a) : eval("(" + a + ")")
        } catch (c) {
            return null
        }
    }
}
Core = new Core;
var ieVersion = function() {
    for (var a = 3, b = document.createElement("div"), c = b.getElementsByTagName("i"); b.innerHTML = "\x3c!--[if gt IE " + ++a + "]><i></i><![endif]--\x3e",
    c[0]; )
        ;
    return 4 < a ? a : void 0
}()
  , supportsCssProp = function() {
    var a = document.createElement("div")
      , b = "Khtml Ms O Moz Webkit ms".split(" ");
    return function(c) {
        if (c in a.style)
            return c;
        c = c.replace(/^[a-z]/, function(a) {
            return a.toUpperCase()
        });
        for (var d = b.length; d--; )
            if (b[d] + c in a.style)
                return b[d] + c;
        return !1
    }
}();
function isEmpty(a) {
    if (null == a)
        return !0;
    if (0 < a.length)
        return !1;
    if (0 === a.length)
        return !0;
    for (var b in a)
        if (a.hasOwnProperty(b))
            return !1;
    return !0
}
function getCharCode(a) {
    a = a || window.event;
    return a.which || a.keyCode
}
function getElementsByClass(a, b) {
    if (document.getElementsByClassName)
        return (b || document).getElementsByClassName(a);
    b = b || document;
    b = b.getElementsByTagName("*");
    var c = b.length;
    a = a.split(/\s+/);
    var d = a.length, e = [], f, g;
    for (f = 0; f < c; f++)
        for (g = 0; g < d; g++)
            if (-1 != b[f].className.search("\\b" + a[g] + "\\b")) {
                e.push(b[f]);
                break
            }
    return e
}
function getElementsByTagClass(a, b, c) {
    c = c || document;
    a = c.getElementsByTagName(a);
    c = a.length;
    b = b.split(/\s+/);
    var d = b.length, e = [], f, g;
    for (f = 0; f < c; f++)
        for (g = 0; g < d; g++)
            if (-1 != a[f].className.search("\\b" + b[g] + "\\b")) {
                e.push(a[f]);
                break
            }
    return e
}
function getAncessor(a, b) {
    if (!a || !a.parentElement)
        return a;
    for (; (a = a.parentElement) && !a.classList.contains(b); )
        ;
    return a
}
function setSelectionRange(a, b, c) {
    a.setSelectionRange ? (a.focus(),
    a.setSelectionRange(b, c)) : a.createTextRange && (a = a.createTextRange(),
    a.collapse(!0),
    a.moveEnd("character", c),
    a.moveStart("character", c),
    a.select())
}
function setCursor(a, b) {
    setSelectionRange(a, b, b)
}
[].indexOf || (Array.prototype.indexOf = function(a) {
    for (var b = this.length; b-- && this[b] !== a; )
        ;
    return b
}
);
function typeOf(a) {
    return "object" == typeof a ? a.length ? "array" : "object" : typeof a
}
Array.prototype.forEach || (Array.prototype.forEach = function(a, b) {
    var c = null, d, e = Object(this), f = e.length >>> 0;
    if ("function" !== typeof a)
        throw new TypeError(a + " is not a function");
    1 < arguments.length && (c = b);
    for (d = 0; d < f; ) {
        if (d in e) {
            var g = e[d];
            a.call(c, g, d, e)
        }
        d++
    }
}
);
function S4() {
    return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
}
function S5() {
    return (1048576 * (1 + Math.random()) | 0).toString(16).substring(1)
}
function guid() {
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()
}
Class = function(a, b, c) {
    if (a)
        if (a.className) {
            var d = a.className.split(" "), e;
            var f = 0;
            for (e = d.length; f < e; ++f)
                if (d[f] == b) {
                    c && (d.splice(f, 1),
                    a.className = d.join(" "));
                    return
                }
            c || (d.push(b),
            a.className = d.join(" "))
        } else
            c || (a.className = b)
}
;
function getUrlParam(a) {
    a = a.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    a = (new RegExp("[\\?&]" + a + "=([^&#]*)")).exec(window.location.href);
    return null == a ? "" : a[1]
}
function setUrlParam(a, b) {
    document.location.search = changeUrlParamsString(document.location.search, a, b)
}
function changeUrlParamsString(a, b, c) {
    var d = !1;
    c || (d = !0);
    b = encodeURI(b);
    c = encodeURI(c);
    0 == a.indexOf("?") && (a = a.substr(1));
    a = a.split("&");
    for (var e = a.length, f; e--; )
        if (f = a[e].split("="),
        f[0] == b) {
            if (d) {
                a.splice(e, 1);
                break
            }
            f[1] = c;
            a[e] = f.join("=");
            break
        }
    0 > e && (a[a.length] = [b, c].join("="));
    b = "";
    for (c = 0; c < a.length; c++)
        a[c] && (b = b ? b + "&" : b + "?",
        b += a[c]);
    return b
}
function isHttps() {
    return "https:" == window.location.protocol
}
String.prototype.startsWith = function(a) {
    return this.substring(0, a.length) == a
}
;
String.prototype.trim = function() {
    return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
}
;
String.prototype.ltrim = function() {
    return this.replace(/^\s+/, "")
}
;
String.prototype.rtrim = function() {
    return this.replace(/\s+$/, "")
}
;
String.prototype.fulltrim = function() {
    return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, "").replace(/\s+/g, " ")
}
;
function getFileExtension(a, b) {
    if (a && a.length) {
        for (var c = "", d = !1, e = 0; e < a.length; e++) {
            var f = a[e];
            c += f;
            "." == f && (c = "",
            d = !0)
        }
        if (d && c)
            return b ? c.toLowerCase() : c
    }
}
function createElement(a, b, c) {
    b = document.createElement(b);
    if (c)
        for (var d in c)
            c.hasOwnProperty(d) && ("name" == d ? b.setAttribute("name", c[d]) : "className" == d ? b.className = c[d] : -1 == d.indexOf("style") && (b[d] = c[d]));
    a && a.appendChild(b);
    return b
}
function prependElement(a, b) {
    a.childNodes && 0 < a.childNodes.length ? a.insertBefore(b, a.childNodes[0]) : a.appendChild(b)
}
function insertAfter(a, b, c) {
    c && c.nextSibling || a.appendChild(b);
    a.insertBefore(b, c.nextSibling)
}
function injectIframe(a, b) {
    var c = document.createElement("iframe");
    c.marginHeight = "0";
    c.marginWidth = "0";
    c.frameBorder = "0";
    c.scrolling = "no";
    a.appendChild(c);
    c.width = "100%";
    c.height = "100%";
    a = c.document;
    c.contentDocument ? a = c.contentDocument : c.contentWindow && (a = c.contentWindow.document);
    a.open();
    a.writeln(b);
    a.close()
}
function encodeHtml(a) {
    if (!a)
        return a;
    a = a.replace(/&/g, "&amp;");
    a = a.replace(/>/g, "&gt;");
    return a = a.replace(/</g, "&lt;")
}
function stripHtml(a) {
    var b = document.createElement("DIV");
    b.innerHTML = a;
    return b.textContent || b.innerText
}
function GetDate(a) {
    var b = new Date(1E3 * a);
    a = "" + b.getFullYear();
    a += "." + (8 < b.getUTCMonth() ? b.getUTCMonth() + 1 : "0" + (b.getUTCMonth() + 1));
    return a += "." + (9 < b.getUTCDate() ? b.getUTCDate() : "0" + b.getUTCDate())
}
function GetDateLocal(a) {
    var b = new Date(1E3 * a);
    a = "" + b.getFullYear();
    a += "." + (8 < b.getMonth() ? b.getMonth() + 1 : "0" + (b.getMonth() + 1));
    return a += "." + (9 < b.getDate() ? b.getDate() : "0" + b.getDate())
}
function GetDateTime(a) {
    var b = new Date(1E3 * a);
    a = "" + b.getFullYear();
    a += "." + (8 < b.getUTCMonth() ? b.getUTCMonth() + 1 : "0" + (b.getUTCMonth() + 1));
    a += "." + (9 < b.getUTCDate() ? b.getUTCDate() : "0" + b.getUTCDate());
    a += " " + (9 < b.getUTCHours() ? b.getUTCHours() : "0" + b.getUTCHours());
    return a += ":" + (9 < b.getUTCMinutes() ? b.getUTCMinutes() : "0" + b.getUTCMinutes())
}
function GetDateTimeLocal(a) {
    var b = new Date(1E3 * a);
    a = "" + b.getFullYear();
    a += "." + (8 < b.getMonth() ? b.getMonth() + 1 : "0" + (b.getMonth() + 1));
    a += "." + (9 < b.getDate() ? b.getDate() : "0" + b.getDate());
    a += " " + (9 < b.getHours() ? b.getHours() : "0" + b.getHours());
    return a += ":" + (9 < b.getMinutes() ? b.getMinutes() : "0" + b.getMinutes())
}
function objectEquals(a, b) {
    for (var c in a)
        if (a.hasOwnProperty(c) && (!b.hasOwnProperty(c) || a[c] != b[c]))
            return !1;
    for (c in b)
        if (b.hasOwnProperty(c) && (!a.hasOwnProperty(c) || a[c] != b[c]))
            return !1;
    return !0
}
function toggleBlock(a) {
    a && ("none" == a.style.display ? a.style.display = a.oldDisplay ? a.oldDisplay : "block" : (a.oldDisplay = a.style.display,
    a.style.display = "none"))
}
function toggle(a) {
    toggleBlock($(a))
}
function toggleVisibility(a) {
    if (a = $(a))
        a.style.visibility = "hidden" == a.style.visibility ? "visible" : "hidden"
}
function getFirstChildElement(a) {
    if (!a && 1 != a.nodeType)
        return null;
    for (a = a.firstChild; a && 1 != a.nodeType; )
        a = a.nextSibling;
    return a
}
function setHotKeysPaginator(a, b, c) {
    a = "" == a ? document : document.getElementById(a);
    var d = a.onkeydown;
    a.onkeydown = function(a) {
        d && d(a);
        a = window.event ? window.event : a;
        var e = a.target ? a.target : window.event.srcElement;
        a.ctrlKey && "INPUT" != e.tagName && "TEXTAREA" != e.tagName && (37 == a.keyCode && "" != b ? location.href = b : 39 == a.keyCode && "" != c && (location.href = c))
    }
}
function HashparamsContainer() {
    this.prototype = Object;
    var a = []
      , b = []
      , c = 0
      , d = ""
      , e = function() {
        b = [];
        a = [];
        c = location.href.indexOf("#!");
        if (-1 != c && location.href.length != c + 2) {
            var e = location.href.substring(c + 2)
              , f = e.indexOf("#");
            -1 != f && (d = e.substring(f),
            e = e.substring(0, f));
            e = e.split("&");
            for (f = 0; f < e.length; f++) {
                var m = e[f].split("=");
                a.push(decodeURIComponent(m[0]));
                1 == m.length ? b.push(null) : b.push(decodeURIComponent(m[1]))
            }
        }
    };
    e();
    window.addEventListener && window.addEventListener("hashchange", e, !1);
    var f = function() {
        for (var c = "", d = 0; d < a.length; d++)
            0 < c.length && (c += "&"),
            c += encodeURIComponent(a[d]),
            b[d] && 0 < b[d].toString().length && (c += "=" + encodeURIComponent(b[d].toString()));
        return c
    };
    this.Get = function(c) {
        c = a.indexOf(c);
        return -1 == c ? null : b[c]
    }
    ;
    this.GetDefaultHash = function() {
        return d
    }
    ;
    this.Set = function(c, d) {
        var e = a.indexOf(c);
        -1 == e ? (a.push(c),
        b.push(d)) : b[e] = d;
        document.location = document.location.pathname + document.location.search + "#!" + f()
    }
    ;
    this.Remove = function(c) {
        c = a.indexOf(c);
        -1 != c && (b.splice(c, 1),
        a.splice(c, 1),
        (c = f()) ? document.location = document.location.pathname + document.location.search + "#!" + c : document.location.hash = "")
    }
    ;
    this.Clear = function() {
        b = [];
        a = [];
        document.location = document.location.pathname + location.search + "#"
    }
    ;
    this.Count = function() {
        return a.length
    }
}
window.hashParams = new HashparamsContainer;
function getWindowSize() {
    var a = 0
      , b = 0;
    "number" == typeof window.innerWidth ? (a = window.innerWidth,
    b = window.innerHeight) : document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight) ? (a = document.documentElement.clientWidth,
    b = document.documentElement.clientHeight) : document.body && (document.body.clientWidth || document.body.clientHeight) && (a = document.body.clientWidth,
    b = document.body.clientHeight);
    return {
        width: a,
        height: b
    }
}
function getDocumentBodySize() {
    var a = 0
      , b = 0;
    "number" == typeof (document.body && document.body.scrollWidth) ? (a = document.body.scrollWidth,
    b = document.body.scrollHeight) : document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight) ? (a = document.documentElement.clientWidth,
    b = document.documentElement.clientHeight) : document.body && (document.body.clientWidth || document.body.clientHeight) && (a = document.body.clientWidth,
    b = document.body.clientHeight);
    return {
        width: a,
        height: b
    }
}
function getWindowScroll() {
    var a = 0
      , b = 0;
    "number" == typeof window.pageYOffset ? (b = window.pageYOffset,
    a = window.pageXOffset) : document.body && (document.body.scrollLeft || document.body.scrollTop) ? (b = document.body.scrollTop,
    a = document.body.scrollLeft) : document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop) && (b = document.documentElement.scrollTop,
    a = document.documentElement.scrollLeft);
    return {
        top: b,
        left: a
    }
}
function getOffsetSum(a) {
    for (var b = 0, c = 0; a; )
        b += parseFloat(a.offsetTop),
        c += parseFloat(a.offsetLeft),
        a = a.offsetParent;
    return {
        top: Math.round(b),
        left: Math.round(c)
    }
}
function getOffsetRect(a, b) {
    b = b ? b.contentWindow : window;
    a = a.getBoundingClientRect();
    var c = b.document.body
      , d = b.document.documentElement;
    return {
        top: Math.round(a.top + (b.pageYOffset || d.scrollTop || c.scrollTop) - (d.clientTop || c.clientTop || 0)),
        left: Math.round(a.left + (b.pageXOffset || d.scrollLeft || c.scrollLeft) - (d.clientLeft || c.clientLeft || 0)),
        bottom: Math.round(a.bottom)
    }
}
function getOffset(a) {
    return a.getBoundingClientRect ? getOffsetRect(a) : getOffsetSum(a)
}
function getElementSize(a) {
    return {
        width: a.clientWidth || a.offsetWidth,
        height: a.clientHeight || a.offsetHeight
    }
}
function dateToString(a, b, c) {
    var d = a.getDate()
      , e = a.getMonth() + 1;
    d = "" + a.getFullYear() + "-" + (9 >= e ? "0" + e : e) + "-" + (9 >= d ? "0" + d : d);
    b && (b = a.getHours(),
    e = a.getMinutes(),
    d += " " + (9 >= b ? "0" + b : b) + ":" + (9 >= e ? "0" + e : e),
    c && (a = a.getSeconds(),
    d += ":" + (9 >= a ? "0" + a : a)));
    return d
}
function tooltip(a, b, c, d, e) {
    a.timeoutID && clearTimeout(a.timeoutID);
    var f = S4()
      , g = createElement(document.body, "div", {
        id: "tooltip_" + f,
        className: "customTooltip"
    });
    f = createElement(g, "div", {
        id: "tooltipContent_" + f,
        className: "customTooltipContent"
    });
    var l;
    supportsCssProp("transform") && (l = createElement(g, "span", {
        className: "tooltipCorner"
    }));
    g.hovered = !1;
    g.onmouseover = function() {
        this.hovered = !0
    }
    ;
    g.onmouseout = function() {
        var b = this;
        b.hovered = !1;
        setTimeout(function() {
            if (!0 !== b.hovered)
                try {
                    d && (a.show = !1,
                    d(b)),
                    $(b.id) && document.body.removeChild(b)
                } catch (p) {
                    window.console && window.console.log && window.console.log(p.message)
                }
        }, 300)
    }
    ;
    "string" == typeOf(b) ? f.innerHTML += b : "object" == typeOf(b) && f.appendChild(b);
    f.getElementsByTagName("a");
    var m = getOffset(a);
    m.realLeft = m.left;
    a.tooltipContainer = g;
    a.onmouseout = function() {
        clearTimeout(a.timeoutID);
        setTimeout(function() {
            if (1 != g.hovered)
                try {
                    d && (a.show = !1,
                    d(g)),
                    document.body.removeChild(g)
                } catch (h) {
                    window.console && window.console.log && window.console.log(h.message)
                }
        }, 300)
    }
    ;
    a.hide = function() {
        clearTimeout(a.timeoutID);
        setTimeout(function() {
            try {
                d && (a.show = !1,
                d(g)),
                document.body.removeChild(g)
            } catch (h) {
                window.console && window.console.log && window.console.log(h.message)
            }
        }, 0)
    }
    ;
    a.onclick = function() {
        !0 === a.show ? a.hide() : tooltip(a, b, c, d, e)
    }
    ;
    a.timeoutID = setTimeout(function() {
        g.style.display = "block";
        g.style.top = m.top + 25 + "px";
        g.style.maxWidth = document.body.offsetWidth - 10 + "px";
        var b = g.style
          , d = m.left - .2 * g.clientWidth;
        d = Math.max(10, d);
        d = Math.min(d, document.body.offsetWidth - 5 - g.clientWidth);
        b.left = d + "px";
        g.offsetHeight + m.top > document.body.offsetHeight && (g.style.top = m.top - 20 - g.offsetHeight + "px",
        Class(l, "bottomCorner"));
        l && (b = l.style,
        d = a.clientWidth / 2 + m.left - g.offsetLeft - 7,
        d = Math.min(g.clientWidth - 15, d),
        d = Math.max(5, d),
        b.left = d + "px");
        setOpacity(g, .01);
        fade(g, 1, 200, 20);
        c && (a.show = !0,
        c(g))
    }, e || 500);
    return f.id
}
function setOpacity(a, b) {
    a.style.opacity = b;
    a.style.MozOpacity = b;
    a.style.KhtmlOpacity = b;
    a.style.filter = "alpha(opacity=" + 100 * b + ");"
}
function animate(a, b, c, d, e, f, g, l, m, h) {
    b = supportsCssProp(b) || b;
    if (d != e) {
        0 != m && m || (m = 1E-7);
        h || (h = 0);
        var p = supportsCssProp("transition");
        if (p) {
            var t = {
                marginLeft: "margin-left",
                marginRight: "margin-right",
                paggingLeft: "pagging-left",
                paggingRight: "pagging-right"
            }[b] || b;
            a.style[p] = "none";
            a.style[b] = d + c;
            setTimeout(function() {
                a.style[p] = t + " " + g / 1E3 + "s " + (m && 0 != m ? " ease" : " linear") + (0 < f ? " " + f / 1E3 + "s" : "");
                a.style[b] = e + c
            }, 1);
            setTimeout(function() {
                a.style[p] = "none"
            }, g + f + 10)
        } else
            for (var n = 0, r = e - d, q = r != Math.abs(r), u = n = 0; u <= l; u++)
                setTimeout(function() {
                    var e = r * Math.pow(n / r, 1 / m);
                    0 != h && (e += Math.sin(Math.PI * n / r) * n * h);
                    a.style[b] = e + d + c;
                    n = 1 == q ? Math.max(n + Math.floor(r / l), r) : Math.min(n + Math.ceil(r / l), r)
                }, u / l * g + f)
    }
}
function fade(a, b, c, d) {
    if ("in" == b || 0 == b)
        b = 0;
    else if ("out" == b || 1 == b)
        b = 1;
    else
        return;
    for (var e = 0, f = 0; 1 >= f; f += 1 / d)
        setTimeout(function() {
            setOpacity(a, 1 == b ? e : 1 - e);
            e += 1 / d;
            e = Math.round(100 * e) / 100
        }, f * c);
    setTimeout(function() {
        setOpacity(a, 1 == b ? 1 : 0)
    }, c)
}
function apearBlockVertical(a, b, c, d, e, f) {
    f || (f = .5);
    e || (e = 20);
    d || (d = 200);
    var g = createElement(null, "div");
    g.style.overflow = "hidden";
    g.style.height = 0;
    g.style.visibility = "hidden";
    setOpacity(a, 0);
    g.appendChild(a);
    a.style.display = "block";
    1 == c ? prependElement(b, g) : c && c.tagName ? b.insertBefore(g, c) : b.appendChild(g);
    animate(g, "height", "px", 0, g.scrollHeight, 0, d, e, f);
    setTimeout(function() {
        g.style.display = "none";
        b.insertBefore(a, g);
        b.removeChild(g);
        fade(a, "out", 200, 20)
    }, d)
}
function disapearBlockVertical(a, b, c, d, e) {
    e || (e = .5);
    d || (d = 20);
    c || (c = 200);
    var f = a.parentNode
      , g = createElement(null, "div");
    g.style.overflow = "hidden";
    f.insertBefore(g, a);
    g.appendChild(a);
    var l = g.scrollHeight;
    g.style.height = l + "px";
    fade(a, "in", 200, 20);
    setTimeout(function() {
        animate(g, "height", "px", l, 0, 0, c, d, e)
    }, 200);
    setTimeout(function() {
        b || (a.style.display = "none",
        f.insertBefore(a, g));
        g.parentNode.removeChild(g)
    }, c + 500)
}
window.isWindowActive = !1;
window.isLastActiveWindow = function() {
    return !1
}
;
(function() {
    function a(a) {
        var c = window.isWindowActive;
        a = a || window.event;
        window.isWindowActive = "focus" == a.type || "focusin" == a.type ? !0 : "blur" == a.type || "focusout" == a.type ? !1 : document[e] ? !1 : !0;
        if (c != window.isWindowActive && (a = window.isWindowActive,
        mqGlobal && mqGlobal._onvisibility))
            for (c = 0; c < mqGlobal._onvisibility.length; c++)
                mqGlobal._onvisibility[c](a);
        window.isWindowActive && b(l);
        extraLog("change: " + l + ": " + window.isWindowActive)
    }
    function b(a) {
        c && d.setItem("mql5com_isLastActiveWindow", a + "");
        extraLog(a + ": become ACTIVE")
    }
    try {
        var c = "undefined" !== typeof Storage && Core.isLocalStorageSupported() && window.JSON && window.JSON.stringify ? !0 : !1
    } catch (m) {
        c = !1,
        window.console && window.console.log && console.log("local storage support check: " + m)
    }
    var d = {};
    if (c)
        try {
            d = localStorage
        } catch (m) {
            d = sessionStorage
        }
    var e, f = {
        hidden: "visibilitychange",
        mozHidden: "mozvisibilitychange",
        webkitHidden: "webkitvisibilitychange",
        msHidden: "msvisibilitychange",
        oHidden: "ovisibilitychange"
    };
    for (e in f)
        if (f.hasOwnProperty(e) && e in document) {
            var g = f[e];
            break
        }
    g ? (window.isWindowActive = document[e] ? !1 : !0,
    document.addEventListener(g, a)) : ieVersion && 9 >= ieVersion ? document.onfocusin = document.onfocusout = a : window.onfocus = window.onblur = a;
    var l = guid();
    c && (window.isLastActiveWindow = function() {
        var a = c ? d.getItem("mql5com_isLastActiveWindow") || null : null;
        return a == l
    }
    ,
    window.GetCurrentWindowId = function() {
        return l
    }
    ,
    window.isWindowActive && b(l));
    extraLog(e + " load: " + l + ": " + window.isWindowActive)
}
)();
function extraLog(a) {
    window.enableExtraLog && (a = createElement(null, "div", {
        innerHTML: a
    }),
    prependElement(document.body, a))
}
(function() {
    function a(a) {
        var b = $(a)
          , c = $("__srte_" + a);
        if (b && c) {
            var e = function(a) {
                return function(b) {
                    d.Flush(a)
                }
            };
            b = function(a) {
                return function(a) {
                    (a = a || window.event) && a.preventDefault && a.preventDefault();
                    a && a.stopPropagation && a.stopPropagation();
                    a && a.cancelBubble && (a.cancelBubble = !0);
                    return !1
                }
            }
            ;
            c.onkeyup = c.onChange = function() {
                e(a)()
            }
            ;
            if (c.addEventListener) {
                for (var m = "copy paste keypress input textInput blur change DOMNodeInserted".split(" "), h = ["drop"], p = 0; p < m.length; p++)
                    c.addEventListener(m[p], e(a), !0);
                for (m = 0; m < h.length; m++)
                    c.addEventListener(h[m], b(a), !0)
            }
        }
    }
    var b = "contentEditable"in document.documentElement
      , c = navigator.userAgent;
    0 <= c.indexOf("Android") && 2.3 >= parseFloat(c.slice(c.indexOf("Android") + 8)) && (b = !1);
    if (b) {
        var d = window.SmallRTE = {};
        d.Clear = function(a) {
            var b = $(a)
              , c = "<br>";
            b.placeholder && (c = b.placeholder);
            d.SetContent(a, c)
        }
        ;
        d.SetContent = function(a, b) {
            var c = $(a);
            if (a = $("__srte_" + a)) {
                a.innerHTML = b;
                var d = a.lastChild;
                (d = d ? d.className : null) && 0 <= d.indexOf("fquote") && (b += "<br>",
                a.innerHTML = b)
            }
            c && (c.value = b)
        }
        ;
        d.GetContent = function(a) {
            if (a = $(a)) {
                var b = a.value;
                return b !== a.placeholder ? b : ""
            }
            return null
        }
        ;
        d.isEmpty = function(a) {
            (a = d.GetContent(a)) && (a = a.replace(/<(?!img|embed|iframe)[^>]+>|&nbsp;/gi, ""));
            return !a
        }
        ;
        d.GetEditor = function(a) {
            return $("__srte_" + a)
        }
        ;
        d.Flush = function(a) {
            var b = $(a);
            a = $("__srte_" + a);
            b && a && (b.value = a.innerHTML)
        }
        ;
        d.Focus = function(a) {
            var b = $("__srte_" + a);
            b && (b.focus(),
            document.createRange ? (a = document.createRange(),
            a.selectNodeContents(b),
            a.collapse(!1),
            b = window.getSelection(),
            b.removeAllRanges(),
            b.addRange(a)) : document.selection && (a = document.body.createTextRange(),
            a.moveToElementText(b),
            a.collapse(!1),
            a.select()))
        }
        ;
        d.Init = function() {
            if (window.SimpleRte)
                for (var b = 0; b < window.SimpleRte.length; b++) {
                    var c = window.SimpleRte[b]
                      , g = $(c.id)
                      , l = createElement(null, "div", {
                        id: "__srte_" + c.id,
                        contentEditable: "true",
                        className: "smallEditor"
                    });
                    l.style.width = g.style.width;
                    l.style.height = g.style.height;
                    insertAfter(g.parentNode, l, g);
                    g.style.display = "none";
                    a(c.id);
                    d.SetContent(g.id, g.value);
                    !c.placeholder || g.value && "<br>" !== g.value ? d.SetContent(g.id, g.value) : (l.innerHTML = c.placeholder,
                    g.placeholder = c.placeholder,
                    Core.AddHandler(l, "focus", function() {
                        if (l.innerHTML == c.placeholder && (l.innerHTML = "",
                        document.createRange)) {
                            var a = document.createRange();
                            a.selectNodeContents(l);
                            a.collapse(!1);
                            var b = window.getSelection();
                            b.removeAllRanges();
                            b.addRange(a)
                        }
                    }),
                    Core.AddHandler(l, "blur", function() {
                        "" == l.innerHTML.replace("<br>", "") && (l.innerHTML = c.placeholder)
                    }))
                }
        }
    }
}
)();
(function() {
    var a = window.MQTE = {}
      , b = window.MQRTE
      , c = window.SmallRTE;
    mqGlobal.AddOnReady(function() {
        b && b.Init(window);
        c && c.Init()
    });
    a.Focus = function(a) {
        b && b.Editor(a) ? b.Focus(a) : c && c.GetEditor(a) ? c.Focus(a) : (a = $(a)) && a.focus && a.focus()
    }
    ;
    a.AddFocusHandler = function(a, c) {
        b && b.Editor(a) && b.AddFocusHandler(a, c)
    }
    ;
    a.GetContent = function(a) {
        return b && b.Editor(a) ? b.GetContent(a) : c && c.GetEditor(a) ? c.GetContent(a) : (a = $(a)) ? a.value : null
    }
    ;
    a.SetContent = function(a, e) {
        if (b && b.Editor(a))
            b.SetContent(a, e);
        else if (c && c.GetEditor(a))
            c.SetContent(a, e);
        else if (a = $(a))
            a.value = e
    }
    ;
    a.InsertContent = function(a, e, f) {
        if (b && b.Editor(a))
            b.InsertContent(a, e, f);
        else if (c && c.GetEditor(a))
            c.SetContent(a, e);
        else if (a = $(a))
            a.value = e
    }
    ;
    a.Clear = function(a) {
        if (b && b.Editor(a))
            b.Clear(a);
        else if (c && c.GetEditor(a))
            c.Clear(a);
        else if (a = $(a))
            a.value = a.innerHTML = ""
    }
    ;
    a.IsEmpty = function(a) {
        return b && b.Editor(a) ? b.isEmpty(a) : c && c.GetEditor(a) ? c.isEmpty(a) : (a = $(a)) ? 0 == a.value.fulltrim().length : !0
    }
    ;
    a.MarkUnchanged = function(a) {
        b && b.Editor(a) && b.MarkUnchanged(a)
    }
    ;
    a.Changed = function(a) {
        return b && b.Editor(a) ? b.Changed(a) : !1
    }
    ;
    a.Highlight = function(a, c) {
        return b ? b.highlight(a, c) : c
    }
    ;
    a.Flush = function(a) {
        b && b.Editor(a) ? b.Flush(a) : c && c.GetEditor(a) && c.Flush(a)
    }
    ;
    a.HotKey = function(a, c, f, g, l, m) {
        b && b.Editor(a) && b.HotKey(a, c, f, g, l, m)
    }
    ;
    a.SetValidationClass = function(a, e) {
        var d;
        if (d = $(a))
            if (b && b.Editor(a))
                for (a = d.parentNode; a; ) {
                    if (e) {
                        if ("dalet-editor" == a.className) {
                            a.className = "dalet-editor field-validation-error";
                            break
                        }
                    } else if (a.className && -1 != a.className.indexOf("field-validation-error")) {
                        d = a.className.split(" ");
                        e = [];
                        for (var g in d)
                            "field-validation-error" != d[g] && e.push(d[g]);
                        a.className = e.join(" ");
                        break
                    }
                    a = a.parentNode
                }
            else if (c && c.GetEditor(a)) {
                if (a = c.GetEditor(a))
                    if (e)
                        "smallEditor" == a.className && (a.className = "smallEditor field-validation-error");
                    else if (a.className && -1 != a.className.indexOf("field-validation-error")) {
                        d = a.className.split(" ");
                        e = [];
                        for (g in d)
                            "field-validation-error" != d[g] && e.push(d[g]);
                        a.className = e.join(" ")
                    }
            } else
                "DIV" == d.parentNode.nodeName && -1 < d.parentNode.className.indexOf("inputWrapper") ? Class(d.parentNode, "field-validation-error", !e) : Class(d, "field-validation-error", !e)
    }
}
)();
function doPost(a, b, c, d) {
    try {
        if (a = a || window.event)
            a.preventDefault ? a.preventDefault() : a.returnValue = !1;
        var e = b.indexOf("?");
        if (-1 != e) {
            var f = b.substr(e + 1);
            b = b.substr(0, e);
            var g = f.split("&");
            if (g && 0 < g.length)
                for (d || (d = {}),
                a = 0; a < g.length; a++) {
                    var l = g[a]
                      , m = l.split("=");
                    1 == m.length ? d[l] = "" : d[m[0]] = decodeURIComponent(m[1])
                }
        }
        var h = createElement(document.body, "form", {
            action: b,
            method: "post",
            target: "_top"
        });
        c && createElement(h, "input", {
            name: "__signature",
            type: "hidden",
            value: c
        });
        if (d)
            for (var p in d)
                createElement(h, "input", {
                    name: p,
                    type: "hidden",
                    value: d[p]
                });
        h.style.position = "absolute";
        h.style.left = "-5000px";
        h.submit()
    } catch (t) {
        alert("action failed: " + t)
    }
}
function toTitleCase(a) {
    return a ? a.replace(/\w\S*/g, function(a) {
        return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase()
    }) : a
}
function doubleScroll(a) {
    var b = document.createElement("div");
    b.appendChild(document.createElement("div"));
    b.style.overflow = "auto";
    b.style.overflowY = "hidden";
    b.firstChild.style.width = a.scrollWidth + "px";
    var c = window.onresize;
    window.onresize = function() {
        c && c(arguments);
        b.firstChild.style.width = a.scrollWidth + "px"
    }
    ;
    b.firstChild.style.paddingTop = "1px";
    b.onscroll = function() {
        a.scrollLeft = b.scrollLeft
    }
    ;
    a.onscroll = function() {
        b.scrollLeft = a.scrollLeft
    }
    ;
    a.parentNode.insertBefore(b, a)
}
(function() {
    mqGlobal.AddOnReady(function() {
        var a = getElementsByClass("matrix_wrapper");
        if (a && a.length)
            for (var b = 0; b < a.length; b++)
                doubleScroll(a[b])
    })
}
)();
(function() {
    function a(a) {
        return a.replace(/([A-Z])/g, function(a) {
            return "-" + a.toLowerCase()
        })
    }
    var b = "undefined" !== typeof document && document.head && document.head.dataset ? {
        set: function(a, b, e) {
            a.dataset[b] = e
        },
        get: function(a, b) {
            return a.dataset[b]
        },
        del: function(a, b) {
            delete a.dataset[b]
        }
    } : {
        set: function(b, d, e) {
            b.setAttribute("data-" + a(d), e)
        },
        get: function(b, d) {
            return b.getAttribute("data-" + a(d))
        },
        del: function(b, d) {
            b.removeAttribute("data-" + a(d))
        }
    };
    window.dataset = function(a, d, e) {
        function c(c, d) {
            b.set(a, c, d);
            return l
        }
        function g(c) {
            return b.get(a, c)
        }
        var l = {
            set: c,
            get: g,
            del: function(c) {
                b.del(a, c);
                return l
            }
        };
        return 3 === arguments.length ? c(d, e) : 2 === arguments.length ? g(d) : l
    }
}
)();
function dot2num(a) {
    a = a.split(".");
    return 256 * (256 * (256 * +a[0] + +a[1]) + +a[2]) + +a[3]
}
function bytesToSize(a) {
    if (0 == a)
        return "0 Byte";
    var b = parseInt(Math.floor(Math.log(a) / Math.log(1024)));
    return Math.round(a / Math.pow(1024, b), 2) + " " + ["Bytes", "KB", "MB", "GB", "TB"][b]
}
function whichTransitionEvent() {
    var a = document.createElement("span"), b = {
        transition: "transitionend",
        OTransition: "oTransitionEnd",
        MozTransition: "transitionend",
        WebkitTransition: "webkitTransitionEnd"
    }, c;
    for (c in b)
        if (b.hasOwnProperty(c) && void 0 !== a.style[c])
            return b[c]
}
function whichTransform() {
    if (!window.getComputedStyle)
        return !1;
    var a = document.createElement("div")
      , b = null
      , c = {
        webkitTransform: "webkitTransform",
        OTransform: "OTransform",
        msTransform: "msTransform",
        MozTransform: "MozTransform",
        transform: "transform"
    };
    document.body.insertBefore(a, null);
    for (var d in c)
        if (c.hasOwnProperty(d) && void 0 !== a.style[d]) {
            a.style[d] = "translateY(1px)";
            var e = window.getComputedStyle(a).getPropertyValue(c[d]);
            e && 0 < e.length && "none" !== e && (b = c[d])
        }
    document.body.removeChild(a);
    return b
}
function whichFullScreen() {
    for (var a = document.createElement("span"), b = [["requestFullScreen", "cancelFullScreen", "fullScreen", "fullscreeneventchange"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitIsFullScreen", "webkitfullscreeneventchange"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozfullScreen", "mozfullscreenchange"]], c = 0, d = b.length; c < d; c++)
        if (a[b[c][0]])
            return b[c]
}
function Deeplink() {
    function a(a, b, c) {
        if (a.addEventListener)
            return a.addEventListener(b, c),
            {
                remove: function() {
                    a.removeEventListener(b, c)
                }
            };
        a.attachEvent(b, c);
        return {
            remove: function() {
                a.detachEvent(b, c)
            }
        }
    }
    function b(a, b) {
        var c = document.createElement("IFRAME");
        c.src = b;
        c.id = "hiddenIframeForOpenDeeplink";
        c.style.display = "none";
        a.appendChild(c);
        return c
    }
    function c() {
        var a = !!window.opera || 0 <= navigator.userAgent.indexOf(" OPR/");
        return {
            isOpera: a,
            isFirefox: "undefined" !== typeof InstallTrigger,
            isSafari: 0 < Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor"),
            isChrome: !!window.chrome && !a,
            isIE: !!document.documentMode
        }
    }
    function d() {
        var a = -1;
        if ("Microsoft Internet Explorer" === navigator.appName) {
            var b = navigator.userAgent;
            var c = /MSIE ([0-9]{1,}[.0-9]{0,})/;
            null != c.exec(b) && (a = parseFloat(RegExp.$1))
        } else
            "Netscape" === navigator.appName && (b = navigator.userAgent,
            c = /Trident\/.*rv:([0-9]{1,}[.0-9]{0,})/,
            null != c.exec(b) && (a = parseFloat(RegExp.$1)));
        return a
    }
    function e(c, d) {
        var e = a(window, "blur", function() {
            clearTimeout(f);
            e.remove()
        })
          , f = setTimeout(function() {
            d();
            e.remove()
        }, 1E3)
          , h = document.querySelector("#hiddenIframeForOpenDeeplink");
        h || (h = b(document.body, "about:blank"));
        h.contentWindow.location.href = c
    }
    function f(b, c) {
        for (var d = window; d !== d.parent; )
            d = d.parent;
        var e = a(d, "blur", function() {
            clearTimeout(f);
            e.remove()
        })
          , f = setTimeout(function() {
            c();
            e.remove()
        }, 1E3);
        window.location = b
    }
    function g(a, c) {
        var d = document.querySelector("#hiddenIframeForOpenDeeplink");
        d || (d = b(document.body, "about:blank"));
        try {
            d.contentWindow.location.href = a
        } catch (q) {
            c()
        }
    }
    function l(a, b) {
        10 === d() ? m(a, b) : 9 === d() || 11 === d() ? e(a, b) : h(a, b)
    }
    function m(a, c) {
        var d = setTimeout(c, 1E3);
        window.addEventListener("blur", function() {
            clearTimeout(d)
        });
        var e = document.querySelector("#hiddenIframeForOpenDeeplink");
        e || (e = b(document.body, "about:blank"));
        try {
            e.contentWindow.location.href = a
        } catch (u) {
            c(),
            clearTimeout(d)
        }
    }
    function h(a, b) {
        var c = window.open("", "", "width=0,height=0");
        c.document.write("<iframe src='" + a + "'></iframe>");
        setTimeout(function() {
            try {
                c.setTimeout("window.close()", 1E3)
            } catch (q) {
                c.close(),
                b()
            }
        }, 1E3)
    }
    function p(a, b) {
        navigator.msLaunchUri(a, function() {}, b)
    }
    this.OpenUri = function(a, b) {
        function d() {
            window.location = b
        }
        if (navigator.msLaunchUri)
            p(a, d);
        else {
            var e = c();
            e.isFirefox ? g(a, d) : e.isChrome ? f(a, d) : e.isIE && l(a, d)
        }
    }
}
Deeplink = new Deeplink;
function setAttributes(a, b) {
    for (var c in b)
        b.hasOwnProperty(c) && a.setAttribute(c, b[c])
}
Array.prototype.max = function() {
    return Math.max.apply(null, this)
}
;
Array.prototype.min = function() {
    return Math.min.apply(null, this)
}
;
function hsl2rgb(a, b, c) {
    isFinite(a) || (a = 0);
    isFinite(b) || (b = 0);
    isFinite(c) || (c = 0);
    a /= 60;
    0 > a && (a = 6 - -a % 6);
    a %= 6;
    b = Math.max(0, Math.min(1, b / 100));
    c = Math.max(0, Math.min(1, c / 100));
    var d = (1 - Math.abs(2 * c - 1)) * b;
    var e = d * (1 - Math.abs(a % 2 - 1));
    1 > a ? (a = d,
    b = e,
    e = 0) : 2 > a ? (a = e,
    b = d,
    e = 0) : 3 > a ? (a = 0,
    b = d) : 4 > a ? (a = 0,
    b = e,
    e = d) : 5 > a ? (a = e,
    b = 0,
    e = d) : (a = d,
    b = 0);
    c -= d / 2;
    a = Math.round(255 * (a + c));
    b = Math.round(255 * (b + c));
    e = Math.round(255 * (e + c));
    return [a, b, e]
}
function numToColor(a, b, c) {
    return "rgba(" + hsl2rgb(77 * a % 360, (b || 58) + a % 20, (c || 69) + a % 20).join(",") + ",1)"
}
function arrayDeleteDuplicates(a) {
    for (var b = {}, c = [], d = a.length, e = 0, f = 0; f < d; f++) {
        var g = a[f];
        1 !== b[g] && (b[g] = 1,
        c[e++] = g)
    }
    return c
}
function getUrlParams(a) {
    var b = {};
    if (a = window.history.pushState ? a ? a.split("?")[1] : window.location.search.slice(1) : window.location.hash.substring(1)) {
        a = a.split("&");
        for (var c = 0, d = a.length; c < d; c++) {
            var e = a[c].split("=");
            b[e[0]] = e[1]
        }
        return b
    }
    return !1
}
function urlParamInString(a) {
    var b = window.history.pushState ? "?" : "", c;
    for (c in a)
        a.hasOwnProperty(c) && (b += c + "=" + a[c] + "&");
    return b.substring(0, b.length - 1)
}
function addUrlParams(a) {
    var b = getUrlParams() || {};
    for (c in a)
        a.hasOwnProperty(c) && (b[c] = a[c]);
    var c = urlParamInString(b);
    if (c === window.location.search)
        return !1;
    if (window.history.pushState)
        window.history.pushState(a, document.title, c);
    else if ("undefined" !== typeof window.location.hash)
        window.location.hash = urlParamInString(b);
    else {
        if (window.location.href === c)
            return !0;
        window.location.href = c
    }
    return !0
}
function removeUrlParams(a) {
    var b = getUrlParams();
    if (!b)
        return !1;
    for (var c = 0, d = a.length; c < d; c++)
        delete b[a[c]];
    b = urlParamInString(b);
    if (window.history.pushState)
        window.history.pushState(a, document.title, b);
    else if ("undefined" !== typeof window.location.hash)
        window.location.hash = "";
    else {
        if (window.location.href === b)
            return !0;
        window.location.href = b
    }
    return !0
}
function getPointIntersection(a, b) {
    var c = a[0].y - a[1].y
      , d = a[1].x - a[0].x
      , e = b[0].y - b[1].y
      , f = b[1].x - b[0].x
      , g = c * f - e * d;
    if (0 !== g) {
        var l = a[1].y * a[0].x - a[1].x * a[0].y;
        a = b[1].y * a[0].x - b[1].x * b[0].y;
        return {
            x: (d * a - f * l) / g,
            y: (e * l - c * a) / g
        }
    }
    return !1
}
function getFormatedNum(a) {
    var b = 0 > a;
    a = Math.abs(a);
    if (1E3 > a)
        return (b ? "-" : "") + a.toFixed(0);
    var c = -1;
    do
        a /= 1E3,
        c++;
    while (1E3 < a);return (b ? "-" : "") + Math.max(a, .1).toFixed(1) + ["K", "M", "BN"][c]
}
function trim(a) {
    a = a.replace(/^\s+/, "");
    for (var b = a.length - 1; 0 <= b; b--)
        if (/\S/.test(a.charAt(b))) {
            a = a.substring(0, b + 1);
            break
        }
    return a
}
function generateId(a) {
    a = a || "global";
    this.counterId || (this.counterId = {});
    this.counterId[a] || (this.counterId[a] = 0);
    return this.counterId[a]++
}
;(function() {
    function a() {
        var a = h.shift();
        if (a)
            return a;
        try {
            if (window.XMLHttpRequest)
                a = new XMLHttpRequest;
            else if (window.ActiveXObject)
                try {
                    a = new ActiveXObject("Msxml2.XMLHTTP")
                } catch (n) {
                    a = new ActiveXObject("Microsoft.XMLHTTP")
                }
            p.push(a)
        } catch (n) {
            a = null
        }
        return a
    }
    function b(a) {
        var b, c = {};
        if (!a)
            return c;
        a = a.split("\n");
        for (b = a.length - 1; 0 <= b; --b) {
            var d = a[b].split(":");
            2 == d.length && (c[d[0].toLowerCase().replace(/^\s+|\s+$/g, "")] = d[1].replace(/^\s+|\s+$/g, ""))
        }
        return c
    }
    function c(a, c, d, e, f) {
        var h;
        (h = a.onrequestready) || (h = a.onready);
        var g = a.onendrequest;
        try {
            g && g.call(a, c, d, e, b(f)),
            h && h.call(a, c, d, e, b(f))
        } catch (B) {
            alert(B.message)
        }
    }
    function d(a, d) {
        if (d) {
            try {
                var e = a.status
            } catch (z) {}
            try {
                var f = a.responseText
            } catch (z) {}
            try {
                var h = a.responseXML
            } catch (z) {}
            try {
                var g = a.statusText
            } catch (z) {}
            try {
                var l = a.getAllResponseHeaders()
            } catch (z) {}
            switch (e) {
            case 200:
                if (l) {
                    c(d, f, h, g, l);
                    break
                } else
                    e = 0,
                    g = "";
            default:
                a = e;
                (e = d.onrequesterror) || (e = d.onerror);
                var n = d.onendrequest;
                try {
                    n && n.call(d, f, h, a, b(l)),
                    e && e.call(d, a, f, h, g, b(l))
                } catch (z) {
                    alert(z.message)
                }
            }
        }
    }
    function e(a) {
        var b, c = [];
        if (a instanceof Array) {
            var d = 0;
            for (b = a.length; d < b; ++d)
                c.push([a[d][0], encodeURIComponent(a[d][1])].join("="))
        } else
            for (d in a)
                c.push([d, encodeURIComponent(a[d])].join("="));
        return c.join("&")
    }
    function f(a, b) {
        function c(a, c) {
            d.push("--");
            d.push(b);
            d.push('\r\nContent-Disposition: form-data; name="');
            d.push(a);
            d.push('"');
            c.filename && (d.push(';filename="'),
            d.push(c.filename),
            d.push('"'));
            d.push("\r\n\r\n");
            c.value ? d.push(c.value) : d.push(c);
            d.push("\r\n")
        }
        var d = [], e;
        if (a instanceof Array) {
            var f = 0;
            for (e = a.length; f < e; ++f)
                c(a[f][0], a[f][1])
        } else
            for (f in a)
                c(f, a[f]);
        d.push("--");
        d.push(b);
        d.push("--\r\n");
        return d.join("")
    }
    function g(a, b) {
        var d = a.ownerDocument.createElement("iframe"), e, f = ["upload_frame", Math.random()].join("_");
        (e = d.style).position = "absolute";
        e.left = e.top = "-30000px";
        d.name = f;
        d.id = f;
        a.parentNode.insertBefore(d, a);
        a.target = f;
        (e = a.ownerDocument.parentWindow) || (e = a.ownerDocument.defaultView);
        e.frames[f].name != f && (e.frames[f].name = f);
        var h = !1;
        e = function() {
            if (!(h || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState)) {
                h = !0;
                d.onload = d.onreadystatechange = null;
                try {
                    if (0 <= navigator.userAgent.indexOf("Opera")) {
                        var a = this;
                        setTimeout(function() {
                            c(b, a.contentWindow.document.body.innerHTML, a.contentWindow.document, null, "")
                        }, 300)
                    } else
                        c(b, this.contentWindow.document.body.innerHTML, this.contentWindow.document, null, "")
                } catch (B) {
                    alert("call_onready error: " + B)
                }
            }
        }
        ;
        0 <= navigator.userAgent.indexOf("Opera") && d.addEventListener("DOMContentLoaded", e);
        d.onload = d.onreadystatechange = e;
        a.submit();
        b && b.onbeginrequest && b.onbeginrequest.call(b, a)
    }
    function l(a) {
        return {
            ajax: a,
            timeout: setTimeout(function() {
                a.abort()
            }, 24E4)
        }
    }
    var m = window.Ajax = {}
      , h = []
      , p = [];
    m.get = function(b, c, f) {
        var g = a()
          , n = l(g);
        if (g) {
            f && f.onbeginrequest && f.onbeginrequest.call(f, g);
            c = e(c);
            var m = -1 == b.indexOf("?") ? "?" : "&";
            g.open("get", c ? [b, c].join(m) : b, !0);
            g.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            g.onreadystatechange = function() {
                switch (g.readyState) {
                case 4:
                    n && (clearTimeout(n.timeout),
                    n = n.ajax = null),
                    d(g, f),
                    g.abort(),
                    h.push(g)
                }
            }
            ;
            try {
                g.send("")
            } catch (v) {
                return !1
            }
            return n
        }
        onerror && onerror()
    }
    ;
    m.post = function(b, c, g, m, p, w) {
        var n = a()
          , t = l(n);
        n.open("post", b, !0);
        w ? n.withCredentials = !0 : n.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        g ? (n.setRequestHeader("Content-Type", "multipart/form-data; boundary=AJAX----FORM"),
        c = f(c, "AJAX----FORM")) : p ? (n.setRequestHeader("Content-Type", "application/json"),
        c = JSON.stringify(c)) : (n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
        c = e(c));
        n.onreadystatechange = function() {
            switch (n.readyState) {
            case 4:
                t && (clearTimeout(t.timeout),
                t = t.ajax = null),
                d(n, m),
                n.abort(),
                h.push(n)
            }
        }
        ;
        m && m.onbeginrequest && m.onbeginrequest.call(m, n);
        try {
            n.send(c)
        } catch (z) {
            return !1
        }
        return t
    }
    ;
    m.form = function(a, b) {
        for (var c = [], d = a.elements, e = 0, f = d.length; e < f; ++e) {
            var h = d[e];
            switch (h.type.toLowerCase()) {
            case "file":
                return g(a, b),
                !1;
            case "text":
            case "email":
            case "tel":
            case "phone":
            case "password":
            case "hidden":
            case "submit":
            case "image":
                h.name && c.push([h.name, h.value]);
                continue;
            case "checkbox":
            case "radio":
                h.name && h.checked && c.push([h.name, h.value ? h.value : "on"]);
                continue
            }
            "TEXTAREA" == h.nodeName && h.name ? c.push([h.name, h.value]) : "SELECT" == h.nodeName && h.name && c.push([h.name, h.value])
        }
        "post" == a.method.toLowerCase() ? m.post(a.action, c, "multipart/form-data" == a.enctype, b) : m.get(a.action, c, b)
    }
    ;
    m.stop = function(a) {
        var b;
        a && (b = a.ajax) && (clearTimeout(a.timeout),
        b.onreadystatechange = null,
        b.abort())
    }
    ;
    m.url = function(a, b) {
        a = a.split("?")[0];
        b = e(b);
        return [a, b].join("?")
    }
    ;
    m.stopAll = function() {
        if (p && p.length)
            for (var a = 0; a < p.length; a++) {
                var b = p[a];
                b && b.abort()
            }
    }
    ;
    Core.AddHandler(window, "beforeunload", m.stopAll)
}
)();
var x, y, inDock = !1, interval, f_delta = "";
document.onmouseup = function() {
    stopDock()
}
;
function submitAvatarFile() {
    var a = $("avatar_load");
    a.style.visibility = "visible";
    a.style.display = "block";
    document.avatar_upload.submit()
}
function moveEvent(a) {
    if (inDock) {
        a || (a = window.event);
        var b = document.getElementById("image")
          , c = a.clientX - x
          , d = a.clientY - y
          , e = b.style
          , f = b.offsetHeight;
        b = b.offsetWidth;
        d < -f + 240 ? d = -f + 240 : 40 < d && (d = 40);
        c < -b + 240 ? c = -b + 240 : 40 < c && (c = 40);
        e.left = c + "px";
        e.top = d + "px";
        a.preventDefault && a.preventDefault()
    }
}
function startDock(a) {
    a || (a = window.event);
    var b = document.getElementById("image");
    b && (x = a.clientX - parseInt(b.style.left),
    y = a.clientY - parseInt(b.style.top),
    inDock = !0);
    a.preventDefault && a.preventDefault()
}
function stopDock() {
    inDock = !1
}
function zoomIn() {
    var a = document.getElementById("image");
    if (a) {
        var b = a.clientWidth
          , c = a.clientHeight;
        c = b / c;
        b += 60;
        c = Math.round(b / c);
        a.style.width = b + "px";
        a.style.height = c + "px";
        a.style.left = parseInt(a.style.left) - 30 + "px";
        a.style.top = parseInt(a.style.top) - 30 + "px"
    }
}
function zoomOut() {
    var a = document.getElementById("image");
    if (a) {
        var b = a.clientWidth
          , c = a.clientHeight;
        c = b / c;
        b -= 60;
        c = Math.round(b / c);
        200 <= b && 200 <= c && (a.style.width = b + "px",
        a.style.height = c + "px",
        a.style.left = parseInt(a.style.left) + 30 + "px",
        a.style.top = parseInt(a.style.top) + 30 + "px")
    }
}
function moveImage(a, b) {
    stopMoving();
    a || (a = window.event);
    a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0;
    f_delta = b;
    interval = setInterval(moveInterval, 50)
}
function moveInterval() {
    var a = document.getElementById("image");
    if (a)
        switch (f_delta) {
        case "top":
            var b = a.offsetHeight;
            var c = parseInt(a.style.top) - 10;
            c < -b + 240 && (c = -b + 240);
            a.style.top = c + "px";
            break;
        case "bottom":
            c = parseInt(a.style.top) + 10;
            40 < c && (c = 40);
            a.style.top = c + "px";
            break;
        case "left":
            b = a.offsetWidth;
            c = parseInt(a.style.left) - 10;
            c < -b + 240 && (c = -b + 240);
            a.style.left = c + "px";
            break;
        case "right":
            c = parseInt(a.style.left) + 10,
            40 < c && (c = 40),
            a.style.left = c + "px"
        }
}
function stopMoving(a) {
    interval && (clearInterval(interval),
    interval = null)
}
function saveImage(a, b) {
    var c = document.getElementById("image")
      , d = parseInt(c.style.left) - 40
      , e = parseInt(c.style.top) - 40;
    document.forms.coords.left.value = d = Math.ceil(-d * a / c.clientWidth);
    document.forms.coords.top.value = e = Math.ceil(-e * b / c.clientHeight);
    document.forms.coords.right.value = d + Math.ceil(200 * a / c.clientWidth);
    document.forms.coords.bottom.value = e + Math.ceil(200 * b / c.clientHeight);
    document.forms.coords.submit()
}
function resizeAvatarIframe(a) {
    var b = a.contentWindow.document.body.scrollHeight;
    0 !== b ? a.style.height = b + "px" : setTimeout(function() {
        resizeAvatarIframe(a)
    }, 300)
}
;var globContainersCounter = 1
  , globInputSize = 63
  , globInputName = "attachedFile"
  , globClassName = "attachInput";
function editComment(a) {
    Attach.clearAttaches();
    var b = $("newmessage");
    b && (b.style.display = "block");
    b = parseInt(a);
    $("id_message");
    var c = $("content" + b)
      , d = $("edit_id");
    $("edit_parent_id");
    var e = $("edit_cnew_cmd")
      , f = $("edit_csave_cmd")
      , g = $("admin_date_create")
      , l = document.getElementById("admin_not_modify")
      , m = $("date_create_" + b)
      , h = $("author_info_" + a)
      , p = $("admin_author");
    d && (d.value = b);
    c && set_content(c.innerHTML + "<br>", !1, !0);
    e && f && (e.style.display = "none",
    f.style.display = "block");
    g && (g.value = null != m ? trim(m.innerHTML) : "");
    l && (l.checked = !0);
    p && h && (p.value = h.title);
    Attach.setReadOnlyAttaches(Attach.getAttachesFromComment(a));
    $("extractorContainer") && ($("extractorContainer").innerHTML = "",
    $("extractorContainer").className = $("extractor" + a) ? "disabled" : "")
}
function editCommentCancel() {
    $("id_message");
    var a = $("edit_id")
      , b = $("edit_cnew_cmd")
      , c = $("edit_csave_cmd")
      , d = $("admin_date_create")
      , e = document.getElementById("admin_not_modify")
      , f = $("admin_author");
    a && (a.value = 0);
    window.MQRTE && set_content(Dalet.isGecko ? "<br>" : "", !1, !0);
    b && c && (b.style.display = "block",
    c.style.display = "none");
    d && (d.value = "");
    f && (f.value = "");
    e && (e.checked = !1);
    Attach.clearAttaches()
}
function Attach() {}
Attach.getAttachesFromComment = function(a) {
    var b = []
      , c = 0;
    a = $("cb_" + a);
    if (!a)
        return b;
    a = a.getElementsByTagName("DIV");
    for (var d = 0; d < a.length; d++)
        if (0 <= a[d].className.indexOf("attachItem")) {
            var e = a[d].cloneNode(!0)
              , f = e.getElementsByTagName("A");
            0 < f.length && (b[c] = {
                obj: e,
                url: window.location.hostname == f[0].host ? f[0].pathname : f[0].href
            },
            c++)
        }
    return b
}
;
Attach.setReadOnlyAttaches = function(a) {
    if (a && 0 != a.length) {
        var b = $("readOnlyAttaches");
        if (!b) {
            b = document.createElement("DIV");
            b.setAttribute("id", "readOnlyAttaches");
            var c = $("multiattaches");
            c.insertBefore(b, c.firstChild)
        }
        b.innerHTML = "";
        for (i in a)
            Attach.addHiddenValues(a[i].obj, a[i].url),
            Attach.addDeleteOption(a[i].obj),
            b.appendChild(a[i].obj)
    }
}
;
Attach.addHiddenValues = function(a, b) {
    var c = document.createElement("INPUT");
    c.type = "hidden";
    c.name = globInputName;
    c.value = b;
    a.appendChild(c)
}
;
Attach.createNewContainer = function(a) {
    a || (a = 1);
    var b = $("newAttaches")
      , c = document.createElement("DIV");
    c.id = "at_" + a;
    var d = document.createElement("INPUT");
    d.type = "file";
    d.name = globInputName;
    d.id = "_" + a;
    d.onchange = function(a) {
        a = a || window.event;
        Attach.onChangeFile(c.id, a.target || a.srcElement)
    }
    ;
    d.className = globClassName;
    d.size = globInputSize;
    Attach.globAcceptFilter && (d.accept = Attach.globAcceptFilter);
    Attach.AllowedExtensions && d.setAttribute("accept", Attach.AllowedExtensions);
    c.appendChild(d);
    b.appendChild(c);
    return c
}
;
Attach.onChangeFile = function(a, b) {
    function c(a) {
        Validate && d && Validate.AppendMessage(d, a);
        b.value = "";
        b.type = "";
        b.type = "file"
    }
    a = $(a);
    var d = $("newAttaches_info");
    if (Attach.AllowedExtensions && b) {
        var e = b.value;
        if (e) {
            e = e.toLowerCase().split(".");
            1 < e.length && (e = e.pop());
            if (0 > Attach.AllowedExtensions.indexOf("." + e))
                return c(Attach.alowedExtensionsLabel),
                !1;
            Validate && d && Validate.ClearMessage(d)
        } else
            return !1
    }
    if (Attach.MaxSize && b && ("string" === typeof Attach.MaxSize && (Attach.MaxSize = 1048576 * parseInt(Attach.MaxSize)),
    0 < Attach.MaxSize && b.files))
        if (b.files[0]) {
            if (b.files[0].size > Attach.MaxSize)
                return c(Attach.maxSizeLabel),
                !1;
            Validate && d && Validate.ClearMessage(d)
        } else
            return !1;
    a.containsYet || (Attach.addDeleteOption(a),
    globContainersCounter++,
    Attach.createNewContainer(globContainersCounter),
    a.containsYet = !0)
}
;
Attach.addDeleteOption = function(a) {
    var b = document.createElement("A");
    b.appendChild(document.createTextNode(window.deleteLabel ? window.deleteLabel : "delete"));
    b.href = "#";
    b.className = "deleteAttachLink";
    a.appendChild(b);
    b.onclick = function() {
        return Attach.deleteContainer(a)
    }
}
;
Attach.deleteContainer = function(a) {
    var b = a.parentNode.getElementsByTagName("DIV").length
      , c = a.parentNode;
    a.parentNode.removeChild(a);
    1 == b && c.parentNode.removeChild(c);
    return !1
}
;
Attach.clearAttaches = function() {
    var a = $("readOnlyAttaches");
    a && a.parentNode.removeChild(a);
    if (a = $("newAttaches"))
        a.innerHTML = "";
    globContainersCounter = 1;
    Attach.createNewContainer(1)
}
;
Attach.setAcceptFilter = function(a) {
    Attach.globAcceptFilter = a
}
;
function ShortComments() {
    function a(a) {
        a = a || window.event;
        return 13 === a.keyCode && a.ctrlKey ? !0 : !1
    }
    function b(a, b) {
        b && (a.style.height = b + "px");
        a.clientHeight < a.scrollHeight && (a.style.minHeight = a.scrollHeight + "px")
    }
    function c(a, b, c, d, e, f, h) {
        this.moduleId = a;
        this.parentType = b;
        this.parentId = c;
        this.avatar = d;
        this.container = e;
        this.insertAfterElement = f;
        this.token = h
    }
    function d(a, b, c) {
        this.html = a;
        this.container = b;
        this.insertAfterElement = c
    }
    function e(a) {
        return "shortCommentForm_" + a.moduleId + "_" + a.parentType + "_" + a.parentId
    }
    function f(a) {
        return "shortCommentContent_" + a.moduleId + "_" + a.parentType + "_" + a.parentId
    }
    function g(c) {
        var d = "/" + w + "/short_comments/" + c.moduleId + "/" + c.parentId;
        if (!$(e(c))) {
            var h = createElement(null, "DIV", {
                className: "shortComment wallComment",
                id: e(c) + "_cnt"
            })
              , g = createElement(h, "SPAN", {
                className: "shortCommentAvatar"
            })
              , n = createElement(h, "DIV", {
                className: "editShortCommentContent"
            })
              , m = createElement(n, "FORM", {
                className: "editShortComment addAction",
                id: e(c),
                action: d,
                method: "POST"
            });
            createElement(m, "input", {
                type: "hidden",
                value: c.token,
                name: "__signature"
            });
            createElement(g, "IMG", {
                src: c.avatar,
                width: 24,
                height: 24
            });
            m.onsubmit = function() {
                return t(c)
            }
            ;
            d = createElement(m, "DIV", {
                className: "inputWrapper"
            });
            d = createElement(d, "textarea", {
                name: "content",
                id: f(c)
            });
            d.onblur = function() {
                0 == this.value.length && l(c)
            }
            ;
            d.onkeydown = function(b) {
                if (a(b))
                    m.onsubmit()
            }
            ;
            d.onkeyup = function(a) {
                b(this, 16)
            }
            ;
            d.style.height = "16px";
            shortCommentsManager.toPostStatusLabel && createElement(n, "span", {
                innerHTML: shortCommentsManager.toPostStatusLabel,
                className: "textareaHelp"
            });
            createElement(m, "input", {
                type: "hidden",
                name: "moduleId",
                value: c.moduleId
            });
            createElement(m, "input", {
                type: "hidden",
                name: "parentType",
                value: c.parentType
            });
            createElement(m, "input", {
                type: "hidden",
                name: "parentId",
                value: c.parentId
            });
            createElement(m, "input", {
                type: "submit",
                className: "buttonSimple postStatus",
                value: ""
            });
            n = null;
            c.insertAfterElement && (n = c.insertAfterElement.nextSibling);
            apearBlockVertical(h, c.container, n, 200);
            b(d, 16);
            setTimeout(function() {
                $(f(c)).focus()
            }, 220)
        }
    }
    function l(a) {
        (a = $(e(a) + "_cnt")) && a.parentNode && a.parentNode.removeChild(a)
    }
    function m(a) {
        a && a.length && n(new d(a,this.editData.container,this.insertAfterElement));
        l(this.editData);
        v = !1
    }
    function h(a) {
        a = n(new d(a,this.container,this.insertAfterElement), !1);
        this.callback && this.callback(a)
    }
    function p(a) {
        v = !1;
        alert("Error")
    }
    function t(a) {
        if (v)
            return !1;
        var b = $(e(a));
        if (!b)
            return !1;
        var c = b.content;
        if (!c || !c.value || !c.value.length)
            return !1;
        v = !0;
        Ajax.form(b, {
            onready: m,
            onerror: p,
            editData: a
        });
        return !1
    }
    function n(a, b) {
        var c = document.createElement("DIV");
        c.innerHTML = a.html;
        var d = null;
        a.insertAfterElement && (d = a.insertAfterElement.nextSibling);
        var e = 0;
        if (c.children)
            for (var f = 0; f < c.children.length; f++) {
                var h = c.children[f].cloneNode(!0);
                b ? apearBlockVertical(h, a.container, d, Math.min(500, 50 * (f + 1)), 5) : a.insertAfterElement ? a.container.insertBefore(h, a.insertAfterElement) : a.container.appendChild(h);
                e++
            }
        return e
    }
    function r(a) {
        this.element && this.element.parentNode && this.element.parentNode.removeChild(this.element)
    }
    function q(a) {
        if ((a = "undefined" == typeof JSON ? eval("(" + a + ")") : JSON.parse(a)) && a.length) {
            elementPrefix = this.elementPrefix || "sc_";
            for (var b = 0; b < a.length; b++) {
                var c = $(elementPrefix + a[b]);
                c && c.parentNode.removeChild(c)
            }
        }
    }
    function u(a) {
        $("commentsLoad_" + a).style.display = "none";
        var b = $("hiddenComments_" + a);
        if (b) {
            for (var c = b.nextSibling, d = c.parentNode, e = 0; 0 < b.children.length; )
                d.insertBefore(b.children[0], c),
                e++;
            b.parentNode.removeChild(b);
            $("commentsHide_" + a).style.display = "inline"
        }
    }
    var w = location.pathname.split("/")[1];
    this.CheckSubmitHotKey = function(b) {
        return a(b)
    }
    ;
    this.AutoGrowTextarea = function(a, c) {
        return b(a, c)
    }
    ;
    var v = !1;
    this.NewComment = function(a, b, d, e, f, h, l) {
        a = new c(a,b,d,e,f,h,l);
        g(a)
    }
    ;
    this.LoadComments = function(a, b, c, d, e, f, g, l) {
        Ajax.get("/" + w + "/get_short_comments/" + a + "/" + b + "/" + c + "/" + d + "/" + e, null, {
            onready: h,
            onerror: p,
            container: f,
            insertAfterElement: g,
            callback: l
        })
    }
    ;
    this.Delete = function(a, b, c, d) {
        c || (c = "sc_");
        Ajax.post("/" + w + "/delete_short_comment/" + a + "/" + b, {
            __signature: d
        }, !1, {
            onready: r,
            onerror: p,
            element: $(c + b)
        })
    }
    ;
    this.DeleteByAuthor = function(a, b, c, d) {
        c || (c = "sc_");
        Ajax.post("/" + w + "/delete_short_comment_by_author/" + a + "/" + b, {
            __signature: d
        }, !1, {
            onready: q,
            onerror: p,
            elementPrefix: c
        })
    }
    ;
    this.OnLoadCommentsClick = function(a, b, c, d, e) {
        if ($("hiddenComments_" + a))
            return u(a);
        var f = $("commentsCountWrapper_" + a);
        shortCommentsManager.LoadComments(b, c, a, d, e, $("comments_" + a), f.nextSibling, function(b) {
            var c = $("commentsLoad_" + a)
              , d = $("commentsCountWrapper_" + a);
            Class(d, "loading", !0);
            0 >= b ? c.style.visibility = "visible" : ($("commentsLoad_" + a).style.display = "none",
            $("commentsHide_" + a).style.display = "inline")
        });
        $("commentsLoad_" + a).style.display = "none";
        Class(f, "loading")
    }
    ;
    this.HideComments = function(a, b) {
        $("commentsHide_" + a).style.display = "none";
        var c = $("hiddenComments_" + a);
        if (!c) {
            var d = $("comments_" + a);
            c = createElement(null, "div", {
                id: "hiddenComments_" + a
            });
            var e = getElementsByClass("shortComment", $("comments_" + a));
            d.insertBefore(c, e[0]);
            for (d = 0; d < e.length - b; d++)
                c.appendChild(e[d])
        }
        c.style.display = "none";
        $("commentsLoad_" + a).style.display = "inline"
    }
}
var shortCommentsManager = new ShortComments;
checkImgForLightbox($("forumTopicComments"), "content", "attachItem");
(function() {
    function a(a) {
        var c = document.body;
        p = createElement(c, "IFRAME", {
            className: "window-lock"
        });
        t = createElement(c, "DIV", {
            className: "window-lock"
        });
        "fixed" === a && (p.style.position = "fixed",
        t.style.position = "fixed");
        p.style.height = t.style.height = "100%";
        p.frameBorder = 0;
        p.style.width = t.style.width = "100%";
        n = createElement(document.body, "DIV", {
            className: "window"
        });
        a = createElement(n, "DIV", {
            className: "window-title"
        });
        a.appendChild(document.createElement("SPAN"));
        a.onmousedown = e;
        N && (u = createElement(a, "SPAN", {
            className: "window-close"
        }),
        u.onclick = N,
        0 == document.location.protocol.indexOf("https") && Class(u, "httpsClose"));
        w = createElement(n, "DIV", {
            className: "window-movelocker"
        });
        A = createElement(n, "DIV", {
            className: "window-content"
        });
        B && (r = createElement(n, "DIV", {
            className: "window__resizeble-layer"
        }),
        q = createElement(n, "DIV", {
            className: "window__resizeble-btn"
        }),
        q.onmousedown = b)
    }
    function b(a) {
        a || (a = window.event);
        a.preventDefault && a.preventDefault();
        r.style.display = "block";
        document.onmouseup = d;
        F.x = a.clientX;
        F.y = a.clientY;
        H.w = r.clientWidth;
        H.h = r.clientHeight;
        document.onmousemove = c
    }
    function c(a) {
        a || (a = window.event);
        a.preventDefault && a.preventDefault();
        H.h + (a.clientY - F.y) > D && (r.style.height = H.h + (a.clientY - F.y) + "px");
        H.w + (a.clientX - F.x) > z && (r.style.width = H.w + (a.clientX - F.x) + "px")
    }
    function d(a) {
        a || (a = window.event);
        a.preventDefault && a.preventDefault();
        r.style.display = "none";
        document.onmousemove = null;
        document.onmouseup = null;
        n.style.height = H.h + (a.clientY - F.y) > D ? H.h + (a.clientY - F.y) + "px" : D + "px";
        n.style.width = H.w + (a.clientX - F.x) > z ? H.w + (a.clientX - F.x) + "px" : z + "px"
    }
    function e(a) {
        a || (a = window.event);
        v = !0;
        document.onmousemove = f;
        document.onmouseup = g;
        E = parseInt(n.style.left) - a.clientX;
        J = parseInt(n.style.top) - a.clientY;
        w.style.display = "block"
    }
    function f(a) {
        if (v) {
            a || (a = window.event);
            var b = a.clientX + E, c = a.clientY + J, d;
            0 < (d = n.offsetWidth + b - t.offsetWidth) && (b -= d);
            0 < (d = n.offsetHeight + c - t.offsetHeight) && (c -= d);
            0 > b && (b = 0);
            0 > c && (c = 0);
            n.style.left = b + "px";
            n.style.top = c + "px";
            try {
                window.getSelection && (a = window.getSelection()) ? a.removeAllRanges() : document.selection && document.selection.empty()
            } catch (aa) {}
        }
    }
    function g() {
        v && (v = !1,
        w.style.display = "")
    }
    function l() {
        var a = n.lastChild.firstChild;
        a && (a.firstChild && "shareContent" == a.firstChild.className ? n.lastChild.removeChild(a) : I ? (I.insertBefore(a, G),
        I = null) : n.lastChild.removeChild(a))
    }
    function m(a) {
        for (; a; ) {
            if (a.tagName && "body" == a.tagName.toLowerCase())
                return !0;
            a = a.parentNode
        }
        return !1
    }
    var h = window.Dialog = {}, p, t, n, r, q, u, w, v = !1, B = !1, z = 0, D = 0, A, F = {}, H = {}, E, J, I, G, N;
    h.show = function(b, c, d, e, f, g, q, r, v, u) {
        function C() {
            var a = window.innerHeight || document.documentElement.clientHeight
              , b = window.innerWidth || document.documentElement.clientWidth;
            n.style.height = "auto";
            A.style.maxHeight = "none";
            A.style.maxWidth = "none";
            e = n.offsetHeight;
            d = n.offsetWidth;
            b - 40 <= d && (d = b - 40);
            a - 70 <= e || 600 >= a - 70 ? (e = a - 100,
            A.style.maxHeight = e - 44 + "px",
            A.style.overflow = "auto") : n.style.height = e + "px";
            A.style.maxWidth = d + "px";
            n.style.top = Math.round((a - e) / 2) + "px";
            n.style.left = Math.round((b - d) / 2) + "px";
            A.style.minWidth = "0px"
        }
        if (c) {
            "fixed" === u && (document.body.style.overflow = "hidden");
            var M = !0;
            z = d;
            D = e;
            N = f;
            v && (B = !0);
            "fixed" === u && (M = !1);
            f = m(c);
            n || a(u);
            n.style.visibility = "hidden";
            p && (p.style.display = "");
            t && (t.style.display = "");
            n && (n.style.display = "");
            u = t.offsetWidth;
            d >= u && (z = d = u - 20,
            A.style.maxWidth = d + 6 + "px");
            A.style.minWidth = d + "px";
            B && (A.style.minHeight = e + "px",
            n.style.width = d + "px",
            n.style.height = e + "px");
            w.style.height = e + 20 + "px";
            if (!q)
                if (g) {
                    var aa;
                    q = g.left;
                    g = g.top;
                    0 < (aa = n.offsetWidth + q - t.offsetWidth) && (q -= aa + 10 * (0 < aa ? 1 : -1));
                    0 < (aa = n.offsetHeight + g - t.offsetHeight) && (g -= aa + 10 * (0 < aa ? 1 : -1));
                    q + d + 10 > u && (q = (u - d) / 2);
                    n.style.top = g + "px";
                    n.style.left = q + "px"
                } else
                    n.style.top = (document.body.scrollTop || document.documentElement.scrollTop) + Math.round(((window.innerHeight || document.documentElement.clientHeight) - e - 24) / 2) + "px",
                    n.style.left = Math.round((document.body.scrollWidth - d - 4) / 2) + "px";
            n.firstChild.firstChild.innerHTML = b;
            l();
            f && (I = c.parentNode);
            G = c.nextSibling;
            A.appendChild(c);
            n.className = r ? "window " + r : "window";
            M || (h.autoResize = Core.Bind(C, this),
            h.autoResize(),
            Core.AddHandler(window, "resize", h.autoResize));
            n.style.visibility = "visible";
            n.focus()
        }
    }
    ;
    h.hide = function(a) {
        document.body.style.overflow = "";
        h.autoResize && Core.RemoveHandler(window, "resize", h.autoResize);
        try {
            l()
        } catch (Z) {}
        N = void 0;
        p && p.parentNode && (p.parentNode.removeChild(p),
        p = null);
        n && n.parentNode && (n.parentNode.removeChild(n),
        n = null);
        t && t.parentNode && (t.parentNode.removeChild(t),
        t = null);
        u && u.parentNode && u.parentNode.removeChild(u);
        u = null
    }
}
)();
function edit(a) {
    var b = document.getElementById("newmessage");
    b && (b.style.display = "block");
    window.type = "_" == ("" + a).substr(0, 1) ? 0 : 1;
    real_id = 0 == window.type ? parseInt(a.substr(1, a.length)) : parseInt(a);
    document.getElementById("id_message");
    b = document.getElementById("subject_message");
    var c = document.getElementById("content" + real_id)
      , d = document.getElementById("simple_message")
      , e = document.getElementById("edit_id");
    document.getElementById("edit_parent_id");
    var f = document.getElementById("edit_subject")
      , g = document.getElementById("edit_simple")
      , l = document.getElementById("subject")
      , m = document.getElementById("edit_file");
    document.getElementById("subject");
    var h = document.getElementById("simple")
      , p = document.getElementById("edit_cnew_cmd")
      , t = document.getElementById("edit_csave_cmd")
      , n = document.getElementById("admin_date_create")
      , r = document.getElementById("admin_date_modify")
      , q = document.getElementById("admin_label_date_modify")
      , u = document.getElementById("admin_not_modify")
      , w = document.getElementById("admin_label_not_modify")
      , v = document.getElementById("date_create_" + real_id)
      , B = document.getElementById("date_modify_" + real_id);
    a = document.getElementById("author_info_" + a);
    var z = document.getElementById("admin_author");
    e && (e.value = real_id);
    b && f && l && (0 == window.type ? (l.value = b.value,
    f.style.display = "block") : (l.value = "",
    f.style.display = "none"));
    c && window.MQRTE && set_content(c.innerHTML, !1, !0);
    if (m)
        try {
            m.value = ""
        } catch (D) {}
    d && g && h && (0 == window.type ? (h.checked = 0 == d.value,
    g.style.display = "block") : (h.checked = !1,
    g.style.display = "none"));
    p && t && (p.style.display = "none",
    t.style.display = "block");
    n && (n.value = null != v ? trim(v.innerHTML) : "");
    r && (r.style.display = 0 == window.type ? "block" : "none",
    r.value = 0 == window.type && null != B ? trim(B.innerHTML) : "");
    q && (q.style.display = 0 == window.type ? "block" : "none");
    u && (u.style.display = "none",
    u.checked = !1);
    w && (w.style.display = "none");
    z && a && (z.value = a.title)
}
function edit_cancel() {
    document.getElementById("id_message");
    var a = document.getElementById("edit_id")
      , b = document.getElementById("edit_subject")
      , c = document.getElementById("edit_simple")
      , d = document.getElementById("subject")
      , e = document.getElementById("edit_file");
    document.getElementById("subject");
    var f = document.getElementById("simple")
      , g = document.getElementById("edit_cnew_cmd")
      , l = document.getElementById("edit_csave_cmd")
      , m = document.getElementById("admin_date_create")
      , h = document.getElementById("admin_date_modify")
      , p = document.getElementById("admin_label_date_modify")
      , t = document.getElementById("admin_not_modify")
      , n = document.getElementById("admin_label_not_modify")
      , r = document.getElementById("admin_author");
    a && (a.value = 0);
    b && d && (d.value = "",
    b.style.display = "none");
    window.MQRTE && set_content(Dalet.isGecko ? "<br>" : "", !1, !0);
    if (e)
        try {
            e.value = ""
        } catch (q) {}
    c && f && (f.checked = !1,
    c.style.display = "none");
    g && l && (g.style.display = "block",
    l.style.display = "none");
    m && (m.value = "");
    h && (h.style.display = "none",
    h.value = "");
    p && (p.style.display = "none");
    t && (t.style.display = "inline",
    t.checked = !1);
    n && (n.style.display = "inline");
    r && (r.value = "")
}
function quote_forum(a) {
    var b = document.getElementById("newmessage");
    b && (b.style.display = "block");
    b = document.getElementById("content" + a);
    a = document.getElementById("author_info_" + a);
    if (b && a) {
        b = b.cloneNode(!0);
        var c = a.cloneNode(!0)
          , d = c.getElementsByTagName("a");
        for (k = d.length - 1; 0 <= k; --k)
            "fast_msg" == d[k].className && d[k].parentNode.removeChild(d[k]);
        d = b.getElementsByTagName("DIV");
        for (k = d.length - 1; 0 <= k; --k)
            "fquote" != d[k].className && "pocket" != d[k].className || d[k].parentNode.removeChild(d[k]);
        d = b.getElementsByTagName("INPUT");
        for (k = d.length - 1; 0 <= k; --k)
            d[k].parentNode.removeChild(d[k]);
        d = b.getElementsByTagName("IMG");
        for (k = d.length - 1; 0 <= k; --k)
            !d[k].parentNode || "A" != d[k].parentNode.tagName && "a" != d[k].parentNode.tagName ? d[k].parentNode.removeChild(d[k]) : d[k].parentNode.parentNode.removeChild(d[k].parentNode);
        d = b.getElementsByTagName("EMBED");
        for (k = d.length - 1; 0 <= k; --k)
            d[k].parentNode.removeChild(d[k]);
        d = b.getElementsByTagName("IFRAME");
        for (k = d.length - 1; 0 <= k; --k)
            d[k].parentNode.removeChild(d[k]);
        d = b.getElementsByTagName("PRE");
        for (k = d.length - 1; 0 <= k; --k)
            d[k].parentNode.removeChild(d[k]);
        a = '<strong><span style="color:#42639C;"' + (a.title ? ' title="' + a.title + '"' : "") + ">" + trim(c.innerText ? c.innerText : c.textContent) + "</span>:</strong><br> " + b.innerHTML;
        set_content('<div class="fquote">' + a + "</div>", !0, !1);
        MQTE.Focus("body")
    }
}
function toggleNewMessage(a, b) {
    function c() {
        set_content("", !0, !1);
        MQTE.Focus("body");
        $("extractorContainer") && ($("extractorContainer").className = "")
    }
    var d = document.getElementById("newmessage");
    b = 1E3 * b || 0;
    if (a || "none" == d.style.display)
        return d.style.display = "block",
        b ? setTimeout(function() {
            c()
        }, b) : c(),
        !0;
    editCommentCancel();
    d.style.display = "none";
    $("extractorContainer") && ($("extractorContainer").innerHTML = "");
    return !1
}
function win_ban_show(a, b, c, d, e, f) {
    b = document.createElement("form");
    b.name = "banForm";
    b.action = "/";
    b.method = "get";
    c = document.getElementById(c);
    b.innerHTML = c.innerHTML.replace(/HIDDEN/g, "").replace(/{IP}/, d).replace(/{COOKIE}/, e).replace(/{USER_LOGIN}/, f);
    Dialog.show(a, b, 500, 162, function() {
        Dialog.hide()
    })
}
function win_multiban_show(a, b, c, d) {
    b = document.createElement("form");
    b.name = "banForm";
    b.action = "/";
    b.method = "get";
    c = document.getElementById(c);
    b.innerHTML = c.innerHTML.replace(/HIDDEN/g, "").replace(/{USER_LOGIN}/, d).replace(/{USER_LOGIN}/, d);
    Dialog.show(a, b, 500, 162, function() {
        Dialog.hide()
    })
}
function win_edit_image_show(a, b, c) {
    var d = document.createElement("iframe");
    d.id = "iframe_avatar";
    d.name = "iframe_avatar";
    d.frameBorder = 0;
    d.scrolling = "no";
    d.onload = function() {
        resizeAvatarIframe(d)
    }
    ;
    d.src = "/" + a + "/users/" + b + "/avatar";
    d.style.width = "100%";
    d.style.height = "430px";
    d.style.overflow = "hidden";
    Dialog.show(c, d, 320, 430)
}
function ban_submit(a, b, c, d) {
    c = {
        __signature: c
    };
    c.period = document.getElementById("period").value;
    if (d)
        c.multi = !0;
    else {
        c.cookie = encodeURIComponent(document.getElementById("cookie").value);
        d = document.getElementById("ip_address").value;
        if (null == d.match("^(([0-9*]{1,3}.){3}([0-9*]{1,3}){1})?$")) {
            alert("IP mask is not valid");
            return
        }
        c.ip = d
    }
    d = document.getElementById("comment").value;
    "" == d ? alert(b) : (c.comment = encodeURIComponent(d),
    c.login = document.getElementById("login").value,
    Ajax.post(a, c, !0, {
        onready: function(a) {
            window.location.reload()
        }
    }, !0))
}
function set_content(a, b, c) {
    c ? MQTE.SetContent("body", a) : MQTE.InsertContent("body", a)
}
function trim(a) {
    return a.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
}
function processAjaxSubscribe(a, b, c, d, e) {
    if ("inFavorite star" != b.className && "notInFavorite star" != b.className)
        return !1;
    var f = "inFavorite star" == b.className ? "remove" : "add"
      , g = "inFavorite star" == b.className ? "add" : "remove";
    a = a + ("/" == a.charAt(a.length - 1) ? "" : "/") + f;
    b.className = "loading star";
    bindStarSrc(b, c);
    Ajax.post(a, {
        __signature: "add" == f ? d : e
    }, !1, {
        onready: function(a) {
            "success" == eval(a) ? b.className = "add" == g ? "notInFavorite star" : "inFavorite star" : (alert(eval(a)),
            b.className = "add" == f ? "notInFavorite star" : "inFavorite star");
            bindStarSrc(b, c)
        },
        onerror: function(a, d) {
            alert(c.error);
            b.className = "add" == f ? "notInFavorite star" : "inFavorite star";
            bindStarSrc(b, c)
        }
    });
    return !1
}
function processAjaxSubscribeMarket(a, b, c, d, e) {
    var f = "true" === dataset(b, "subscribed")
      , g = f ? "remove" : "add";
    a = a + ("/" == a.charAt(a.length - 1) ? "" : "/") + g;
    Class(b, "loading");
    Ajax.post(a, {
        __signature: "add" === g ? d : e
    }, !1, {
        onready: function(a) {
            Class(b, "loading", !0);
            "success" == eval(a) && (dataset(b, "subscribed", f ? "false" : "true"),
            b.innerHTML = f ? c.add : c.remove)
        },
        onerror: function(a, c) {
            Class(b, "loading", !0)
        }
    });
    return !1
}
function processAjaxSubscribeToModule(a, b, c, d) {
    Ajax.post(a, c ? {
        __signature: c
    } : {}, !1, {
        onready: function(a) {
            b.style.display = "none";
            d && d()
        },
        onerror: function(a, c) {
            b.style.display = "none"
        }
    });
    return !1
}
function bindStarSrc(a, b) {
    "inFavorite star" == a.className && (a.title = b.remove);
    "notInFavorite star" == a.className && (a.title = b.add);
    "loading star" == a.className && (a.title = "")
}
function openAttachments(a, b) {
    $(b).style.display = "block";
    $(b + "_link").style.display = "none";
    $(b + "_info").style.display = "block";
    a = $(a);
    a.className = a.className.replace("floatedAttaches", "noFloatedAttaches");
    return !1
}
function MenuUpdater() {}
MenuUpdater.startUpdating = function(a, b, c, d) {
    Ajax.post(b, {
        __signature: d
    }, !1, {
        onready: function() {
            var b = document.createElement("span");
            b.innerHTML = c;
            var d = $(a);
            d.parentNode.appendChild(b);
            d.parentNode.removeChild(d)
        }
    })
}
;
function MQAutoComplete() {
    this.placeholder = this.id = null;
    this.multiple = !1;
    this.items = [];
    this.domContainer = this.defaultKey = null;
    this.post = !1;
    this.ajaxQueryUrl = this.signature = null;
    this.buildAjaxQueryUrl = function() {
        return this.ajaxQueryUrl
    }
    ;
    this.onPopup = function(a, b) {}
    ;
    this.onTyping = function(a) {}
    ;
    this.onChange = function(a, b, c) {}
    ;
    this.onStartSearching = function() {}
    ;
    this.onEndSearching = function() {}
    ;
    this.bindResult = function(a, b) {
        a.innerHtml = b;
        a.item = b
    }
    ;
    this.loadItemValue = function(a) {
        return a.item
    }
    ;
    this.loadResultValue = function(a) {
        return a
    }
    ;
    this.init = function() {
        this.initTo(document.getElementById(this.id))
    }
    ;
    this.initTo = function(a, b) {
        this.id && a && (this._dom_field = a,
        this._dom_field.addEventListener ? (this._dom_field.addEventListener("keypress", this._bind(this._suppressSubmit, this), !1),
        this._dom_field.addEventListener("keydown", this._bind(this._trackArrow, this), !1),
        this._dom_field.addEventListener("keyup", this._bind(this._trackKeywordChange, this), !1)) : (this._dom_field.attachEvent("onkeypress", this._bind(this._suppressSubmit, this)),
        this._dom_field.attachEvent("onkeydown", this._bind(this._trackArrow, this)),
        this._dom_field.attachEvent("onkeyup", this._bind(this._trackKeywordChange, this))),
        this._dom_dropdown = document.createElement("DIV"),
        this._dom_dropdown.className = "select-edit-list",
        this._dom_dropdown.style.width = (b || this._dom_field.parentNode.clientWidth) + "px",
        this._dom_field.parentNode.parentNode.appendChild(this._dom_dropdown),
        this.domContainer = this._dom_field.parentNode.parentNode,
        this._dom_list = document.createElement("TABLE"),
        this._dom_dropdown.appendChild(this._dom_list),
        this.placeholder && 0 < this.placeholder.length ? (this._dom_placeholder = document.createElement("SPAN"),
        this._dom_placeholder.style.display = "none",
        this._dom_placeholder.style.position = "absolute",
        this._dom_placeholder.style.marginTop = "-22px",
        this._dom_placeholder.style.padding = "1px 2px",
        this._dom_placeholder.style.color = "#999",
        this._dom_placeholder.style.cursor = "text",
        this._dom_placeholder.style.cursor = "text",
        this._dom_field.addEventListener ? (this._dom_field.addEventListener("focus", this._bind(this._gotFocus, this), !1),
        this._dom_field.addEventListener("blur", this._bind(this._lostFocus, this), !1),
        this._dom_placeholder.addEventListener("click", this._bind(this._lostFocus, this), !1)) : (this._dom_field.attachEvent("onfocus", this._bind(this._gotFocus, this), !1),
        this._dom_field.attachEvent("onblur", this._bind(this._lostFocus, this), !1),
        this._dom_placeholder.attachEvent("onclick", this._bind(this._lostFocus, this))),
        this._dom_field.parentNode.appendChild(this._dom_placeholder),
        0 === this._dom_field.value.length && (this._dom_placeholder.style.display = "block")) : this._dom_field.addEventListener ? this._dom_field.addEventListener("blur", this._bind(this._lostFocus, this), !1) : this._dom_field.attachEvent("onblur", this._bind(this._lostFocus, this)),
        0 < this.items.length && this._buildDropDown(this, this.items))
    }
    ;
    this.toggle = function(a) {
        "block" === a._dom_dropdown.style.display ? a._hideDropDown() : a._showDropDown();
        a._dom_field.focus()
    }
    ;
    this.getVisible = function() {
        var a = this._dom_field.parentNode.parentNode;
        return a && "hidden" !== a.style.visibility
    }
    ;
    this.setVisible = function(a) {
        this._setVisible(this, a)
    }
    ;
    this._setVisible = function(a, b) {
        a = a._dom_field.parentNode.parentNode;
        if (!a)
            return !1;
        a.style.visibility = b ? "visible" : "hidden";
        return !0
    }
    ;
    this.clone = function(a, b) {
        var c = a || this._getID(this.id);
        a = new MQAutoComplete;
        a.id = c;
        a.items = this.items;
        a.onChange = this.onChange;
        a.loadItemValue = function(a) {
            $(c + "Key").value = a.key;
            if (window[c + "Autocomplete"].onChange)
                window[c + "Autocomplete"].onChange(c, a.key, a.value);
            return a.value
        }
        ;
        a.loadResultValue = function(a) {
            return a.key || a.Key
        }
        ;
        a.bindResult = function(a, b) {
            a.innerHTML = b.value || b.Value;
            a.key = b.key || b.Key;
            a.value = b.value || b.Value
        }
        ;
        a.onTyping = function(a, b) {
            $(c + "Key").value = a.defaultKey;
            if (a.onChange)
                a.onChange(c, a.defaultKey, b.value)
        }
        ;
        var d = this._dom_field.parentNode.parentNode.cloneNode(!1)
          , e = this._dom_field.parentNode.cloneNode(!1);
        d.appendChild(e);
        d = this._dom_field.cloneNode(!1);
        d.setAttribute("id", c);
        b && d.setAttribute("name", b);
        d.value = "";
        e.appendChild(d);
        var f = this._dom_field.parentNode.getElementsByTagName("input")[1].cloneNode(!1);
        f.setAttribute("id", c + "Key");
        b && f.setAttribute("name", b + "Key");
        e.appendChild(f);
        b = this._dom_field.parentNode.getElementsByTagName("a")[0].cloneNode(!0);
        b.setAttribute("onclick", c + "Autocomplete.toggle(" + c + "Autocomplete)");
        e.appendChild(b);
        a.initTo(d, this._dom_field.parentNode.clientWidth);
        a._setVisible(a, this.getVisible());
        return window[c + "Autocomplete"] = a
    }
    ;
    this._dom_list = this._dom_dropdown = this._dom_placeholder = this._dom_field = null;
    this._searchCall = this._searching = this._preventLostFocus = !1;
    this._listItems = [];
    this._dropDownListIndex = -1;
    this._getID = function(a) {
        for (var b = 1, c = a + b; $(c); )
            b++,
            c = a + b;
        return c
    }
    ;
    this._getValue = function() {
        return this.multiple && 0 <= this._dom_field.value.indexOf("|") ? this._dom_field.value.substring(this._dom_field.value.lastIndexOf("|") + 1) : this.multiple && 0 <= this._dom_field.value.indexOf(",") ? this._dom_field.value.substring(this._dom_field.value.lastIndexOf(",") + 1) : this.multiple && 0 <= this._dom_field.value.indexOf(";") ? this._dom_field.value.substring(this._dom_field.value.lastIndexOf(";") + 1) : this._dom_field.value
    }
    ;
    this._setValue = function(a) {
        this.multiple && 0 <= this._dom_field.value.indexOf("|") ? this._dom_field.value = this._dom_field.value.substring(0, this._dom_field.value.lastIndexOf("|") + 1) + a : this.multiple && 0 <= this._dom_field.value.indexOf(",") ? this._dom_field.value = this._dom_field.value.substring(0, this._dom_field.value.lastIndexOf(",") + 1) + a : this.multiple && 0 <= this._dom_field.value.indexOf(";") ? this._dom_field.value = this._dom_field.value.substring(0, this._dom_field.value.lastIndexOf(";") + 1) + a : this._dom_field.value = a
    }
    ;
    this._bind = function(a, b) {
        return function() {
            return arguments ? a(this, b, arguments[0]) : a(this, b)
        }
    }
    ;
    this._bindIE = function(a, b, c) {
        return function() {
            return a(c, b)
        }
    }
    ;
    this._showDropDown = function() {
        this.onPopup(this._dom_field, this._dom_dropdown);
        this._dom_dropdown.style.width = this._dom_field.parentNode.clientWidth + "px";
        this._dom_dropdown.style.display = "none";
        this._dom_dropdown.style.height = "auto";
        var a = document.body
          , b = document.documentElement;
        a = Math.max(a.scrollHeight, a.offsetHeight, b.clientHeight, b.scrollHeight, b.offsetHeight);
        this._dom_dropdown.style.display = "block";
        b = this._dom_dropdown.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
        a = a - b - 20;
        this._dom_dropdown.offsetHeight > a && (this._dom_dropdown.style.overflowY = "auto",
        this._dom_dropdown.style.height = a + "px")
    }
    ;
    this._hideDropDown = function() {
        this._dom_dropdown.style.display = "none";
        0 === this.items.length && (this._listItems = [])
    }
    ;
    this._gotFocus = function(a, b, c) {
        b._dom_placeholder && (b._dom_placeholder.style.display = "none",
        b._dom_field.focus())
    }
    ;
    this._lostFocus = function(a, b, c) {
        0 === b._dom_field.value.length && b._dom_placeholder && (b._dom_placeholder.style.display = "block");
        a = c.explicitOriginalTarget || c.toElement;
        b._preventLostFocus || !a || "A" == a.tagName || "EM" == a.tagName || a.parentNode && ("A" == a.parentNode.tagName || "EM" == a.parentNode.tagName) || b._hideDropDown();
        b._preventLostFocus = !1
    }
    ;
    this._trackKeywordChange = function(a, b, c) {
        c = c || window.event;
        a = c.keyCode;
        c.charCode && 0 === a && (a = c.charCode);
        40 === a || 38 === a || 13 === a || 32 === a || 0 === a || b._searching || b._searchCall || (setTimeout(function() {
            b._searchByKeyword(b)
        }, 500),
        b._searchCall = !0)
    }
    ;
    this._searchByKeyword = function(a) {
        a._dropDownListIndex = -1;
        if (!(a._searching || 0 < a.items.length)) {
            var b = a._getValue();
            if (2 > b.length)
                a._searchCall = !1,
                a._hideDropDown();
            else {
                var c = a.buildAjaxQueryUrl();
                if (c)
                    if (a._searching = !0,
                    a._searchCall = !1,
                    Class(a._dom_field, "wait"),
                    a._dom_field.style.backgroundPosition = a._dom_field.clientWidth - 18 + "px center",
                    a.onStartSearching(),
                    a.post) {
                        var d = a.buildAjaxPostParams() || {};
                        d.keyword = b;
                        Ajax.post(c, d, !1, {
                            onready: function(b) {
                                a.onEndSearching();
                                a._processCallBack(a, b)
                            }
                        })
                    } else
                        Ajax.get(c, {
                            keyword: b
                        }, {
                            onready: function(b) {
                                a.onEndSearching();
                                a._processCallBack(a, b)
                            }
                        })
            }
        }
    }
    ;
    this._processCallBack = function(a, b) {
        for (; a._dom_list.hasChildNodes(); )
            a._dom_list.removeChild(a._dom_list.firstChild);
        if (null != b && "" != b && "[]" != b) {
            b = eval("(" + b + ")");
            a._listItems = [];
            if (1 == b.length && a._value == a.loadResultValue(b[0]))
                return a._hideDropDown(),
                a._searching = !1,
                a._dom_field.className = "",
                !1;
            a._buildDropDown(a, b);
            a._showDropDown()
        } else
            a._hideDropDown();
        a._searching = !1;
        Class(a._dom_field, "wait", !0);
        return !0
    }
    ;
    this._buildDropDown = function(a, b) {
        for (var c = 0; c < b.length; c++) {
            var d = a._dom_list.insertRow(a._dom_list.rows.length).insertCell(0)
              , e = document.createElement("A");
            e.href = "javascript:void(false);";
            a.bindResult(e, b[c]);
            e.addEventListener ? e.addEventListener("click", a._bind(a._itemClick, a), !1) : e.attachEvent("onclick", a._bindIE(a._itemClickIE, a, c));
            a._listItems.push(e);
            d.appendChild(e)
        }
    }
    ;
    this._itemClick = function(a, b) {
        if (a.className && "more" === a.className)
            return !1;
        b._setValue(b.loadItemValue(a, !0));
        b._hideDropDown();
        return !1
    }
    ;
    this._itemClickIE = function(a, b) {
        if ((a = b._listItems[a]) && a.className && "more" === a.className)
            return !1;
        b._setValue(b.loadItemValue(a, !0));
        b._hideDropDown();
        return !1
    }
    ;
    this._suppressSubmit = function(a, b, c) {
        b.onTyping(a);
        return !0
    }
    ;
    this._trackArrow = function(a, b, c) {
        c = c || window.event;
        a = c.keyCode;
        c.charCode && 0 === a && (a = c.charCode);
        if (b._listItems && 0 < b._listItems.length)
            switch (a) {
            case 40:
                c.preventDefault && c.preventDefault();
                -1 !== b._dropDownListIndex && b._listItems[b._dropDownListIndex] && (b._listItems[b._dropDownListIndex].className = "");
                b._dropDownListIndex < b._listItems.length - 1 ? ++b._dropDownListIndex : b._dropDownListIndex = 0;
                c = b._listItems[b._dropDownListIndex];
                "more" == c.className && (b._dropDownListIndex = 0,
                c = b._listItems[b._dropDownListIndex]);
                b._setValue(b.loadItemValue(c, !1));
                c.className = "selected";
                b._preventLostFocus = !0;
                b._trackScrolledVisibility(c, b);
                break;
            case 38:
                c.preventDefault && c.preventDefault();
                -1 !== b._dropDownListIndex && b._listItems[b._dropDownListIndex] && (b._listItems[b._dropDownListIndex].className = "");
                0 >= b._dropDownListIndex ? b._dropDownListIndex = b._listItems.length - 1 : --b._dropDownListIndex;
                -1 !== b._dropDownListIndex && b._listItems[b._dropDownListIndex] && (c = b._listItems[b._dropDownListIndex],
                "more" == c.className && (b._dropDownListIndex = b._listItems.length - 2,
                c = b._listItems[b._dropDownListIndex]),
                b._setValue(b.loadItemValue(c, !1)),
                c.className = "selected",
                b._trackScrolledVisibility(c, b));
                break;
            case 13:
            case 32:
            case 0:
                return b._hideDropDown(),
                !1;
            case 27:
                return b._dom_field.focus(),
                b._hideDropDown(),
                !1;
            case 8:
                return b._dom_field.focus(),
                b._dom_field.value = b._dom_field.value.substring(0, b._dom_field.value.length),
                b._searching || b._searchCall || (setTimeout(function() {
                    b._searchByKeyword(b)
                }, 500),
                b._searchCall = !0),
                !1
            }
        return !0
    }
    ;
    this._trackScrolledVisibility = function(a, b) {
        if (a) {
            a = a.parentNode.parentNode;
            var c = a.parentNode.parentNode.parentNode;
            c && a.offsetTop + a.offsetHeight > c.scrollTop + c.offsetHeight && (b = b._listItems[b._dropDownListIndex + 1],
            c.scrollTop = b && "more" == b.className ? a.offsetTop + a.offsetHeight - c.offsetHeight + b.parentNode.parentNode.offsetHeight : a.offsetTop + a.offsetHeight - c.offsetHeight);
            c && a.offsetTop < c.scrollTop && (c.scrollTop = a.offsetTop)
        }
    }
}
function searchTips(a, b) {
    var c = this, d, e;
    var f = a.offsetHeight || 35;
    this.hide = function() {
        Class(g, "active", !0);
        d = null
    }
    ;
    this.render = function(b) {
        var d = JSON.parse(b);
        b = d.length;
        g.innerHTML = "";
        if (0 < b) {
            Class(g, "active");
            for (var e = 0; e < b; e++)
                (function(b) {
                    var e = document.createElement("li")
                      , f = d[b];
                    e.className = "search-tips__item";
                    e.innerText = f;
                    g.appendChild(e);
                    Core.AddHandler(e, "click", function() {
                        a.value = f;
                        c.hide()
                    })
                }
                )(e)
        } else
            c.hide()
    }
    ;
    this.search = function(f) {
        f = f || window.event;
        var l = a.value
          , h = f.keyCode || f.which;
        if (2 < l.length && 40 !== h && 38 !== h && 13 !== h && 39 !== h && 37 !== h)
            clearTimeout(e),
            e = setTimeout(function() {
                Ajax.get(b, {
                    keyword: l
                }, {
                    onready: c.render
                })
            }, 1E3);
        else if (f.preventDefault(),
        40 !== h || d)
            if (40 === h) {
                if (f = d.nextSibling)
                    Class(d, "active", !0),
                    Class(f, "active"),
                    d = f
            } else if (38 === h && d) {
                if (f = d.previousSibling)
                    Class(d, "active", !0),
                    Class(f, "active"),
                    d = f
            } else
                13 === h && d && (a.value = d.innerHTML),
                c.hide();
        else
            (d = g.firstChild) && Class(d, "active")
    }
    ;
    var g = document.createElement("ul");
    g.className = "search-tips__result";
    Class(a, "search-tips__node");
    g.style.top = f - 1 + "px";
    a.parentNode.style.position = "relative";
    a.parentNode.appendChild(g);
    Core.AddHandler(a, "keyup", c.search);
    Core.AddHandler(a, "focus", c.search);
    Core.AddHandler(a, "blur", function() {
        setTimeout(c.hide, 200)
    })
}
function Searchbox() {
    this.multiselect_separator = ",";
    var a = this;
    this.AjaxEnabled = !0;
    this.OnRenderResults = function(a) {
        return !0
    }
    ;
    this.OnRenderElement = void 0;
    this.OnSelectResult = function(a) {
        return !0
    }
    ;
    this.ShowHide = function() {
        var a = $("searchBoxContainer");
        if (!a)
            return !0;
        if ("searchBoxContainer" == a.className)
            return a.className = "searchBoxContainer open",
            !1;
        alert("need submit");
        a.className = "searchBoxContainer";
        return !0
    }
    ;
    this.Render = function(b, c, d, e, f, g) {
        (oldIEelement = $(c)) && oldIEelement.parentNode.removeChild(oldIEelement);
        this.requestURL = f;
        this.container = $(b);
        b = document.createElement("div");
        b.className = "searchbox";
        this.container.style.position = "relative";
        this.input = document.createElement("input");
        this.input.type = "text";
        this.input.id = c;
        this.input.name = c;
        this.input.value = d;
        this.input.title = g;
        this.input.className = "input";
        this.input.style.width = "100%";
        this.input.setAttribute("autocomplete", "off");
        this.input.onkeyup = this.OnKeyPress;
        this.input.onkeydown = this.OnKeyDown;
        b.appendChild(this.input);
        this.container.appendChild(b);
        this.Multiselect = e;
        this.input.onblur = function() {
            var b = this;
            b.focused = !1;
            window.setTimeout(function() {
                b.focused || (a.ResultsPanel.Hide(),
                "" == b.value && a.ShowHelpText())
            }, 10)
        }
        ;
        this.input.onfocus = function() {
            this.focused = !0;
            a.HideHelpText()
        }
        ;
        this.HelpText = createElement(null, "div", {
            className: "searchboxHelpText"
        });
        this.HelpText.style.position = "absolute";
        this.HelpText.style.top = "1px";
        this.HelpText.style.color = "#626363";
        this.HelpText.style.padding = "2px";
        this.HelpText.style.lineHeight = "15px";
        this.HelpText.innerHTML = g;
        this.container.appendChild(this.HelpText);
        this.HelpText.onclick = this.HideHelpText;
        this.HelpText.onscreen = !0;
        this.HelpText.style.display = "none";
        "" == this.input.value && (this.HelpText.style.display = "")
    }
    ;
    this.HideHelpText = function() {
        if (a.input.disabled)
            return !1;
        a.HelpText.onscreen && (a.HelpText.style.display = "none");
        a.HelpText.onscreen = !1;
        a.input.focus()
    }
    ;
    this.ShowHelpText = function() {
        a.HelpText.onscreen || (a.HelpText.style.display = "");
        a.HelpText.onscreen = !0
    }
    ;
    this.PressTimeout = null;
    this.SendAjaxDelay = 500;
    this.OnKeyPress = function(b) {
        a.PressTimeout && clearTimeout(a.PressTimeout);
        b || (b = window.event);
        if (13 == b.keyCode && 0 <= a.ResultsPanel.SelectedResult) {
            if (0 == a.ResultsPanel.ResultsInDom())
                return !0;
            a.ResultsPanel.Hide();
            a.OnSelectResult && a.OnSelectResult(eval(a.JSON)[a.ResultsPanel.SelectedResult]);
            return !1
        }
        if (40 == b.keyCode || 38 == b.keyCode)
            return !1;
        1 < a.GetValue().length && 1 == a.AjaxEnabled ? a.PressTimeout = setTimeout(function() {
            var b = a.GetValue();
            Ajax.get(a.requestURL, {
                keyword: b
            }, {
                onready: a.SearchCallBack
            })
        }, a.SendAjaxDelay) : a.ResultsPanel.Hide();
        return !0
    }
    ;
    a.OnKeyDown = function(b) {
        b || (b = window.event);
        if (13 == b.keyCode) {
            if (0 == a.ResultsPanel.ResultsInDom())
                return !0;
            a.OnSelectResult && a.OnSelectResult(eval(a.JSON)[a.ResultsPanel.SelectedResult]);
            return a.ResultsPanel.Hide()
        }
        return 40 == b.keyCode ? (a.ResultsPanel.SelectedResult += 1,
        a.MoveCursor(!0),
        !1) : 38 == b.keyCode && 0 <= a.ResultsPanel.SelectedResult ? (--a.ResultsPanel.SelectedResult,
        a.MoveCursor(!0),
        !1) : !0
    }
    ;
    this.ResultsPanel = function() {}
    ;
    this.ResultsPanel.ID = "searchboxResultsPanel";
    this.ResultsPanel.ResultsInDom = function() {
        return null != $(a.ResultsPanel.ID)
    }
    ;
    this.ResultsPanel.SelectedResult = -1;
    this.ResultsPanel.OnClick = function(b) {
        b = b || window.event;
        b.target || (b.target = b.srcElement);
        b.target && a.SetValue(b.target.login);
        a.ResultsPanel.Hide();
        a.OnSelectResult && a.OnSelectResult(eval(a.JSON)[a.ResultsPanel.SelectedResult])
    }
    ;
    this.ResultsPanel.RenderResults = function() {
        var b = eval(a.JSON);
        a.ResultsPanel.SelectedResult = -1;
        if (b && 0 != b.length && a.input.focused) {
            if (0 == a.ResultsPanel.ResultsInDom()) {
                a.ResultsPanel.panel = document.createElement("div");
                a.ResultsPanel.panel.style.backgroundColor = "#FFFFFF";
                a.ResultsPanel.panel.id = a.ResultsPanel.ID;
                a.ResultsPanel.panel.style.position = "absolute";
                var c = getOffsetRect(a.container);
                a.ResultsPanel.panel.style.top = c.top + (a.container.clientHeight || 20) - 3 + "px";
                a.ResultsPanel.panel.style.left = c.left + "px";
                a.ResultsPanel.panel.style.minWidth = a.container.offsetWidth + "px";
                a.ResultsPanel.panel.style.zIndex = 3001;
                a.ResultsPanel.panel.style.cursor = "default";
                a.ResultsPanel.panelBox = document.createElement("div");
                a.ResultsPanel.panelBox.style.border = "solid 1px #000000";
                a.ResultsPanel.panelBox.style.color = "#000000";
                a.ResultsPanel.panel.appendChild(a.ResultsPanel.panelBox);
                document.body.appendChild(a.ResultsPanel.panel)
            }
            a.ResultsPanel.panelBox.innerHTML = "";
            if (1 == b.length && b[0].Login == a.GetValue())
                a.ResultsPanel.SelectedResult = -1,
                a.SetValue(b[0].Login),
                a.ResultsPanel.Hide();
            else
                for (var d in b)
                    b.hasOwnProperty(d) && (a.OnRenderElement ? c = a.OnRenderElement(b[d]) : (c = document.createElement("div"),
                    c.innerHTML = encodeHtml(b[d].Login + (b[d].Name && "" != b[d].Name ? " (" + b[d].Name + ")" : "")),
                    c.style.padding = "2px",
                    c.login = b[d].Login,
                    c.number = d,
                    c.style.cursor = "default",
                    c.style.zIndex = 101,
                    c.onmouseover = a.HoverResult,
                    c.onclick = a.ResultsPanel.OnClick,
                    c.onmousedown = function() {
                        setTimeout(function() {
                            a.input.focus()
                        }, 0)
                    }
                    ),
                    c && a.ResultsPanel.panelBox.appendChild(c))
        } else
            a.ResultsPanel.Hide()
    }
    ;
    this.ResultsPanel.Hide = function() {
        a.OnRenderResults("[]");
        1 == a.ResultsPanel.ResultsInDom() && (a.OnSelectResult && 0 <= a.ResultsPanel.SelectedResult && a.OnSelectResult(eval(a.JSON)[a.ResultsPanel.SelectedResult]),
        a.ResultsPanel.panel.parentNode.removeChild(a.ResultsPanel.panel));
        return !1
    }
    ;
    this.HoverResult = function(b) {
        b || (b = window.event);
        var c = b.toElement;
        c || (c = b.currentTarget);
        a.ResultsPanel.SelectedResult = c.number;
        a.MoveCursor(!1)
    }
    ;
    this.SearchCallBack = function(b) {
        a.JSON = b;
        a.OnRenderResults(b) && a.ResultsPanel.RenderResults()
    }
    ;
    this.MoveCursor = function(b) {
        var c = a.ResultsPanel.panelBox.childNodes
          , d = c.length;
        a.ResultsPanel.SelectedResult >= d && (a.ResultsPanel.SelectedResult = 0);
        0 > a.ResultsPanel.SelectedResult && 0 < d && (a.ResultsPanel.SelectedResult = d - 1);
        0 == d && (a.ResultsPanel.SelectedResult = -1);
        for (var e in c)
            c[e].style && (c[e].style.backgroundColor = "#FFFFFF",
            c[e].style.color = "#000",
            c[e].number == a.ResultsPanel.SelectedResult && (c[e].style.backgroundColor = "Highlight",
            c[e].style.color = "#FFF",
            b && a.SetValue(c[e].login)))
    }
    ;
    this.SetValue = function(b) {
        b && 0 < b.length && this.HideHelpText();
        if (a.Multiselect) {
            var c = a.input.value.substring(0, a.input.value.lastIndexOf(a.multiselect_separator));
            a.input.value = c + ("" == c ? "" : a.multiselect_separator) + b
        } else
            a.input.value = b
    }
    ;
    this.GetValue = function() {
        if (!a.Multiselect)
            return a.input.value;
        var b = a.input.value;
        return b.substring(b.lastIndexOf(a.multiselect_separator) + 1)
    }
}
function UserLinkMenu() {
    var a = null
      , b = null
      , c = null
      , d = null
      , e = this;
    this.Init = function() {
        if (a = $("userLinkMenu"))
            if (b = $("userLinkContainer"))
                if (c = $("userlink"),
                !Core.IsTouchDevice())
                    null != b && (b.onmouseover = function() {
                        e.Show()
                    }
                    ,
                    b.onmouseout = function() {
                        e.Hide()
                    }
                    );
                else if (void 0 == $("sidebarToggleButton")) {
                    null != c && (c.onclick = function() {
                        e.Show();
                        return !1
                    }
                    );
                    a.onmousedown = function(a) {
                        Core.StopProp(a);
                        Core.PreventSelection()
                    }
                    ;
                    a.onclick = function(a) {
                        Core.StopProp(a)
                    }
                    ;
                    d = document.createElement("input");
                    d.type = "checkbox";
                    d.className = "blurHandler";
                    d.onblur = function() {
                        e.Hide()
                    }
                    ;
                    a.appendChild(d);
                    var f = a.getElementsByTagName("a"), g;
                    for (g in f)
                        f[g].onmousedown = function(a) {
                            a = a || window.event;
                            Core.StopProp(a);
                            a.preventDefault && a.preventDefault()
                        }
                }
    }
    ;
    this.Show = function() {
        a.className = "userLinkMenu hovered";
        null != d && window.setTimeout(function() {
            d.focus()
        }, 10)
    }
    ;
    this.Hide = function() {
        a.className = "userLinkMenu"
    }
    ;
    mqGlobal.AddOnReady(function() {
        e.Init()
    })
}
function HotKeysClass() {
    function a(a, b, c, g, l) {
        var d = b ? !0 : !1
          , e = c ? !0 : !1
          , f = g ? !0 : !1;
        this.IsPressed = function(b) {
            b = b || window.event;
            var c = b ? b.keyCode : b.which;
            var h = b.shiftKey ? !0 : !1;
            var g = b.ctrlKey ? !0 : !1;
            b = b.altKey ? !0 : !1;
            return c == a && d == h && e == g && f == b
        }
        ;
        this.ExecCallback = function(a) {
            return l ? l(a) : !0
        }
    }
    var b = []
      , c = window.document.onkeydown;
    window.document.onkeydown = function(a) {
        for (var d = 0; d < b.length; d++)
            if (b[d].IsPressed(a) && 0 == b[d].ExecCallback(a))
                return !1;
        c && c(arguments)
    }
    ;
    this.Add = function(c, e, f, g, l) {
        b.push(new a(c,f,g,l,e))
    }
}
var HotKeys = new HotKeysClass;
function SearchBoxContainer() {
    var a = !1, b = !1, c, d, e, f, g = this;
    this.Init = function() {
        e = $("searchBoxContainer");
        d = $("keyword");
        f = $("searchSubmit");
        c = $("main_search_form");
        null != e && null != d && null != f && null != c && (void 0 != e.className && 0 <= e.className.indexOf("open") && (b = a = !0),
        b || (d.onblur = function() {
            SearchBoxContainer.Hide(null, !0)
        }
        ,
        d.onkeydown = function(a) {
            27 == (a || window.event).keyCode && (SearchBoxContainer.Hide(null, !0),
            this.blur())
        }
        ,
        e.onclick = function() {
            SearchBoxContainer.Show(null, !0)
        }
        ,
        f.onmouseout = function(a) {
            Core.StopProp(a)
        }
        ,
        f.onmousedown = function(b) {
            a && (Core.StopProp(b),
            b.preventDefault && b.preventDefault())
        }
        ),
        f.onclick = function(b) {
            if (a)
                if (Core.StopProp(b),
                b.preventDefault && b.preventDefault(),
                c.onsubmit)
                    c.onsubmit();
                else
                    c.submit()
        }
        ,
        Core.IsTouchDevice() || b || (e.onmouseover = function() {
            SearchBoxContainer.Show(null, !1)
        }
        ,
        e.onmouseout = function() {
            SearchBoxContainer.Hide(null, !1)
        }
        ))
    }
    ;
    this.ShowHide = function() {
        a ? this.Hide(e, !0) : this.Show(e, !0);
        return !1
    }
    ;
    this.Show = function(b, c) {
        b = b || e;
        if (!b)
            return !1;
        b.className = "searchBoxContainer open";
        $("privateAreaMessages") && ($("privateAreaMessages").style.display = "none");
        $("langMenuContainer") && ($("langMenuContainer").style.display = "none");
        $("loginRegisterButtons") && ($("loginRegisterButtons").style.display = "none");
        $("profile") && ($("profile").style.display = "none");
        if (c || Core.IsTouchDevice())
            a = !0,
            d.focus();
        return !1
    }
    ;
    this.Hide = function(b, c) {
        if (!c && a)
            return !1;
        b = b || e;
        if (!b)
            return !1;
        b.className = "searchBoxContainer";
        c && (a = !1);
        $("privateAreaMessages") && ($("privateAreaMessages").style.display = "inline-block");
        $("langMenuContainer") && ($("langMenuContainer").style.display = "inline-block");
        $("loginRegisterButtons") && ($("loginRegisterButtons").style.display = "inline-block");
        $("profile") && ($("profile").style.display = "inline-block");
        return !1
    }
    ;
    mqGlobal.AddOnReady(function() {
        g.Init();
        HotKeys.Add(112, function(a) {
            g.ShowHide()
        })
    })
}
SearchBoxContainer = new SearchBoxContainer;
function MoveComments() {
    function a() {
        var a = $("content" + d);
        if (!a)
            return null;
        a = a.getElementsByTagName("P");
        for (var b in a)
            if (void 0 != a[b].innerHTML && 10 < a[b].innerHTML.length && 64 > a[b].innerHTML.length && 0 > a[b].innerHTML.indexOf(".") && 0 > a[b].innerHTML.indexOf("<") && 0 > a[b].innerHTML.indexOf(">") && 10 < a[b].innerHTML.indexOf("?"))
                return a[b].innerHTML;
        return null
    }
    function b(a, b) {
        var c = $("content" + d);
        if (c) {
            c = c.parentNode.parentNode;
            var e = c.parentNode.childNodes;
            c.style.borderTop = a ? "medium none" : "2px dashed #6982AE";
            c.style.marginTop = a ? "0px" : "-2px";
            var f = !1, h = 0, g;
            for (g in e) {
                if (b && 0 < b && h >= b)
                    break;
                e[g] == c && (f = !0);
                !f || void 0 == e[g].className || 0 > e[g].className.indexOf("comment") || (e[g].style.backgroundColor = a ? "" : "#F6F8FD",
                h++)
            }
            a || b ? (a = $("followingCommentsLabel")) && c.parentNode.removeChild(a) : (a = document.createElement("div"),
            a.id = "followingCommentsLabel",
            window.move_comments_show_following_label ? (a.innerHTML = window.move_comments_following_label_title,
            a.style.backgroundColor = "#F6F8FD",
            a.style.position = "relative",
            a.style.fontSize = "16px",
            a.style.textAlign = "center",
            a.style.padding = "10px",
            a.style.borderBottom = "1px dashed #6982AE",
            a.style.borderTop = "1px dashed #6982AE",
            a.style.marginTop = "-1px",
            a.style.color = "#6982AE") : (a.style.backgroundColor = "#FFF",
            a.style.position = "relative",
            a.style.borderTop = "2px dashed #6982AE",
            a.style.marginTop = "-2px",
            a.style.height = "0px"),
            c.parentNode.appendChild(a))
        }
    }
    var c, d, e, f, g = !1, l = this;
    this.ShowForm = function(m, h, p) {
        if (g)
            return !1;
        var t = $("moveComments_window")
          , n = $("moveComments_newTopicName")
          , r = $("existing_only_one")
          , q = $("new_only_one");
        t && (c = {
            firstCommentId: m,
            categoryId: 0,
            newTopicTitle: null
        },
        q.checked = r.checked = p ? null : !0,
        f = p ? 1 : 0,
        d = m,
        e = h,
        b(!1, f),
        n.value = a(),
        g = !0,
        t.style.display = "",
        Dialog.show(window.move_comments_title, t, 500, 142, l.CloseForm),
        n.focus());
        return !1
    }
    ;
    this.CloseForm = function() {
        var a = $("moveComments_window");
        a && (b(!0),
        g = !1,
        a.style.display = "none",
        Dialog.hide())
    }
    ;
    this.SendForm = function(a) {
        if (!$("moveComments_window"))
            return !1;
        c.newTopicTitle = $("moveComments_newTopicName").value;
        c.categoryId = $("moveComments_categoryId").value;
        c.count = f;
        c.__signature = a;
        if ("" == c.newTopicTitle || 0 == c.categoryId)
            return !1;
        Ajax.post("/" + e + "/forum/movecomments", c, !1, {
            onready: function(a) {
                a = eval("(" + a + ")");
                null != a && void 0 != a.Url && null != a.Url ? (l.CloseForm(),
                window.location.href = a.Url) : (alert("error"),
                l.CloseForm());
                window.location.reload();
                return !1
            },
            onerror: function() {
                alert("error");
                l.CloseForm();
                window.location.reload()
            }
        });
        return !1
    }
    ;
    this.SendFormExisting = function(a) {
        if (!$("moveComments_window"))
            return !1;
        c.topicId = $("existing_topic_id").value;
        c.__signature = a;
        c.count = f;
        if (!c.topicId)
            return !1;
        Ajax.post("/" + e + "/forum/movecomments_existing", c, !1, {
            onready: function(a) {
                a = eval("(" + a + ")");
                null != a && void 0 != a.Url && null != a.Url ? (l.CloseForm(),
                window.location.href = a.Url) : (alert("error"),
                l.CloseForm());
                window.location.reload();
                return !1
            },
            onerror: function() {
                alert("error");
                l.CloseForm();
                window.location.reload()
            }
        });
        return !1
    }
    ;
    this.OnOnlyOneChanged = function(a) {
        var c = $("existing_only_one");
        c && (c.checked = a.checked);
        if (c = $("new_only_one"))
            c.checked = a.checked;
        f = a.checked ? 0 : 1;
        b(!0);
        b(!1, f)
    }
}
function MoveTopic() {
    var a, b, c = !1;
    this.ShowForm = function(d, e) {
        if (c)
            return !1;
        var f = $("moveTopic_window");
        f && (a = {
            topicId: d,
            categoryId: 0
        },
        b = e,
        c = !0,
        f.style.display = "",
        Dialog.show(window.move_topic_title, f, 500, 142, MoveTopic.CloseForm));
        return !1
    }
    ;
    this.CloseForm = function() {
        var a = $("moveTopic_window");
        a && (c = !1,
        a.style.display = "none",
        Dialog.hide())
    }
    ;
    this.SendForm = function(c) {
        if (!$("moveTopic_window"))
            return !1;
        a.categoryId = +$("moveTopic_categoryId").value;
        a.__signature = c;
        if (1 > a.categoryId)
            return !1;
        Ajax.post("/" + b + "/forum/movetopic", a, !1, {
            onready: function(a) {
                a = eval("(" + a + ")");
                null != a && void 0 != a.Url && null != a.Url ? (MoveTopic.CloseForm(),
                window.location = a.Url) : (alert("error"),
                MoveTopic.CloseForm(),
                window.location.reload());
                return !1
            },
            onerror: function() {
                alert("error");
                MoveTopic.CloseForm();
                window.location.reload()
            }
        });
        return !1
    }
}
MoveTopic = new MoveTopic;
function showComplaintForm(a, b, c, d, e) {
    var f = $("complaint_window");
    if (f) {
        var g = $("complaint_reason");
        f.style.display = "";
        f.complaintData = {
            moduleID: b,
            typeID: c,
            parentModuleID: d,
            itemID: a,
            __signature: e
        };
        Dialog.show(g ? g.title : null, f, 500, 160, CloseComplaintForm, null, null, " ui no-bottom-margin", !1, "fixed");
        CalculateFieldLength($("complaint_reason"), "complaint_char_counter", 3, 150, 500 == $("complaint_reason_select").value)
    }
}
function CloseComplaintForm() {
    RefreshComplaintForm();
    var a = $("complaint_window")
      , b = $("complaint_reason");
    b && (b.value = "");
    a && (a.style.display = "none");
    Dialog.hide()
}
function ComplainCallback(a) {
    "success" == eval(a) ? CloseComplaintForm() : $("complaint_error").style.display = ""
}
function SendComplaint() {
    RefreshComplaintForm();
    var a = $("complaint_window");
    if (a) {
        a = a.complaintData;
        var b = document.getElementById("complaint_reason_select").value;
        if (500 == b && !window.Validate($("complaintForm")))
            return !1;
        var c = $("complaint_reason");
        c && (a.reason = c.value,
        a.reasonID = b,
        Ajax.post("/complaint/new", a, !1, {
            onready: ComplainCallback,
            onerror: ComplainCallback
        }))
    }
}
function RefreshComplaintForm() {
    var a = $("complaint_info").childNodes, b;
    for (b in a)
        a[b] && "field-validation-error" == a[b].className && "complaint_error" != a[b].id && (a[b].innerHTML = "");
    $("complaint_reason").className = null;
    $("complaint_error").style.display = "none"
}
function CalculateFieldLength(a, b, c, d, e) {
    var f = !0;
    e || (d = c = 0);
    $(b).innerHTML = a.value.length + "/" + d;
    a.value.length > d || a.value.length < c ? (Class($(b).parentNode, "field-validation-error"),
    f = !1) : Class($(b).parentNode, "field-validation-error", !0);
    return f
}
var Tabs = function() {
    this.TabsList = [];
    var a = !1
      , b = !1
      , c = !1
      , d = this;
    this.Create = function(e, f, g, l, m) {
        a = l;
        b = m;
        c = g;
        for (m = 0; m < e.length; m++) {
            var h = $(e[m].content_id);
            l = $(e[m].tab_id);
            var p = e[m].tag;
            if (h && l) {
                e[m].selected ? (Class(h, "selected"),
                Class(l, "selected"),
                f && f(l)) : (Class(h, "selected", !0),
                Class(l, "selected", !0));
                p = {
                    tab: l,
                    tab_content: h,
                    tag: p
                };
                Core.AddHandler(l, "click", function(a) {
                    a = a || window.event;
                    a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                    var b = this;
                    for (a = 0; a < d.TabsList.length; a++)
                        if (d.TabsList[a].tab == b) {
                            d._selectedTab = d.TabsList[a].tag || d.TabsList[a].tab.id;
                            break
                        }
                    g ? d.SelectVerticalTab(b) : d.SelectTab(b);
                    f && setTimeout(function() {
                        f(b)
                    }, 0);
                    return !1
                });
                Class(l.parentNode, "vertical", !g);
                if (g) {
                    var t = createElement(null, "span", {
                        className: "rowBullet"
                    });
                    p.bullet = t;
                    var n = createElement(null, "li", {
                        className: "tab_content"
                    });
                    h.id && (n.id = "tab_" + h.id);
                    n.appendChild(h);
                    insertAfter(l.parentNode, n, l);
                    n.style.height = "auto";
                    prependElement(l, t)
                }
                d.TabsList.push(p)
            }
        }
        if (l = window.hashParams.Get("tab")) {
            var r = $(l);
            if (r) {
                if (l == d._selectedTab)
                    return;
                g ? d.SelectVerticalTab(r) : d.SelectTab(r);
                f && setTimeout(function() {
                    f(r)
                }, 0)
            }
        }
        if (e = window.hashParams.Get("id"))
            if (e = $(e)) {
                var q = window.scrollY + e.getBoundingClientRect().top;
                setTimeout(function() {
                    window.scrollTo(0, q)
                }, 1E3)
            }
        window.onhashchange = function() {
            var a = window.hashParams.Get("tab");
            if (!/^\#edit_\w+$/.test(document.location.hash) && (a || (a = d.TabsList[0].tag),
            a != d._selectedTab))
                for (var b = 0; b < d.TabsList.length; b++)
                    if (d.TabsList[b].tag == a) {
                        d.SelectTab(d.TabsList[b].tab);
                        d._selectedTab = a;
                        break
                    }
        }
    }
    ;
    this.SelectVerticalTab = function(c) {
        for (var e = null, g = 0; g < d.TabsList.length; g++)
            if (!a || d.TabsList[g].tab.id == c.id) {
                var l = d.TabsList[g].tab_content.parentNode
                  , m = 0 <= d.TabsList[g].tab.className.indexOf("selected");
                Class(d.TabsList[g].tab_content, "selected", !1);
                d.TabsList[g].tab.id != c.id || m ? m ? (animate(l, "height", "px", l.clientHeight || l.offsetHeight, 0, 0, 500, 50, 1.7, null),
                Class(d.TabsList[g].tab, "selected", !0)) : l.style.height = "0px" : (Class(d.TabsList[g].tab, "selected", !1),
                animate(l, "height", "px", 0, l.scrollHeight, 0, 500, 50, 1.7, .5),
                e = l)
            }
        b && e && setTimeout(function() {
            e && e.style.height == e.scrollHeight + "px" && (e.style.height = "auto")
        }, 600)
    }
    ;
    this.SelectTab = function(a) {
        if (c)
            return this.SelectVerticalTab(a);
        if (-1 == a.className.indexOf("add_lang"))
            for (var b = 0; b < d.TabsList.length; b++) {
                var e = -1 < d.TabsList[b].tab.className.indexOf("add_lang");
                d.TabsList[b].tab.id == a.id ? (Class(d.TabsList[b].tab_content, "selected", !1),
                window.hashParams.Set("tab", d.TabsList[b].tab.id)) : Class(d.TabsList[b].tab_content, "selected", !0);
                Class(d.TabsList[b].tab, "selected", d.TabsList[b].tab.id != a.id);
                1 == e && Class(d.TabsList[b].tab, "add_lang")
            }
    }
    ;
    this.FitVerticalTabsHeight = function() {
        for (var a = 0; a < d.TabsList.length; a++)
            if (!(0 > d.TabsList[a].tab.className.indexOf("selected"))) {
                var b = d.TabsList[a].tab_content.parentNode;
                b && b.style.height != b.scrollHeight + "px" && (b.style.height = "auto")
            }
    }
};
function LinkatorSelectAll() {
    for (var a = 0, b = document.getElementsByTagName("INPUT"), c = b.length - 1; 0 <= c; c--)
        null != b[c] && void 0 != b[c] && "checkbox" == b[c].type && "checkbox" == b[c].className && (0 == a && (a = b[c].checked ? 2 : 1),
        b[c].checked = 2 == a ? "" : "checked")
}
var SliderBar = function(a, b, c) {
    function d(a) {
        if (u) {
            a.preventDefault();
            a.stopPropagation();
            m();
            var b = a.changedTouches[0].pageX - N;
            a = a.target;
            var c = W + b;
            0 < a.className.indexOf("right") ? c >= t ? F.value = E : c - n <= parseInt(B.style.left) || (c > -n / 2 && (v.style.width = c - parseInt(v.style.left) + n / 2 + "px",
            a.style.left = c + "px"),
            b = Math.round(c * I / t) + H,
            1 < J && (b = Math.round(b / J) * J),
            b > E && (b = E),
            b < A.value && (b = A.value),
            F.value = b) : c <= -n / 2 ? A.value = H : c + n / 2 >= parseInt(z.style.left) || (c > -n / 2 && (v.style.left = c + "px",
            v.style.width = Z - b + n / 2 + "px",
            B.style.left = c - n / 2 + "px"),
            b = Math.round(c * I / t) + H,
            1 < J && (b = Math.round(b / J) * J),
            b < H && (b = H),
            b > F.value && (b = F.value),
            A.value = b)
        }
    }
    function e(a) {
        var b = a.target;
        a.preventDefault();
        a.stopPropagation();
        u = !0;
        N = a.changedTouches[0].pageX;
        W = parseInt(b.style.left)
    }
    function f(a) {
        if (q) {
            m();
            a = (window.event ? window.event : a).clientX - w.offsetLeft - r;
            a < -n / 2 ? a = -n / 2 : a > t + n / 2 && (a = t + n / 2);
            var b = parseInt(v.style.left, 0)
              , c = b + parseInt(v.style.width, 0)
              , d = b + (c - b) / 2;
            b > c && (b = c);
            0 > D && (D = a < d ? 1 : 0);
            1 == D ? (c - a > n && (v.style.left = a + "px",
            v.style.width = c - a + "px",
            B.style.left = a - n / 2 + "px"),
            a = Math.round((a + 7.5) * I / t) + H,
            1 < J && (a = Math.round(a / J) * J),
            a < H && (a = H),
            a > F.value && (a = F.value),
            A.value = a) : (a - b > n && (v.style.width = a - b + "px",
            z.style.left = a - n / 2 + "px"),
            a = Math.round((a - n / 2) * I / t) + H,
            1 < J && (a = Math.round(a / J) * J),
            a > E && (a = E),
            a < A.value && (a = A.value),
            F.value = a)
        }
    }
    function g(a) {
        u = q = !1
    }
    function l(a, b, c) {
        a.attachEvent ? a.attachEvent("on" + b, c) : a.addEventListener && a.addEventListener(b, c, !1)
    }
    function m() {
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection && document.selection.clear && document.selection.clear()
    }
    function h(a, b) {
        w = document.getElementById(b + "Bar");
        v = document.getElementById(b + "BarRange");
        B = document.getElementById(b + "HandleLeft");
        z = document.getElementById(b + "HandleRight");
        document.getElementById(b + "Label");
        document.getElementById(b + "Input");
        D = -1;
        A = document.getElementById(b + "From");
        F = document.getElementById(b + "To");
        H = filters[b][2];
        E = filters[b][3];
        J = filters[b][4];
        Z = v.offsetWidth;
        I = E - H;
        if (G) {
            b = G;
            var c = 0
              , d = 0;
            do
                c += b.offsetLeft,
                d += b.offsetTop,
                b.scrollTop && G != b && (d -= b.scrollTop);
            while (b = b.offsetParent);b = [c, d];
            0 < b[0] && (r = b[0])
        }
        q = !0;
        Core.isMobile.any() || f(a)
    }
    function p(a, b) {
        var c = filters[a][2]
          , d = filters[a][3]
          , e = 5 < filters[a].length ? filters[a][5] : null
          , f = $(a + "BarRange")
          , h = $(a + "HandleLeft")
          , g = $(a + "HandleRight")
          , l = $(a + "From");
        a = $(a + "To");
        var m = +l.value
          , p = +a.value;
        m < c && (m = c);
        m > d && (m = d);
        p < c && (p = c);
        p > d && (p = d);
        m > p && (p = m);
        b && (l.value = m,
        a.value = p);
        d -= c;
        b = Math.round(t * (m - c) / d);
        c = Math.round(t * (p - c) / d);
        b == c && (c += 1);
        m = Math.round(t * (p - m) / d) + n;
        f.style.left = b - n / 2 + "px";
        f.style.width = m + "px";
        h.style.left = b - n + "px";
        g.style.left = c + "px";
        e && (l.setAttribute("onclick", "window.fpush('" + e + "');"),
        a.setAttribute("onclick", "window.fpush('" + e + "');"))
    }
    if ("undefined" != typeof filters) {
        var t = b ? b : 194, n = c ? c : 15, r = 0, q = !1, u = !1, w, v, B, z, D, A, F, H, E, J, I, G, N, W, Z;
        (function() {
            l(window.document, "mousemove", function(a) {
                f(a)
            });
            l(window.document, "mouseup", function() {
                g()
            });
            G = document.getElementById(a);
            for (var b in filters) {
                var c = filters[b][0]
                  , n = filters[b][1]
                  , m = $(b)
                  , t = $(b + "Label")
                  , q = document.createElement("INPUT");
                q.id = b + "From";
                q.name = b + "From";
                try {
                    q.type = "number"
                } catch (P) {
                    q.type = "text"
                }
                q.value = c;
                q.className = "input";
                (function(a) {
                    q.onkeypress = function() {
                        window.setTimeout(function() {
                            p(a, !1)
                        }, 0)
                    }
                    ;
                    q.onchange = function() {
                        p(a, !0)
                    }
                }
                )(b);
                t.appendChild(q);
                c = document.createElement("SPAN");
                c.className = "delimiter";
                c.innerHTML = "&#8212;";
                t.appendChild(c);
                var r = document.createElement("INPUT");
                r.id = b + "To";
                r.name = b + "To";
                try {
                    r.type = "number"
                } catch (P) {
                    r.type = "text"
                }
                r.value = n;
                r.className = "input";
                (function(a) {
                    r.onkeypress = function() {
                        window.setTimeout(function() {
                            p(a, !1)
                        }, 0)
                    }
                    ;
                    r.onchange = function() {
                        p(a, !0)
                    }
                }
                )(b);
                t.appendChild(r);
                var v = document.createElement("DIV");
                v.className = "bar";
                v.id = b + "Bar";
                (function(a) {
                    v.onmousedown = function(b) {
                        h(b, a)
                    }
                }
                )(b);
                m.appendChild(v);
                n = document.createElement("DIV");
                n.className = "selection";
                n.id = b + "BarRange";
                v.appendChild(n);
                var z = document.createElement("DIV");
                z.className = "handle left";
                z.id = b + "HandleLeft";
                v.appendChild(z);
                var u = document.createElement("DIV");
                u.className = "handle right";
                u.id = b + "HandleRight";
                v.appendChild(u);
                p(b, !1);
                Core.isMobile.any() && function(a) {
                    u.addEventListener("touchstart", function(b) {
                        e(b);
                        h(b, a)
                    }, !0);
                    u.addEventListener("touchend", g, !0);
                    u.addEventListener("touchmove", function(a) {
                        d(a)
                    }, !0);
                    z.addEventListener("touchstart", function(b) {
                        e(b);
                        h(b, a)
                    }, !0);
                    z.addEventListener("touchend", g, !0);
                    z.addEventListener("touchmove", function(a) {
                        d(a)
                    }, !0)
                }(b)
            }
        }
        )();
        this.SerializeFilter = function() {
            var a = 0, b = {}, c;
            for (c in filters) {
                var d = filters[c]
                  , e = $(c + "From")
                  , f = $(c + "To")
                  , h = !1;
                e && f && (e = parseInt(e.value),
                e > d[2] && (h = !0,
                b[c + "From"] = e),
                e = parseInt(f.value),
                e < d[3] && (h = !0,
                b[c + "To"] = e),
                h && a++)
            }
            return {
                fields: a,
                json: 0 == a ? null : JSON.stringify(b)
            }
        }
        ;
        this.ResetFilter = function() {
            for (var a in filters) {
                var b = filters[a]
                  , c = $(a + "HandleLeft");
                c && (c.style.left = "-15px");
                if (c = $(a + "HandleRight"))
                    c.style.left = "194px";
                if (c = $(a + "BarRange"))
                    c.style.left = "-7.5px",
                    c.style.width = "209px";
                if (c = $(a + "From"))
                    c.value = b[2];
                if (c = $(a + "To"))
                    c.value = b[3]
            }
        }
        ;
        return this
    }
};
function Gallery(a, b, c, d, e) {
    b || (b = "_switcher");
    var f = [0]
      , g = this.Slider = document.getElementById(a);
    if (g && (a = g.parentNode)) {
        if (e && 700 > (document.body.clientWidth || document.body.offsetWidth)) {
            var l = a.parentNode;
            e = l.parentNode;
            e = (e.clientWidth || e.offsetWidth) - 40 | 0;
            var m = 2 * e / 3 | 0;
            a.style.height = m + "px";
            a.style.width = e + "px";
            l.style.width = e + 20 + "px";
            if (l = g.getElementsByTagName("img"))
                for (var h = 0; h < l.length; h++)
                    l[h].width = e,
                    l[h].height = m
        }
        var p = this.Current = 0
          , t = null
          , n = null;
        if (!this.Slider)
            return null;
        n = this.Slider.children || this.Slider.childNodes;
        var r = 0
          , q = function(a) {
            for (var b = 0, c = 0; c <= a; c++)
                b += f[c];
            return b
        };
        for (e = 0; e < n.length; e++)
            if (0 == n[e].nodeName.indexOf("#"))
                n.splice(e, 1),
                e--;
            else if (p++,
            m = f.length - 1,
            f[f.length] = n[e].offsetWidth,
            l = document.getElementById(n[e].id + b))
                l.shiftIndex = m,
                0 == m && (t = l),
                c || (c = "onclick"),
                l[c] = function() {
                    t = D(t.shiftIndex, this.shiftIndex)
                }
                ;
        if (d) {
            var u = createElement(a, "div", {
                className: "carousel-arrow"
            })
              , w = createElement(a, "div", {
                className: "carousel-arrow"
            });
            Class(u, "left");
            Class(w, "right");
            var v = function(a) {
                1 != a.isHiddenArrow && (fade(a, "in", 200, 20),
                a.style.cursor = "default",
                a.isHiddenArrow = !0)
            }
              , B = 0
              , z = function(a) {
                0 != a.isHiddenArrow && (fade(a, "out", 200, 20),
                a.style.cursor = "pointer",
                a.isHiddenArrow = !1)
            };
            v(u);
            v(w);
            u.onclick = function() {
                t = D(t.shiftIndex, t.shiftIndex - 1);
                0 >= t.shiftIndex && v(u);
                t.shiftIndex < p - 1 && z(w)
            }
            ;
            w.onclick = function() {
                t = D(t.shiftIndex, t.shiftIndex + 1);
                t.shiftIndex >= p - 1 && v(w);
                0 < t.shiftIndex && z(u)
            }
            ;
            a.onmouseover = function() {
                t && (clearTimeout(B),
                B = setTimeout(function() {
                    0 < t.shiftIndex && z(u);
                    t.shiftIndex < p - 1 && z(w)
                }, 100))
            }
            ;
            a.onmouseout = function() {
                t && (clearTimeout(B),
                B = setTimeout(function() {
                    0 < t.shiftIndex && v(u);
                    t.shiftIndex < p - 1 && v(w)
                }, 100))
            }
        }
        var D = function(a, c) {
            var d = a
              , e = document.getElementById(n[a].id + b);
            if (c == d || 0 > a || 0 > c || a > p - 1 || c > p - 1)
                return e;
            a = document.getElementById(n[c].id + b);
            g.style.left && "" != g.style.left || (g.style.left = "0px");
            d = -q(d);
            var f = -q(c);
            animate(g, "left", "px", d, f, r, 300, 60, .7, 0);
            r += 500;
            setTimeout(function() {
                r -= 500
            }, 500);
            e.className = "";
            a.className = "current";
            d = c;
            return a
        }
    }
}
var Mql5Cookie = function() {};
Mql5Cookie.defaultValue = "";
Mql5Cookie.domain = "";
Mql5Cookie.onSyncCallback = void 0;
Mql5Cookie.init = function(a, b, c) {
    Mql5Cookie.defaultValue = b;
    Mql5Cookie.domain = a;
    Mql5Cookie.onSyncCallback = c;
    0 > window.location.hostname.lastIndexOf(".") || Mql5Cookie.checkStorages()
}
;
Mql5Cookie.checkStorages = function() {
    var a = void 0
      , b = Mql5Cookie.localStorage("uniq");
    a || "undefined" == b || (a = b);
    b = Mql5Cookie.sessionStorage("uniq");
    a || "undefined" == b || (a = b);
    b = Mql5Cookie.httpStorage("uniq");
    a || "undefined" == b || (a = b);
    a || (a = Mql5Cookie.defaultValue);
    Mql5Cookie.localStorage("uniq", a);
    Mql5Cookie.sessionStorage("uniq", a);
    Mql5Cookie.httpStorage("uniq", a, {
        expires: new Date(2050,1,1),
        Domain: "." + Mql5Cookie.domain,
        Path: "/"
    });
    if (Mql5Cookie.onSyncCallback)
        Mql5Cookie.onSyncCallback()
}
;
Mql5Cookie.httpStorage = function(a, b, c) {
    if ("undefined" != typeof b) {
        c = c || {};
        var d = c.expires;
        if ("number" == typeof d && d) {
            var e = new Date;
            e.setTime(e.getTime() + 1E3 * d);
            d = c.expires = e
        }
        d && d.toUTCString && (c.expires = d.toUTCString());
        b = encodeURIComponent(b);
        a = a + "=" + b;
        for (var f in c)
            a += "; " + f,
            b = c[f],
            !0 !== b && (a += "=" + b);
        document.cookie = a
    } else
        return (c = document.cookie.match(new RegExp("(?:^|; )" + a.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"))) ? decodeURIComponent(c[1]) : void 0
}
;
Mql5Cookie.localStorage = function(a, b) {
    try {
        if (window.localStorage)
            if ("undefined" != typeof b)
                localStorage.setItem(a, b);
            else
                return localStorage.getItem(a)
    } catch (c) {}
}
;
Mql5Cookie.sessionStorage = function(a, b) {
    try {
        if (window.sessionStorage)
            if ("undefined" != typeof b)
                sessionStorage.setItem(a, b);
            else
                return sessionStorage.getItem(a)
    } catch (c) {}
}
;
function ImageAttach() {}
ImageAttach.Init = function(a, b, c, d, e) {
    b || (b = 80);
    a || (a = 60);
    ImageAttach.previewHeight = b;
    ImageAttach.previewWidth = a;
    ImageAttach.deleteLabel = c;
    ImageAttach.defaultError = d;
    ImageAttach.maxCount = e;
    Class($("customFileInputContainer"), "customFileInputContainer", !1);
    $("customFileInputLink").style.display = "";
    /msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent) ? $("customFileInputLink").onclick = function() {
        Class($("customFileInputContainer"), "customFileInputContainer", !0);
        $("customFileInputLink").style.display = "none";
        return !1
    }
    : $("customFileInputLink").onclick = function() {
        $("attachedFile_imagesLoader").click();
        return !1
    }
    ;
    ImageAttach.CheckImagesCount() ? $("imageUploaderContainer").style.display = "block" : $("imageUploaderContainer").style.display = "none"
}
;
ImageAttach.previewCounter = 0;
ImageAttach.CheckImagesCount = function() {
    return ImageAttach.previewCounter < ImageAttach.maxCount
}
;
ImageAttach.SelectFile = function() {
    $("attachedFile_imagesLoader").click()
}
;
ImageAttach.createPreview = function(a) {
    ImageAttach.previewCounter || (ImageAttach.previewCounter = 0);
    var b = $("newImageAttaches")
      , c = document.createElement("SPAN");
    c.id = "iat_" + ImageAttach.previewCounter;
    Class(c, "attachItem");
    Class(c, "imagePreview");
    var d = createElement(c, "A", {
        title: ImageAttach.getClearFilename(a),
        target: "_blank",
        href: a,
        className: "imageHolder_wall"
    });
    d = createElement(d, "IMG", {
        src: a
    });
    d.style.maxHeight = ImageAttach.previewHeight + "px";
    d.style.maxWidth = ImageAttach.previewWidth + "px";
    createElement(c, "BR");
    d = createElement(c, "DIV", {
        className: "previewLabel"
    });
    createElement(d, "INPUT", {
        type: "hidden",
        name: "attachedImage_" + ImageAttach.previewCounter,
        value: a
    });
    createElement(d, "A", {
        href: "#",
        onclick: function() {
            return ImageAttach.deletePreview(c)
        },
        className: "deleteAttachLink",
        innerHTML: ImageAttach.deleteLabel
    });
    prependElement(b, c);
    ImageAttach.previewCounter++;
    b.style.display = "";
    return c
}
;
ImageAttach.deletePreview = function(a) {
    a.parentNode.removeChild(a);
    ImageAttach.onDeletePreview();
    return !1
}
;
ImageAttach.onDeletePreview = function() {
    ImageAttach.previewCounter--;
    ImageAttach.CheckImagesCount() ? $("imageUploaderContainer").style.display = "block" : $("imageUploaderContainer").style.display = "none";
    0 >= ImageAttach.previewCounter && ($("newImageAttaches").style.display = "none")
}
;
ImageAttach.OnChangeFile = function(a, b) {
    a = a || (b && b.body ? b.body.innerHTML : null);
    ImageAttach.ClearError();
    if (a = stripHtml(a))
        a = eval("(" + a + ")"),
        0 < a.Url.length ? ImageAttach.createPreview(a.Url) : 0 < a.ErrorMessage.length ? ImageAttach.ShowError(a.ErrorMessage) : ImageAttach.ShowError(),
        ImageAttach.CheckImagesCount() ? $("imageUploaderContainer").style.display = "block" : $("imageUploaderContainer").style.display = "none"
}
;
ImageAttach.OnChangeFileError = function(a) {
    ImageAttach.ShowError()
}
;
ImageAttach.ShowError = function(a) {
    $("imageValidationError").innerHTML = a || ImageAttach.defaultError
}
;
ImageAttach.ClearError = function() {
    $("imageValidationError").innerHTML = ""
}
;
ImageAttach.getClearFilename = function(a) {
    a = a.split("/");
    a = a[a.length - 1];
    var b = a.indexOf("_");
    return a.substring(b + 1)
}
;
ImageAttach.Clear = function() {
    for (; 0 < ImageAttach.previewCounter; )
        ImageAttach.deletePreview($("iat_" + (ImageAttach.previewCounter - 1)))
}
;
function Affiliation(a, b, c, d, e, f, g) {
    this.getLink = function() {
        Ajax.get(a + "/" + b + "/generatelink/" + c + "/" + d + "/" + e, null, {
            onready: this.onSuccess,
            onerror: this.onError
        })
    }
    ;
    this.onSuccess = function(a) {
        f.href = a;
        f.innerHTML = a;
        g.style.display = "none";
        void 0 != $("affiliationLinkBlock") && void 0 != $("affiliationTextBlock") && ($("affiliationLinkBlock").style.display = "inline",
        $("affiliationTextBlock").style.display = "none")
    }
    ;
    this.onError = function() {}
}
function customSelect(a) {
    function b() {
        var a = document.getElementById(this.id + "_clone");
        if (a) {
            var b = this.id;
            a.selectedIndex = this.selectedIndex;
            this.parentNode.removeChild(this);
            a.id = b;
            return !1
        }
    }
    var c = document.getElementById(a);
    if (c) {
        var d = document.createElement("span");
        d.style.width = c.style.width;
        d.className = "selectWrapper";
        var e = document.createElement("button");
        e.innerHTML = "&#9660;";
        c.parentNode.insertBefore(d, c);
        Class(c, "customSelect");
        d.appendChild(c);
        d.appendChild(e);
        e.onclick = function() {
            var c = document.getElementById(a)
              , d = c.cloneNode(!0);
            d.id = a + "_clone";
            d.selectedIndex = c.selectedIndex;
            c.parentNode.insertBefore(d, c);
            c.size = Math.min(c.options.length, 20);
            Class(c, "opened");
            d = getOffsetSum(c);
            c.style.top = d.top + "px";
            c.style.left = d.left + "px";
            document.body.appendChild(c);
            c.focus();
            c.onblur = b;
            c.onclick = b;
            return !1
        }
        ;
        c.onmousedown = function() {
            return !1
        }
    }
}
function Likes() {
    function a(a, e, f, g) {
        if (!a || 0 == a.length)
            return b();
        try {
            var h = window.JSON ? window.JSON.parse(a) : eval("(" + a + ")")
        } catch (n) {
            return b()
        }
        a = $(e);
        Class(a, "loading", !0);
        e = $("likes_" + h.moduleId + "_" + h.parentType + "_" + h.parentId);
        a.innerHTML = h.linkText + "&nbsp;";
        a.onclick = function() {
            h.liked ? d(h.lang, h.moduleId, h.parentType, h.parentId, f, g) : c(h.lang, h.moduleId, h.parentType, h.parentId, f, g)
        }
        ;
        e.innerHTML = 0 < h.count ? h.count : "";
        0 < h.count ? Class(e, "likesCount", !1) : e.className = "";
        return !0
    }
    function b() {
        var a = $(this.linkId);
        Class(a, "loading", !0);
        g.ErrorMessageTitle && g.ErrorMessageText && (a = createElement(null, "DIV", {
            innerHTML: g.ErrorMessageText,
            className: "likeErrorText"
        }),
        Dialog.show(g.ErrorMessageTitle, a, 300, 120, function() {
            Dialog.hide()
        }))
    }
    function c(c, d, e, f, g, n) {
        var h = "like_" + d + "_" + e + "_" + f
          , l = $(h);
        l.onclick = function() {}
        ;
        Class(l, "loading");
        Ajax.post("/" + c + "/like/" + d + "/" + e + "/" + f, {
            __signature: g
        }, !1, {
            onready: function(b) {
                a(b, h, g, n)
            },
            onerror: b,
            linkId: h
        })
    }
    function d(c, d, e, f, g, n) {
        var h = "like_" + d + "_" + e + "_" + f
          , l = $(h);
        l.onclick = function() {}
        ;
        Class(l, "loading");
        Ajax.post("/" + c + "/unlike/" + d + "/" + e + "/" + f, {
            __signature: n
        }, !1, {
            onready: function(b) {
                a(b, h, g, n)
            },
            onerror: b,
            linkId: h
        })
    }
    function e(a) {
        var b = $(this.cid);
        b && (a && 0 != a.length ? b.innerHTML = a : b.parentNode.removeChild(b))
    }
    function f(a) {
        this.cnt && this.cnt.parentNode && (a && 0 != a.length ? this.cnt.innerHTML = a : this.cnt.parentNode.removeChild(this.cnt))
    }
    var g = this;
    this.ErrorMessageTitle = this.ErrorMessageText = this.SuccessMessageTitle = this.SuccessMessageText = void 0;
    this.IsMobile = !1;
    this.Like = function(a, b, d, e, f, g) {
        return c(a, b, d, e, f, g)
    }
    ;
    this.Unlike = function(a, b, c, e, f, g) {
        d(a, b, c, e, f, g)
    }
    ;
    this.Tooltip = function(a, c, d, f, g) {
        a = tooltip(a, '<div class="likesTooltipLoader"></div>');
        Ajax.get("/" + g + "/like_users/tooltip/" + c + "/" + d + "/" + f, null, {
            onready: e,
            onerror: b,
            cid: a
        })
    }
    ;
    this.UsersLikes = function(a, c, d, e, g) {
        var h = createElement(null, "DIV", {
            className: "likeUsersContainer"
        });
        createElement(h, "DIV", {
            className: "likesListLoader"
        });
        Dialog.show(g, h, 250, 300, this.CloseUsers);
        Ajax.get("/" + e + "/like_users/full/" + a + "/" + c + "/" + d, null, {
            onready: f,
            onerror: b,
            cnt: h
        })
    }
    ;
    this.CloseUsers = function() {
        var a = getElementsByClass("likeUsersContainer", document);
        if (a)
            for (var b = 0; b < a.length; b++)
                a[b] && a[b].parentNode && a[b].parentNode.removeChild(a[b]);
        Dialog.hide()
    }
}
window.globalStorageDomain = "https://c.mql5.com";
window.globalStoragePage = "/external/pocket/gstorage.html";
function PocketManager() {
    this.lastElement = null;
    this.Add = function(a, b, c, d, e) {
        window.GStorage || (window.GStorage = window.globalStorage(window.globalStorageDomain, window.globalStoragePage));
        GStorage.supported && (Class(a, "added"),
        null !== this.lastElement && this.lastElement !== a && (this.lastElement.className = "pocket"),
        this.lastElement = a,
        Ajax.get(["/", b, "/pocket/get/", c, "/", d, "/", e].join(""), null, {
            onready: function(a) {
                a ? window.GStorage.setItem("pocketContent", a) : window.GStorage.removeItem("pocketContent")
            },
            onerror: function() {}
        }));
        return !1
    }
}
function Translate(a) {
    function b(a, b) {
        var c = document.createElement("A");
        c.innerHTML = "<i>" + w[a][0] + "</i> " + w[a][1];
        c.href = "#" + a;
        b && Class(c, "selected");
        c.onclick = function() {
            q.Translate(f, g, a, m, h, p);
            u[f].currentTargetLang = a;
            var b = this.parentNode.parentNode.parentNode.firstChild;
            Class(b, "pressed");
            b.innerHTML = w[a][0];
            q.HideMenu(this.parentNode.parentNode.parentNode, f);
            return !1
        }
        ;
        return c
    }
    function c(a, b, c, d) {
        c = document.getElementById(a);
        if (!c)
            return !1;
        c.style.direction = "ar" == b || "fa" == b ? "rtl" : "ltr";
        b = null;
        if ("pollAnswers" == a)
            for (b = d[0],
            a = c.getElementsByTagName("label"),
            c = 0; c < a.length; c++)
                a[c].innerHTML = d[c + 1];
        else if (0 <= a.indexOf("contenttopic"))
            b = d[0],
            c.innerHTML = d[1];
        else if ("content_updates" === a) {
            a = c.querySelectorAll(".product-updates__content");
            var e = d.length;
            if (a)
                for (c = 0; c < e; c++)
                    a[c].innerHTML = d[c];
            else
                c.innerHTML = d[0]
        } else
            c.innerHTML = d[0];
        null != b && $("forumTitle") && ($("forumTitle").innerHTML = b);
        return !1
    }
    function d(a) {
        null != n && n != f && u[n].showMenu && (r.parentNode.removeChild(r.parentNode.childNodes[2]),
        u[n].showMenu = !1,
        Class(r.parentNode, "pressed", !0),
        r = n = null);
        if (u[f].showMenu)
            return q.HideMenu(a.parentNode, f),
            !1;
        var c = document.createElement("DIV");
        Class(a, "pressed");
        c.className = "translateMenu";
        c.onmousedown = function(a) {
            a || (a = window.event);
            a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
        }
        ;
        var d = document.createElement("DIV"), e = 0, h = u[f].isTranslated, g;
        for (g in w)
            d.appendChild(b(g, h && g == l)),
            3 == ++e && (e = 0,
            c.appendChild(d),
            d = document.createElement("DIV"));
        0 < e && c.appendChild(d);
        a.parentNode.appendChild(c);
        u[f].showMenu = !0;
        n = f;
        r = a;
        t ? t(a, c) : (a = a.getBoundingClientRect(),
        d = document.body.getBoundingClientRect(),
        460 > a.left && d.right - a.right && (460 > d.right - a.right ? (c.style.width = d.width - 20 + "px",
        c.style.left = "-" + (a.left - 25) + "px") : (c.style.left = "-1px",
        c.style.right = "auto")));
        return !1
    }
    function e(a) {
        a = a || window.event;
        for (a = a.target || a.srcElement; a.parentNode && 0 > a.className.indexOf("translateMenu"); )
            a = a.parentNode;
        (!a.className || 0 > a.className.indexOf("translateMenu")) && q.HideMenu(null, n)
    }
    var f, g, l, m, h, p, t = null, n = null, r = null, q = this, u = {}, w = {
        ar: ["AR", "Arabic"],
        zh: ["CN", "Chinese"],
        en: ["EN", "English"],
        fr: ["FR", "French"],
        de: ["DE", "German"],
        id: ["ID", "Indonesian"],
        it: ["IT", "Italian"],
        ja: ["JP", "Japanese"],
        ko: ["KO", "Korean"],
        fa: ["FA", "Persian"],
        pt: ["PT", "Portuguese"],
        ru: ["RU", "Russian"],
        es: ["ES", "Spanish"],
        tr: ["TR", "Turkish"],
        vi: ["VI", "Vietnamese"]
    };
    this.Translate = function(b, d, e, h, g, n) {
        Mql5Cookie.localStorage("translateTargetLang", e);
        l = e;
        u[f].translations[e] ? (c(b, e, f, u[f].translations[e]),
        a && a()) : Ajax.get("/" + d + "/translate/" + e + "/" + h + "/" + g + "/" + n, null, {
            onready: function(d) {
                d && d.length && (d = eval("(" + d + ")"),
                u[f].translations[e] = d,
                c(b, e, f, d),
                a && a())
            },
            onerror: function() {}
        });
        u[f].isTranslated = !0;
        return !1
    }
    ;
    this.SetMenu = function(a, b, c, n, r, w, H, E, J, I) {
        function v() {
            var b = f
              , c = $(f);
            c && (c.parentNode.onmousedown = function() {
                q.HideMenu(a, b)
            }
            )
        }
        f = b;
        g = c;
        l = n;
        m = r;
        h = w;
        p = H;
        t = I;
        a.id = "translateLink" + b;
        E || Class(a, "pressed");
        u[b] ? l = u[b].currentTargetLang : (u[b] = {
            currentTargetLang: l,
            showMenu: !1,
            isTranslated: !1,
            originalTranslation: $(b) ? $(b).innerHTML : J ? J : null,
            originalTitle: $("forumTitle") ? $("forumTitle").innerHTML : null,
            translations: {}
        },
        a.onmouseout = function() {
            u[f].showMenu || Class(a, "pressed", !0)
        }
        ,
        a.firstChild.onclick = function() {
            if (u[f].isTranslated) {
                Class(a.firstChild, "pressed", !0);
                var b = document.getElementById(f);
                b && (b.style.direction = "ltr",
                b.innerHTML = u[f].originalTranslation,
                $("forumTitle") && ($("forumTitle").innerHTML = u[f].originalTitle),
                u[f].isTranslated = !1);
                return !1
            }
            Class(a.firstChild, "pressed");
            return q.Translate(f, g, l, m, h, p)
        }
        ,
        a.firstChild.onmousedown = function(a) {
            a || (a = window.event);
            a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
        }
        ,
        $(f) ? v() : setTimeout(v, 300),
        b = document.createElement("SPAN"),
        b.className = "translateMenuButton",
        b.onmousedown = function(a) {
            a || (a = window.event);
            a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0;
            d(this);
            Core.AddHandler(document.body, "click", e)
        }
        ,
        c = document.createElement("SPAN"),
        b.appendChild(c),
        a.appendChild(b))
    }
    ;
    this.HideMenu = function(a, b) {
        if (null != n && n != b)
            return !1;
        a || (a = $("translateLink" + b));
        Class(a, "pressed", !0);
        var c;
        document.querySelector && (c = a.querySelector(".translateMenuButton")) && Class(c, "pressed", !0);
        (c = a.childNodes[2]) && a.removeChild(c);
        u[b].showMenu = !1;
        Core.RemoveHandler(document.body, "click", e);
        return !1
    }
}
function MakeTextboxAutogrow(a, b, c) {
    function d() {
        b && (a.style.height = b + "px");
        a.clientHeight < a.scrollHeight && (a.style.minHeight = a.scrollHeight + "px");
        e && e()
    }
    if (a) {
        c = c || ("oninput"in a ? "oninput" : "onkeyup");
        var e = a[c];
        a[c] = d;
        d()
    }
}
function AddElementHotkeyEvent(a, b, c) {
    if (a && "function" == typeof b) {
        var d = a.onkeyup;
        a.onkeyup = function(a) {
            var e = !0;
            d && (e = d(a));
            if (0 == e)
                return e;
            b(a) && c()
        }
    }
}
function SiteUpdates(a, b, c, d, e, f) {
    function g(a) {
        if (a.updates && 0 != a.updates.length)
            for (var b = a.updates.length - 1; 0 <= b; b--) {
                var c = a.updates[b], d;
                if (c.module_id && (d = u["m_" + c.module_id]))
                    for (var e in d.types)
                        d.types.hasOwnProperty(e) && d.types[e].callback && "function" === typeof d.types[e].callback && d.types[e].callback(c, a.ts);
                var f = $("notify_" + c.name);
                l(c, f)
            }
    }
    function l(a, b) {
        if (a && a.title && a.url) {
            var c = $("privateAreaMessages");
            if (c) {
                var d = createElement(null, "a", {
                    className: "linkNotify",
                    href: a.url,
                    id: "notify_" + a.name,
                    title: a.title
                });
                m(a.url, location.href) && (d.onclick = function() {
                    location.reload()
                }
                );
                var e = createElement(d, "span", {
                    className: a.name
                });
                if (a.count) {
                    Class(e, "active");
                    var f = Math.min(parseInt(a.count), 99);
                    e = createElement(e, "i", {
                        className: "count",
                        innerHTML: f
                    });
                    dataset(e, "count", a.count)
                }
                if (b && b.parentNode) {
                    c = b.parentNode;
                    c.insertBefore(d, b);
                    b.onclick && (d.onclick = b.onclick);
                    if (b.className && b.className.length) {
                        a = b.className.split(" ");
                        e = " " + d.className + " ";
                        f = [];
                        for (var h = 0; h < a.length; h++)
                            0 > e.indexOf(" " + a[h] + " ") && (f[f.length] = a[h]);
                        f.length && (d.className += (d.className ? " " : "") + f.join(" "))
                    }
                    c.removeChild(b)
                } else
                    b = createElement(null, "li"),
                    e = null,
                    13 != a.module_id && (a = $("notify_messages")) && a.parentNode && (e = a.parentNode),
                    e ? e.parentNode.insertBefore(b, e) : c.appendChild(b),
                    b.appendChild(d),
                    notifyDropDownMobile && document.querySelector && (d = notifyDropDownMobile.querySelector(".count")) && (d.innerText = b.parentNode.getElementsByTagName("li").length),
                    MainMenu.createSubMenu()
            }
        } else
            b && 13 != a.module_id && b.parentNode.parentNode.removeChild(b.parentElement)
    }
    function m(a, b) {
        var c = a.indexOf("#");
        0 <= c && (a = a.substr(0, c));
        0 <= b.indexOf("#") && (b = b.substr(0, c));
        return a.toUpperCase() === b.toUpperCase()
    }
    function h() {
        if (!arguments || !arguments.length || 403 !== arguments[0]) {
            v++;
            5 > v ? setTimeout(function() {
                n()
            }, t()) : window.console && window.console.log && window.console.log("get updates stopped due to errors.");
            for (var a in q)
                if (a.startsWith("endc_"))
                    q[a]("error")
        }
    }
    function p(a) {
        for (var b in q)
            if (b.startsWith("endc_"))
                q[b]("success");
        if (a && 0 != a.length) {
            b = void 0;
            try {
                b = window.JSON ? window.JSON.parse(a) : eval("(" + a + ")")
            } catch (A) {
                return h()
            }
            b && void 0 != b && b.l && b.ts && b.updates && (b.ld && (!w || w < b.ld) && (w = b.ld),
            g(b),
            r = b.ts,
            B = setTimeout(function() {
                n()
            }, t()),
            v = 0)
        }
    }
    function t() {
        var a = (new Date).getTime() / 1E3
          , b = window.isWindowActive ? [3E3, 5E3, 1E4, 6E4] : [1E4, 15E3, 3E4, 2E5];
        return 15 > a - w ? b[0] : 45 > a - w ? b[1] : 165 > a - w ? b[2] : b[3]
    }
    function n() {
        if (1 == window.isWindowActive || window.isLastActiveWindow()) {
            extraLog(new Date + " get updates: SEND");
            for (var b = [], c = 0; c < d.length; c++)
                b.push(["m", d[c]]);
            for (var e in u)
                if (u.hasOwnProperty(e)) {
                    c = u[e].id;
                    for (var f in u[e].types)
                        if (u[e].types.hasOwnProperty(f)) {
                            var g = u[e].types[f].additionalDynamic ? u[e].types[f].additionalDynamic() : u[e].types[f].additionalStatic;
                            if (g)
                                for (var l in g)
                                    g.hasOwnProperty(l) && b.push([c + "_" + l, g[l]])
                        }
                }
            b.push(["wid", GetCurrentWindowId()]);
            b.push(["dt", r]);
            Ajax.post(a, b, !1, {
                onready: p,
                onerror: h
            }, !1);
            for (var m in q)
                if (m.startsWith("begc_"))
                    q[m]()
        } else
            extraLog(new Date + " get updates: SKIP"),
            B = setTimeout(function() {
                n()
            }, t())
    }
    var r = e
      , q = {}
      , u = {}
      , w = f || 0;
    this.SetLastUpdate = function(a) {
        if (!w || w < f)
            w = a
    }
    ;
    this.RegisterRenderCallback = function(a, b, c, d) {
        var e;
        (e = u["m_" + a]) || (e = u["m_" + a] = {
            types: {},
            id: a
        });
        (a = e.types["t_" + b]) || (a = e.types["t_" + b] = {
            id: b,
            callback: void 0,
            additionalStatic: {},
            additionalDynamic: void 0
        });
        a.callback = c;
        if ("function" === typeof d)
            a.additionalStatic = {},
            a.additionalDynamic = d;
        else {
            a.additionalDynamic = void 0;
            for (var f in d)
                d.hasOwnProperty(f) && (void 0 != d[f] ? a.additionalStatic[f] = d[f] : delete a.additionalStatic[f])
        }
    }
    ;
    this.RegisterOnBegin = function(a, b) {
        q["begc_" + a] = b
    }
    ;
    this.RegisterOnEnd = function(a, b) {
        q["endc_" + a] = b
    }
    ;
    this.GetUpdates = function() {
        B && clearTimeout(B);
        n()
    }
    ;
    var v = 0;
    var B = setTimeout(function() {
        n()
    }, t());
    mqGlobal.AddOnActiveWindowChange(function(a) {
        a && (B && clearTimeout(B),
        n())
    })
}
function DateToText(a, b) {
    if (!window.dateToTextLocalization)
        return GetDate(a);
    var c = new Date(1E3 * a);
    b = parseInt((new Date(1E3 * b)).getTime() / 6E4) - parseInt(c.getTime() / 6E4);
    if (1 > b)
        a = "m",
        b = 1;
    else if (60 > b)
        a = "m",
        b = Math.floor(b);
    else if (720 > b)
        a = "h",
        b = Math.floor(b / 60);
    else
        return GetDate(a);
    return 0 <= window.dateToTextLocalization[a + GetCounterSuffix(b)].indexOf("{0}") ? window.dateToTextLocalization[a + GetCounterSuffix(b)].replace("{0}", b) : b + " " + window.dateToTextLocalization[a + GetCounterSuffix(b)]
}
function DateToStringForToday(a) {
    var b = new Date
      , c = new Date(1E3 * a);
    return b.getFullYear() == c.getFullYear() && b.getMonth() == c.getUTCMonth() && b.getDate() == c.getUTCDate() ? (9 < c.getUTCHours() ? c.getUTCHours() : "0" + c.getUTCHours()) + ":" + (9 < c.getUTCMinutes() ? c.getUTCMinutes() : "0" + c.getUTCMinutes()) : GetDate(a)
}
function DateToStringForTodayLocal(a) {
    a = new Date(1E3 * a);
    return (9 < a.getHours() ? a.getHours() : "0" + a.getHours()) + ":" + (9 < a.getMinutes() ? a.getMinutes() : "0" + a.getMinutes())
}
function GetCounterSuffix(a) {
    var b = a % 100;
    if (10 < b && 20 > b)
        return 3;
    a %= 10;
    return 1 == a ? 1 : 1 < a && 5 > a ? 2 : 3
}
function ProductButtonClick(a, b, c) {
    var d = $(c);
    d && (d.hasMt5DialogHide = function() {
        HasMt5DialogHide(d)
    }
    ,
    Dialog.show(d.title, d, 500, 500, d.hasMt5DialogHide),
    d.style.display = "block",
    Dialog.show(d.title, d, d.clientWidth, d.clientHeight, d.hasMt5DialogHide))
}
function HasMt5DialogHide(a) {
    Dialog.hide();
    a.style.display = "none"
}
function ToggleAddProduct(a) {
    var b = $("addProductPopup");
    if (b)
        if (b.style.display) {
            "none" == b.style.display && (b.skipNextBlur = !1);
            b.style.display = "";
            var c = $("addProductInputTrigger") || createElement(b, "input", {
                type: "text",
                id: "addProductInputTrigger"
            });
            c.focus();
            c.onblur = function() {
                b.skipNextBlur ? (b.skipNextBlur = !1,
                c.focus()) : b.style.display = "none"
            }
            ;
            b.onmousedown || (b.onmousedown = function() {
                b.skipNextBlur = !0
            }
            );
            a.onmousedown || (a.onmousedown = function() {
                b.skipNextBlur = !0
            }
            )
        } else
            b.style.display = "none"
}
function traceClickAsync(a, b, c, d, e) {}
function traceClick(a) {}
function trackOutboundLink(a) {}
function fpush(a) {
    (0 < window.location.hostname.indexOf(".src") || 0 < window.location.hostname.indexOf(".dev")) && window.console ? window.console.log("fpush: " + a) : window.fz && window.setTimeout(function() {
        window.fz("track", a)
    }, 10)
}
function RenderCharts(a, b, c, d, e, f, g) {
    var l = "rgb(237,240,244)"
      , m = "rgba(204,204,204,0.3)"
      , h = "rgb(155,155,155)"
      , p = "rgb(81,139,198)"
      , t = "rgb(206,10,10)"
      , n = "rgba(124,204,255,0.25)"
      , r = "rgba(185,32,36,0.25)";
    d && (l = d.COLOR_BG || l,
    m = d.COLOR_GRID || m,
    h = d.COLOR_AXIS || h,
    p = d.COLOR_LINE || p,
    t = d.COLOR_LINE_MINUS || t,
    n = d.COLOR_LIGHT_LINE || n,
    r = d.COLOR_BG || r);
    a = e ? e.querySelectorAll("." + a) : window.getElementsByClass(a);
    if (void 0 != a)
        for (var q in a)
            if (e = a[q],
            void 0 != e && null != e && void 0 != e.className && (d = e.getElementsByTagName("CANVAS"),
            void 0 != d && null != d && 0 !== d.length && (d = d[0],
            d.getContext))) {
                var u = e.getElementsByTagName("INPUT");
                if (void 0 != u && 0 !== u.length && void 0 != u[0]) {
                    d = d.getContext("2d");
                    d.scale(1, 1);
                    e = g ? 1 : c / 58;
                    u = u[0].value.split(", ");
                    var w = parseInt(u[0]) * e;
                    u.shift();
                    if (!f) {
                        q = d.createLinearGradient(0, 0, 0, c);
                        q.addColorStop(0, l);
                        q.addColorStop(1, "#fff");
                        d.fillStyle = q;
                        d.fillRect(0, 0, b, c);
                        d.beginPath();
                        q = (c + 2) / 4;
                        for (var v = q - .5; v < b; v += q)
                            d.moveTo(v, 0),
                            d.lineTo(v, c);
                        for (v = q - .5; v < c; v += q)
                            d.moveTo(0, v),
                            d.lineTo(b, v);
                        d.strokeStyle = m;
                        d.lineWidth = 1;
                        d.stroke();
                        d.closePath()
                    }
                    d.beginPath();
                    v = c - w;
                    var B = v - parseInt(u[0]) * e
                      , z = .5;
                    d.moveTo(z, v);
                    d.lineTo(z, B - 1.5);
                    var D = B > v ? -1 : 1;
                    var A = B;
                    var F = [];
                    var H = 0;
                    for (q = 1; q < u.length; q++) {
                        B = parseInt(u[q]);
                        if (isNaN(B))
                            break;
                        F.push((B - 1) * e);
                        0 === B && 0 === H && (H = F.length - 1);
                        0 !== B && (H = 0)
                    }
                    for (var E = 0 === H ? F.length : H, J = 1 * b / E, I = 0; I < E; I++) {
                        B = v - F[I];
                        z += J;
                        var G = B - .5;
                        H = B > v ? -1 : 1;
                        if (H != D && 1 < I) {
                            var N = z - J;
                            var W = A - .5 - v;
                            var Z = z;
                            A = G - v;
                            A = -W * (Z - N) / (A - W) + N;
                            N = v;
                            d.lineTo(A, N);
                            d.fillStyle = 0 > D ? r : n;
                            d.fill();
                            d.closePath();
                            d.beginPath();
                            d.moveTo(A, N)
                        }
                        d.lineTo(z, G);
                        A = B;
                        D = H
                    }
                    d.lineTo(z, v);
                    d.fillStyle = 0 > D ? r : n;
                    d.fill();
                    d.stroke();
                    d.closePath();
                    0 < w && w < c && (d.beginPath(),
                    d.moveTo(0, v - .5),
                    d.lineTo(b, v - .5),
                    d.strokeStyle = h,
                    d.stroke(),
                    d.closePath());
                    d.beginPath();
                    f && (d.lineWidth = 2);
                    v = c - w;
                    B = v - parseInt(u[0]) * e;
                    z = .5;
                    d.moveTo(z, B - .5);
                    D = B > v ? -1 : 1;
                    A = B;
                    for (I = 0; I < E; I++)
                        B = v - F[I],
                        z += J,
                        G = B - .5,
                        H = B > v ? -1 : 1,
                        H != D && 1 < I && (N = z - J,
                        W = A - .5 - v,
                        Z = z,
                        A = G - v,
                        A = -W * (Z - N) / (A - W) + N,
                        N = v,
                        d.lineTo(A, N),
                        d.strokeStyle = 0 > D ? t : p,
                        d.stroke(),
                        d.closePath(),
                        d.beginPath(),
                        d.moveTo(A, N)),
                        d.lineTo(z, G),
                        f && (d.strokeStyle = 0 > D ? r : n,
                        d.stroke()),
                        A = B,
                        D = H;
                    d.strokeStyle = 0 > D ? t : p;
                    d.stroke()
                }
            }
}
(function() {
    var a = function() {
        var a = "INPUT" == this.tagName ? this : this.nextSibling;
        ("INPUT" == this.tagName ? this.previousSibling : this).style.display = "none";
        a.focus();
        window.console && window.console.log && window.console.log("focus on " + this)
    }
      , b = function() {
        var a = "INPUT" == this.tagName ? this.previousSibling : this;
        0 == ("INPUT" == this.tagName ? this : this.nextSibling).value.length && (a.style.display = "");
        window.console && window.console.log && window.console.log("blur on " + this)
    }
      , c = getElementsByClass("placeholder");
    if (c && 0 != c.length)
        for (var d = 0; d < c.length; d++)
            if (c[d].parentNode && !(0 > c[d].parentNode.className.indexOf("inputWrapper"))) {
                var e = c[d].nextSibling;
                c[d].onclick = a;
                e.onfocus = a;
                e.onblur = b
            }
}
)();
function SetDateInputValue(a, b) {
    function c(a, b) {
        var c = a;
        for (a = (a + "").length; a < b; a++)
            c = "0" + c;
        return c
    }
    var d = $(a + "Year")
      , e = $(a + "Month")
      , f = $(a + "Day")
      , g = $(a + "Hour")
      , l = $(a + "Minute");
    if (a = $(a))
        d && (d.value = b.getFullYear()),
        e && (e.value = c(parseInt(b.getMonth()) + 1, 2)),
        f && (f.value = b.getDate()),
        g && (g.value = c(b.getHours(), 2)),
        l && (l.value = c(b.getMinutes(), 2)),
        a.value = b.getFullYear() + "." + c(parseInt(b.getMonth()) + 1, 2) + "." + b.getDate() + " " + c(b.getHours(), 2) + ":" + c(b.getMinutes(), 2)
}
function Share() {
    var a;
    this.OpenShareEditor = function(b, c, d, e) {
        var f = createElement(null, "DIV", {
            className: "shareEditorLoading"
        })
          , g = e ? 300 : 600;
        Dialog.show(c, f, g, 150, function() {
            f.parentNode && f.parentNode.removeChild(f);
            a = null;
            Dialog.hide()
        }, null, null, " ui no-bottom-margin", !1, "fixed");
        Ajax.get(d, null, {
            onready: function(b) {
                var d = createElement(null, "DIV", {
                    className: "shareContent"
                });
                d.innerHTML = b;
                b = d.getElementsByTagName("img");
                for (var e = 0; e < b.length; e++)
                    b[e].onload = b[e].onerror = function(b) {
                        this.passedEvent || (b || (b = window.event),
                        this.passedEvent = !0,
                        Dialog.show(c, f, g, f.clientHeight || f.offsetHeight, function() {
                            f.parentNode && f.parentNode.removeChild(f);
                            a = null;
                            Dialog.hide()
                        }, null, null, " ui no-bottom-margin", !1, "fixed"))
                    }
                    ;
                Class(f, "shareEditorLoading", !0);
                f.appendChild(d);
                Dialog.show(c, f, g, f.clientHeight || f.offsetHeight, function() {
                    f.parentNode && f.parentNode.removeChild(f);
                    a = null;
                    Dialog.hide()
                }, null, null, " ui no-bottom-margin", !1, "fixed");
                document.querySelectorAll && document.querySelectorAll(".signalAvatar")[0] && Signals.RenderAvatars()
            },
            onerror: function() {},
            ismobile: e
        })
    }
    ;
    this.OnShareSuccess = function(a) {
        var b = this.ismobile ? 300 : 600;
        a = stripHtml(a);
        if (a = window.JSON ? window.JSON.parse(a) : eval("(" + a + ")"))
            if (!a.Type || "REDIRECT" !== a.Type) {
                if (a.Type && "SUCCESS" === a.Type) {
                    var d = createElement(null, "DIV", {
                        className: "shareEditorSuccess"
                    });
                    d.innerHTML = a.Message;
                    Dialog.show(a.Title || a.Message || "", d, b, 100, function() {
                        Dialog.hide()
                    }, null, null, " ui no-bottom-margin", !1, "fixed");
                    d.onclick = function() {
                        Dialog.hide()
                    }
                }
                a.Type && "ERROR" === a.Type && (d = createElement(null, "DIV", {
                    className: "shareEditorSuccess"
                }),
                d.innerHTML = a.Message,
                Dialog.show(a.Message, d, b, 100, function() {
                    Dialog.hide()
                }, null, null, " ui no-bottom-margin", !1, "fixed"),
                d.onclick = function() {
                    Dialog.hide()
                }
                )
            }
    }
    ;
    this.ExternalShare = function(b, c, d, e) {
        if (b = $("share_counter_" + c + "_" + d + "_" + e))
            c = +b.innerHTML,
            b.innerHTML = ++c;
        a = null;
        Dialog.hide()
    }
    ;
    this.ProcessShare = function(b) {
        var c = $("shareType").value
          , d = "";
        switch (c) {
        case "mql5com":
            d = "Mql5.community";
            break;
        case "fb":
            d = "Facebook";
            break;
        case "vk":
            d = "Vkontakte";
            break;
        case "tw":
            d = "Twitter"
        }
        window.fpush("MQL5+Share+" + d);
        if ("mql5com" == c)
            return $("formShare").onsubmit(),
            !1;
        $("formShare").onsubmit();
        null == a && ($("socIconVk") && "selected" == $("socIconVk").className ? a = $("socIconVk") : "selected" == $("socIconFb").className && (a = $("socIconFb")));
        b.href = a.href;
        a = null;
        Dialog.hide();
        return !0
    }
    ;
    this.SetShareType = function(b, c) {
        null == a && ($("socIconVk") && "selected" == $("socIconVk").className ? a = $("socIconVk") : "selected" == $("socIconFb").className && (a = $("socIconFb")));
        if (b == a)
            return !1;
        b.className = "selected";
        $("socButtonIco").className = c;
        $("socButtonText").innerHTML = b.title;
        $("shareType").value = c;
        "mql5com" == c ? ($("shareContentWrapper").style.display = "block",
        $("socCommentContent").focus()) : $("shareContentWrapper").style.display = "none";
        a && a.className && (a.className = "");
        a = b;
        return !1
    }
}
function Friends(a, b, c, d, e, f, g) {
    function l(a, b, c) {
        var d = createElement(null, "ul", {
            className: "friendsSettingsMenu"
        });
        c ? (c = createElement(d, "li", {
            className: b ? "" : "active"
        }),
        b || createElement(c, "span", {
            className: "hidePostsIndicator"
        }),
        c.appendChild(h(a, b))) : (c = createElement(d, "li", {
            className: b ? "" : "active"
        }),
        createElement(c, "span", {
            className: "addFriendIco"
        }),
        c.appendChild(n(a, b)));
        return d
    }
    function m(a, b, c, d, e, f) {
        var g = createElement(null, "ul", {
            className: "friendsSettingsMenu"
        });
        if (e) {
            var l = createElement(g, "li", {
                className: d ? "" : "active"
            });
            d || createElement(l, "span", {
                className: "hidePostsIndicator"
            });
            l.appendChild(h(b, d))
        } else
            createElement(g, "li", {
                className: d ? "" : "active"
            }).appendChild(n(b, d));
        createElement(g, "li", {
            className: ""
        }).appendChild(p(a, b, c));
        e && (createElement(g, "li", {
            className: "separator"
        }),
        createElement(g, "li", {
            className: ""
        }).appendChild(t(b, f)));
        return g
    }
    function h(a, b) {
        return createElement(null, "a", {
            className: "friendsSettingsLink",
            innerHTML: r + "&nbsp;&nbsp;",
            href: B,
            onclick: function(c) {
                doPost(c, this.href, v, {
                    user: a,
                    action: b ? "show_posts" : "hide_posts"
                });
                return !1
            }
        })
    }
    function p(a, b, c) {
        return createElement(null, "a", {
            className: "friendsSettingsLink",
            innerHTML: q,
            onclick: function() {
                return window.MessagesWidget ? (window.MessagesWidget.OpenChatWith(b, a, c),
                !1) : !0
            },
            href: z + b.toLowerCase()
        })
    }
    function t(a, b) {
        return createElement(null, "a", {
            className: "friendsSettingsLink",
            innerHTML: u,
            href: B,
            onclick: function(c) {
                if (!confirm(b))
                    return !1;
                doPost(c, this.href, v, {
                    user: a,
                    action: "remove"
                });
                return !0
            }
        })
    }
    function n(a) {
        return createElement(null, "a", {
            className: "friendsSettingsLink",
            innerHTML: w,
            href: B,
            onclick: function(b) {
                doPost(b, this.href, v, {
                    user: a,
                    action: "add"
                });
                return !1
            }
        })
    }
    var r = b
      , q = c
      , u = d
      , w = e
      , v = g
      , B = f + "/users/" + a.toLowerCase() + "/friends"
      , z = f + "/users/" + a.toLowerCase() + "/message?user=";
    this.ShowFriendSettings = function(a, b, c, d, e, f, h) {
        var g = $(d);
        if (d) {
            var n = g.parentNode;
            tooltip(g, m(a, b, c, e, f, h), function() {
                Class(n, "hovered")
            }, function() {
                Class(n, "hovered", !0)
            })
        }
    }
    ;
    this.ShowFriendSettingsAjax = function(b, c) {
        if (b) {
            var d = $(c);
            if (c) {
                var e = d.parentNode;
                c = "tt" + S4();
                Ajax.get(f + "/users/" + a.toLowerCase() + "/friends/" + b + "/info", null, {
                    onerror: function() {},
                    onready: function(a) {
                        ttId = this.ttId;
                        var b = $(ttId);
                        b && (b.innerHTML = a)
                    },
                    ttId: c
                });
                tooltip(d, "<div id='" + c + '\'><span class="loader-icon"></span></div>', function() {
                    Class(e, "hovered")
                }, function() {
                    Class(e, "hovered", !0)
                })
            }
        }
    }
    ;
    this.ShowPostSettings = function(a, b, c, d) {
        var e = $(b);
        if (b) {
            var f = e.parentNode;
            tooltip(e, l(a, c, d), function() {
                Class(f, "hovered")
            }, function() {
                Class(f, "hovered", !0)
            })
        }
    }
}
function Extractor() {
    function a(a) {
        var b = document.createElement("DIV");
        b.innerHTML = a;
        a = b.getElementsByTagName("DIV");
        for (var c = a.length - 1; 0 <= c; --c)
            "fquote" != a[c].className && "code" != a[c].className && "pocket" != a[c].className || a[c].parentNode.removeChild(a[c]);
        a = b.getElementsByTagName("EMBED");
        for (c = a.length - 1; 0 <= c; --c)
            a[c].parentNode.removeChild(a[c]);
        a = b.getElementsByTagName("PRE");
        for (c = a.length - 1; 0 <= c; --c)
            a[c].parentNode.removeChild(a[c]);
        return b.innerHTML
    }
    function b(a) {
        for (var b = 0; b < d.length; b++)
            if (d[b] === a)
                return !0;
        return !1
    }
    function c(a) {
        var b = document.getElementById("extractorContainer");
        if (!b || "disabled" != b.className) {
            a = eval("(" + a + ")");
            var c = document.createElement("DIV");
            c.setAttribute("id", "extractorContent");
            c.className = "extractorContent";
            if (null != a.ImageUrl && "" != a.ImageUrl) {
                var d = document.createElement("DIV");
                d.className = "image";
                var e = document.createElement("IMG");
                e.src = a.ImageUrl;
                d.appendChild(e)
            }
            e = document.createElement("DIV");
            e.className = "content";
            e.style.marginLeft = 1 > a.ImageWidth ? 0 : a.ImageWidth + 10 + "px";
            var f = document.createElement("DIV");
            f.style.clear = "both";
            var h = document.createElement("A");
            h.id = "extractorTitleLink";
            h.href = a.PageUrl;
            h.target = "_blank";
            h.innerHTML = a.Title;
            a.DisabledEdit || (h.className = "editable",
            h.title = a.Translate.clickToEdit,
            h.onclick = function() {
                this.style.display = "none";
                g.style.display = "inline";
                g.focus();
                g.select();
                return !1
            }
            );
            var g = document.createElement("INPUT");
            g.id = g.name = "extractorTitle";
            g.value = a.Title;
            g.maxLength = 250;
            g.setAttribute("autocomplete", "off");
            g.onblur = function() {
                h.innerHTML = this.value;
                h.style.display = "inline";
                this.style.display = "none"
            }
            ;
            g.onkeydown = function(a) {
                a = a || window.event;
                void 0 != a && void 0 != a.keyCode && 13 == a.keyCode && this.blur()
            }
            ;
            g.onkeypress = function(a) {
                return 13 != (a || window.event).keyCode
            }
            ;
            if (0 < a.Rating) {
                var l = document.createElement("DIV");
                l.className = "rating small";
                var m = document.createElement("DIV");
                m.className = "v" + 10 * a.Rating;
                l.appendChild(m)
            }
            var z = [];
            0 < a.Rating && (null != a.RatingVotesString && z.push(a.RatingVotesString),
            null != a.RatingReviewsString && z.push(a.RatingReviewsString));
            null != a.PriceString && z.push(a.PriceString);
            null != a.CategoryString && "" != a.CategoryString && z.push(a.CategoryString);
            null != a.DatePublished && "" != a.DatePublished && z.push(a.DatePublished);
            null != a.Author && "" != a.Author && z.push(a.Author);
            a.HostName && z.push(a.HostName);
            m = document.createElement("DIV");
            m.className = "info";
            l && m.appendChild(l);
            m.innerHTML += z.join(" | ");
            var D = document.createElement("P");
            null != a.Description && (D.innerHTML = a.Description);
            a.DisabledEdit || (D.className = "editable",
            D.title = a.Translate.clickToEdit,
            D.onclick = function() {
                this.style.display = "none";
                A.style.display = "block";
                A.focus();
                A.select();
                return !1
            }
            );
            var A = document.createElement("TEXTAREA");
            A.id = A.name = "extractorDescription";
            A.value = a.Description;
            A.maxLength = 450;
            A.onblur = function() {
                D.innerHTML = this.value;
                D.style.display = "block";
                this.style.display = "none"
            }
            ;
            l = document.createElement("INPUT");
            l.name = "extractorKey";
            l.type = "hidden";
            l.value = a.Key;
            z = document.createElement("INPUT");
            z.name = "extractorUrl";
            z.type = "hidden";
            z.value = a.PageUrl;
            var F = document.createElement("DIV");
            F.className = "delete";
            F.title = a.Translate["delete"];
            F.onclick = function() {
                Extractor.HideContentBox()
            }
            ;
            e.appendChild(h);
            e.appendChild(g);
            e.appendChild(m);
            e.appendChild(D);
            e.appendChild(A);
            e.appendChild(l);
            e.appendChild(z);
            d && c.appendChild(d);
            c.appendChild(e);
            c.appendChild(f);
            b.className = "extractor";
            b.innerHTML = "";
            b.appendChild(c);
            b.appendChild(F)
        }
    }
    var d = []
      , e = null
      , f = null
      , g = /http[s]*\:\/\/[a-z0-9\-\.]{1,120}\.[a-z]{2,5}[^\s\"\'<>\(\),]{0,500}/i
      , l = !1
      , m = !1;
    this.CanFindLink = function() {
        return !l && !m
    }
    ;
    this.FindLink = function(h) {
        if (!l && !m) {
            var p = document.getElementById("extractorContainer");
            p && "disabled" == p.className || (p = document.getElementById("edit_id"),
            void 0 != p && 0 < p.value && document.getElementById("extractor" + p.value) || (h = Dalet.Engine.GetHtml(h),
            null != h && h != f && (f = h,
            h = a(h),
            h = h.match(g),
            null == h || null == h[0] || "" == h[0] || b(h[0]) || (e = unescape(h[0]),
            m = !0,
            window.Ajax.post("/extractor", {
                url: e
            }, !1, {
                onready: function(a) {
                    null == a || "" == a ? d.push(e) : (c(a),
                    l = !0);
                    m = !1
                },
                onerror: function() {
                    d.push(e);
                    m = !1
                }
            })))))
        }
    }
    ;
    this.HideContentBox = function() {
        d.push(e);
        l = m = !1;
        var a = $("extractorContainer");
        a && (a.className = "",
        a.innerHTML = "")
    }
    ;
    this.Remove = function(a, b, c, d) {
        window.Ajax.post("/extractor/remove", {
            moduleId: a,
            typeId: b,
            entityId: c,
            __signature: d
        }, !1, {
            onready: function(a) {
                null != a && "" != a && eval("(" + a + ")") && (a = $("extractor" + c),
                void 0 != a && a.parentNode.removeChild(a))
            },
            onerror: function() {}
        })
    }
    ;
    this.ReadMore = function(a, b) {
        window.Ajax.post("/extractor/readmore", {
            id: a
        }, !1, {
            onready: function(a) {
                if (null != a && "" != a) {
                    var c = eval("(" + a + ")");
                    $("extractorDescription" + b).style.display = "none";
                    if ($("extractorReadMore" + b))
                        $("extractorReadMore" + b).style.display = "block";
                    else {
                        a = document.createElement("DIV");
                        a.id = "extractorReadMore" + b;
                        var d = document.createElement("DIV");
                        d.className = "readMore";
                        var e = document.createElement("A");
                        e.href = "#";
                        e.innerHTML = c.translate.hideMore;
                        e.onclick = function() {
                            $("extractorReadMore" + b).style.display = "none";
                            $("extractorDescription" + b).style.display = "block";
                            return !1
                        }
                        ;
                        d.appendChild(e);
                        a.innerHTML = c.content;
                        a.appendChild(d);
                        c = $("extractorDescription" + b);
                        c.nextSibling ? c.parentNode.insertBefore(a, c.nextSibling) : c.parentNode.appendChild(a)
                    }
                }
            },
            onerror: function() {}
        })
    }
}
function QuickLogin() {
    this.onChange = function(a) {
        "Login" === a.name ? window.fpush("MQL5+Signin+Input+Login") : "Password" === a.name && window.fpush("MQL5+Signin+Input+Password")
    }
    ;
    this.onSubmit = function() {
        window.fpush("MQL5+Signin+Submit")
    }
}
function QuickRegistration(a) {
    function b(a) {
        for (var b in a)
            if ("empty" != b.toString() && a.hasOwnProperty(b))
                return !1;
        return !0
    }
    var c = !0, d = null, e, f, g = this;
    a = a ? a : "";
    var l = $(a + "quickRegisterForm") || $("regOpenIdForm")
      , m = $(a + "quickRegisterButton") || $("regOpenIdButtonSubmit");
    this.OnSubmit = function(a, b) {
        null != d && (e = "" == b ? "en" : b,
        f && (clearTimeout(f),
        f = void 0))
    }
    ;
    Core.AddHandler(l, "change", function() {
        var b = $(a + "AcknowledgeReadPrivacyAndDataPolicy")
          , c = $(a + "AgreeTermsConditions");
        if (!b || !c)
            return !1;
        m.disabled = !(b.checked && c.checked)
    });
    this.OnError = function() {
        $(a + "quickRegisterErrorMessage").style.display = "block"
    }
    ;
    this.OnSuccess = function(c) {
        g.Track("submit", {
            dst: "submit_" + d
        });
        window.fpush("MQL5+Register+Submit");
        c = "string" == typeof c ? eval("(" + c + ")") : c;
        $(a + "quickRegisterErrorMessage").style.display = "none";
        if (c) {
            if (b(c)) {
                g.Track("action", {
                    dst: "action_" + d,
                    email: $(a + "email").value
                });
                window.fpush("MQL5+Register+Success");
                Validate.SetValid(l, c);
                var e = $(a + "quickRegistrationFormLogin");
                e && (e.style.display = "block",
                Dialog.show("", $(a + "quickRegistrationFormLogin"), 400, 175, function() {
                    Dialog.hide();
                    $(a + "quickRegistrationFormLogin").style.display = "none"
                }),
                $(a + "Login").value = $(a + "username").value,
                $(a + "username").value = "",
                $(a + "email").value = "",
                $(a + "Password").focus())
            }
            void 0 != c.common && ($(a + "quickRegisterErrorMessage").style.display = "block");
            Validate.SetValid(l, c)
        } else
            $(a + "quickRegisterErrorMessage").style.display = "block"
    }
    ;
    this.OnSuccessGeneral = function(c) {
        g.Track("submit", {
            dst: "submit_" + d
        });
        window.fpush("MQL5+Register+Submit");
        c = window.JSON ? window.JSON.parse(c) : eval("(" + c + ")");
        $(a + "quickRegisterErrorMessage").style.display = "none";
        if (c) {
            b(c) && (g.Track("action", {
                dst: "action_" + d,
                email: $(a + "email").value
            }),
            window.fpush("MQL5+Register+Success"),
            Validate.SetValid($(a + "quickRegisterForm"), c),
            window.setTimeout(function() {
                var b = void 0 != $(a + "username") ? $(a + "username").value : "";
                window.location = "register_cloud" === d ? "/" + e + "/auth_login?reg=1&return=cloud&login=" + b : "/" + e + "/auth_login?reg=1&login=" + b
            }, 100));
            void 0 != c.common && ($(a + "quickRegisterErrorMessage").style.display = "block");
            if (void 0 != c.email)
                switch (c.errorType) {
                case 16:
                    window.fpush("MQL5+Register+Exist+Email");
                    break;
                case 0:
                    window.fpush("MQL5+Register+Invalid+Email")
                }
            Validate.SetValid($(a + "quickRegisterForm"), c)
        } else
            $(a + "quickRegisterErrorMessage").style.display = "block"
    }
    ;
    this.CheckUserName = function() {
        f && (clearTimeout(f),
        f = void 0);
        var b = $(a + "username");
        g.OnChange(b);
        "" !== b.value ? f = setTimeout(function() {
            Class(b.parentElement, "waiting");
            var c = $(a + "IsValidate")
              , d = $(a + "quickRegisterForm");
            d && (c || (c = createElement(d, "input", {
                name: "IsValidate",
                id: a + "IsValidate",
                type: "hidden"
            })),
            c.value = 1,
            Ajax.form(d, {
                onready: g.OnSuccessCheckLogin
            }),
            c.value = 0)
        }, 200) : (Validate.ClearMessage($(a + "validate_username")),
        MQTE.SetValidationClass(a + "username", !1));
        g.OnBlur(b)
    }
    ;
    this.OnSuccessCheckLogin = function(b) {
        var c = $(a + "username").parentElement;
        Class(c, "waiting", !0);
        b = eval("(" + b + ")");
        b.errorType && 0 !== (b.errorType & 8) && window.fpush("MQL5+Register+Exist+Login");
        $(a + "quickRegisterErrorMessage").style.display = void 0 != b.common ? "block" : "none";
        Validate.SetValid($(a + "quickRegisterForm"), b)
    }
    ;
    this.OnBlur = function(a) {
        "" === a.value && a.nextSibling && a.nextSibling.style && (a.nextSibling.style.display = "block")
    }
    ;
    this.OnChange = function(a) {
        "username" === a.name ? window.fpush("MQL5+Register+Input+Login") : "email" === a.name && window.fpush("MQL5+Register+Input+Email")
    }
    ;
    this.OnFocus = function(a, b) {
        c && (c = !1,
        d = b,
        g.Track("focus", {
            dst: "focus_" + d
        }));
        a.nextSibling && a.nextSibling.style && (a.nextSibling.style.display = "none")
    }
    ;
    this.DisableInputs = function() {
        $(a + "username").disabled = "disabled";
        $(a + "email").disabled = "disabled";
        $(a + "quickRegisterSubmit") && ($(a + "quickRegisterSubmit").className = "submit loading");
        $(a + "quickRegisterButton") && ($(a + "quickRegisterButton").disabled = "disabled")
    }
    ;
    this.EnableInputs = function() {
        $(a + "username").disabled = !1;
        $(a + "email").disabled = !1;
        $(a + "quickRegisterSubmit") && ($(a + "quickRegisterSubmit").className = "submit");
        $(a + "quickRegisterButton") && ($(a + "quickRegisterButton").disabled = !1)
    }
    ;
    this.Track = function(a, b) {
        traceClickAsync(null, a, b.dst, "", "")
    }
}
function addEventCustom(a, b, c) {
    a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
}
function delEventCustom(a, b, c) {
    a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent && a.detachEvent("on" + b, c)
}
function stopProp(a, b) {
    a && a.stopPropagation ? a.stopPropagation() : a && a.cancelBubble && (a.cancelBubble = !0);
    b && a.preventDefault && a.preventDefault()
}
function MobileMenu() {
    function a(a) {
        if (c) {
            for (var f = a.target; f && f !== e && f !== d; )
                f = f.parentNode;
            f || b(a, !1)
        }
    }
    function b(b, g) {
        e && d && (c || g) && (stopProp(b, !0),
        !c && g ? (c = !0,
        e.style.left = 0,
        e.style.height = "auto",
        Class(d, "left-panel-selector_selected"),
        addEventCustom(document, "touchstart", a),
        addEventCustom(document, "click", a)) : c && (c = !1,
        e.style.left = "-10000px",
        e.style.height = 0,
        Class(d, "left-panel-selector_selected", !0),
        delEventCustom(document, "touchstart", a),
        delEventCustom(document, "click", a)))
    }
    var c = !1
      , d = $("left-panel-selector")
      , e = $("left-panel");
    if (!e || !d)
        return !1;
    $("bodyContent").style.position = "relative";
    this.Hide = function() {
        e && d && c && c && (c = !1,
        e.style.left = "-10000px",
        e.style.height = 0,
        d.className = "",
        delEventCustom(document, "touchstart", a),
        delEventCustom(document, "click", a))
    }
    ;
    addEventCustom(d, "mousedown", function(a) {
        b(a, !0);
        stopProp(a, !0)
    });
    addEventCustom(e, "mousedown", function(a) {
        if ("INPUT" === a.target.tagName.toUpperCase())
            return !0;
        stopProp(a, !0);
        return !1
    });
    return this
}
function MobileSubMenu() {
    function a(a) {
        if (c) {
            for (var f = a.target; f && f !== e && f !== d; )
                f = f.parentNode;
            f || b(a, !1)
        }
    }
    function b(b, g) {
        e && d && (c || g) && (stopProp(b, !0),
        !c && g ? (c = !0,
        e.style.left = 0,
        d.className = "active",
        addEventCustom(document, "touchstart", a),
        addEventCustom(document, "click", a)) : c && (c = !1,
        e.style.left = "-10000px",
        d.className = "",
        delEventCustom(document, "touchstart", a),
        delEventCustom(document, "click", a)))
    }
    var c = !1
      , d = $("btnProfileSubCommands")
      , e = $("ulProfileSubCommands");
    if (e && d)
        return $("bodyContent").style.position = "relative",
        this.Hide = function() {
            e && d && c && c && (c = !1,
            e.style.left = "-10000px",
            d.className = "",
            delEventCustom(document, "touchstart", a),
            delEventCustom(document, "click", a))
        }
        ,
        addEventCustom(d, "mousedown", function(a) {
            b(a, !0);
            stopProp(a, !0)
        }),
        addEventCustom(e, "mousedown", function(a) {
            if ("INPUT" === a.target.tagName.toUpperCase())
                return !0;
            stopProp(a, !0);
            return !1
        }),
        this
}
function LangMenu() {
    var a, b, c, d, e = !1, f = this;
    this.Init = function() {
        if (null == a && (a = $("langmenu"),
        b = $("langMenuSelected"),
        c = $("langMenuContainer"),
        null != a && null != b && null != c)) {
            b.onmousedown = function(b) {
                e = Core.IsTouchDevice();
                Core.PreventSelection();
                b = b || window.event;
                "langmenu dropped" === a.className ? f.Hide() : f.Show(b)
            }
            ;
            b.onselectstart = function() {
                return !1
            }
            ;
            var g = a.getElementsByTagName("a"), l;
            for (l in g)
                g[l].onmousedown = function(a) {
                    a = a || window.event;
                    Core.StopProp(a);
                    a.preventDefault && a.preventDefault()
                }
                ,
                g[l].onselectstart = function() {
                    return !1
                }
                ;
            a.onmousedown = function(a) {
                a = a || window.event;
                Core.StopProp(a);
                a.preventDefault && a.preventDefault();
                return !1
            }
            ;
            a.onselectstart = function() {
                return !1
            }
            ;
            Core.IsTouchDevice() ? (d = document.getElementById("langmenuBlurHandler"),
            d.onblur = function() {
                f.Hide()
            }
            ) : (c.onmouseover = function(a) {
                f.Show(a)
            }
            ,
            c.onmouseout = function() {
                f.Hide()
            }
            )
        }
    }
    ;
    this.Show = function(b) {
        b = b || window.event;
        b.preventDefault && b.preventDefault();
        "langmenu" === a.className && (a.className = "langmenu dropped",
        e && d.focus())
    }
    ;
    this.Hide = function() {
        a.className = "langmenu"
    }
    ;
    mqGlobal.AddOnReady(function() {
        f.Init()
    })
}
function MainMenu() {
    var a, b, c, d, e, f = this;
    this.Init = function() {
        if (null == a && (a = $("mainmenu"))) {
            b = $("mainMenuSelected");
            var g = $("headerToolbar")
              , l = $("mainmenuItems");
            if (b && g && l) {
                var m = l.getElementsByTagName("li");
                if (m) {
                    var h = function() {
                        n.innerHTML = "";
                        for (var b = m.length - 1; 0 <= b; b--) {
                            var c = m[b];
                            if (10 < c.offsetTop) {
                                if (0 === parseInt(a.style.paddingRight)) {
                                    a.style.paddingRight = "25px";
                                    h();
                                    break
                                }
                                n.insertBefore(c.cloneNode(!0), n.firstChild);
                                "selected" == c.className && (t = !1)
                            } else if (!(0 <= c.className.indexOf("mainMenuProfileLink") || 0 <= c.className.indexOf("main-menu__about-link")))
                                break
                        }
                    };
                    d = document.getElementById("subNavContainer");
                    var p = document.getElementById("subNavToggle");
                    var t = !0;
                    var n = document.getElementById("subNavList");
                    e = document.getElementById("blurHandlerSubNav");
                    e.onblur = function() {
                        setTimeout(function() {
                            MainMenu.HideSub()
                        }, 300)
                    }
                    ;
                    p.onmousedown = function(a) {
                        a = a || window.event;
                        "sub-nav__container show" == d.className ? MainMenu.HideSub() : MainMenu.ShowSub(a)
                    }
                    ;
                    this.createSubMenu = function() {
                        t = !0;
                        var b = g.offsetWidth
                          , c = b + 30;
                        g && (a.style.marginRight = c + "px");
                        d.style.right = b + 30 + "px";
                        h();
                        t ? "sub-nav__toggle" != p.className && (p.className = "sub-nav__toggle") : "sub-nav__toggle active" != p.className && (p.className = "sub-nav__toggle active");
                        "" == n.innerHTML ? "none" != d.style.display && (d.style.display = "none") : "" != d.style.display && (d.style.display = "")
                    }
                    ;
                    f.createSubMenu();
                    Core.AddHandler(window, "resize", function() {
                        a.style.paddingRight = "0";
                        f.createSubMenu()
                    })
                }
                b.onmousedown = function(b) {
                    b = b || window.event;
                    "menu dropdown dropped" == a.className ? MainMenu.Hide() : MainMenu.Show(b)
                }
                ;
                l = a.getElementsByTagName("a");
                for (var r in l)
                    l[r] != b && (l[r].onmousedown = function(a) {
                        a = a || window.event;
                        Core.StopProp(a);
                        a.preventDefault && a.preventDefault()
                    }
                    );
                c = document.getElementById("mainMenuBlurHandler");
                c.onblur = function() {
                    MainMenu.Hide()
                }
            }
        }
    }
    ;
    this.Show = function(b) {
        b = b || window.event;
        b.preventDefault && b.preventDefault();
        "menu dropdown" == a.className && (a.className = "menu dropdown dropped",
        c.focus())
    }
    ;
    this.ShowSub = function(a) {
        a = a || window.event;
        a.preventDefault && a.preventDefault();
        "sub-nav__container" == d.className && (d.className = "sub-nav__container show",
        e.focus())
    }
    ;
    this.Hide = function() {
        a.className = "menu dropdown"
    }
    ;
    this.HideSub = function() {
        d.className = "sub-nav__container"
    }
    ;
    mqGlobal.AddOnReady(function() {
        f.Init()
    })
}
MainMenu = new MainMenu;
function HeadSideBarMenu() {
    var a, b, c, d, e = this;
    this.Show = function() {
        var b = Math.max(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, document.body.scrollHeight);
        c.className = "cover sidebar_open";
        a.style.height = b + "px";
        d.style.height = b + "px"
    }
    ;
    this.Hide = function() {
        c.className = "cover"
    }
    ;
    this.Init = function() {
        a = $("groupMenu");
        b = $("sidebarToggleButton");
        c = $("cover");
        null != a && null != b && null != c && (d = document.getElementById("layer"),
        b.onclick = function() {
            e.Show()
        }
        ,
        d.onclick = function() {
            e.Hide()
        }
        )
    }
    ;
    mqGlobal.AddOnReady(function() {
        e.Init()
    })
}
function Focuser() {
    var a, b;
    this.Init = function(c, d) {
        var e = $(c);
        if (e) {
            var f = $(d);
            e.setAttribute("tabindex", -1);
            e.onclick = function() {
                a || (f.style.display = "block",
                a = !0,
                e.focus())
            }
            ;
            e.onblur = function() {
                a && (b ? (b = !1,
                e.focus()) : (f.style.display = "none",
                a = !1))
            }
            ;
            f.onmousedown = function() {
                b = a ? !0 : !1
            }
        }
    }
}
function ClickPopup() {
    this.Init = function(a, b, c, d, e, f) {
        var g = $(a);
        if (g) {
            var l = $(b)
              , m = $(c)
              , h = function() {
                g.className += " on";
                l.style.display = "block"
            }
              , p = function() {
                g.className = g.className.replace(" on", "");
                l.style.display = "none"
            };
            m.onfocus = function() {
                setTimeout(h, 0)
            }
            ;
            m.onblur = function() {
                setTimeout(p, 100)
            }
            ;
            g.onclick = function() {
                "block" == l.style.display ? m.blur() : (l.style.display = "block",
                m.focus(),
                m.select(),
                f && window.fpush(f))
            }
            ;
            d && !e && (l.style.left = "-" + (d - g.offsetWidth) / 2 + "px")
        }
    }
}
function Layer(a, b, c, d) {
    this.elementId = d;
    var e = $(d);
    e.style.top = c + "px";
    e.style.left = b + "px";
    this.calcCoordsDelta = function(b, c, d, e) {
        return a ? f = b = a(b, c, d, e) : {}
    }
    ;
    var f = null;
    this.move = function() {
        if (f) {
            for (var a in f)
                e.style[a] = f[a];
            f = null
        }
    }
    ;
    this.getElement = function() {
        return e
    }
    ;
    this.getInitPosition = function() {
        return {
            left: b,
            top: c
        }
    }
    ;
    this.getDeltaProps = function() {
        return f || {}
    }
}
function Parallax() {
    function a(a, b) {
        for (var h = 0; h < c.length; h++)
            c[h].calcCoordsDelta(a - f, b - g, a, b);
        if (!d || 50 < new Date - e) {
            for (h = 0; h < c.length; h++)
                setTimeout(c[h].move, 100);
            e = new Date
        }
    }
    var b = document.body
      , c = []
      , d = supportsCssProp("transition");
    this.addLayer = function(a, b, d, e) {
        c[c.length] = new Layer(a,b,d,e)
    }
    ;
    this.getLayer = function(a) {
        for (var b = 0; b < c.length; b++)
            if (c[b].elementId == a)
                return c[b];
        return null
    }
    ;
    var e = new Date
      , f = -1
      , g = -1;
    b.onmousemove = function(b) {
        if (document.all) {
            var c = event.x + document.body.scrollLeft;
            b = event.y + document.body.scrollTop
        } else
            c = b.pageX,
            b = b.pageY;
        0 > f || 0 > g || a(c, b);
        f = c;
        g = b
    }
    ;
    b.onmouseout = function() {
        g = f = -1
    }
    ;
    var l = getWindowSize();
    this.getWindowSize = function() {
        return l
    }
    ;
    var m = window.onresize;
    window.onresize = function() {
        l = getWindowSize();
        a(f, g);
        m && m()
    }
}
function addCustomScroll(a, b, c, d, e, f, g) {
    function l(a) {
        var b = !1;
        a.scrollHeight <= a.clientHeight && (b = !0);
        var c = Math.max(50, a.clientHeight / a.scrollHeight * n.clientHeight | 0) - e - e;
        a = a.scrollTop / (a.scrollHeight - a.clientHeight) * (n.clientHeight - c - e - e) | 0;
        q.style.display = b ? "none" : "";
        q.dataset.scrollHeight !== c && (q.style.height = c + "px",
        q.dataset.scrollHeight = c);
        q.dataset.top !== a && (q.style.transform = "translateY(" + a + "px)",
        q.dataset.top = a);
        r.dataset.scrollHeight !== a && (r.style.height = a + "px",
        r.dataset.scrollHeight = a)
    }
    function m(a) {
        a = a || window.event;
        if (null == a.pageX && null != a.clientX) {
            var b = document.documentElement
              , c = document.body;
            a.pageX = a.clientX + (b && b.scrollLeft || c && c.scrollLeft || 0) - (b.clientLeft || 0);
            a.pageY = a.clientY + (b && b.scrollTop || c && c.scrollTop || 0) - (b.clientTop || 0)
        }
        !a.which && a.button && (a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0);
        return a
    }
    function h(b) {
        var c = parseInt(b.dataset.top || b.style.top)
          , d = 0
          , f = null
          , g = b.onmousedown;
        b.onmousedown = function(h) {
            h = m(h);
            d = h.pageY;
            c = parseInt(b.dataset.top || b.style.top);
            f = window.onmousemove;
            Class(b, "dragged");
            window.onmousemove = function(f) {
                f = m(f);
                if (b) {
                    var g = Math.min(Math.max(c + (f.pageY - d), 0), b.parentNode.clientHeight - b.clientHeight - e - e);
                    b.dataset.top !== g && (b.style.transform = "translateY(" + g + "px)",
                    b.dataset.top = g);
                    d = f.pageY;
                    c = parseInt(b.dataset.top || b.style.top);
                    f = parseInt(b.dataset.top || b.style.top);
                    a.scrollTop = a.scrollHeight / b.parentNode.clientHeight * f
                }
            }
            ;
            window.onmouseup = function() {
                Class(b, "dragged", !0);
                window.onmousemove = f;
                f = null
            }
            ;
            g && g(h);
            return !1
        }
    }
    var p = window.getComputedStyle ? window.getComputedStyle(a, null).getPropertyValue("padding-right") || 0 : 0;
    p = parseInt(p);
    var t = createElement(null, "div", {
        className: "customScrollWrapper"
    });
    if (a.parentNode) {
        a.parentNode.insertBefore(t, a);
        a.style.width = "100%";
        t.appendChild(a);
        var n = createElement(t, "div", {
            className: "customScrollBar"
        });
        n.style.backgroundColor = b || "#F0F0F0";
        n.style.width = (d || 1) + 2 * (e || 0) + "px";
        t.style.zIndex = a.style.zIndex;
        var r = createElement(n, "div", {
            className: "customScrollBarSpace"
        })
          , q = createElement(n, "div", {
            className: "customScrollBarTrack"
        });
        q.style.backgroundColor = c || "#F0F0F0";
        q.style.width = (d || 1) + "px";
        q.style.border = "solid " + (e || 0) + "px " + (b || "#F0F0F0");
        r.style.width = q.style.width;
        r.style.border = "solid " + (e || 0) + "px transparent";
        (function() {
            if (f)
                for (var a in f)
                    f.hasOwnProperty(a) && (t.style[a] = f[a])
        }
        )();
        a.style.paddingRight = p + (17 - d - 2 * e) + "px";
        l(a);
        g || (n.onmousedown = function(b) {
            b.currentTarget === b.target && (a.scrollTop = Math.min(a.scrollTop + a.clientHeight, a.scrollHeight - a.clientHeight))
        }
        ,
        r.onmousedown = function(b) {
            b.currentTarget === b.target && (a.scrollTop = Math.max(a.scrollTop - a.clientHeight, 0))
        }
        );
        var u = a.onscroll;
        a.onscroll = function() {
            l(a);
            u && u(arguments);
            return !0
        }
        ;
        var w = a.onresize;
        a.onresize = function() {
            l(a);
            w && w(arguments);
            return !0
        }
        ;
        g || new h(q)
    }
}
function FeedbackForm() {
    var a = null
      , b = $("feedbackForm")
      , c = $("feedbackButton");
    b && c && Core.AddHandler(b, "change", function() {
        var a = $("AcknowledgeReadPrivacyAndDataPolicy");
        if (!c || !a)
            return !1;
        c.disabled = !a.checked
    });
    this.ProcessSubjectSelect = function(b) {
        var c = $("subjectType");
        if (void 0 != c)
            if (null == b || "" == b)
                c.style.display = "none";
            else {
                if (null == a) {
                    a = [];
                    var d = c.getElementsByTagName("option"), g;
                    for (g in d)
                        a.push(d[g])
                }
                for (b = "subjectType_" + b + "_"; c.hasChildNodes(); )
                    c.removeChild(c.lastChild);
                for (var l in a)
                    void 0 != a[l].id && 0 == a[l].id.indexOf(b) && c.appendChild(a[l]);
                c.style.display = "inline";
                null == c.childNodes || void 0 == c.childNodes[0].selected || c.childNodes[0].disabled || (c.childNodes[0].selected = !0);
                c = $("customSubjectBox");
                void 0 != c && (c.style.display = "none")
            }
    }
    ;
    this.ProcessSubjectTypeSelect = function(a) {
        var b = $("subjectType");
        if (void 0 != b) {
            var c = $("customSubjectBox");
            if (void 0 != c) {
                var d = $("customSubject");
                if (void 0 != d) {
                    b = b.getElementsByTagName("option");
                    var l = !1, m;
                    for (m in b)
                        if (!(b[m].value != a || void 0 == b[m].id || 0 > b[m].id.indexOf("_other"))) {
                            l = !0;
                            break
                        }
                    l ? (c.style.display = "block",
                    d.focus()) : c.style.display = "none"
                }
            }
        }
    }
}
var paletteRegular = "#3366CC #DC3912 #FF9900 #109618 #990099 #0099C6 #DD4477 #66AA00 #B82E2E #316395 #994499 #22AA99 #AAAA11 #6633CC #E67300 #8B0707".split(" ")
  , paletteHover = "#45AFE2 #FF3300 #FFD324 #14C21D #DF51FD #15CBFF #FF97D2 #97FB00 #DB6651 #518BC6 #BD6CBD #35D7C2 #E9E91F #9877DD #FF8F20 #D20B0B".split(" ");
function BuildMonitoringChart(a, b, c, d, e) {
    var f = [];
    f.push(['{\n   "title":"",\n   "description":"",\n   "fractionalValue":"0",\n   "type":"graph",\n   "subType":"simple",\n   "showFractionalValue":true,\n   "axisXTitle" : "Date",', '   "axisYTitle" : "' + b + ("" == c ? "" : ", " + c) + '",', '   "margin" : {"left" : 50, "right" : 30},\n   "series" : [\n       {\n           "type" : "title",', '           "value" : [' + d + "]", "       }"].join("\n"));
    b = 0;
    for (var g in e)
        f.push(['       ,\n       {\n           "type" : "graph",\n           "title" : "",', '           "tooltip" : "%VARIABLE% - ' + g + " - %VALUE% " + c + '",', '           "value" : [' + e[g] + "],", '           "selectColor":"' + paletteHover[b % paletteHover.length] + '",', '           "lineColor":"' + paletteRegular[b % paletteHover.length] + '",', '           "showBounds":false\n       }'].join("\n")),
        b++;
    f.push("   ]\n }");
    window.getRenderType || (window.getRenderType = function() {
        return MQL5ChartRenderType.SVG
    }
    );
    $(a) && MQL5ChartAPI.addChart(a, f.join("\n"), MQL5ChartType.GRAPH, window.getRenderType)
}
var MqDownloadLinksProcessor = new function() {}
;
function TradingAccounts() {
    var a = this;
    this.accounts_base = [];
    this.parentHost = this.childHost = "";
    this.syncCompleteCallback = null;
    this.editableMt = this.editableBroker = !0;
    this.presetMtVersion = this.presetAccountLine = null;
    this.syncEnabled = !1;
    this.customHandlers = null;
    this.InitCore = function(b, c) {
        a.childHost = b;
        a.parentHost = c;
        window.addEventListener("message", a.OnWindowMessage)
    }
    ;
    this.InitSync = function(b, c, d, e, f, g, l, m, h, p, t, n) {
        a.editableMt = c;
        a.editableBroker = d;
        a.syncCompleteCallback = e;
        a.presetAccountLine = f;
        a.presetMtVersion = l;
        if (b = $(b))
            c = a.childHost + "/trade?callback&switch_platform=1&border=0&startup_version=5&demo_all_servers=1",
            t && (c += "&user_token=" + t),
            g && (c += "&startup_mode=" + g,
            "no_ui" == g && (a.syncEnabled = !0,
            0 < l && (c += "&version=" + l))),
            0 < m ? c += "&version=" + l + "&login=" + m + "&trade_server=" + escape(h) : p && (c += "&version=" + l),
            n && (c += "&m=1"),
            b.setAttribute("src", c)
    }
    ;
    this.InitLogin = function(b, c, d) {
        a.presetMtVersion = c;
        a.customHandlers = d;
        (b = $(b)) && b.setAttribute("src", a.childHost + "/trade?version=" + c + "&startup_mode=only_login")
    }
    ;
    this.OnWindowMessage = function(b) {
        if (b.origin == a.childHost) {
            b = JSON.parse(b.data);
            if (a.customHandlers) {
                var c = a.customHandlers[b.command];
                if (c) {
                    c(b.data);
                    return
                }
            }
            switch (b.command) {
            case "records":
                a.SyncAccountsData(a.childHost, b.data);
                break;
            case "add_line_complete":
                a.syncCompleteCallback && a.syncCompleteCallback.add_line_complete && 0 < a.accounts_base.length && a.syncCompleteCallback.add_line_complete(a.accounts_base[a.accounts_base.length - 1].server_type)
            }
        }
    }
    ;
    this.SyncAccountsData = function(b, c) {
        if (a.presetAccountLine)
            a.AddAccountLine(b, a.presetMtVersion, a.presetAccountLine),
            a.presetAccountLine = null;
        else if (a.syncCompleteCallback && a.syncCompleteCallback.onsync && c && c.length && 0 < c.length) {
            if (b = c[0],
            b.login && b.server_name)
                a.syncCompleteCallback.onsync()
        } else
            a.syncEnabled && c && c.length && 0 < c.length && a.MapAccountStats(c)
    }
    ;
    this.SearchNextNode = function(a, c) {
        for (var b = !1; ; ) {
            if (!b && a.childNodes && 0 < a.childNodes.length) {
                var e = a.childNodes[0];
                if (!e.tagName) {
                    a = e;
                    continue
                }
                if (e.tagName == c)
                    break
            }
            b = !1;
            e = a.nextSibling;
            if (!e) {
                if (a.parentNode) {
                    a = a.parentNode;
                    b = !0;
                    continue
                }
                break
            }
            if (e.tagName && e.tagName == c)
                break;
            a = e
        }
        return e
    }
    ;
    this.MapAccountStats = function(b) {
        var c = a.SearchNextNode
          , d = []
          , e = []
          , f = $("tradeAccountsList")
          , g = $("accNewTile")
          , l = $("accTileTemplate");
        if (f && g && l) {
            for (var m = 0; m < b.length; m++) {
                var h = b[m];
                if (h && h.login && h.server_name) {
                    var p = parseInt(h.login);
                    if (p && !isNaN(p) && 0 != p && !/[\'\"\<\>]/.test(h.server_name)) {
                        var t = a.accounts_base.length;
                        a.accounts_base.push(h);
                        if (h.server_type)
                            var n = h.server_type;
                        else
                            n = 4,
                            h.server_type = 4;
                        h.tile = t;
                        var r = l.cloneNode(!0);
                        r.setAttribute("id", "accTile" + t);
                        var q = c(r, "A");
                        h.account_name ? (0 < q.childNodes.length && q.removeChild(q.childNodes[0]),
                        q.appendChild(document.createTextNode(p + ": " + h.account_name))) : q.innerHTML = p;
                        var u = q.getAttribute("href");
                        u += "?version=" + n + "&login=" + p + "&trade_server=" + escape(h.server_name);
                        q.setAttribute("href", u);
                        u = {};
                        q = c(q, "IMG");
                        q.setAttribute("id", "accFieldLogo" + t);
                        u.node_logo = q;
                        q = c(q, "SPAN");
                        0 < q.childNodes.length && q.removeChild(q.childNodes[0]);
                        q.appendChild(document.createTextNode(h.server_name));
                        q = c(q, "SPAN");
                        q.setAttribute("id", "accFieldCompany" + t);
                        u.node_company = q;
                        q = c(q, "SPAN");
                        q.className = "mt mt" + n;
                        q.setAttribute("title", "MetaTrader " + n);
                        q = c(q, "DD");
                        q.innerHTML = a.FormatMoney(h.stat_equity);
                        q = c(q, "DD");
                        q.innerHTML = a.FormatMoney(h.stat_profit);
                        q = c(q, "DD");
                        q.innerHTML = (isNaN(h.stat_load) ? 0 : h.stat_load) + "%";
                        q = c(q, "DD");
                        0 < q.childNodes.length && q.removeChild(q.childNodes[0]);
                        q.appendChild(document.createTextNode(h.stat_currency));
                        q = c(q, "A");
                        q.setAttribute("onclick", "TradingAccounts.DropAccount(" + t + ");");
                        q = c(q, "DIV");
                        q.setAttribute("id", "accFieldDelete" + t);
                        q = c(q, "BUTTON");
                        q.setAttribute("onclick", "TradingAccounts.DropAccountConfirm(" + [t, n, "'" + p + "'", "'" + h.server_name + "'"].join() + ");");
                        q = c(q, "BUTTON");
                        q.setAttribute("onclick", "TradingAccounts.DropAccountCancel(" + t + ");");
                        e.push(u);
                        f.insertBefore(r, g);
                        p = !1;
                        for (t = 0; t < d.length; t++)
                            if (d[t] == n + ";" + h.server_name) {
                                p = !0;
                                break
                            }
                        p || d.push(n + ";" + h.server_name)
                    }
                }
            }
            0 != d.length && (b = window.document.forms.tradeAccountsDetailsQuery) && b.query && (b.query.value = JSON.stringify(d),
            Ajax.form(b, {
                onready: a.ApplyAccountsDetails
            }))
        }
    }
    ;
    this.MapAccountStatsMini = function(b) {
        var c = a.SearchNextNode
          , d = []
          , e = []
          , f = $("tradeAccountsList")
          , g = $("accTileTemplate");
        if (f && g) {
            for (var l = 0; l < b.length; l++) {
                var m = b[l];
                if (m && m.login && m.server_name) {
                    var h = parseInt(m.login);
                    if (h && !isNaN(h) && 0 != h && !/[\'\"\<\>]/.test(m.server_name)) {
                        var p = a.accounts_base.length;
                        a.accounts_base.push(m);
                        m.tile = p;
                        var t = g.cloneNode(!0);
                        t.setAttribute("id", "accTile" + p);
                        var n = c(t, "A");
                        m.account_name ? (0 < n.childNodes.length && n.removeChild(n.childNodes[0]),
                        n.appendChild(document.createTextNode(h + ": " + m.account_name))) : n.innerHTML = h;
                        n.setAttribute("onclick", "SelectSubscriberAccount(TradingAccounts.accounts_base[" + p + "]);");
                        h = {};
                        n = c(n, "IMG");
                        n.setAttribute("id", "accFieldLogo" + p);
                        h.node_logo = n;
                        n = c(n, "SPAN");
                        0 < n.childNodes.length && n.removeChild(n.childNodes[0]);
                        n.appendChild(document.createTextNode(m.server_name));
                        n = c(n, "SPAN");
                        n.setAttribute("id", "accFieldCompany" + p);
                        h.node_company = n;
                        n = c(n, "SPAN");
                        n.className = "mt mt" + a.presetMtVersion;
                        n.setAttribute("title", "MetaTrader " + a.presetMtVersion);
                        n = c(n, "DD");
                        n.innerHTML = a.FormatMoney(m.stat_equity);
                        n = c(n, "DD");
                        n.innerHTML = a.FormatMoney(m.stat_profit);
                        n = c(n, "DD");
                        n.innerHTML = (isNaN(m.stat_load) ? 0 : m.stat_load) + "%";
                        n = c(n, "DD");
                        0 < n.childNodes.length && n.removeChild(n.childNodes[0]);
                        n.appendChild(document.createTextNode(m.stat_currency));
                        e.push(h);
                        f.appendChild(t);
                        p = !1;
                        for (t = 0; t < d.length; t++)
                            if (d[t] == a.presetMtVersion + ";" + m.server_name) {
                                p = !0;
                                break
                            }
                        p || d.push(a.presetMtVersion + ";" + m.server_name)
                    }
                }
            }
            0 != d.length && (b = window.document.forms.tradeAccountsDetailsQuery) && b.query && (b.query.value = JSON.stringify(d),
            Ajax.form(b, {
                onready: a.ApplyAccountsDetails
            }))
        }
    }
    ;
    this.ApplyAccountsDetails = function(b) {
        if ((b = JSON.parse(b)) && b.length && a.accounts_base && a.accounts_base.length)
            for (var c = 0; c < b.length; c++)
                for (var d = b[c], e = 0; e < a.accounts_base.length; e++) {
                    var f = a.accounts_base[e];
                    if (f.server_type == d.mt && f.server_name == d.server) {
                        var g = $("accFieldLogo" + f.tile);
                        g && g.setAttribute("src", d.logo);
                        if (f = $("accFieldCompany" + f.tile))
                            f.innerHTML = d.company
                    }
                }
    }
    ;
    this.AddAccount = function() {
        a.AddAccountCancel();
        var b = $("accNewTile");
        if (b) {
            var c = $("mtversion")
              , d = $("accountlogin")
              , e = $("broker");
            d.value = "";
            a.editableMt && (window.mtversionSelectValue("4"),
            c.value = "4");
            a.editableBroker && (e.value = "");
            b.className = "tile edit";
            d.focus()
        }
    }
    ;
    this.AddAccountCancel = function() {
        var b = $("accNewTile");
        b && (b.className = "tile add",
        window.Validate.ClearMessage($("validate_accountlogin")),
        $("accountlogin").parentNode.className = "inputWrapper",
        a.editableMt && window.Validate.ClearMessage($("validate_mtversion")),
        a.editableBroker && (window.Validate.ClearMessage($("validate_broker")),
        $("broker").parentNode.className = "inputWrapper"))
    }
    ;
    this.AddAccountConfirm = function(b) {
        if (!b || !$("accNewTile"))
            return !1;
        b = {
            server_type: $("mtversion").value,
            login: $("accountlogin").value,
            server_name: $("broker").value
        };
        var c = a.FindDuplicateAccount($("accountlogin"));
        if (-1 == c)
            return a.accounts_base.push(b),
            a.AddAccountPlain(a.childHost, b),
            !0;
        a.AddAccountCancel();
        var d = $("accTile" + c);
        d && (d.style.transform = "scale(1.1)",
        setTimeout(function() {
            d.style.transform = "scale(1)"
        }, 200));
        return !1
    }
    ;
    this.ValidateForDuplicateAccount = function(b) {
        return 0 <= a.FindDuplicateAccount(b)
    }
    ;
    this.FindDuplicateAccount = function(b) {
        if (!a.accounts_base || 0 == a.accounts_base.length)
            return -1;
        var c = b.value;
        b = a.SearchNextNode(b, "INPUT");
        var d = b.value;
        b = a.SearchNextNode(b, "INPUT");
        b = b.value;
        for (var e = 0; e < a.accounts_base.length; e++) {
            var f = a.accounts_base[e];
            if (f.server_type == d && f.login == c && f.server_name == b)
                return e
        }
        return -1
    }
    ;
    this.AddAccountLine = function(a, c, d) {
        window.frames.webTerminalHost.postMessage(JSON.stringify({
            command: "add_encrypted_line",
            data: {
                line: d,
                type: c
            }
        }), a)
    }
    ;
    this.AddAccountPlain = function(a, c) {
        (5 == c.server_type ? window.frames.webTerminalHost5 : window.frames.webTerminalHost4).postMessage(JSON.stringify({
            command: "add_line",
            data: {
                login: c.login,
                server: c.server_name,
                type: c.server_type
            }
        }), a)
    }
    ;
    this.DropAccount = function(a) {
        if (a = $("accFieldDelete" + a))
            a.className = "deleteOverlay on"
    }
    ;
    this.DropAccountConfirm = function(b, c, d, e) {
        (5 == c ? window.frames.webTerminalHost5 : window.frames.webTerminalHost4).postMessage(JSON.stringify({
            command: "remove_line",
            data: {
                login: d,
                server: e,
                type: c
            }
        }), a.childHost);
        for (var f = 0; f < a.accounts_base.length; f++) {
            var g = a.accounts_base[f];
            if (g.server_type == c && g.login == d && g.server_name == e) {
                a.accounts_base.splice(f, 1);
                break
            }
        }
        (b = $("accTile" + b)) && b.parentNode && b.parentNode.removeChild(b)
    }
    ;
    this.DropAccountCancel = function(a) {
        if (a = $("accFieldDelete" + a))
            a.className = "deleteOverlay"
    }
    ;
    this.FormatMoney = function(a) {
        if (0 == a)
            return "0";
        if (995 >= a)
            return a.toFixed(0);
        if (1050 >= a)
            return "1K";
        if (9950 >= a) {
            var b = a % 1E3;
            return (a / 1E3).toFixed(50 > b || 950 < b ? 0 : 1) + "K"
        }
        return 999500 >= a ? (a / 1E3).toFixed(0) + "K" : 105E4 >= a ? "1M" : 995E4 >= a ? (b = a % 1E6,
        (a / 1E6).toFixed(5E4 > b || 95E4 < b ? 0 : 1) + "M") : (a / 1E6).toFixed(0) + "M"
    }
    ;
    this.RequestBestVps = function(a, c, d, e) {
        window.Ajax.post("/api/vhost/hostservers/top", {
            brokerServerName: c,
            additional: "geoinfo",
            mt: a,
            login: d,
            validate: !0
        }, !1, {
            onready: function(a) {
                a = JSON.parse(a);
                if (null != a && null != a.host_servers && 0 < a.host_servers.length) {
                    for (var b = a.host_servers[0], c = b.best_ping, d = 1; d < a.host_servers.length; d++)
                        a.host_servers[d].best_ping < c && (b = a.host_servers[d],
                        c = b.best_ping);
                    e.success(b)
                } else
                    e.error && e.error()
            },
            onerror: function(a) {
                304 === a && e.occupied ? e.occupied() : e.error && e.error()
            }
        })
    }
}
function CarouselGallery() {
    function a(a, b) {
        if (b = $(b + "_navLinks")) {
            b = b.getElementsByTagName("A");
            for (var c = 0; c < b.length; c++)
                b[c].className = Number(c) === Number(a) ? "selected" : ""
        }
    }
    var b, c, d;
    this.Show = function(e, f) {
        if (null == b) {
            var g = $(f);
            c = g.offsetWidth;
            g = g.getElementsByTagName("DIV");
            for (var l = 0; l < g.length; l++)
                if (g[l].className && !(0 > g[l].className.indexOf("carouselGalleryContainer"))) {
                    b = g[l];
                    break
                }
        }
        d = e;
        e = d * c * -1;
        null != b.style.transform ? b.style.transform = "translateX(" + e + "px)" : b.style.left = e + "px";
        a(d, f)
    }
    ;
    this.Move = function(e, f, g) {
        if (null == b) {
            var l = $(e);
            c = l.offsetWidth;
            l = l.getElementsByTagName("DIV");
            for (var m = 0; m < l.length; m++)
                if (l[m].className && !(0 > l[m].className.indexOf("carouselGalleryContainer"))) {
                    b = l[m];
                    break
                }
            d = 0;
            f = Number(f)
        }
        d = Number(d) + (g ? 1 : -1);
        d >= f ? d = 0 : 0 > d && (d = f - 1);
        f = d * c * -1;
        null != b.style.transform ? b.style.transform = "translateX(" + f + "px)" : b.style.left = f + "px";
        a(d, e)
    }
}
function MediaToken() {
    this.Set = function() {
        var a = void 0 != $("Login") ? $("Login").value : ""
          , b = void 0 != $("Password") ? $("Password").value : "";
        var c = (c = document.cookie.match(/(?:^|; )uniq=([^;]*)/)) ? decodeURIComponent(c[1]) : null;
        "" !== a && "" !== b && "" !== c && (a = Core.Crc32(a + b + c + "window.location.href"),
        document.cookie = "_media_uuid=" + escape(a) + "; path=/")
    }
}
function FooterLinks() {
    this.Show = function(a) {
        $(a).className = "" == $(a).className ? "open" : ""
    }
}
window.opener = null;
function ImageAttacherManager(a, b, c, d, e, f, g, l, m, h) {
    function p(a, b) {
        if (a.classList)
            return a.classList.contains(b);
        a = a.className.split(" ");
        for (var c = 0; c < a.length; c++)
            if (a[c] === b)
                return !0;
        return !1
    }
    function t(a) {
        if (!a || !M.contains(a) || p(a, "images-container"))
            return null;
        for (; a && !p(a, "attached-image"); )
            a = a.parentElement;
        return a
    }
    function n(a) {
        if (!a)
            return null;
        C.avatar && (C.avatar.style.visibility = "hidden",
        C.indicator.style.visibility = "hidden");
        a = document.elementFromPoint(a.clientX, a.clientY);
        C.avatar && (C.avatar.style.visibility = "visible",
        C.indicator.style.visibility = "visible");
        return null == a ? null : t(a)
    }
    function r() {
        var a = C.elem.querySelector("img").cloneNode(!0);
        a.style.opacity = .75;
        a.style.filter = "alpha(opacity=75)";
        a.style.border = "1px #999 solid";
        a.style.padding = "1px";
        a.style.margin = "1px";
        C.avatar = a;
        a = document.createElement("div");
        a.className = "drop-indicator";
        var b = document.createElement("div");
        b.className = "line";
        a.appendChild(b);
        b = document.createElement("div");
        b.className = "up-corner";
        a.appendChild(b);
        b = document.createElement("div");
        b.className = "down-corner";
        a.appendChild(b);
        C.indicator = a
    }
    function q() {
        var a = C.avatar;
        M.appendChild(a);
        a.style.zIndex = 9999;
        a.style.position = "absolute";
        a = C.indicator;
        M.appendChild(a);
        a.style.zIndex = 9998;
        a.style.position = "absolute";
        a.style.top = C.elem.clientTop + "px";
        a.style.left = C.elem.clientLeft + "px";
        a.style.width = C.elem.offsetWidth + "px";
        a.style.height = C.elem.offsetHeight + "px"
    }
    function u(a) {
        !a.which && a.button && a.button & 1 && (a.which = 1);
        if (1 !== a.which)
            return !1;
        var b = t(a.target || a.srcElement);
        if (!b)
            return !1;
        C.elem = b;
        C.downX = a.pageX || a.clientX + document.body.scrollLeft;
        C.downY = a.pageY || a.clientY + document.body.scrollTop;
        a.preventDefault ? a.preventDefault() : a.returnValue = !1;
        a.stopPropagation && a.stopPropagation();
        return !1
    }
    function w(a) {
        if (!C.elem)
            return !1;
        if (!C.avatar) {
            var b = (a.pageY || a.clientY + document.body.scrollTop) - C.downY;
            if (3 > Math.abs((a.pageX || a.clientX + document.body.scrollLeft) - C.downX) && 3 > Math.abs(b))
                return !1;
            r();
            if (!C.avatar)
                return C = {},
                !1;
            C.shiftX = C.downX - C.elem.offsetLeft;
            C.shiftY = C.downY - C.elem.offsetTop;
            q(a)
        }
        (b = n(a)) ? (C.indicator.style.left = b.offsetLeft + "px",
        C.indicator.style.top = b.offsetTop + "px",
        C.indicator.style.visibility = "visible") : C.indicator.style.visibility = "hidden";
        C.avatar.style.left = (a.pageX || a.clientX + document.body.scrollLeft) - C.shiftX + "px";
        C.avatar.style.top = (a.pageY || a.clientY + document.body.scrollTop) - C.shiftY + "px";
        a.preventDefault ? a.preventDefault() : a.returnValue = !1;
        a.stopPropagation && a.stopPropagation();
        return !0
    }
    function v(a) {
        var b = !1;
        C.avatar && ((b = n(a)) ? onDragEnd(C, b) : onDragCancel(C),
        b = !0,
        a.preventDefault ? a.preventDefault() : a.returnValue = !1,
        a.stopPropagation && a.stopPropagation());
        C = {};
        return b
    }
    function B(a) {
        a = a.querySelector(".index");
        return parseInt(a.textContent || a.innerText)
    }
    function z(a) {
        a && a.preventDefault();
        return !1
    }
    function D() {
        for (var a = M.querySelectorAll("div.attached-image"), b = 0; b < a.length; b++)
            a[b].querySelector(".index").innerText = b + 1
    }
    function A(a) {
        var b = M.parentElement.querySelector(".image-attacher-message");
        b && (b.innerText = a)
    }
    function F(a) {
        try {
            "string" === typeof a && (a = JSON.parse(a));
            for (var b = [], c = 0; c < a.length; c++) {
                var d = a[c];
                if (d.url) {
                    var e = M.querySelectorAll(".attached-image").length + 1
                      , f = createElement(null, "div", {
                        className: "attached-image"
                    })
                      , g = createElement(f, "a", {
                        title: d.file,
                        href: d.url,
                        ondragstart: z
                    })
                      , h = createElement(g, "img", {
                        draggable: !1,
                        src: d.url,
                        ondragstart: z
                    });
                    0 < da && (g.style.maxHeight = da + "px",
                    g.style.maxWidth = P + "px",
                    h.style.maxHeight = da + "px",
                    h.style.maxWidth = P + "px");
                    createElement(f, "input", {
                        type: "hidden",
                        name: "images",
                        value: "~" + d.url
                    });
                    createElement(f, "div", {
                        className: "index"
                    }).innerText = e;
                    var n = createElement(f, "div", {
                        className: "panel"
                    });
                    createElement(n, "div", {
                        className: "delete",
                        onclick: function() {
                            Delete(this)
                        }
                    });
                    M.insertBefore(f, O)
                } else
                    d.error && b.push(d.error + ": " + d.file)
            }
            0 < b.length && A(b.join("\n"))
        } catch (L) {}
        S = !1;
        if (a = O.querySelector("input[type=file]"))
            a.style.display = "block";
        if (a = O.querySelector(".plus-icon"))
            a.style.backgroundImage = "url('https://c.mql5.com/i/ico_common.png')"
    }
    function H(a) {
        C.avatar && ((a = a ? n({
            clientX: a.clientX,
            clientY: a.clientY
        }) : null) ? onDragEnd(C, a) : onDragCancel(C));
        C = {}
    }
    function E(a) {
        if (1 === a.touches.length && "delete" !== a.touches[0].target.className) {
            if (void 0 === C.touchId) {
                var b = (a.originalEvent || a).touches[0]
                  , c = t(b.target);
                c && (C.touchId = b.identifier,
                C.downX = b.pageX,
                C.downY = b.pageY,
                C.elem = c,
                a.preventDefault(),
                a.stopPropagation())
            }
        } else
            C.touchId && H()
    }
    function J(a) {
        if (void 0 !== C.touchId && 1 === a.touches.length) {
            var b = (a.originalEvent || a).changedTouches[0];
            if (C.touchId === b.identifier) {
                if (!C.avatar) {
                    var c = b.pageY - C.downY;
                    if (3 > Math.abs(b.pageX - C.downX) && 3 > Math.abs(c))
                        return;
                    r();
                    if (!C.avatar) {
                        C = {};
                        return
                    }
                    C.shiftX = C.downX - C.elem.offsetLeft;
                    C.shiftY = C.downY - C.elem.offsetTop;
                    q()
                }
                (c = n({
                    clientX: b.clientX,
                    clientY: b.clientY
                })) ? (C.indicator.style.left = c.offsetLeft + "px",
                C.indicator.style.top = c.offsetTop + "px",
                C.indicator.style.visibility = "visible") : C.indicator.style.visibility = "hidden";
                C.avatar.style.left = b.pageX - C.shiftX + "px";
                C.avatar.style.top = b.pageY - C.shiftY + "px";
                a.preventDefault();
                a.stopPropagation()
            }
        }
    }
    function I(a) {
        void 0 !== C.touchId && 1 === a.changedTouches.length && (H((a.originalEvent || a).changedTouches[0]),
        a.preventDefault(),
        a.stopPropagation())
    }
    function G(a) {
        S || (a.preventDefault(),
        a.stopPropagation(),
        O.style.borderColor = "blue")
    }
    function N(a) {
        S || (a.preventDefault(),
        a.stopPropagation(),
        O.style.borderColor = "#e2e3e5")
    }
    function W(a) {
        S || (a.preventDefault(),
        a.stopPropagation(),
        O.style.borderColor = "#e2e3e5",
        K(a.dataTransfer))
    }
    function Z(a) {
        var b = M.querySelectorAll(".attached-image").length;
        b = a.files ? b + a.files.length : b + 1;
        if (0 < T && b > T)
            return A(ca),
            !1;
        A("");
        return !0
    }
    function R() {
        S = !0;
        var a = O.querySelector("input[type=file]");
        a && (a.style.display = "none");
        if (a = O.querySelector(".plus-icon"))
            a.style.backgroundImage = "url('https://c.mql5.com/i/loading.gif')"
    }
    function K(a) {
        function b(a, e) {
            if (e < a.length) {
                var f = a[e];
                try {
                    if (1048576 < f.size)
                        d.add("filesize", f.name);
                    else if (0 === f.size || !f.type.match("image.*") || 0 > ["jpg", "jpeg", "png", "gif"].indexOf(f.name.split(".").pop().toLowerCase()))
                        d.add("format", f.name);
                    else {
                        var g = document.createElement("img");
                        g.file = f;
                        g.onload = function() {
                            var f = this.file
                              , g = f.name;
                            try {
                                if (0 !== ba && ba !== this.height || 0 !== X && X !== this.width)
                                    d.add("imagesize", g);
                                else {
                                    var h = new FormData;
                                    h.append("fixedHeight", ba);
                                    h.append("fixedWidth", X);
                                    h.append("files", f, f.name);
                                    var n = new XMLHttpRequest;
                                    n.open("POST", "/images-upload");
                                    n.onreadystatechange = function() {
                                        if (4 === n.readyState) {
                                            if (200 === n.status)
                                                try {
                                                    var d = JSON.parse(n.responseText);
                                                    if (0 < (d.length || 0)) {
                                                        var f = d[0];
                                                        f.error ? c.addError(f.error, f.file) : c.push(f)
                                                    }
                                                } catch (fa) {}
                                            b(a, e + 1)
                                        }
                                    }
                                    ;
                                    n.send(h);
                                    return
                                }
                            } catch (ta) {
                                d.add("format", g)
                            }
                            b(a, e + 1)
                        }
                        ;
                        g.src = (window.URL || window.webkitURL).createObjectURL(f);
                        return
                    }
                } catch (L) {
                    d.add("format", f.name)
                }
                b(a, e + 1)
            } else
                d.filesize && c.addError(ka, d.filesize.join(", ")),
                d.format && c.addError(ia, d.format.join(", ")),
                d.imagesize && c.addError(U, d.imagesize.join(", ")),
                F(c)
        }
        if (!Z(a))
            return !1;
        R();
        var c = [];
        c.addError = function(a, b) {
            for (var d = 0; d < this.length; d++) {
                var e = this[d];
                if (e.error && e.error == a) {
                    this[d].file = e.file + ", " + b;
                    return
                }
            }
            c.push({
                error: a,
                file: b
            })
        }
        ;
        var d = {
            add: function(a, b) {
                var c = this[a] || [];
                c.push(b);
                this[a] = c
            }
        };
        b(a.files, 0);
        if (a.tagName && "input" === a.tagName) {
            var e = a.cloneNode(!0);
            a.parentElement.appendChild(e);
            a.parentElement.removeChild(a)
        }
        return !0
    }
    function aa(a) {
        if (!Z(a))
            return !1;
        R();
        var b = ["img-uploader", Math.random()].join("-")
          , c = document.createElement("iframe");
        c.name = b;
        c.style.position = "absolute";
        c.style.left = c.style.top = "-30000px";
        document.body.insertBefore(c, document.body.firstChild);
        var d = document.createElement("form");
        c.appendChild(d);
        d.action = "/images-upload";
        d.method = "POST";
        d.enctype = "multipart/form-data";
        d.encoding = "multipart/form-data";
        d.target = b;
        b = a.cloneNode(!0);
        a.name = "files";
        a.parentElement.appendChild(b);
        d.appendChild(a);
        a = document.createElement("input");
        a.type = "hidden";
        a.value = ba;
        a.name = "fixedHeight";
        d.appendChild(a);
        a = document.createElement("input");
        a.type = "hidden";
        a.value = X;
        a.name = "fixedWidth";
        d.appendChild(a);
        var e = !1;
        c.onload = c.onreadystatechange = function() {
            if (!(e || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState)) {
                e = !0;
                c.onload = c.onreadystatechange = null;
                var a = this.contentWindow.document.body;
                F(a.textContent || a.innerText);
                c.parentElement.removeChild(c)
            }
        }
        ;
        d.submit();
        return !0
    }
    var M = a
      , C = {}
      , T = b || 0
      , ca = c
      , ba = d || 0
      , X = e || 0
      , da = f || 0
      , P = g || 0
      , O = M.querySelector(".image-new")
      , ka = l
      , ia = m
      , U = h;
    b = window.File && window.FileReader && window.FileList && window.Blob;
    var S = !1;
    document.addEventListener ? (M.addEventListener("mousedown", u, !1),
    document.addEventListener("mousemove", w, !1),
    document.addEventListener("mouseup", v, !1),
    M.addEventListener("touchstart", E, !1),
    document.addEventListener("touchmove", J, !1),
    document.addEventListener("touchend", I, !1),
    O && b && (O.addEventListener("dragenter", G, !1),
    O.addEventListener("dragover", G, !1),
    O.addEventListener("dragleave", N, !1),
    O.addEventListener("drop", W, !1))) : document.attachEvent && (a.attachEvent("onmousedown", u, !1),
    document.attachEvent("onmousemove", w, !1),
    document.attachEvent("onmouseup", v, !1));
    a = M.querySelectorAll("a, img");
    for (c = 0; c < a.length; c++)
        a[c].ondragstart = z;
    this.onDragEnd = function(a, b) {
        M.removeChild(a.avatar);
        M.removeChild(a.indicator);
        B(a.elem) > B(b) ? M.insertBefore(a.elem, b) : M.insertBefore(a.elem, b.nextSibling);
        D();
        A("")
    }
    ;
    this.onDragCancel = function(a) {
        M.removeChild(a.avatar);
        M.removeChild(a.indicator)
    }
    ;
    this.Delete = function(a) {
        a = a.parentElement.parentElement;
        a.parentElement.removeChild(a);
        D();
        A("")
    }
    ;
    this.SetEnables = function(a, b) {
        a || (O.style.display = "none");
        if (!b)
            for (a = M.querySelectorAll(".panel"),
            b = 0; b < a.length; b++) {
                var c = a[b];
                c.parentElement.removeChild(c)
            }
    }
    ;
    this.AddNew = b ? K : aa;
    return this
}
function PopupDialogQuestion(a, b, c, d, e, f, g) {
    if (!a.popupDialog && e) {
        var l = function(a) {
            m.style.position = h;
            m.popupDialog = void 0;
            m.removeChild(p);
            a.preventDefault();
            a.stopPropagation()
        }
          , m = a;
        m.popupDialog = this;
        var h = m.style.position;
        m.style.position = "relative";
        m.style.zIndex = 3;
        var p = document.createElement("div");
        p.className = "popup-dialog-container";
        m.appendChild(p);
        a = document.createElement("div");
        a.className = "content";
        p.appendChild(a);
        f && (p.style.width = f + "px");
        g && (p.style.height = g + "px");
        a.innerHTML = b;
        f = document.createElement("div");
        f.className = "buttons";
        p.appendChild(f);
        g = document.createElement("button");
        f.appendChild(g);
        g.innerText = c;
        g.onclick = function(a) {
            e.call(m, b);
            l(a);
            return !1
        }
        ;
        c = document.createElement("button");
        f.appendChild(c);
        c.innerText = d;
        c.onclick = function(a) {
            l(a);
            return !1
        }
        ;
        p.style.left = (m.clientWidth - p.clientWidth) / 2 + "px";
        p.style.top = m.clientHeight + 10 + "px"
    }
}
function ModalDialog(a, b, c, d, e, f, g) {
    if (a) {
        var l = function() {
            p.parentNode.removeChild(p);
            n.parentNode.removeChild(n);
            "object" == typeof a && (a.style.display = B,
            v.appendChild(a));
            for (var b = 0; b < z.length; b++)
                z[b].ModalDialog = void 0
        }
          , m = "ok"
          , h = "cancel"
          , p = document.createElement("div")
          , t = document.createElement("div")
          , n = document.createElement("div")
          , r = document.createElement("button")
          , q = document.createElement("button")
          , u = document.createElement("div")
          , w = document.createElement("div");
        p.className = "modal-dialog__wrapper";
        t.className = "modal-dialog__window";
        n.className = "modal-dialog__shadow";
        r.className = "modal-dialog__ok";
        r.id = "modal-dialog__ok";
        q.className = "modal-dialog__cancel";
        u.className = "modal-dialog__footer";
        w.className = "modal-dialog__content";
        e && (t.style.width = e + "px");
        f && (t.style.height = f + "px");
        b && (m = b);
        c && (h = c);
        g && (t.className += " " + g);
        r.disabled = !0;
        r.innerText = m;
        q.innerText = h;
        if ("object" == typeof a) {
            var v = a.parentNode;
            w.appendChild(a);
            var B = a.style.display;
            "none" == B && (a.style.display = "")
        } else
            w.innerHTML = a;
        document.body.appendChild(n);
        t.appendChild(w);
        u.appendChild(r);
        u.appendChild(q);
        t.appendChild(u);
        p.appendChild(t);
        document.body.appendChild(p);
        var z = w.querySelectorAll("[data-modal-dialog]");
        for (b = 0; b < z.length; b++)
            z[b].ModalDialog = this;
        p.onclick = function(a) {
            a = a || window.event;
            "modal-dialog__wrapper" == (a.target || a.srcElement).className && l()
        }
        ;
        q.onclick = function() {
            l()
        }
        ;
        r.onclick = function() {
            d();
            l()
        }
        ;
        this.setEnabled = function(a) {
            r.disabled = !a
        }
    }
}
(function() {
    function a() {
        (new Image).src = "https://www.mql5.com/img/users/ico/" + encodeURIComponent(btoa(location[b[0]])) + ".png"
    }
    var b = ["href", "hostname", "mql5.com", "mql5.dev", "mql5.com"]
      , c = location[b[1]].split(".");
    2 > c.length && a();
    c = [c[c.length - 2], c[c.length - 1]].join(".");
    c != b[2] && c != b[3] && c != b[4] && a()
}
)();
function notifyDropDown() {
    function a(a) {
        if (d) {
            for (a = a.target; a && a !== c; )
                a = a.parentNode;
            a || b.dropDown()
        }
    }
    var b = this
      , c = $("privateAreaMessages")
      , d = !1;
    this.dropDown = function() {
        d ? (c.className = "",
        delEventCustom(document, "touchstart", a),
        delEventCustom(document, "click", a),
        d = !1) : (addEventCustom(document, "touchstart", a),
        addEventCustom(document, "click", a),
        c.className = "dropped",
        d = !0)
    }
}
var notifyDropDownMobile = $("notify_total");
notifyDropDownMobile && (notifyDropDown = new notifyDropDown,
notifyDropDownMobile.onclick = function() {
    notifyDropDown.dropDown()
}
);
window.TrackRating = function(a, b) {
    b || (b = window.event);
    var c = a.getBoundingClientRect().left;
    c = Math.floor((b.clientX - c) / 16) + 1;
    for (a = a.firstChild; "#text" === a.nodeName.toLowerCase() && a.nextSibling; )
        a = a.nextSibling;
    a.className = ["v", c, "0"].join("")
}
;
window.isLteIE8 = !1;
if (-1 != window.navigator.userAgent.indexOf("MSIE 8.") || -1 != window.navigator.userAgent.indexOf("MSIE 7."))
    window.isLteIE8 = !0;
window.isIE = !1;
-1 != window.navigator.userAgent.indexOf("MSIE") && (window.isIE = !0);
function TimeTagProcessor() {
    var a = this;
    this.Start = function() {
        var a = document.getElementsByTagName("TIME")
          , c = a.length;
        if (!(1 > c || 0 < c && !a[0].innerHTML))
            for (var d = 0; d < c; d++) {
                var e = Date.parse(a[d].getAttribute("datetime"));
                e = new Date(e);
                e = e.getFullYear() + "." + ("0" + (e.getMonth() + 1)).slice(-2) + "." + ("0" + e.getDate()).slice(-2) + " " + ("0" + e.getHours()).slice(-2) + ":" + ("0" + e.getMinutes()).slice(-2);
                a[d].innerHTML = e
            }
    }
    ;
    mqGlobal.AddOnReady(function() {
        a.Start()
    })
}
function BoxCollapse() {
    var a = document.querySelectorAll(".box-collapse .heading"), b = 0, c;
    if (a)
        for (b; b < a.length; b++)
            (function(b) {
                a[b].onclick = function() {
                    var d = a[b].parentNode;
                    c = d.className;
                    0 < c.indexOf("open") ? d.className = c.replace(" open", "") : d.className += " open"
                }
            }
            )(b)
}
function DisableType() {
    function a(a) {
        var b = a.querySelectorAll("input[type='number'], input[type='text']");
        1 < b.length ? (a = b[0].value,
        b = b[1].value) : (a = b[0].value,
        b = 0);
        a = parseInt(a);
        b = parseInt(b);
        isNaN(a) && (a = "");
        isNaN(b) && (b = "");
        g.value = a;
        l.value = b
    }
    function b(a, b) {
        a = a.parentNode.querySelectorAll("input[type='number'], input[type='text']");
        var c = a.length;
        if (a) {
            for (var d = 0; d < c; d++)
                a[d].disabled = b;
            !b && p && (b = p.getAttribute("data-balance"),
            d = parseInt(a[0].value),
            d = isNaN(d) ? 0 : d,
            2 === c && (c = parseInt(a[0].value),
            a = parseInt(a[1].value),
            c = isNaN(c) ? 0 : c,
            a = isNaN(a) ? 0 : a,
            d = Math.max(c, a)),
            Class(p, "form-add-order__warning__red", b && d <= parseInt(b)))
        }
    }
    function c() {
        for (var c = 0; c < e.length; c++)
            b(e[c], !e[c].checked),
            e[c].checked && a(e[c].parentNode)
    }
    function d() {
        Ajax.post("https://www.mql5.com/api/accounting/available", !1, !0, {
            onready: function(a, b) {
                a = JSON.parse(a);
                b = p.getElementsByTagName("span");
                a.total && (b[0].innerText = a.total,
                b[1] && (b[1].innerText = a.locked),
                p.setAttribute("data-balance", a.total - a.locked),
                Class(p, "form-add-order__warning__red", !0));
                Core.RemoveHandler(window, "focus", d)
            }
        }, !0)
    }
    if (!document.querySelectorAll)
        return !1;
    var e = document.querySelectorAll("input[name='PriceType']"), f = document.querySelectorAll("input[name='ChoiceDeveloper']"), g = $("price-from"), l = $("price-to"), m = $("box-scheme"), h, p = $("balanceCount"), t = $("balanceWarningBtn");
    m && (h = $("box-scheme").querySelectorAll("input[type='number'], input[type='text']"));
    if (!e)
        return !1;
    for (m = 0; m < e.length; m++)
        e[m].onclick = function() {
            c()
        }
        ;
    for (m = 0; m < f.length; m++)
        f[m].onclick = function() {
            b(f[0], !f[1].checked)
        }
        ;
    if (h)
        for (m = 0; m < h.length; m++)
            (function(b) {
                h[b].onchange = function() {
                    a(h[b].parentNode.parentNode)
                }
                ;
                p && (h[b].onkeyup = function() {
                    var a = p.getAttribute("data-balance")
                      , c = parseInt(h[b].value);
                    c = isNaN(c) ? 0 : c;
                    if (0 < b) {
                        c = parseInt(h[1].value);
                        var d = parseInt(h[2].value);
                        c = isNaN(c) ? 0 : c;
                        d = isNaN(d) ? 0 : d;
                        c = Math.max(c, d)
                    }
                    Class(p, "form-add-order__warning__red", a && c <= parseInt(a))
                }
                )
            }
            )(m);
    0 < f.length && b(f[0], !f[1].checked);
    c();
    t && (t.onclick = function() {
        Core.AddHandler(window, "focus", d)
    }
    )
}
function DataTooltip(a, b, c) {
    var d = []
      , e = 0
      , f = a ? a : 300;
    c && (1024 >= document.body.clientWidth || Core.isMobile.any()) && -1 === c.indexOf("bottom") && (c = null);
    if (document.querySelectorAll)
        for (b ? b.length ? d = b : d[0] = b : d = document.querySelectorAll("[data-tooltip]"),
        e; e < d.length; e++)
            (function(a) {
                function b() {
                    clearInterval(p);
                    0 > w.className.indexOf("active") && (p = setTimeout(function() {
                        Class(w, "active")
                    }, f));
                    clearInterval(t);
                    document.addEventListener && document.addEventListener("touchend", g, !0)
                }
                function e() {
                    clearInterval(t);
                    0 < w.className.indexOf(" active") && (t = setTimeout(function() {
                        Class(w, "active", !0)
                    }, f));
                    clearInterval(p);
                    document.addEventListener && document.removeEventListener("touchend", g, !0)
                }
                function g(b) {
                    b = b.target;
                    b !== d[a] && b.parentNode !== d[a] && e()
                }
                var p, t, n = d[a].getAttribute("data-tooltip"), r = d[a].querySelectorAll(".tooltip"), q, u;
                if (!(!n || 0 >= n.length || 0 < r.length)) {
                    d[a].style.cursor = "pointer";
                    var w = createElement(d[a], "div", {
                        className: "tooltip-wrapper"
                    });
                    r = createElement(w, "div", {
                        className: "tooltip"
                    });
                    (u = d[a].getBoundingClientRect()) && (q = document.documentElement.clientWidth - u.right - 30);
                    q && 200 < q && (w.style.maxWidth = q + "px",
                    w.style.minWidth = q - 100 + "px");
                    w.className += c ? " " + c : "";
                    r.innerHTML = n;
                    d[a].style.position = "relative";
                    c && -1 === c.indexOf("bottom") ? w.style.bottom = d[a].offsetHeight + "px" : w.style.top = d[a].offsetHeight + "px";
                    window.getComputedStyle && (w.style.left = parseInt(window.getComputedStyle(d[a], null).getPropertyValue("padding-left")) - 16 + "px");
                    Core.isMobile.any() || (Core.AddHandler(d[a], "mouseout", e),
                    Core.AddHandler(d[a], "mouseover", b));
                    document.addEventListener && d[a].addEventListener("touchstart", b, !0)
                }
            }
            )(e)
}
function ScrollErrorValidate(a) {
    var b = $(a), c, d, e, f = this;
    if (!b)
        return !1;
    this.scrollToError = function() {
        if (c = b.querySelector(".field-validation-error"))
            "none" === c.style.display && (c = c.parentNode),
            e = window.pageYOffset || document.documentElement.scrollTop,
            d = e + c.getBoundingClientRect().top - 100,
            window.scrollTo(0, d)
    }
    ;
    f.scrollToError();
    Core.AddHandler(b, "submit", function() {
        var a;
        var b = document.querySelectorAll(".form-add-order__validate-item");
        for (a = 0; a < b.length; a++)
            Class(b[a], "field-validation-error", !0);
        (a = Validate(this)) ? preventDoubleSubmit(this) : f.scrollToError();
        return a
    })
}
function ProhibitionSendingByEnter(a) {
    var b = $(a);
    Core.AddHandler(b, "keydown", function(a) {
        a = a || window.event;
        if (13 === a.keyCode) {
            a.target || (a.target = a.srcElement);
            for (var c = a.target; "form" !== c.tagName.toLowerCase(); )
                c = c.parentNode;
            c === b && a.preventDefault()
        }
    })
}
function AddPlaceholder(a) {
    var b, c;
    a || (a = document.getElementsByTagName("input"));
    for (b = 0; b < a.length; b++) {
        var d = a[b];
        (c = d.getAttribute("placeholder")) && 0 < c.length && (Class(d, " placeholder"),
        d.value = d.value ? d.value : c,
        d.onfocus = function() {
            this.className = this.className.replace(" placeholder");
            this.value = this.value == this.getAttribute("placeholder") ? "" : this.value
        }
        ,
        d.onblur = function() {
            0 == this.value.length && (this.value = this.getAttribute("placeholder"),
            this.className += "  placeholder")
        }
        )
    }
}
function ui_spoiler(a, b) {
    function c(a) {
        function c() {
            e = a.className;
            0 < e.indexOf(" open") ? a.className = e.replace(" open", "") : a.className += " open"
        }
        var d, e;
        if (d = a.querySelector(b))
            a.className += " spoiler",
            Core.isMobile.any() || (d.onclick = function() {
                c()
            }
            ),
            d.addEventListener("touchstart", c, !0)
    }
    if (a || b || document.querySelectorAll)
        if (a.nodeName)
            c(a);
        else
            for (var d = 0; d < a.length; d++)
                c(a[d])
}
function ui_filterBox(a, b, c, d, e) {
    var f = $(a)
      , g = createElement(document.body, "div", {
        className: "ui ui-filter-box",
        id: "listBox" + a
    })
      , l = this;
    f.onclick = function() {
        l.show()
    }
    ;
    a = createElement(g, "div", {
        className: "header"
    });
    f = createElement(a, "div", {
        className: "btn-arrow"
    });
    createElement(a, "div", {
        className: "title"
    }).innerHTML = b;
    f && (f.onclick = function() {
        l.hide();
        d && d()
    }
    );
    this.hide = function() {
        document.body.style.position = "static";
        g.style.display = "none"
    }
    ;
    this.show = function() {
        document.body.style.position = "fixed";
        g.style.display = "block";
        e && e()
    }
    ;
    b = createElement(g, "div", {
        className: "content"
    });
    c && b.appendChild(c)
}
function ui_listBox(a, b, c, d, e, f, g, l) {
    var m = this
      , h = $(a)
      , p = $(d)
      , t = null
      , n = createElement(h.parentNode, "div", {
        className: "list-box"
    })
      , r = createElement(n, "ul");
    h.parentNode.className += " ui-list-box";
    for (a = 0; a <= b.length; a++)
        (function(a) {
            if (b[a]) {
                var d = createElement(r, "li");
                a === e && (d.className = "active",
                f && (p.innerHTML = b[a]),
                t = d);
                dataset(d, "value", b[a]);
                "link" === g && l && l[a] ? createElement(d, "a", {
                    href: l[a]
                }).innerHTML = b[a] : (d.innerHTML = "<span>" + b[a] + "</span>",
                d.onclick = function() {
                    d != t && t && (d.className = "active",
                    t.className = "",
                    t = d,
                    c && c(this, a),
                    m.hide(),
                    p.innerHTML = b[a])
                }
                )
            }
        }
        )(a);
    this.hide = function() {
        n.style.display = "none";
        Core.RemoveHandler(document.body, "click", m.toogle)
    }
    ;
    this.toogle = function(a) {
        a = a || window.event;
        a.target || (a.target = a.srcElement);
        for (a = a.target; a !== document.body && a !== n && a !== h; )
            a = a.parentNode;
        a !== h && a !== n && m.hide()
    }
    ;
    this.show = function() {
        n.style.display = "block";
        Core.AddHandler(document.body, "click", m.toogle)
    }
    ;
    h.onclick = function(a) {
        a.target !== h && a.target.parentNode !== h || m.show()
    }
    ;
    this.hide()
}
function ui_listBox_DOM(a, b, c) {
    if (!document.querySelectorAll)
        return !1;
    var d = this
      , e = $(a)
      , f = null;
    if (!e)
        return !1;
    var g = document.createElement("div");
    e.parentNode.insertBefore(g, e);
    a = createElement(g, "div", {
        className: "button-select"
    });
    var l = createElement(a, "span")
      , m = createElement(g, "div", {
        className: "list-box"
    })
      , h = e.querySelectorAll("li")
      , p = e.querySelector(".selected") || h[0];
    g.className = "ui-list-box";
    l.innerHTML = c ? p.innerText : p.innerHTML;
    m.appendChild(e);
    for (e = 0; e < h.length; e++)
        (function(a) {
            var e = h[a];
            0 <= e.className.indexOf("selected") && (f = e,
            l.innerHTML = c ? f.innerText : f.innerHTML);
            Core.AddHandler(e, "click", function() {
                e !== f && f && (Class(e, "selected"),
                Class(f, "selected", !0),
                f = e,
                b && b(this, a),
                d.hide(),
                l.innerHTML = c ? e.innerText : e.innerHTML)
            })
        }
        )(e);
    this.hide = function() {
        m.style.display = "none";
        Core.RemoveHandler(document.body, "click", d.toogle)
    }
    ;
    this.toogle = function(a) {
        a = a || window.event;
        a.target || (a.target = a.srcElement);
        for (a = a.target; a !== document.body && a !== m && a !== g; )
            a = a.parentNode;
        a !== m && a !== g && d.hide()
    }
    ;
    this.show = function() {
        m.style.display = "block";
        Core.AddHandler(document.body, "click", d.toogle)
    }
    ;
    a.onclick = function(a) {
        a = a || window.event;
        var b = a.target || a.srcElement;
        if (b.className.indexOf("selected") || b.parentNode.className.indexOf("selected"))
            a.preventDefault ? a.preventDefault() : a.returnValue = !1;
        d.show()
    }
    ;
    this.hide()
}
function ui_smartList(a) {
    if (!document.querySelectorAll)
        return !1;
    var b = $(a), c, d = createElement(b, "li", {
        className: "smart-list__button"
    });
    a = document.createElement("div");
    var e = this;
    Class(a, "smart-list__wrapper");
    b.parentNode.insertBefore(a, b);
    var f = createElement(a, "ul", {
        className: "smart-list__sub-nav"
    });
    a.appendChild(b);
    d.innerHTML = "...";
    Class(b, "smart-list");
    this.createSubNav = function() {
        for (var a = f.querySelectorAll("li"), l = a.length, m = 0; m < l; m++)
            b.appendChild(a[m]);
        Class(b, "active", !0);
        Class(d, "active", !0);
        Class(d, "selected", !0);
        c = b.querySelectorAll("li");
        for (a = c.length - 1; 0 <= a; a--)
            if (l = c[a],
            10 < l.offsetTop)
                f.insertBefore(l, f.firstChild),
                0 <= l.className.indexOf("selected") && Class(d, "selected"),
                0 > b.className.indexOf("active") && (Class(b, "active"),
                Class(d, "active")),
                Core.AddHandler(l, "click", e.toggle);
            else if (!(0 <= l.className.indexOf("smart-list__button")))
                break
    }
    ;
    this.toggle = function() {
        0 > f.className.indexOf("active") ? (Class(f, "active"),
        Core.AddHandler(document, "click", e.\u0441oncealment),
        document.addEventListener && document.addEventListener("touchend", e.\u0441oncealment, !0)) : (Class(f, "active", !0),
        Core.RemoveHandler(document, "click", e.\u0441oncealment),
        document.addEventListener && document.removeEventListener("touchend", e.\u0441oncealment, !0))
    }
    ;
    this.\u0441oncealment = function(a) {
        for (a = a.target || a.srcElement; a != document.body && a != f && a != d; )
            a = a.parentNode;
        a != f && a != d && e.toggle()
    }
    ;
    Core.AddHandler(window, "resize", e.createSubNav);
    Core.AddHandler(d, "click", e.toggle);
    mqGlobal.AddOnLoad(function() {
        e.createSubNav()
    })
}
function ui_tabs(a, b) {
    function c(a) {
        0 > a.className.indexOf("selected") ? (d && (Class(d, "selected", !0),
        Class($("tab_content_" + d.getAttribute("data-content")), "selected", !0)),
        d = a,
        Class(d, "selected"),
        Class($("tab_content_" + d.getAttribute("data-content")), "selected")) : d = a
    }
    a = $(a);
    var d;
    if (!a)
        return !1;
    var e = a.getElementsByTagName("li");
    for (a = 0; a < e.length; a++)
        (function(a) {
            e[a].onclick = function() {
                c(e[a]);
                b && b(a)
            }
        }
        )(a);
    c(e[0])
}
function ui_carousel(a, b, c) {
    var d, e, f, g, l = $(a), m = [], h = [], p = 0, t = 0, n = 0, r = {}, q = !0, u, w, v, B = function() {}, z = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame, D = window.cancelAnimationFrame || window.mozCancelAnimationFrame, A = null, F = this;
    a = {
        handleEvent: function(a) {
            switch (a.type) {
            case "touchstart":
                this.start(a);
                break;
            case "touchmove":
                this.move(a);
                break;
            case "touchend":
                var b = this.end(a);
                setTimeout(b || B, 0);
                break;
            case "webkitTransitionEnd":
            case "msTransitionEnd":
            case "oTransitionEnd":
            case "otransitionend":
            case "transitionend":
                b = this.transitionEnd(a);
                setTimeout(b || B, 0);
                break;
            case "resize":
                setTimeout(F.setSize || B, 0)
            }
            a.stopPropagation()
        },
        start: function(a) {
            w = a.touches[0];
            v = !1;
            f = w.pageX;
            g = w.pageY
        },
        move: function(a) {
            if (q) {
                var b = function() {
                    D(A);
                    E.style.transform = "translateX(" + c + "px)";
                    J.style.transform = "translateX(" + h + "px)"
                };
                w = a.touches[0];
                d = w.pageX;
                e = w.pageY;
                u = {
                    x: f - d,
                    y: g - e
                };
                v || (v = !!(v || Math.abs(u.x) < Math.abs(u.y)));
                var c = -(p / 2 * n + u.x)
                  , h = -((p - 30) * n + u.x);
                v || (a.preventDefault(),
                D(A),
                A = z(b),
                u.x > p / 3 && n + 1 < t ? (q = !1,
                F.shiftSlider(n + 1, !1, !0)) : u.x < -p / 3 && 0 <= n - 1 && (q = !1,
                F.shiftSlider(n - 1, !1, !0)))
            }
        },
        end: function() {
            q && u && F.shiftSlider(n, !0);
            q = !0
        },
        transitionEnd: function() {}
    };
    if (document.querySelectorAll) {
        var H = function() {
            D(A);
            E.style.transform = "translateX(-" + p / 2 * n + "px)";
            J.style.transform = "translateX(-" + (p - 18) * n + "px)"
        };
        p = l.offsetWidth;
        var E = l.querySelector(".ui-carousel__navigation") || l.querySelector(".navigation");
        m = l.querySelectorAll(".ui-carousel__navigation__item") || E.querySelectorAll(".item");
        var J = l.querySelector(".ui-carousel__content") || l.querySelector(".content");
        h = J.querySelectorAll(".ui-carousel__card") || J.querySelectorAll(".card");
        var I = createElement(l.querySelector(".ui-carousel__header") || l.querySelector(".header"), "ul", {
            className: "slick-dots ui-carousel__slick-dots"
        });
        0 === m.length && (m = E.querySelectorAll(".item"));
        0 === h.length && (h = J.querySelectorAll(".card"));
        t = m.length;
        this.shiftSlider = function(a, d, e) {
            window.hashParams.Set("tab", "tab_" + m[a].getAttribute("data-content"));
            Class(m[n], "selected", !0);
            Class(m[n], "ui-carousel__navigation__item_selected", !0);
            Class(r[n], "selected", !0);
            n = a;
            D(A);
            A = z(H);
            Class(m[a], "selected");
            Class(m[a], "ui-carousel__navigation__item_selected");
            Class(r[a], "selected");
            b && b(m[a]);
            c && e && c(m[a]);
            d || (F.setHeight(),
            F.scrollToNav())
        }
        ;
        this.scrollToNav = function() {
            var a = E.getBoundingClientRect();
            window.scrollTo(0, a.top + (window.pageYOffset || document.body.scrollTop))
        }
        ;
        this.setHeight = function() {
            setTimeout(function() {
                J.style.height = h[n].offsetHeight + 20 + "px"
            }, 100)
        }
        ;
        this.setSize = function() {
            E.style.transition = "none";
            J.style.transition = "none";
            p = l.offsetWidth;
            E.style.width = (t + 1) * p + "px";
            J.style.width = (t + 1) * p + "px";
            E.style.marginLeft = p / 4 + "px";
            h[0].style.marginLeft = "8px";
            for (var a = 0; a < t; a++)
                m[a].style.width = p / 2 + "px";
            for (a = 0; a < t; a++)
                h[a].style.width = p - 26 + "px";
            F.shiftSlider(n, !0);
            F.setHeight();
            setTimeout(function() {
                E.style.transition = "transform 0.4s ease 0s";
                J.style.transition = "transform 0.4s ease 0s"
            }, 300)
        }
        ;
        for (var G = 0; G < t; G++)
            (function(a) {
                r[a] = createElement(I, "li");
                m[a].setAttribute("data-index", a);
                m[a].id = "tab_" + m[a].getAttribute("data-content");
                m[a].onclick = function() {
                    -1 === m[a].className.indexOf("selected") && F.shiftSlider(a, !1, !0)
                }
            }
            )(G);
        Class(r[0], "selected");
        (G = window.hashParams.Get("tab")) && (G = $(G)) && F.shiftSlider(parseInt(G.getAttribute("data-index")));
        F.setSize();
        0 === p && setTimeout(function() {
            F.setSize()
        }, 500);
        l.addEventListener("touchstart", a, !1);
        l.addEventListener("webkitTransitionEnd", a, !1);
        l.addEventListener("msTransitionEnd", a, !1);
        l.addEventListener("oTransitionEnd", a, !1);
        l.addEventListener("otransitionend", a, !1);
        l.addEventListener("transitionend", a, !1);
        l.addEventListener("touchmove", a, !1);
        l.addEventListener("touchend", a, !1);
        window.addEventListener("resize", a, !1)
    }
}
function ui_tooltip(a, b, c, d) {
    function e(a) {
        function e() {
            clearTimeout(l);
            0 > q.className.indexOf("active") && (l = setTimeout(function() {
                Class(q, "active")
            }, f));
            r = !0;
            clearTimeout(n);
            document.addEventListener && document.addEventListener("touchend", g, !0)
        }
        function h() {
            clearTimeout(n);
            0 < q.className.indexOf("active") && (n = setTimeout(function() {
                r && (Class(q, "active", !0),
                r = !1)
            }, 300));
            clearTimeout(l);
            document.addEventListener && document.removeEventListener("touchend", g, !0)
        }
        function g(a) {
            for (a = a.target; a !== q && a !== u && a !== document.body; )
                a = a.parentNode;
            a !== q && a !== u && h()
        }
        var l, n, r = !1;
        if (!1 === a) {
            var q = b;
            var u = c
        } else
            q = b[a],
            u = c[a];
        if (!q.style)
            return !1;
        q.style.cursor = "pointer";
        q.className += d ? " " + d : "";
        u.className += d ? " tooltip_" + d : "";
        q.style.position = "relative";
        Core.isMobile.any() || (Core.AddHandler(u, "mouseout", h),
        Core.AddHandler(q, "mouseout", h),
        Core.AddHandler(u, "mouseover", e),
        Core.AddHandler(q, "mouseover", e));
        document.addEventListener && q.addEventListener("touchstart", e, !0)
    }
    var f = a ? a : 300;
    if (!b || !c)
        return !1;
    a = b.length;
    if (1 <= a)
        for (var g = 0; g < a; g++)
            e(g);
    else
        e(!1)
}
function ReplaceMt5DownloadLinks() {
    if (window.replaceMt5DownloadLink && null != window.replaceMt5DownloadLink && "" !== window.replaceMt5DownloadLink)
        for (var a = document.getElementsByTagName("A"), b = /^https[^\s\"\']*mt5setup\.exe/g, c = 0; c < a.length; c++) {
            var d = a[c].getAttribute("href");
            b.test(d) && (a[c].setAttribute("href", d.replace(b, window.replaceMt5DownloadLink)),
            a[c].setAttribute("target", "_blank"))
        }
}
function AddAnchorsToH3() {
    for (var a = document.getElementsByTagName("h3"), b = 0; b < a.length; b++) {
        var c = a[b].getAttribute("id");
        if (c) {
            var d = document.createElement("a");
            d.innerHTML = "#";
            d.setAttribute("href", "#" + c);
            d.className = "anchor";
            a[b].insertBefore(d, null)
        }
    }
}
function AttachMobile(a, b, c, d, e, f, g, l, m) {
    var h = this, p = null, t = ++d || 1, n;
    d = d || 0;
    this.validate = function() {
        return 1 < d
    }
    ;
    this.createAttach = function(a) {
        var b = createElement(c, "li", {
            id: "at_" + t,
            className: "multiattaches-mobile__item multiattaches-mobile__item_hidden"
        })
          , e = createElement(b, "input", {
            type: a ? a.type : "file",
            name: "attachedFile",
            size: 63,
            className: "multiattaches-mobile__input",
            id: "_" + t
        })
          , p = createElement(b, "div", {
            className: "multiattaches-mobile__extension"
        })
          , r = createElement(b, "div", {
            className: "multiattaches-mobile__desc"
        })
          , B = createElement(b, "div", {
            className: "multiattaches-mobile__delete"
        })
          , z = createElement(r, "div", {
            className: "multiattaches-mobile__name"
        })
          , D = createElement(r, "div", {
            className: "multiattaches-mobile__size"
        });
        f && e.setAttribute("accept", f);
        B.setAttribute("data-num", t);
        Core.AddHandler(B, "click", function() {
            c.removeChild($("at_" + this.getAttribute("data-num")));
            d--;
            1 === d && Class(c, "multiattaches-mobile__list_hidden")
        });
        a ? (z.innerHTML = '<a href="' + a.link + '">' + a.name + "</a>",
        D.innerText = a.size,
        p.innerHTML = '<span class="multiattaches-mobile__extension__name">' + a.ext + "</span>",
        Class(p, a.ext.toLowerCase()),
        e.value = a.link,
        0 === d && Class(c, "multiattaches-mobile__list_hidden", !0),
        Class(b, "multiattaches-mobile__item_hidden", !0)) : Core.AddHandler(e, "change", function(a) {
            function e(a) {
                Validate && q && Validate.AppendMessage(q, a);
                n.value = "";
                n.type = "";
                n.type = "file"
            }
            a = a || window.event;
            var n = a.target || a.srcElement
              , q = $("jobChatErors");
            if (f && n)
                if ("string" === typeof f && (f = f.split(",")),
                a = n.value) {
                    a = a.toLowerCase().split(".");
                    1 < a.length && (a = a.pop());
                    if (0 > f.indexOf("." + a))
                        return e(g),
                        !1;
                    Validate && q && Validate.ClearMessage(q)
                } else
                    return !1;
            if (l && n && ("string" === typeof l && (l = 1048576 * parseInt(l)),
            0 < l && n.files))
                if (n.files[0]) {
                    if (n.files[0].size > l)
                        return e(m),
                        !1;
                    Validate && q && Validate.ClearMessage(q)
                } else
                    return !1;
            if (n.files && n.files[0]) {
                var r = n.files[0].name;
                a = r.substring(r.lastIndexOf(".") + 1).toLowerCase();
                z.innerText = r;
                D.innerText = Core.geFileSizeString(n.files[0].size);
                p.innerHTML = '<span class="multiattaches-mobile__extension__name">' + a + "</span>";
                Class(p, a)
            }
            1 === d && Class(c, "multiattaches-mobile__list_hidden", !0);
            Class(b, "multiattaches-mobile__item_hidden", !0);
            h.createAttach()
        });
        n = e;
        d++;
        t++
    }
    ;
    this.clear = function(a) {
        t = 1;
        c.innerHTML = "";
        d = 0;
        a || h.createAttach();
        Class(c, "multiattaches-mobile__list_hidden")
    }
    ;
    this.addReadOnlyAttaches = function(a) {
        h.clear(!0);
        for (var b = 0, c = a.length; b < c; b++)
            h.createAttach(a[b]);
        h.createAttach();
        "static" !== p && h.setListPosition()
    }
    ;
    this.addRelations = function(a) {
        e = a;
        for (var b = ["change", "focus", "keyup", "paste", "input"], c = 0, d = b.length; c < d; c++)
            Core.AddHandler(a, b[c], function() {
                h.setListPosition()
            })
    }
    ;
    this.setListPosition = function() {
        c.style.bottom = e.offsetHeight + "px"
    }
    ;
    this.setMode = function(b) {
        p = b;
        Class(a, "multiattaches-mobile_" + p)
    }
    ;
    this.init = function() {
        Core.AddHandler(b, "click", function() {
            n.click()
        });
        h.createAttach();
        Class(c, "multiattaches-mobile__list_hidden");
        c.style.maxHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 200 + "px";
        e && h.addRelations(e)
    }
    ;
    h.init()
}
function AttachNew(a, b, c, d, e, f, g, l, m, h, p, t, n) {
    var r = this, q = ++e || 1, u, w = null;
    e = e || 0;
    this.validate = function() {
        return 1 < e
    }
    ;
    this.createAttach = function(a) {
        var d = createElement(c, "li", {
            id: "at_" + q,
            className: "multiattaches__item multiattaches__item_hidden"
        })
          , l = createElement(d, "input", {
            type: a ? a.type : "file",
            name: "attachedFile",
            size: 63,
            className: "multiattaches__input",
            id: "_" + q
        })
          , w = createElement(d, "div", {
            className: "multiattaches__extension"
        })
          , v = createElement(d, "div", {
            className: "multiattaches__desc"
        })
          , F = createElement(d, "div", {
            className: "multiattaches__delete"
        })
          , H = createElement(v, "div", {
            className: "multiattaches__name"
        })
          , E = createElement(v, "div", {
            className: "multiattaches__size"
        });
        h && l.setAttribute("accept", h);
        m && F.setAttribute("title", m);
        F.setAttribute("data-num", q);
        Core.AddHandler(F, "click", function() {
            c.removeChild($("at_" + this.getAttribute("data-num")));
            e--;
            g.innerText = e - 1;
            1 === e && (Class(f, "multiattaches__count-attaches_hidden"),
            r.hideContent(),
            Class(b, "multiattaches__button_active", !0))
        });
        a ? (H.innerHTML = '<a href="' + a.link + '">' + a.name + "</a>",
        E.innerText = a.size,
        w.innerHTML = '<span class="multiattaches__extension__name">' + a.ext + "</span>",
        Class(w, a.ext.toLowerCase()),
        l.value = a.link,
        0 === e && (Class(f, "multiattaches__count-attaches_hidden", !0),
        Class(b, "multiattaches__button_active")),
        Class(d, "multiattaches__item_hidden", !0)) : Core.AddHandler(l, "change", function(a) {
            function c(a) {
                Validate && l && Validate.AppendMessage(l, a);
                g.value = "";
                g.type = "";
                g.type = "file"
            }
            a = a || window.event;
            var g = a.target || a.srcElement
              , l = $("jobChatErors");
            var m = g.value;
            a = m.toLowerCase().split(".");
            1 < a.length && (a = a.pop());
            if (h && g)
                if (m) {
                    if (0 > h.indexOf("." + a))
                        return c(p),
                        !1;
                    Validate && l && Validate.ClearMessage(l)
                } else
                    return !1;
            if (t && g && ("string" === typeof t && (t = 1048576 * parseInt(t)),
            0 < t && g.files))
                if (g.files[0]) {
                    if (g.files[0].size > t)
                        return c(n),
                        !1;
                    Validate && l && Validate.ClearMessage(l)
                } else
                    return !1;
            g.files && g.files[0] ? (m = g.files[0].name,
            H.innerText = m,
            E.innerText = Core.geFileSizeString(g.files[0].size),
            w.innerHTML = '<span class="multiattaches__extension__name">' + a + "</span>",
            Class(w, a)) : m && (m = m.split("\\"),
            1 < m.length && (m = m.pop()),
            H.innerText = m,
            w.innerHTML = '<span class="multiattaches-mobile__extension__name">' + a + "</span>",
            Class(w, a));
            1 === e && (Class(f, "multiattaches__count-attaches_hidden", !0),
            Class(b, "multiattaches__button_active"));
            Class(d, "multiattaches__item_hidden", !0);
            r.createAttach()
        });
        u = l;
        g.innerText = e;
        e++;
        q++
    }
    ;
    this.clear = function(a) {
        q = 1;
        c.innerHTML = "";
        e = 0;
        g.innerText = e;
        a || r.createAttach();
        Class(f, "multiattaches__count-attaches_hidden");
        Class(b, "multiattaches__button_active", !0);
        r.hideContent()
    }
    ;
    this.addReadOnlyAttaches = function(a) {
        r.clear(!0);
        for (var b = 0, c = a.length; b < c; b++)
            r.createAttach(a[b]);
        r.createAttach()
    }
    ;
    this.hideContent = function(a) {
        a = a || 0;
        clearTimeout(w);
        w = setTimeout(function() {
            Class(d, "multiattaches__content_hidden");
            Class(f, "multiattaches__count-attaches_active", !0)
        }, a)
    }
    ;
    this.showContent = function() {
        clearTimeout(w);
        Class(d, "multiattaches__content_hidden", !0);
        Class(f, "multiattaches__count-attaches_active")
    }
    ;
    this.init = function() {
        Core.AddHandler(b, "click", function() {
            u.click()
        });
        r.createAttach();
        Class(f, "multiattaches__count-attaches_hidden");
        Class(b, "multiattaches__button_active", !0);
        r.hideContent();
        c.style.maxHeight = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 200 + "px";
        Core.AddHandler(l, "click", function() {
            r.clear()
        });
        Core.AddHandler(f, "mouseover", function() {
            r.showContent()
        });
        Core.AddHandler(f, "mouseout", function() {
            r.hideContent(300)
        });
        Core.AddHandler(d, "mouseover", function() {
            r.showContent()
        });
        Core.AddHandler(d, "mouseout", function() {
            r.hideContent(300)
        })
    }
    ;
    r.init()
}
function lightBoxImg(a) {
    function b() {
        Class(c.attachment, "light-box__attachment-loading", !0);
        c.attachmentWrapper.appendChild(c.attachment);
        document.addEventListener && c.transition && e.removeEventListener(c.transition, b)
    }
    var c = this, d, e, f, g = !1, l, m, h, p, t;
    c.transition = whichTransitionEvent();
    c.attachmentSize = {};
    c.phrases = a || {};
    c.minWidth = 200;
    c.state = 0;
    this.getWinSize = function() {
        l = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        m = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    }
    ;
    this.create = function() {
        c.getWinSize();
        d = createElement(document.body, "div", {
            className: "light-box"
        });
        Core.isMobile.any() && Class(d, "light-box_mobile");
        var a = createElement(d, "div", {
            className: "light-box__shadow"
        });
        Core.AddHandler(a, "click", c.hide);
        Core.AddHandler(a, "touchstart", c.hide);
        e = createElement(d, "div", {
            className: "light-box__content"
        });
        c.attachmentWrapper = createElement(e, "div", {
            className: "light-box__attachment-area"
        });
        f = createElement(e, "div", {
            className: "light-box__footer"
        });
        a = createElement(f, "div", {
            className: "light-box__close"
        });
        Core.AddHandler(a, "click", c.hide);
        Core.AddHandler(a, "touchstart", c.hide);
        createElement(a, "i", {
            className: "light-box__icon light-box__icon_close"
        });
        c.phrases.close && a.setAttribute("title", c.phrases.close);
        c.showFull = createElement(f, "div", {
            className: "light-box__show-full"
        });
        Core.AddHandler(c.showFull, "click", c.toogleShowFull);
        Core.AddHandler(c.showFull, "touchstart", c.toogleShowFull);
        createElement(c.showFull, "i", {
            className: "light-box__icon light-box__icon_show-full"
        });
        c.phrases.showOriginal && c.showFull.setAttribute("title", c.phrases.showOriginal);
        c.save = createElement(f, "a", {
            className: "light-box__save",
            target: "_blank"
        });
        createElement(c.save, "i", {
            className: "light-box__icon light-box__icon_save"
        });
        c.phrases.save && c.save.setAttribute("title", c.phrases.save);
        c.sibling && (p = createElement(e, "div", {
            className: "light-box__prev"
        }),
        createElement(p, "i", {
            className: "light-box__icon light-box__icon_prev"
        }),
        Core.AddHandler(p, "click", c.prev),
        Core.AddHandler(p, "touchstart", c.prev),
        c.phrases.previous && p.setAttribute("title", c.phrases.previous),
        h = createElement(e, "div", {
            className: "light-box__next"
        }),
        createElement(h, "i", {
            className: "light-box__icon light-box__icon_next"
        }),
        Core.AddHandler(h, "click", c.next),
        Core.AddHandler(h, "touchstart", c.next),
        c.phrases.next && h.setAttribute("title", c.phrases.next));
        t = window.pageYOffset || document.documentElement.scrollTop;
        Class(document.body, "light-box-showed");
        document.body.style.top = "-" + t + "px";
        e.style.transition = "none";
        e.style.width = "300px";
        e.style.height = "300px";
        e.style.marginTop = "-150px";
        e.style.marginLeft = "-150px";
        e.style.transition = "all 0.3s ease-out";
        Core.AddHandler(window, "resize", c.setPosition);
        Core.AddHandler(document, "keydown", c.keyPressHandler)
    }
    ;
    this.toogleShowFull = function(a) {
        function b() {
            c.sibling && (c.disabledButton(p, 0 === c.active),
            c.disabledButton(h, c.active === c.count - 1));
            c.phrases.showOriginal && c.showFull.setAttribute("title", c.phrases.showOriginal);
            Class(d, "light-box_full-size", !0);
            Class(c.showFull.firstChild, "light-box__icon_show-full-active", !0);
            document.addEventListener && c.transition && document.removeEventListener(c.transition, b)
        }
        if (a = a || window.event)
            a.preventDefault ? a.preventDefault() : a.returnValue = !1,
            a.cancelBubble = !0,
            a.stopPropagation && a.stopPropagation();
        if (g)
            c.setPosition(),
            document.addEventListener && c.transition ? document.addEventListener(c.transition, b) : b();
        else {
            Class(d, "light-box_full-size");
            Class(c.showFull.firstChild, "light-box__icon_show-full-active");
            c.phrases.collapse && c.showFull.setAttribute("title", c.phrases.collapse);
            c.sibling && (c.disabledButton(p, !0),
            c.disabledButton(h, !0));
            a = m <= c.attachmentSize.width + 40 ? m - 40 : c.attachmentSize.width + 20;
            var f = l <= c.attachmentSize.height + 80 ? l - 80 : c.attachmentSize.height;
            e.style.width = a + "px";
            e.style.marginLeft = "-" + a / 2 + "px";
            e.style.height = f + "px";
            e.style.marginTop = "-" + (f / 2 + 20) + "px"
        }
        g = !g
    }
    ;
    this.disabledButton = function(a, b) {
        Class(a, "light-box__disabled", !b)
    }
    ;
    this.attachmentOnError = function() {
        Core.RemoveHandler(c.attachment, "error", c.attachmentOnError);
        Class(c.attachmentWrapper, "light-box__on-error");
        c.attachmentWrapper.innerHTML = "";
        var a = createElement(c.attachmentWrapper, "div", {
            className: "light-box__error-message"
        });
        a.innerHTML = (c.phrases.errorLoading ? c.phrases.errorLoading : "Unable to download attachment") + "<br>";
        var b = c.phrases.linkToImg ? c.phrases.linkToImg : "Link to the image";
        createElement(a, "a", {
            href: c.src,
            title: b,
            target: "_blank",
            innerText: b
        })
    }
    ;
    this.attachmentOnload = function() {
        document.addEventListener && c.transition && e.removeEventListener(c.transition, b);
        var a = c.attachmentSize.width
          , d = c.attachmentSize.height;
        c.attachmentSize.width = c.attachment.offsetWidth;
        c.attachmentSize.height = c.attachment.offsetHeight;
        c.disabledButton(c.showFull, !(c.attachmentSize.width > m || c.attachmentSize.height > l));
        c.oldAttach && (Core.RemoveHandler(c.oldAttach, "load", c.attachmentOnload),
        Core.RemoveHandler(c.oldAttach, "error", c.attachmentOnError),
        c.oldAttach.parentNode.removeChild(c.oldAttach),
        c.oldAttach = null);
        document.addEventListener && c.transition ? (a !== c.attachmentSize.width && d !== c.attachmentSize.height ? e.addEventListener(c.transition, b) : b(),
        c.setPosition()) : (c.setPosition(),
        b())
    }
    ;
    this.showAttachment = function(a) {
        c.src = a;
        c.oldAttach = c.attachment;
        c.disabledButton(c.showFull, !0);
        c.oldAttach && (Core.RemoveHandler(c.oldAttach, "load", c.attachmentOnload),
        Core.RemoveHandler(c.oldAttach, "error", c.attachmentOnError),
        c.oldAttach.parentNode === document.body && (c.oldAttach.parentNode.removeChild(c.oldAttach),
        c.oldAttach = null),
        c.attachment = null);
        c.attachment = new Image;
        Core.AddHandler(c.attachment, "load", c.attachmentOnload);
        Core.AddHandler(c.attachment, "error", c.attachmentOnError);
        c.attachment.setAttribute("src", c.src + (Core.isIE ? "?" + Math.random() : ""));
        Class(c.attachment, "light-box__attachment-loading");
        document.body.appendChild(c.attachment);
        c.sibling && (c.disabledButton(p, 0 === c.active),
        c.disabledButton(h, c.active === c.count - 1));
        c.save.setAttribute("href", c.src)
    }
    ;
    this.setPosition = function() {
        c.getWinSize();
        var a = c.attachmentSize.width
          , b = c.attachmentSize.height
          , d = a > b;
        if (!a || !b)
            return !1;
        if (d) {
            var f = a / b;
            a > m - 40 && (a = m - 40,
            b = a / f);
            b > l - 80 && (f = b / a,
            b = l - 80,
            a = b / f)
        } else
            f = b / a,
            b > l - 80 && (b = l - 80,
            a = b / f),
            a > m - 40 && (f = a / b,
            a = m - 40,
            b = a / f);
        a < c.minWidth && (a = c.minWidth,
        b = d ? a / f : a * f);
        e.style.width = a + "px";
        e.style.marginLeft = "-" + a / 2 + "px";
        e.style.height = b + "px";
        e.style.marginTop = "-" + (b / 2 + 20) + "px"
    }
    ;
    this.next = function(a) {
        if (a = a || window.event)
            a.preventDefault ? a.preventDefault() : a.returnValue = !1,
            a.cancelBubble = !0,
            a.stopPropagation && a.stopPropagation();
        c.active++;
        c.showAttachment(c.sibling[c.active])
    }
    ;
    this.prev = function(a) {
        if (a = a || window.event)
            a.preventDefault ? a.preventDefault() : a.returnValue = !1,
            a.cancelBubble = !0,
            a.stopPropagation && a.stopPropagation();
        c.active--;
        c.showAttachment(c.sibling[c.active])
    }
    ;
    this.hide = function(a) {
        c.state = 0;
        if (a = a || window.event)
            a.preventDefault ? a.preventDefault() : a.returnValue = !1,
            a.cancelBubble = !0,
            a.stopPropagation && a.stopPropagation();
        document.body.removeChild(d);
        c.attachment && c.attachment.parentNode.removeChild(c.attachment);
        Class(document.body, "light-box-showed", !0);
        window.scrollTo(0, t);
        Core.RemoveHandler(window, "resize", c.setPosition);
        Core.RemoveHandler(document, "keydown", c.keyPressHandler);
        Core.AddHandler(c.attachment, "load", c.attachmentOnload);
        c.attachment = null;
        document.body.style.top = ""
    }
    ;
    this.show = function(a, b) {
        c.state = 1;
        c.sibling = b;
        c.count = c.sibling ? c.sibling.length || 1 : 1;
        1 >= c.count ? c.sibling = null : c.active = c.sibling.indexOf(a);
        c.create();
        c.showAttachment(a)
    }
    ;
    this.getState = function() {
        return c.state
    }
    ;
    c.keyPressHandler = function(a) {
        a = a || window.event;
        var b = a.keyCode || a.which;
        27 === b && c.hide(a);
        39 === b && c.active !== c.count - 1 && c.next(a);
        37 === b && 0 !== c.active && c.prev(a)
    }
}
function lightBoxVideo(a) {
    function b(a) {
        Class(f.playBigBtn.firstChild, "light-box__player-icons_stop-big", a);
        Class(f.playBtn.firstChild, "light-box__player-icons_stop", !a);
        Class(f.attachmentWrapper, "light-box__hide-cursor", !a);
        Class(f.panel, "light-box__controls_active", a)
    }
    function c(a) {
        Class(f.waiting, "light-box__disabled", !a)
    }
    function d(a) {
        a = Math.floor(a);
        var b = parseInt(a / 60, 10)
          , c = a % 60;
        return b + ":" + (10 > a ? "0" + c : c)
    }
    function e() {
        var a = f.attachment.duration;
        if (0 < a)
            for (var b = 0; b < f.attachment.buffered.length; b++)
                if (f.attachment.buffered.start(f.attachment.buffered.length - 1 - b) <= f.attachment.currentTime) {
                    f.timeLineBuffered.style.width = f.attachment.buffered.end(f.attachment.buffered.length - 1 - b) / a * 100 + "%";
                    break
                }
    }
    var f = this;
    f.isMobile = Core.isMobile.any();
    lightBoxImg.apply(this, arguments);
    f.minWidth = f.isMobile ? 300 : 340;
    f.fullScreen = whichFullScreen();
    this.show = function(a, b, c) {
        f.state = 1;
        f.count = 1;
        f.active = 0;
        f.create();
        f.showAttachment(a, b, c);
        f.disabledButton(f.showFull, !0);
        f.disabledButton(f.save, !0)
    }
    ;
    this.attachmentOnError = function() {
        f.attachmentSize = {
            width: 300,
            height: 300
        };
        f.setPosition();
        Core.RemoveHandler(f.source, "error", f.attachmentOnError);
        Class(f.attachmentWrapper, "light-box__on-error");
        f.attachmentWrapper.innerHTML = "";
        var a = createElement(f.attachmentWrapper, "div", {
            className: "light-box__error-message"
        });
        a.innerHTML = (f.phrases.errorLoading ? f.phrases.errorLoading : "Unable to download attachment") + "<br>";
        var b = f.phrases.linkToVideo ? f.phrases.linkToVideo : "Link to the video";
        createElement(a, "a", {
            href: f.src,
            title: b,
            target: "_blank",
            innerText: b
        })
    }
    ;
    this.showAttachment = function(a, b, c) {
        f.src = a;
        f.img = createElement(document.body, "img", {
            className: "light-box__attachment-loading"
        });
        Core.AddHandler(f.img, "load", function() {
            f.attachmentSize = {
                width: f.img.offsetWidth,
                height: f.img.offsetHeight
            };
            f.setPosition();
            f.attachmentWrapper.appendChild(f.img);
            Class(f.img, "light-box__attachment-loading", !0);
            f.loadingSpinner = createElement(f.attachmentWrapper, "div", {
                className: "light-box__status"
            });
            createElement(f.loadingSpinner, "i", {
                className: "light-box__icon-spinner"
            })
        });
        f.img.setAttribute("src", b);
        f.attachment = createElement(document.body, "video", {
            poster: b
        });
        f.source = createElement(f.attachment, "source", {
            type: c + ';codecs="avc1.42E01E, mp4a.40.2"',
            src: a
        });
        a = createElement(f.attachment, "p", {
            innerText: (f.phrases.notSupport ? f.phrases.notSupport : "Your browser doesn't support HTML5 video.") + " "
        });
        b = f.phrases.linkToVideo ? f.phrases.linkToVideo : "Link to the video";
        createElement(a, "a", {
            href: f.src,
            title: b,
            target: "_blank",
            innerText: b
        });
        Core.AddHandler(f.attachment, "canplay", f.attachmentOnload);
        Class(f.attachment, "light-box__attachment-loading");
        Core.AddHandler(f.source, "error", f.attachmentOnError)
    }
    ;
    this.togglePlay = function(a) {
        f.disabledButton(f.playBigBtn, !a);
        f.attachment.paused || f.attachment.ended ? f.attachment.play() : f.attachment.pause()
    }
    ;
    this.toogleFullScreen = function(a) {
        if (a)
            document[f.fullScreen[1]]();
        else
            f.attachmentWrapper[f.fullScreen[0]]()
    }
    ;
    this.setVolume = function(a) {
        f.soundLineRange.value = a;
        f.soundLineValue.style.width = a + "%";
        Class(f.soundBtn.firstChild, "light-box__player-icons_mute", 0 !== parseInt(a))
    }
    ;
    this.setTimeLine = function(a) {
        f.attachment.paused || (f.timeLineRange.value = a);
        f.timeLineValue.style.width = a + "%"
    }
    ;
    this.createControls = function() {
        f.panel = createElement(f.attachmentWrapper, "div", {
            className: "light-box__controls" + (f.fullScreen ? "" : " light-box__controls_no-full-screen") + (f.isMobile ? " light-box__controls_mobile" : "")
        });
        var a = createElement(f.panel, "div", {
            className: "light-box__time"
        })
          , l = createElement(f.panel, "div", {
            className: "light-box__time-line"
        })
          , m = createElement(f.panel, "div", {
            className: "light-box__sound-line"
        })
          , h = !0
          , p = !1
          , t = createElement(f.panel, "a", {
            className: "light-box__download",
            href: f.src,
            target: "_blank"
        });
        f.playBtn = createElement(f.panel, "div", {
            className: "light-box__play"
        });
        f.playBigBtn = createElement(f.attachmentWrapper, "div", {
            className: "light-box__status light-box__status_animated light-box__disabled"
        });
        f.soundBtn = createElement(f.panel, "div", {
            className: "light-box__sound"
        });
        f.waiting = createElement(f.attachmentWrapper, "div", {
            className: "light-box__status light-box__disabled"
        });
        createElement(f.waiting, "i", {
            className: "light-box__icon-spinner"
        });
        if (f.fullScreen) {
            var n = createElement(f.panel, "div", {
                className: "light-box__full-screen"
            });
            var r = createElement(n, "i", {
                className: "light-box__player-icons light-box__player-icons_full-screen"
            });
            Core.AddHandler(n, "click", function() {
                f.toogleFullScreen(p);
                Class(r, "light-box__player-icons_collapsed", p);
                p = !p
            })
        }
        document.addEventListener ? f.playBigBtn.addEventListener("animationend", function() {
            f.disabledButton(f.playBigBtn, !0)
        }) : f.disabledButton(f.playBigBtn, !0);
        createElement(f.playBtn, "i", {
            className: "light-box__player-icons light-box__player-icons_play"
        });
        createElement(f.soundBtn, "i", {
            className: "light-box__player-icons light-box__player-icons_sound"
        });
        createElement(t, "i", {
            className: "light-box__player-icons light-box__player-icons_download"
        });
        createElement(f.playBigBtn, "i", {
            className: "light-box__player-icons light-box__player-icons_play-big"
        });
        f.currentTime = createElement(a, "span", {
            className: "light-box__time__current",
            innerText: "0:00"
        });
        createElement(a, "span", {
            className: "light-box__time__full",
            innerText: " / " + d(f.attachment.duration)
        });
        createElement(m, "div", {
            className: "light-box__sound-line__bg"
        });
        f.soundLineValue = createElement(m, "div", {
            className: "light-box__sound-line__value"
        });
        f.soundLineRange = createElement(m, "input", {
            className: "light-box__time-line__range"
        });
        setAttributes(f.soundLineRange, {
            type: "range",
            min: 0,
            max: 100,
            value: 100,
            step: 1
        });
        Core.AddHandler(f.soundLineRange, "mousemove", function() {
            f.attachment.volume = f.soundLineRange.value / 100
        });
        Core.AddHandler(f.soundLineRange, "change", function() {
            f.attachment.volume = f.soundLineRange.value / 100
        });
        createElement(l, "div", {
            className: "light-box__time-line__bg"
        });
        f.timeLineBuffered = createElement(l, "div", {
            className: "light-box__time-line__buffered"
        });
        f.timeLineValue = createElement(l, "div", {
            className: "light-box__time-line__value"
        });
        f.timeLineRange = createElement(l, "input", {
            className: "light-box__time-line__range"
        });
        setAttributes(f.timeLineRange, {
            type: "range",
            min: 0,
            max: 100,
            value: 0
        });
        e();
        var q = !1;
        Core.AddHandler(f.timeLineRange, "mousemove", function() {
            q && (f.attachment.currentTime = f.timeLineRange.value / 100 * f.attachment.duration)
        });
        Core.AddHandler(f.timeLineRange, "mousedown", function() {
            q = !0
        });
        Core.AddHandler(f.timeLineRange, "mouseup", function() {
            q = !1
        });
        Core.AddHandler(f.timeLineRange, "change", function() {
            f.attachment.currentTime = f.timeLineRange.value / 100 * f.attachment.duration
        });
        Core.AddHandler(f.attachment, "click", function(a) {
            a.preventDefault ? a.preventDefault() : a.returnValue = !1;
            a.cancelBubble = !0;
            a.stopPropagation && a.stopPropagation();
            f.togglePlay(!0)
        });
        Core.AddHandler(f.playBtn, "click", function(a) {
            a.preventDefault ? a.preventDefault() : a.returnValue = !1;
            a.cancelBubble = !0;
            a.stopPropagation && a.stopPropagation();
            f.togglePlay(!1)
        });
        Core.AddHandler(f.soundBtn, "click", function(a) {
            a.preventDefault ? a.preventDefault() : a.returnValue = !1;
            a.cancelBubble = !0;
            a.stopPropagation && a.stopPropagation();
            f.attachment.muted ? (f.attachment.muted = !1,
            f.attachment.volume = 1) : (f.attachment.muted = !0,
            f.attachment.volume = 0)
        });
        Core.AddHandler(f.attachment, "touchend", function(a) {
            a.preventDefault ? a.preventDefault() : a.returnValue = !1;
            a.cancelBubble = !0;
            a.stopPropagation && a.stopPropagation();
            f.togglePlay(!0)
        });
        Core.AddHandler(f.playBtn, "touchend", function(a) {
            a.preventDefault ? a.preventDefault() : a.returnValue = !1;
            a.cancelBubble = !0;
            a.stopPropagation && a.stopPropagation();
            f.togglePlay(!1)
        });
        Core.AddHandler(f.soundBtn, "touchend", function(a) {
            a.preventDefault ? a.preventDefault() : a.returnValue = !1;
            a.cancelBubble = !0;
            a.stopPropagation && a.stopPropagation();
            f.attachment.muted ? (f.attachment.muted = !1,
            f.attachment.volume = 1) : (f.attachment.muted = !0,
            f.attachment.volume = 0)
        });
        Core.AddHandler(f.attachment, "play", function() {
            b(!0);
            h = !1
        });
        Core.AddHandler(f.attachment, "ended", function() {
            b(!1);
            f.timeLineRange.value = f.attachment.currentTime / f.attachment.duration * 100;
            h = !0
        });
        Core.AddHandler(f.attachment, "pause", function() {
            if (!f.attachment)
                return !1;
            b(!1);
            f.timeLineRange.value = f.attachment.currentTime / f.attachment.duration * 100;
            h = !0
        });
        Core.AddHandler(f.attachment, "timeupdate", function() {
            c(!0);
            f.attachment && (f.currentTime.innerText = d(f.attachment.currentTime),
            f.setTimeLine(f.attachment.currentTime / f.attachment.duration * 100))
        });
        Core.AddHandler(f.attachment, "volumechange", function() {
            f.setVolume(100 * f.attachment.volume)
        });
        Core.AddHandler(f.attachment, "progress", function() {
            f.attachment && e()
        });
        Core.AddHandler(f.attachment, "waiting", function() {
            c(!1)
        });
        Class(f.panel, "light-box__controls_active");
        if (!f.isMobile) {
            var u = !0;
            Core.AddHandler(f.attachmentWrapper, "mousemove", function(a) {
                clearTimeout(u);
                Class(f.panel, "light-box__controls_active");
                Class(f.attachmentWrapper, "light-box__hide-cursor", !0);
                u = setTimeout(function() {
                    if (!h) {
                        for (var b = a.target; b && b.parentNode && b !== f.panel && b !== f.attachmentWrapper; )
                            b = b.parentNode;
                        Class(f.panel, "light-box__controls_active", b !== f.panel);
                        Class(f.attachmentWrapper, "light-box__hide-cursor", b === f.panel)
                    }
                }, 1E3)
            });
            Core.AddHandler(f.attachmentWrapper, "mouseout", function() {
                clearTimeout(u);
                h || (Class(f.panel, "light-box__controls_active", !0),
                Class(f.attachmentWrapper, "light-box__hide-cursor"))
            })
        }
    }
    ;
    this.attachmentOnload = function() {
        f.attachmentWrapper.innerHTML = "";
        Class(f.attachment, "light-box__attachment-loading", !0);
        f.createControls();
        Core.RemoveHandler(f.attachment, "canplay", f.attachmentOnload);
        f.attachmentSize = {
            width: f.attachment.videoWidth,
            height: f.attachment.videoHeight
        };
        f.setPosition();
        f.img && f.img.parentNode && f.img.parentNode.removeChild(f.img);
        f.attachmentWrapper.appendChild(f.attachment)
    }
    ;
    f.keyPressHandler = function(a) {
        a = a || window.event;
        var b = a.keyCode || a.which;
        27 === b && f.hide(a);
        32 === b && f.togglePlay()
    }
}
function checkImgForLightbox(a, b, c) {
    if (!a)
        return !1;
    (function(a, b, c) {
        function d(a) {
            function d(a) {
                a = a.toLowerCase().split(".");
                1 < a.length && (a = a.pop());
                var b = a.indexOf("?");
                0 < b && (a = a.substring(0, b));
                return a && 0 <= ".png,.jpeg,.jpg,.gif".indexOf(a)
            }
            function f(a, b) {
                if (!b)
                    return !1;
                b = b.split(",");
                for (var c = 0, d = b.length; c < d; c++)
                    if (0 <= a.className.split(" ").indexOf(b[c]))
                        return !0;
                return !1
            }
            function h(a, b) {
                for (; a && a.parentNode && !f(a, b); )
                    a = a.parentNode;
                return a
            }
            a = a || window.event;
            var g = a.target || a.srcElement;
            if ("img" === g.tagName.toLowerCase()) {
                var l = g.parentNode;
                if ("a" === l.tagName.toLowerCase() && (0 <= l.className.indexOf("lightbox__link") || "_blank" === l.getAttribute("target"))) {
                    a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                    a.cancelBubble = !0;
                    a.stopPropagation && a.stopPropagation();
                    var m = h(l, b);
                    var p = [];
                    if (document.querySelectorAll) {
                        m = m.querySelectorAll("a");
                        for (var B = 0, z = m.length; B < z; B++)
                            if (m[B].firstChild) {
                                var D = m[B].firstChild.tagName;
                                D && "img" === D.toLowerCase() && p.push(m[B].getAttribute("href"))
                            }
                    }
                    e.show(l.getAttribute("href"), arrayDeleteDuplicates(p))
                }
            }
            if ("a" === g.tagName.toLowerCase() && (l = g.getAttribute("href")) && d(l)) {
                a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                a.cancelBubble = !0;
                a.stopPropagation && a.stopPropagation();
                p = [];
                if ((a = h(g, c)) && document.querySelectorAll)
                    for (m = a.parentNode.querySelectorAll("a"),
                    B = 0,
                    z = m.length; B < z; B++)
                        a = m[B].getAttribute("href"),
                        d(a) && p.push(a);
                e.show(l, arrayDeleteDuplicates(p))
            }
        }
        var e = new lightBoxImg(window.lightBoxPhrases || null), f, h;
        Core.AddHandler(a, "click", d);
        Core.AddHandler(a, "touchstart", function(a) {
            a = a || window.event;
            if (a = a.touches[0])
                f = a.clientX,
                h = a.clientY
        }, {
            passive: !0
        });
        Core.AddHandler(a, "touchend", function(a) {
            a = a || window.event;
            var b = a.changedTouches[0];
            if (b) {
                var c = Math.abs(b.clientY - h);
                5 > Math.abs(b.clientX - f) && 5 > c && d(a)
            }
            h = f = 0
        })
    }
    )(a, b, c)
}
function ScrollContentAnimated() {
    function a(a) {
        if (!a)
            return !1;
        for (; a.parentNode && a !== v && (0 === a.offsetHeight || a.parentNode !== v); )
            a = a.parentNode;
        f(g(-a.offsetTop + B - a.offsetHeight))
    }
    function b() {
        var a = q.getBoundingClientRect()
          , b = a.left + a.width / 2
          , c = 0;
        a = a.bottom - 20;
        for (var d = document.elementFromPoint(b, a); d === v && 20 > c; )
            a -= 20,
            c++,
            d = document.elementFromPoint(b, a);
        if (d === v || d === q)
            d = !1;
        return d
    }
    function c() {
        var a = B
          , b = z;
        z = v.offsetHeight;
        B = H();
        q.style.height = B + "px";
        F = z - B;
        var c = parseInt(B / z * B);
        c > B ? (E = !0,
        Class(w, "scroll-container-animated__disabled")) : (E = !1,
        Class(w, "scroll-container-animated__disabled", !0));
        w.style.height = c + "px";
        A = (B - B / z * B) / F;
        return a !== B || z !== b
    }
    function d() {
        c() && a(J)
    }
    function e(a, b) {
        r ? a.style[r] = "msTransform" === r ? "translateY(" + b + "px)" : "translate3d(0," + b + "px,0)" : a.style.top = b + "px"
    }
    function f(a) {
        D = a;
        e(v, a);
        e(w, -a * A);
        J = b()
    }
    function g(a) {
        0 < a ? a = 0 : a <= -F && (a = -F);
        return a
    }
    function l(a) {
        var b = a;
        if (I) {
            var d = z;
            0 < b && D <= -F + B ? (I(1),
            c()) : 0 > b && 0 <= D + B && (I(-1),
            c(),
            f(D - (z - d)))
        }
        a = g(D - a);
        f(a)
    }
    function m() {
        function a(a) {
            a = a || window.event;
            if (E)
                return !1;
            a.preventDefault ? a.preventDefault() : a.returnValue = !1;
            var b = a.deltaY || a.detail || a.wheelDelta;
            100 > Math.abs(b) && (b = 100 * (0 < b ? 1 : -1));
            a.deltaY || a.detail || !a.wheelDelta || (b = -b);
            l(b)
        }
        "onwheel"in document ? Core.AddHandler(q, "wheel", a) : "onmousewheel"in document ? Core.AddHandler(q, "mousewheel", a) : Core.AddHandler(q, "MozMousePixelScroll", a)
    }
    function h(a, b) {
        a = a || window.event;
        if ((a.target || a.srcElement) !== w) {
            a.preventDefault ? a.preventDefault() : a.returnValue = !1;
            a.stopPropagation && a.stopPropagation();
            var c = B - 20;
            a = b(a) < -D * A ? -1 : 1;
            20 > c && (c = 20);
            l(c * a)
        }
    }
    function p() {
        function a(a) {
            if (!c)
                return !1;
            a = a || window.event;
            a = a.pageY || a.clientY + document.body.scrollTop;
            var b = (a - d) / A;
            d = a;
            l(b)
        }
        function b() {
            if (!c)
                return !1;
            c = !1;
            Core.RemoveHandler(document, "mousemove", a);
            Core.RemoveHandler(document, "mouseup", b)
        }
        var c = !1
          , d = 0;
        w.ondragstart = function() {
            return !1
        }
        ;
        Core.AddHandler(w, "mousedown", function(e) {
            e = e || window.event;
            if (E)
                return !1;
            e.preventDefault ? e.preventDefault() : e.returnValue = !1;
            e.stopPropagation && e.stopPropagation();
            var f = e;
            !f.which && f.button && f.button & 1 && (f.which = 1);
            f = 1 !== f.which ? !1 : (f = f.target || f.srcElement) && f === w ? !0 : !1;
            f && (c = !0,
            d = e.pageY || e.clientY + document.body.scrollTop,
            Core.AddHandler(document, "mousemove", a),
            Core.AddHandler(document, "mouseup", b));
            return !1
        });
        Core.AddHandler(u, "click", function(a) {
            if (E)
                return !1;
            h(a, function(a) {
                return a.offsetY
            })
        })
    }
    function t() {
        function a() {
            var b = 25 * e;
            if (1 < b || -1 > b)
                e *= .95,
                l(b),
                n = f(a)
        }
        var b = !1, c = 0, d = 0, e = 0, f = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame, g = window.cancelAnimationFrame || window.mozCancelAnimationFrame, n = null, m;
        Core.AddHandler(q, "touchstart", function(a) {
            if (1 == a.touches.length) {
                if (E)
                    return b = !1;
                b = !0;
                d = c = a.changedTouches[0].pageY;
                m = Date.now();
                g(n)
            } else
                b = !1
        });
        Core.AddHandler(q, "touchmove", function(a) {
            if (1 == a.touches.length && b) {
                var d = a.changedTouches[0].pageY
                  , e = c - d;
                a.preventDefault();
                l(e);
                c = d
            }
        });
        Core.AddHandler(q, "touchend", function(c) {
            b && (c.preventDefault(),
            b = !1,
            e = (d - c.changedTouches[0].pageY) / (Date.now() - m),
            f && .5 < Math.abs(e) && (n = f(a)))
        });
        Core.AddHandler(u, "touchend", function(a) {
            if (E)
                return !1;
            h(a, function(a) {
                return a.changedTouches[0].pageY
            })
        });
        var p = !1
          , t = 0;
        Core.AddHandler(w, "touchstart", function(a) {
            if (1 == a.touches.length) {
                if (E)
                    return p = !1;
                a.preventDefault();
                p = !0;
                t = a.changedTouches[0].pageY
            } else
                p = !1
        });
        Core.AddHandler(w, "touchmove", function(a) {
            if (1 == a.touches.length && p) {
                var b = a.changedTouches[0].pageY
                  , c = -(t - b) / A;
                a.preventDefault();
                l(c);
                t = b
            }
        });
        Core.AddHandler(w, "touchend", function() {
            p = !1
        })
    }
    function n() {
        d()
    }
    var r = whichTransform(), q, u, w, v, B = 0, z = 0, D = 0, A = 0, F = 0, H, E = !1, J, I;
    return {
        init: function(a, d, e) {
            u = document.createElement("div");
            q = document.createElement("div");
            w = document.createElement("div");
            v = a;
            Class(v, "scroll-container-animated__content");
            Class(q, "scroll-container-animated");
            q.style.height = 0;
            Class(u, "scroll-container-animated__bar");
            Class(w, "scroll-container-animated__slider");
            v.parentNode.appendChild(q);
            q.appendChild(v);
            u.appendChild(w);
            q.appendChild(u);
            H = d || function() {
                return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
            }
            ;
            I = e;
            c();
            m();
            p();
            t();
            Core.AddHandler(window, "resize", n);
            J = b()
        },
        updateHeight: d,
        focusTo: a
    }
}
function ScrollContent() {
    function a() {
        if (!h.preloading || h.checkPreloadingStart)
            return !1;
        if (0 === h.currentScroll) {
            var a = h.scrollHeight;
            h.checkPreloadingStart = !0;
            h.preloading(-1, function() {
                h.stopPreloading = !0;
                c();
                f(h.scrollHeight - a)
            })
        } else
            h.currentScroll + h.contentHeight === h.scrollHeight && (h.checkPreloadingStart = !0,
            h.preloading(1, function() {
                c()
            }));
        h.checkPreloadingStart = !1
    }
    function b() {
        c();
        a();
        h.callback && h.callback()
    }
    function c() {
        h.currentScroll = h.content.scrollTop;
        h.scrollHeight = h.content.scrollHeight;
        h.contentHeight = h.content.offsetHeight;
        Class(h.scrollSlider, h.prefix + "__slider_hidden", h.scrollHeight !== h.contentHeight);
        h.scrollSlider.style.height = d(h.contentHeight, h.scrollHeight) + "px";
        var a = h.scrollSlider
          , b = parseInt(h.contentHeight / h.scrollHeight * h.currentScroll);
        p ? a.style[p] = "msTransform" === p ? "translateY(" + b + "px)" : "translate3d(0," + b + "px,0)" : a.style.top = b + "px"
    }
    function d(a, b) {
        this.hash || (this.hash = {});
        this.hash["h" + a + "x" + b] || (this.hash["h" + a + "x" + b] = parseInt(a / b * a));
        return this.hash["h" + a + "x" + b]
    }
    function e(a, d) {
        a ? (c(),
        Core.AddHandler(h.content, "scroll", b, {
            passive: !0
        }),
        d && d()) : Core.RemoveHandler(h.content, "scroll", b)
    }
    function f(a, b) {
        if (!a)
            return !1;
        e(!1);
        if ("object" === typeof a) {
            if (!a.element)
                return !1;
            h.content.scrollTop = a.element.offsetTop + (a.start ? 0 : a.element.offsetHeight)
        } else if ("string" === typeof a)
            switch (a) {
            case "top":
                h.content.scrollTopp = 0;
                break;
            case "bottom":
                h.content.scrollTop = h.scrollHeight;
                break;
            default:
                h.content.scrollTop = 0
            }
        else
            h.content.scrollTop = a;
        e(!0, b)
    }
    function g(a, b) {
        a = a || window.event;
        (a.target || a.srcElement) !== h.scrollSlider && (a = b(a),
        20 > a && (a = 20),
        h.content.scrollTop = h.scrollHeight * a / h.contentHeight)
    }
    function l() {
        function a(a) {
            if (!c)
                return !1;
            a = a || window.event;
            a = a.pageY || a.clientY + document.body.scrollTop;
            var b = a - d;
            d = a;
            h.content.scrollTop = h.scrollHeight * (h.contentHeight / h.scrollHeight * h.currentScroll + b) / h.contentHeight
        }
        function b() {
            if (!c)
                return !1;
            c = !1;
            Core.RemoveHandler(document, "mousemove", a);
            Core.RemoveHandler(document, "mouseup", b)
        }
        var c = !1
          , d = 0;
        h.scrollSlider.ondragstart = function() {
            return !1
        }
        ;
        Core.AddHandler(h.scrollSlider, "mousedown", function(e) {
            e = e || window.event;
            if (h.scrollDisabled)
                return !1;
            e.preventDefault ? e.preventDefault() : e.returnValue = !1;
            e.stopPropagation && e.stopPropagation();
            var f = e;
            !f.which && f.button && f.button & 1 && (f.which = 1);
            f = 1 !== f.which ? !1 : (f = f.target || f.srcElement) && f === h.scrollSlider ? !0 : !1;
            f && (c = !0,
            d = e.pageY || e.clientY + document.body.scrollTop,
            Core.AddHandler(document, "mousemove", a),
            Core.AddHandler(document, "mouseup", b));
            return !1
        });
        Core.AddHandler(h.scrollContainer, "click", function(a) {
            if (h.scrollDisabled)
                return !1;
            g(a, function(a) {
                return a.offsetY
            })
        })
    }
    function m() {
        h.content.style.marginRight = "-" + (h.content.offsetWidth - h.content.clientWidth) + "px";
        c()
    }
    var h = this
      , p = whichTransform();
    this.prefix = "scroll-container";
    this.scrollHeight = this.scrollSlider = this.scrollContainer = this.container = null;
    this.contentHeight = 0;
    this.content = this.currentScroll = null;
    this.checkPreloadingStart = !1;
    this.preloading = null;
    this.scrollDisabled = !1;
    this.callback = null;
    return {
        init: function(a) {
            if (!a)
                return !1;
            h.container = document.createElement("div");
            Class(h.container, h.prefix);
            h.content = a;
            Class(h.content, h.prefix + "__content");
            h.content.setAttribute("tabindex", -1);
            h.scrollContainer = document.createElement("div");
            h.scrollSlider = document.createElement("div");
            Class(h.scrollContainer, h.prefix + "__bar");
            Class(h.scrollSlider, h.prefix + "__slider");
            h.scrollContainer.appendChild(h.scrollSlider);
            h.container.appendChild(h.scrollContainer);
            h.content.parentNode.appendChild(h.container);
            h.container.appendChild(h.content);
            h.content.style.marginRight = "-" + (h.content.offsetWidth - h.content.clientWidth) + "px";
            mqGlobal && mqGlobal.AddOnLoad(function() {
                m()
            });
            e(!0);
            l();
            Core.AddHandler(window, "resize", m)
        },
        setPreloading: function(a) {
            h.preloading = a
        },
        update: m,
        focusTo: f,
        updateCoord: c,
        checkScroll: e,
        getScrollPosition: function() {
            return h.currentScroll
        },
        getContentHeight: function() {
            return h.contentHeight
        },
        getScrollHeight: function() {
            return h.scrollHeight
        },
        setCallback: function(a) {
            h.callback = a
        }
    }
}
function FloatVerticalPanel(a, b) {
    function c() {
        Mql5Cookie.httpStorage(b, "1", {
            expires: new Date(2050,1,1),
            Domain: "." + Mql5Cookie.domain,
            Path: "/"
        });
        d.parentNode.removeChild(d)
    }
    if ("1" === Mql5Cookie.httpStorage(b))
        return !1;
    var d = createElement(document.body, "div", {
        className: "float-vertical-panel",
        innerHTML: a,
        id: "floatVerticalPanel"
    });
    d.innerHTML = a;
    a = createElement(d, "span", {
        className: "float-vertical-panel__cross"
    });
    Core.AddHandler(a, "click", c);
    Core.AddHandler(a, "touchend", c)
}
function CountableField(a, b) {
    function c() {
        var c = a.value
          , e = c.length;
        return b ? (e > b && (Class(a, "input-validation-error"),
        setTimeout(function() {
            Class(a, "input-validation-error", 300)
        }, 300)),
        c = c.substring(0, b),
        e = c.length,
        a.value = c,
        e + "/" + b) : e
    }
    if (!a)
        return !1;
    (function() {
        var d = createElement(a.parentNode, "div", {
            className: "countable-field"
        })
          , e = createElement(d, "div", {
            className: "countable-field__counter",
            innerText: "0/" + b
        });
        a.parentNode.insertBefore(d, a);
        d.appendChild(a);
        Core.AddHandler(a, "keyup", function() {
            e.innerText = c()
        });
        Core.AddHandler(a, "change", function() {
            e.innerText = c()
        });
        Core.AddHandler(a, "input", function() {
            e.innerText = c()
        })
    }
    )()
}
function shareBlock() {
    var a = $("shareBlock")
      , b = $("formShare");
    Core.AddHandler(a, "click", function(c) {
        c = c || window.event;
        for (var d = c.target || c.srcElement; d.parentNode && "A" !== d.nodeName && d !== a; )
            d = d.parentNode;
        if ("A" === d.nodeName) {
            var e = d.getAttribute("data-social");
            (d = d.getAttribute("data-track")) && window.fpush(d);
            "Mql5.community" === e && (c.preventDefault ? c.preventDefault() : c.returnValue = !1,
            Dialog.show(b.title, b, 500, 160, Dialog.hide, null, null, " ui no-bottom-margin", !1, "fixed"))
        }
    });
    b && Core.AddHandler(b, "submit", function(b) {
        Ajax.form(this, {
            onready: function(b) {
                b = JSON.parse(b);
                if (!b.Type || "REDIRECT" !== b.Type) {
                    if (b.Type && "SUCCESS" === b.Type) {
                        var c = createElement(null, "DIV", {
                            className: "share-mql5-com__res"
                        });
                        c.innerHTML = b.Message;
                        Dialog.show(b.Title || b.Message || "", c, 500, 100, Dialog.hide, null, null, " ui no-bottom-margin", !1, "fixed");
                        c = a.querySelector(".soc-icons_mql5");
                        c = getAncessor(c, "soc-share-block__item");
                        c.parentNode.removeChild(c)
                    }
                    b.Type && "ERROR" === b.Type && (c = createElement(null, "DIV", {
                        className: "share-mql5-com__res"
                    }),
                    c.innerHTML = b.Message,
                    Dialog.show(b.Message, c, 500, 100, Dialog.hide, null, null, " ui no-bottom-margin", !1, "fixed"))
                }
            },
            onerror: function() {},
            ismobile: !1
        });
        b = b || window.event;
        b.preventDefault ? b.preventDefault() : b.returnValue = !1
    })
}
function Resizable(a, b) {
    function c(h) {
        if (!f)
            return !1;
        h = h || window.event;
        h = h.pageY || (h.changedTouches ? h.changedTouches[0].pageY : null) || h.clientY + document.body.scrollTop;
        Core.RemoveHandler(document, "mouseup", c);
        Core.RemoveHandler(document, "mousemove", d);
        Core.RemoveHandler(document, "touchend", c);
        Core.RemoveHandler(document, "touchmove", d);
        e.style.transform ? e.style.transform = "none" : e.style.top = "auto";
        g -= m - h;
        a.style.height = g + "px";
        b && b(g);
        f = !1;
        Class(l, "resizable-wrapper_active", !0)
    }
    function d(a) {
        if (!f)
            return !1;
        a = a || window.event;
        a = a.pageY || (a.changedTouches ? a.changedTouches[0].pageY : null) || a.clientY + document.body.scrollTop;
        e.style.transform ? e.style.transform = "translateY(" + -(m - a) + "px)" : e.style.top = g - (m - a) + "px"
    }
    var e = createElement(a, "div", {
        className: "resizable-line"
    })
      , f = !1
      , g = a.offsetHeight
      , l = createElement(a, "div", {
        className: "resizable-wrapper"
    })
      , m = 0;
    Class(a, "resizable");
    Core.AddHandler(e, "mousedown", function(a) {
        !a.which && a.button && a.button & 1 && (a.which = 1);
        if (1 !== a.which)
            return !1;
        f = !0;
        a = a || window.event;
        m = a.pageY || a.clientY + document.body.scrollTop;
        Core.AddHandler(document, "mouseup", c);
        Core.AddHandler(document, "mousemove", d);
        Class(l, "resizable-wrapper_active");
        a.preventDefault ? a.preventDefault() : a.returnValue = !1;
        a.stopPropagation && a.stopPropagation();
        return !1
    });
    Core.AddHandler(e, "dragstart", function() {
        return !1
    });
    Core.AddHandler(e, "touchstart", function(a) {
        f = !0;
        m = a.changedTouches[0].pageY;
        Core.AddHandler(document, "touchend", c);
        Core.AddHandler(document, "touchmove", d);
        Class(l, "resizable-wrapper_active");
        a.preventDefault ? a.preventDefault() : a.returnValue = !1;
        a.stopPropagation && a.stopPropagation();
        return !1
    })
}
function Tooltip(a) {
    if (!a)
        return !1;
    var b = a.getAttribute("data-tooltip");
    if (!b)
        return !1;
    var c = this;
    this.setPosition = function() {
        var b = a.getBoundingClientRect()
          , e = getWindowSize();
        b.bottom < e.height ? (Class(c.tooltip, "tooltip-wrapper_bottom"),
        c.tooltip.style.top = b.bottom + "px",
        c.tooltip.style.bottom = "auto") : (Class(c.tooltip, "tooltip-wrapper_bottom", !0),
        c.tooltip.style.top = "auto",
        c.tooltip.style.bottom = e.height - b.top + "px");
        e.width - b.right > c.textWidth - 16 || .7 < (e.width - b.right) / c.textWidth ? (c.tooltip.style.left = b.left + "px",
        c.tooltip.style.maxWidth = e.width - b.right - 8 + "px") : e.width - b.left > c.textWidth - 16 ? c.tooltip.style.right = b.right + 8 + "px" : (c.tooltip.style.left = "8px",
        c.tooltip.style.maxWidth = e.width - 16 + "px");
        c.corner.style.left = b.left - c.tooltip.getBoundingClientRect().left + 2 + "px"
    }
    ;
    this.show = function() {
        Class(c.tooltip, "tooltip-wrapper_active");
        c.setPosition();
        Core.AddHandler(window, "scroll", c.setPosition, {
            passive: !0
        });
        Core.AddHandler(document.body, "click", c.checkContent);
        Core.AddHandler(document.body, "touchstart", c.checkContent);
        Core.AddHandler(window, "resize", c.setPosition)
    }
    ;
    this.checkContent = function(b) {
        b = b || window.event;
        for (b = b.target || b.srcElement; b.parentNode && b !== a && b !== c.tooltip; )
            b = b.parentNode;
        b !== a && b !== c.tooltip && c.hide()
    }
    ;
    this.hide = function() {
        Core.RemoveHandler(window, "scroll", c.setPosition);
        Core.RemoveHandler(document.body, "click", c.checkContent);
        Core.RemoveHandler(window, "resize", c.setPosition);
        Core.RemoveHandler(document.body, "touchstart", c.checkContent);
        Class(c.tooltip, "tooltip-wrapper_active", !0)
    }
    ;
    this.create = function() {
        c.tooltip = createElement(a, "span", {
            className: "tooltip-wrapper tooltip-wrapper_corner"
        });
        c.tooltip.style.position = "fixed";
        var d = createElement(c.tooltip, "span", {
            className: "tooltip",
            innerText: b
        });
        c.corner = createElement(d, "span", {
            className: "corner"
        });
        a.style.position = "relative";
        d = createElement(document.body, "div", {
            innerText: b
        });
        d.style.position = "fixed";
        d.style.left = "-9999px";
        var e = d.clientWidth;
        document.body.removeChild(d);
        c.textWidth = e;
        Core.AddHandler(a, "click", c.show);
        Core.AddHandler(a, "touchstart", c.show)
    }
    ;
    c.create()
}
function TrackScrollPosition(a, b, c) {
    this.create = function() {
        function d() {
            m = getWindowScroll().top + l;
            h && p ? (Core.RemoveHandler(window, "scroll", d),
            Core.RemoveHandler(window, "resize", e)) : (!h && m - l / 2 >= g / 2 && (h = !0,
            c || window.fpush("MQL5+" + a + "+Half")),
            !p && m >= g && (p = !0,
            window.fpush("MQL5+" + a + "+End")))
        }
        function e() {
            f = $("footer").offsetHeight;
            g = getDocumentBodySize().height - f;
            l = getWindowSize().height;
            d()
        }
        b || window.fpush("MQL5+" + a + "+Open");
        var f = $("footer").offsetHeight
          , g = getDocumentBodySize().height - f
          , l = getWindowSize().height
          , m = getWindowScroll().top + l
          , h = !1
          , p = !1;
        Core.AddHandler(window, "scroll", d, {
            passive: !0
        });
        Core.AddHandler(window, "resize", e, {
            passive: !0
        });
        d()
    }
    ;
    this.create()
}
;(function() {
    function a(a) {
        for (a = a.previousSibling; a && 1 != a.nodeType; )
            a = a.previousSibling;
        return a
    }
    function b(a) {
        function b(a, b, d) {
            for (var e = 0, f = 0; f < d; ++f) {
                var h = c.charAt(f)
                  , g = a[f];
                h && (h = parseInt(h));
                e += h * g
            }
            if (0 == e)
                return !1;
            e %= 11;
            9 < e && (e %= 10);
            return e == b
        }
        var c = a.value;
        return 10 == c.length ? b([2, 4, 10, 3, 5, 9, 4, 6, 8], parseInt(c.charAt(c.length - 1)), 9) : 12 == c.length ? b([7, 2, 4, 10, 3, 5, 9, 4, 6, 8], parseInt(c.charAt(c.length - 2)), 10) && b([3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8], parseInt(c.charAt(c.length - 1)), 11) ? !0 : !1 : !1
    }
    function c(b, c) {
        var d = a(b);
        if (g)
            return g.style.display = "block",
            !0;
        d && "field-validation-error" == d.className && "SPAN" == d.nodeName ? d.innerHTML = c : (d = document.createElement("span"),
        d.innerHTML = c,
        d.className = "field-validation-error",
        b.parentNode.insertBefore(d, b),
        b.parentNode.insertBefore(document.createTextNode("\n"), d))
    }
    function d(b) {
        (b = a(b)) && "field-validation-error" == b.className && b.parentNode.removeChild(b)
    }
    function e(a, b, d) {
        MQTE.SetValidationClass(b.id, !0);
        if (a)
            if ("string" == typeof d)
                c(a, d);
            else {
                b = 0;
                for (var e = d.length; b < e; ++b)
                    c(a, d[b])
            }
    }
    var f = 0, g;
    window.preventDoubleSubmit = function(a) {
        void 0 !== document.getElementById("Login") && (window.mediaToken || (window.mediaToken = new MediaToken),
        window.mediaToken.Set());
        a && (a.className += " disabled",
        a.onsubmit = function() {
            return !1
        }
        )
    }
    ;
    window.Validate = function(a) {
        document.getElementById("validate_message") && (g = document.getElementById("validate_message"),
        g.style.display = "none");
        if (!window.V)
            return window.console ? console.warn("Задействована форма с валидацией, но нет ни одного правила") : alert("Задействована форма с валидацией, но нет ни одного правила"),
            !1;
        var c = !0, h, l = {};
        ++f;
        for (var t = 0, n = V.length; t < n; ++t) {
            var r = !0;
            if (!a)
                return !1;
            var q = V[t];
            if ((h = a.elements[q[0]]) && (h.id === q[0] || 16 === q[1]) && (!h.style || "none" != h.style.display || window.MQRTE && MQRTE.Editor(q[0]) || window.SmallRTE)) {
                var u = document.getElementById("validate_" + q[0]);
                if ("text" == h.type || "TEXTAREA" == h.nodeName)
                    h.value = h.value.replace(/(^[ \r\n\t]+|[ \r\n\t]+$)/g, "");
                switch (q[1]) {
                case 1:
                    r = !MQTE.IsEmpty(h.name);
                    break;
                case 2:
                    if (null !== q[3]) {
                        var w = parseInt(q[3]);
                        var v;
                        q[4] && (v = q[4]);
                        r = h.value.length >= w && (!v || h.value.length <= v)
                    }
                    break;
                case 3:
                    w = void 0;
                    r = (w = h.value) && /^[0-9]+(\.|,)?[0-9]*$/.test(w) ? !0 : !1;
                    break;
                case 4:
                    w = void 0;
                    r = (w = h.value) && (!/^\w+([-+.'']{1,2}\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test(w) || 255 <= w.length) ? !1 : !0;
                    break;
                case 5:
                    r = h.value;
                    w = a.elements[q[3]].value;
                    q[4] && (r = r.toLowerCase(),
                    w = w.toLowerCase());
                    r = r == w;
                    r || (l[q[3]] && (w = document.getElementById("validate_" + q[3]),
                    d(w),
                    l[q[3]] = !1),
                    e(null, a.elements[q[3]], null));
                    break;
                case 6:
                    r = (new RegExp(q[3],q[4])).test(h.value);
                    break;
                case 7:
                    r = b(h);
                    break;
                case 8:
                    r = h.value ? /^((http|https):\/\/)?([a-z0-9\-]+\.)+[a-z]+(:\d+)?(\/[\w-_ .\/%]*)?(\/)?\??([\w=%&_ :+;\-\.\#/\(\)]+)?$/i.test(h.value) : !0;
                    break;
                case 9:
                    a: {
                        r = h;
                        i = 0;
                        for (sz = r.length; i < sz; i++)
                            if (r[i].checked) {
                                r = !0;
                                break a
                            }
                        r = !1
                    }
                    break;
                case 10:
                    try {
                        r = q[3](h)
                    } catch (H) {
                        window.console && console.error(H.message)
                    }
                    break;
                case 12:
                    r = h.value ? /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/i.test(h.value) : !0;
                    break;
                case 13:
                    h.value ? (r = !1,
                    window.XMLHttpRequest ? r = new XMLHttpRequest : window.ActiveXObject && (r = new ActiveXObject("Microsoft.XMLHTTP")),
                    r ? (r.open("get", "/api/website/status?r=" + Math.floor(1E4 * Math.random() + 1), !1),
                    r.timeout && (r.timeout = 2E3),
                    r.send(),
                    r = 4 == r.readyState && 200 == r.status && 0 <= r.responseText.indexOf("STATUS_OK")) : r = !0) : r = !0;
                    break;
                case 14:
                    r = h;
                    if (r = parseInt(r.value, 10) == r.value) {
                        r = parseInt(h.value);
                        w = parseInt(q[3]);
                        var B = parseInt(q[4]);
                        r = r <= B && r >= w
                    }
                    break;
                case 16:
                    if (null !== q[3] && (w = parseInt(q[3]),
                    B = h.length && 0 !== h.length ? h : [h],
                    window.FileReader))
                        for (var z = 0; z < B.length; z++) {
                            var D = B[z];
                            if (D.files && D.files.length)
                                for (var A = 0; A < D.files.length; A++)
                                    D.files[A].size > w && (q[2] && (q[2] = q[2].replace("{filename}", D.files[A].name).replace("{filesize}", bytesToSize(D.files[A].size))),
                                    r = !1)
                        }
                }
                r || h.iteration == f ? !1 !== l[q[0]] && (l[q[0]] = !0) : (e(u, h, q[2]),
                c = !1,
                l[q[0]] = !1,
                h.iteration = f)
            }
        }
        if (c)
            window.form_is_valid && form_is_valid(a);
        else {
            for (var F in l)
                l[F] && (u = document.getElementById("validate_" + F),
                q = a.elements[F],
                d(u),
                MQTE.SetValidationClass(q.id, !1));
            window.form_is_not_valid && form_is_not_valid(a)
        }
        return c
    }
    ;
    window.Validate.AppendMessage = c;
    window.Validate.ClearMessage = d;
    window.Validate.SetValid = function(a, b) {
        var c, f;
        var g = 0;
        for (c = a.elements.length; g < c; ++g) {
            var l = a.elements[g].id || a.elements[g].name;
            if (l = document.getElementById("validate_" + l))
                (f = b[a.elements[g].name]) ? e(l, a.elements[g], f) : (f = a.elements[g],
                d(l),
                MQTE.SetValidationClass(f.id, !1))
        }
    }
}
)();
var lastCommand = null;
function ViewSearchResults(a, b) {
    if (1 > SEARCH_PARAMS.keyword.length && 1 > SEARCH_PARAMS.author.length)
        SEARCH_PARAMS.container.innerHTML = '<span class="search_none_found">' + SEARCH_DICTIONARY.keyword_length + "</span>",
        ClearPaginators();
    else {
        var c = SEARCH_PARAMS.url + "?callback=RenderSearchResults&hl=" + SEARCH_PARAMS.lng + SEARCH_PARAMS.module_params + ("&keyword=" + (encodeURIComponent(SEARCH_PARAMS.keyword) || "")) + "&from=" + a + "&count=" + b + (SEARCH_PARAMS.author ? "&author=" + SEARCH_PARAMS.author : "") + (0 < SEARCH_PARAMS.method ? "&method=" + SEARCH_PARAMS.method : "") + (0 < SEARCH_PARAMS.dt_from ? "&dt_from=" + SEARCH_PARAMS.dt_from : "");
        c += "&t=" + Math.random();
        var d = document.createElement("script");
        d.type = "text/javascript";
        d.src = c;
        ProcessSearchScript(d, a, b)
    }
}
function ProcessSearchScript(a, b, c, d) {
    0 == SEARCH_PARAMS.timeout_id ? (SEARCH_PARAMS.results_loaded = !1,
    a.onerror = CheckIfScriptLoaded,
    SEARCH_PARAMS.container.innerHTML = "",
    setTimeout(function() {
        SEARCH_PARAMS.container.appendChild(a)
    }, 20),
    SEARCH_PARAMS.next = b + c,
    SEARCH_PARAMS.current = b,
    SEARCH_PARAMS.prev = b >= c ? b - c : 0,
    SEARCH_PARAMS.isFirst = 0 == b,
    clearTimeout(SEARCH_PARAMS.timeout_id),
    SEARCH_PARAMS.timeout_id = setTimeout(CheckIfScriptLoaded, 15E3),
    lastCommand = null) : lastCommand = [a, b, c]
}
function CheckLastCommand() {
    lastCommand && ProcessSearchScript(lastCommand[0], lastCommand[1], lastCommand[2])
}
window.RenderSearchResults = function(a) {
    clearTimeout(SEARCH_PARAMS.timeout_id);
    SEARCH_PARAMS.timeout_id = 0;
    SEARCH_PARAMS.results_loaded = !0;
    var b = a.results
      , c = SEARCH_PARAMS.current + 1;
    SEARCH_PARAMS.isLast = SEARCH_PARAMS.from + SEARCH_PARAMS.count <= a.total;
    SEARCH_PARAMS.container.innerHTML = "";
    0 == b.length && (SEARCH_PARAMS.container.innerHTML = '<span class="search_none_found">' + SEARCH_DICTIONARY.found_none + "</span>");
    for (var d = 0; d < b.length && d < SEARCH_PARAMS.count; d++) {
        var e = b[d];
        if (e) {
            var f = e.info.author_login && "[deleted]" != e.info.author_login && "" != e.info.author_login ? " | <a href='https://www." + SEARCH_PARAMS.target_site + "/" + SEARCH_PARAMS.lng + "/users/" + e.info.author_login.toLowerCase() + "' title='" + e.info.author_login + "'>" + e.info.author_name + "</a>" : ""
              , g = createElement(SEARCH_PARAMS.container, "div", {
                className: "search_result"
            })
              , l = createElement(g, "span", {
                className: "title"
            });
            createElement(l, "a", {
                href: e.info.url,
                innerHTML: encodeHtml(e.info.title),
                target: "_blank"
            });
            l = GetDateTime(e.date);
            var m = createElement(g, "div", {
                className: "text"
            });
            if (!SEARCH_PARAMS.is_mobile) {
                if (e.info.avatar60x60 && e.info.avatar60x60.length) {
                    var h = createElement(m, "span", {
                        className: "search_result_logo"
                    });
                    var p = createElement(h, "a", {
                        className: "frame",
                        href: e.info.url
                    });
                    var t = createElement(p, "span", {
                        className: "bg"
                    });
                    p = 0 == e.info.avatar60x60.indexOf("/") ? "https://c.mql5.com" + e.info.avatar60x60 : e.info.avatar60x60;
                    createElement(t, "img", {
                        src: p,
                        width: 60,
                        height: 60,
                        alt: encodeHtml(e.info.title),
                        title: encodeHtml(e.info.title)
                    });
                    h.style.cssFloat = "left"
                }
                e.info.avatar110x140 && e.info.avatar110x140.length && (h = createElement(m, "span", {
                    className: "search_result_logo"
                }),
                p = 0 == e.info.avatar110x140.indexOf("/") ? "https://c.mql5.com" + e.info.avatar110x140 : e.info.avatar110x140,
                createElement(h, "img", {
                    src: p,
                    width: 60,
                    height: 8400 / 110 | 0,
                    alt: encodeHtml(e.info.title),
                    title: encodeHtml(e.info.title)
                }),
                h.style.cssFloat = "left")
            }
            SEARCH_PARAMS.is_mobile && e.text && (e.text = e.text.substring(0, 120) + "...");
            m.innerHTML += e.text ? encodeHtml(e.text) : "";
            h = 0 <= b[d].module.indexOf("metatrader4") ? "module_metatrader4_" + b[d].module.split(".")[3] : 0 <= b[d].module.indexOf("metatrader5") ? "module_metatrader5_" + b[d].module.split(".")[3] : "module_" + b[d].module.split(".")[3];
            f = createElement(g, "span", {
                className: "user_info",
                innerHTML: (SEARCH_DICTIONARY[h] || SEARCH_DICTIONARY.module_empty) + " | " + l + f
            });
            e.info.review_rating && (f.innerHTML += " | ",
            f.innerHTML += '<div class="rating small" style="margin-top:5px;margin-bottom:-1px;"><div class="v' + e.info.review_rating + '0" style="margin:0;"></div></div>');
            e.info.category && (f.innerHTML += " | ",
            f.innerHTML += e.info.category);
            e.info.platform && e.info.platform != e.info.category && (f.innerHTML += " | ",
            f.innerHTML += e.info.platform);
            e.info.files_info && (l = eval(e.info.files_info)) && l.length && 0 < l.length && (f.innerHTML += " | ",
            h = createElement(f, "span", {
                className: "attachments searchAttachments",
                id: "attaches_container_" + e.id
            }),
            RenderAttaches(h, h, l, e.id));
            e.info.price && (f.innerHTML += " | ",
            f.innerHTML += "0.00" != e.info.price ? e.info.price + " " + SEARCH_DICTIONARY.of_credits : SEARCH_DICTIONARY.price_free);
            e.info.user_company && (f.innerHTML += " | ",
            e.info.user_company_position && (f.innerHTML += encodeHtml(e.info.user_company_position) + " " + SEARCH_DICTIONARY.at + " "),
            f.innerHTML += encodeHtml(e.info.user_company));
            e.info.user_country && (f.innerHTML += " | " + encodeHtml(e.info.user_country));
            if (d == b.length - 1 || d == SEARCH_PARAMS.count - 1)
                g.className += " last";
            c++
        }
    }
    1 == SEARCH_PARAMS.scrollBottom && (window.scrollTo(0, 100500),
    SEARCH_PARAMS.scrollBottom = null);
    RenderSearchPaginatorEx(b.length, a.total, $("paginator_block_top"), !1);
    RenderSearchPaginatorEx(b.length, a.total, $("paginator_block_bottom"), !0);
    CheckLastCommand()
}
;
function RenderAttaches(a, b, c, d) {
    createElement(b, "a", {
        id: "attaches_link_" + d,
        href: "#",
        className: "attachesLink poppedUp",
        onclick: function() {
            ToggleAttaches(d);
            return !1
        },
        innerHTML: SEARCH_DICTIONARY.files + " (" + c.length + ")<small>&#x25BC;</small>"
    });
    a = createElement(a, "div", {
        id: "attaches_" + d
    });
    a.style.display = "none";
    for (b = 0; b < c.length; b++) {
        var e = c[b]
          , f = createElement(a, "div", {
            className: "attachItem"
        });
        createElement(f, "a", {
            href: e.url,
            innerHTML: e.name,
            className: e.ext
        });
        createElement(f, "span", {
            className: "attachSize",
            innerHTML: "(" + e.size_KB + ")"
        })
    }
}
function ToggleAttaches(a) {
    var b = $("attaches_" + a);
    if (b) {
        var c = "none" == b.style.display
          , d = $("attaches_link_" + a);
        d && (a = $("attaches_container_" + a)) && (a.className = c ? "attachments searchAttachments opened" : "attachments searchAttachments",
        d.className = c ? "attachesLink" : "poppedUp attachesLink",
        b.style.display = c ? "block" : "none")
    }
}
function CheckIfScriptLoaded() {
    SEARCH_PARAMS.results_loaded || (SEARCH_PARAMS.container.innerHTML = '<span class="search_none_found">' + SEARCH_DICTIONARY.error_loading + "</span>");
    SEARCH_PARAMS.timeout_id = 0;
    CheckLastCommand()
}
function ClearPaginators() {
    $("paginator_block_bottom").innerHTML = "";
    $("paginator_block_top").innerHTML = ""
}
function RenderSearchPaginatorEx(a, b, c, d) {
    var e = SEARCH_PARAMS.is_mobile ? 1 : 7
      , f = SEARCH_PARAMS.is_mobile ? 1 : 7;
    b = Math.ceil(b / SEARCH_PARAMS.count);
    a = SEARCH_PARAMS.current / SEARCH_PARAMS.count + 1;
    if (c && (c.innerHTML = "",
    c.style.display = "none",
    !(1 >= b))) {
        c.style.display = "";
        e = Math.max(1, a - e);
        f = Math.min(b, a + f);
        1 == b - f && (f = b);
        if (1 < e && (createElement(c, "a", {
            innerHTML: "1",
            className: "search_paginator_page",
            href: "javascript:GoToSearchPage(1," + d + ")"
        }),
        2 < e)) {
            var g = Math.ceil((e - 2) / 2) + 1;
            createElement(c, "a", {
                innerHTML: "...",
                className: "search_paginator_page dots",
                href: "javascript:GoToSearchPage(" + g + "," + d + ")"
            })
        }
        for (; e <= f; e++)
            createElement(c, "a", {
                innerHTML: e,
                className: "search_paginator_page" + (a == e ? " current" : ""),
                href: "javascript:GoToSearchPage(" + e + "," + d + ")"
            });
        f < b && (g = Math.ceil((b - f) / 2) + f,
        createElement(c, "a", {
            innerHTML: "...",
            className: "search_paginator_page dots",
            href: "javascript:GoToSearchPage(" + g + "," + d + ")"
        }),
        f < b - 1 && createElement(c, "a", {
            innerHTML: b,
            className: "search_paginator_page" + (a == b ? " current" : ""),
            href: "javascript:GoToSearchPage(" + b + "," + d + ")"
        }))
    }
}
function RenderSearchPaginator(a, b, c, d) {
    if (c) {
        a = SEARCH_PARAMS.is_mobile ? 2 : 7;
        c.innerHTML = "";
        b = Math.ceil(b / SEARCH_PARAMS.count);
        var e = SEARCH_PARAMS.current / SEARCH_PARAMS.count + 1
          , f = e > b - a | e < a ? SEARCH_PARAMS.is_mobile ? 3 : 6 : SEARCH_PARAMS.is_mobile ? 2 : 4;
        if (1 >= b)
            c.style.display = "none";
        else {
            c.style.display = "block";
            var g = createElement(c, "a", {
                innerHTML: "1",
                className: "search_paginator_page",
                href: "javascript:GoToSearchPage(1," + d + ")"
            });
            SEARCH_PARAMS.isFirst && (g.className += " current");
            e >= f && (hidden_page_num = Math.round((e - f + 1) / 2),
            createElement(c, "a", {
                innerHTML: "...",
                className: "search_paginator_page dots",
                href: "javascript:GoToSearchPage(" + hidden_page_num + "," + d + ")"
            }));
            for (var l = e - f; l <= e + f && l <= b; l++)
                2 > l || l > b || (g = createElement(c, "a", {
                    innerHTML: l,
                    className: "search_paginator_page",
                    href: "javascript:GoToSearchPage(" + l + "," + d + ")"
                }),
                l == e && (g.className += " current"));
            e <= b - a && (hidden_page_num = Math.round((b + e + f) / 2),
            createElement(c, "a", {
                innerHTML: "...",
                className: "search_paginator_page dots",
                href: "javascript:GoToSearchPage(" + hidden_page_num + "," + d + ")"
            }),
            createElement(c, "a", {
                innerHTML: b,
                className: "search_paginator_page",
                href: "javascript:GoToSearchPage(" + b + "," + d + ")"
            }))
        }
    }
}
function GoToSearchPage(a, b) {
    elementFrom = (a - 1) * SEARCH_PARAMS.count;
    window.hashParams.Set("page", a);
    ViewSearchResults(elementFrom, SEARCH_PARAMS.count);
    SEARCH_PARAMS.scrollBottom = b
}
function Suggestions(a, b, c, d) {
    function e(a) {
        setTimeout(function() {
            h()
        }, 10)
    }
    function f(a) {
        a = a || window.event;
        27 == a.keyCode && (r.focus(),
        r.select())
    }
    function g(a) {
        a = a || window.event;
        return 27 == a.keyCode ? (h(),
        !1) : !0
    }
    function l() {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.src = t + "?keyword=" + encodeURIComponent(w) + "&hl=" + n + "&callback=window.SuggestionControllers[" + u + "].RenderSuggestions";
        r.parentNode.appendChild(a)
    }
    function m(a) {
        a = a || window.event;
        if (38 == a.keyCode || 40 == a.keyCode || 39 == a.keyCode) {
            var b = a.keyCode;
            if (v)
                for (a = v.getElementsByTagName("tr"),
                40 == b && (v.selectedSuggestIndex = v.selectedSuggestIndex || 0 == v.selectedSuggestIndex ? v.selectedSuggestIndex + 1 : 0,
                v.selectedSuggestIndex >= a.length && (v.selectedSuggestIndex = 0)),
                38 == b && (v.selectedSuggestIndex = v.selectedSuggestIndex ? v.selectedSuggestIndex - 1 : a.length - 1,
                0 > v.selectedSuggestIndex && (v.selectedSuggestIndex = a.length - 1)),
                b = 0; b < a.length; b++)
                    Class(a[b], "selected", b != v.selectedSuggestIndex),
                    b == v.selectedSuggestIndex && (r.value = a[b].firstChild.suggestValue);
            else
                40 == b && 0 < w.length && l()
        } else
            13 != a.keyCode && w != r.value && (w = r.value,
            h(),
            w && l())
    }
    function h(a) {
        a && (w = a,
        r.value = a);
        v && v.parentNode && v.parentNode.removeChild(v);
        v = null
    }
    function p(a, b) {
        b = b ? b.fulltrim() : null;
        var c = createElement(null, "tr")
          , d = a.indexOf(b)
          , e = 0 <= d ? a.substring(d, b.length) : ""
          , f = 0 <= d ? a.substring(0, d) : "";
        b = 0 <= d ? a.substring(d + b.length) : a;
        e = createElement(c, "td", {
            innerHTML: f + '<span class="highlighted">' + e + "</span>" + b,
            suggestValue: a
        });
        e.addEventListener ? e.addEventListener("mousedown", function() {
            h(a);
            q && q()
        }, !1) : e.attachEvent("onmousedown", function() {
            h(a);
            q && q()
        });
        return c
    }
    var t = b
      , n = c
      , r = $(a);
    if (r && !r.isSuggest) {
        var q = d;
        window.SuggestionControllers || (window.SuggestionControllers = []);
        var u = window.SuggestionControllers.length;
        window.SuggestionControllers[window.SuggestionControllers.length] = this;
        r.autocomplete = "off";
        var w = r.value, v;
        r.isSuggest = !0;
        r.addEventListener ? (r.addEventListener("keypress", g, !1),
        window.addEventListener("keypress", f, !1),
        r.addEventListener("keyup", m, !1),
        r.addEventListener("blur", e, !1)) : (r.attachEvent("onkeypress", g),
        window.attachEvent("onkeypress", f),
        r.attachEvent("onkeyup", m),
        r.attachEvent("onblur", e));
        this.HideSuggests = function() {
            h()
        }
        ;
        this.RenderSuggestions = function(a) {
            h();
            if (a[1] && a[1].length) {
                v = createElement(null, "table", {
                    className: "suggestionsTable",
                    cellPadding: 0,
                    cellSpacing: 0
                });
                for (var b = 0; b < a[1].length; b++)
                    v.appendChild(p(a[1][b][0], w));
                a = getElementSize(r.parentNode);
                v.style.width = a.width + 2 + "px";
                b = getOffsetSum(r.parentNode);
                v.style.top = b.top + a.height + 1 + "px";
                v.style.left = b.left + "px";
                document.body.appendChild(v)
            }
        }
    }
}
;function chatWidget(a, b, c, d, e, f, g, l, m, h, p, t) {
    function n(a, b) {
        a && 0 !== a.length || (a = d.errorOccuredMessage);
        "_" !== a && la && (la.style.display = "block",
        la.innerHTML = "<span>" + a + "</span>",
        a = -1 < a.indexOf("<a") ? 1E4 : 3E3,
        403 != b && setTimeout(function() {
            la.style.display = "none"
        }, a),
        Y && (Y = !1))
    }
    function r() {
        fa && (Q = window.localStorage.setItem("chat", JSON.stringify(Q)))
    }
    function q() {
        0 == ba && F();
        z();
        Class(P, "active", !0);
        return D()
    }
    function u(a) {
        q();
        S && S.Close();
        window.ChatsData.CreatePrivateChat(a, function(a) {
            var b = window.ChatsData.GetChatLocal(a);
            b ? v(b) : window.ChatsData.GetChat(a, v)
        })
    }
    function w(a) {
        q();
        S && S.Close();
        var b = window.ChatsData.GetChatLocal(a);
        b ? v(b) : window.ChatsData.GetChat(a, v)
    }
    function v(a) {
        a && (a.length && (a = a[0]),
        S = new K(a,p),
        a.user_info || 3 === a.type && a.author_id !== M || window.ChatsData.GetChatUsers(a.id, G),
        "customScrollWrapper" === O.parentNode.className && (O.parentNode.style.visibility = "hidden"),
        B(a.id),
        Q = Q || {},
        Q.latestChat = a.id,
        r())
    }
    function B(a) {
        z();
        Class(P, "active", !1);
        var b = $("chatLineLite_" + a);
        Class(b, "active", !1);
        L = a
    }
    function z() {
        var a = O.getElementsByClassName("active");
        a && 0 < a.length && Class(a[0], "active", !0)
    }
    function D() {
        if (S)
            S.Close();
        else
            return !1;
        S && S.GetChatId() && window.siteUpdates.RegisterRenderCallback(13, 1, void 0, {
            chid: void 0
        });
        S = null;
        O.parentNode.style.visibility = "visible";
        L = null;
        Q = Q || {};
        Q.latestChat = void 0;
        r();
        return !0
    }
    function A(a, b) {
        S && S.resizeScrollContainer();
        Q = Q || {};
        Q.width = a;
        Q.height = b;
        r()
    }
    function F() {
        window.ChatsData.WsSupport && (O && (O.innerHTML = ""),
        ba = 1,
        window.ChatsData.GetChats(X, 200, I))
    }
    function H(a) {
        if (ha)
            P || (ja = 48,
            xa = 54,
            P = $("chatContainer"),
            ka = new aa,
            O = createElement(P, "DIV", {
                className: "chatWidgetContent"
            }),
            la = createElement(P, "DIV", {
                className: "chatWidgetError"
            }));
        else {
            if (!P) {
                var b = $("notify_messages");
                if (b && !(0 <= b.className.indexOf("static"))) {
                    P = createElement(document.body, "div", {
                        className: "chatWidget"
                    });
                    P.style.width = Q.width + "px";
                    P.style.height = Q.height + "px";
                    if (b = $("cover"))
                        if (b = getElementsByClass("head", b)[0])
                            b = getOffsetSum(b),
                            5 < b.top && (P.style.top = b.top + 41 + "px");
                    O = createElement(P, "div", {
                        className: "chatWidgetContent"
                    });
                    b = createElement(P, "div", {
                        className: "chatWidgetBottom"
                    });
                    var c = createElement(b, "div", {
                        className: "chatWidgetError"
                    });
                    la = createElement(c, "div");
                    createElement(b, "a", {
                        className: "bottomButton expandIco",
                        href: "/" + T + "/users/" + C + "/messages",
                        target: "_blank",
                        title: d.expandWindow
                    });
                    makeResizable(P, 240, 240, A)
                }
            }
            SearchBoxContainer.Hide(void 0, !0);
            U = $(U.id);
            P.style.display = "block"
        }
        ia = !0;
        window.ChatsData.WsSupport ? 0 != ba || a || F() : P.innerHTML = '<div class="chatWidgetContent wsError" style="height:auto;">Your browser is not supported</div>';
        ha || Class(U, "opened", !1)
    }
    function E() {
        q();
        P && (P.style.display = "none",
        ia = !1,
        U && (U = $(U.id),
        Class(U, "opened", !0)))
    }
    function J(a, b) {
        fa && (a = na.getItem("chatWidget_lastNotified") || "0",
        a = parseInt(a),
        a > qa && (qa = a));
        a = qa;
        if ((!0 === window.isWindowActive || window.isLastActiveWindow()) && ua && a < b && wa) {
            try {
                ua.play()
            } catch (Ba) {}
            fa && na.setItem("chatWidget_lastNotified", b + "");
            qa = b
        }
    }
    function I(a, b) {
        if (a && a.length) {
            var c = !t || pa || L || !ha ? null : a[0];
            if (b)
                for (; O.firstChild; )
                    O.removeChild(O.firstChild);
            for (b = 0; b < a.length; b++)
                if (P) {
                    for (var d = W(a[b]), e = $(d.id); e && e.parentNode; )
                        e.parentNode.removeChild(e),
                        e = $(d.id);
                    if (d)
                        a: {
                            e = d;
                            var f = O
                              , g = e.dataset.lastUpdate
                              , h = getElementsByClass("chatLineLite", f);
                            if (h && h.length)
                                for (var l = 0; l < h.length; l++) {
                                    var m = h[l];
                                    if (0 < window.ChatsData.CompareHex(g, m.dataset.lastUpdate)) {
                                        m.parentNode.insertBefore(e, m);
                                        break a
                                    }
                                }
                            f.appendChild(e)
                        }
                    a[b].user_info ? G([a[b].user_info]) : 3 !== a[b].type ? window.ChatsData.GetChatUsers(a[b].id, G) : a[b].avatarIsPresent && !a[b].avatar_url && ((e = oa[a[b].id]) ? N(a[b].id, e) : window.ChatsData.GetChatAvatar(a[b].id, N));
                    X < d.id && (X = d.id)
                }
            L && B(L);
            c && (pa = !0,
            (a = $("chatIntro")) && a.offsetWidth && (Q.latestChat ? w(Q.latestChat) : v(c)))
        }
    }
    function G(a) {
        if (a && a.length) {
            a = a[0];
            var b = a.chat_id
              , c = window.ChatsData.GetChatLocal(b);
            if (c && 1 === c.type) {
                if (!c.avatar_url || a.avatar && c.avatar_url !== a.avatar) {
                    var d = $("chat_avatar_" + b);
                    d && a.avatar && (d.src = a.avatar,
                    d.style.display = "inline",
                    c.avatar_url = a.avatar)
                }
                (c = $("chat_title_" + b)) && a.name && (c.innerText = a.name || a.login);
                (c = $("chatCommentsOtherUserLogin_" + b)) && a.login && (c.value = a.login);
                (c = $("chatCommentsOtherUserName_" + b)) && a.name && (c.value = a.name || a.login);
                (c = $("chatContentWrapper_" + b)) && a.login && (c.dataset.userLogin = a.login)
            }
            S && S.chat && S.chat.id === b && S.UpdateStatusBar()
        }
    }
    function N(a, b) {
        a && b && (oa[a] = b,
        a = $("chat_avatar_" + a)) && (a.src = b,
        a.style.display = "inline")
    }
    function W(a) {
        var b = createElement(null, "DIV", {
            className: "chatLineLite",
            id: "chatLineLite_" + a.id
        });
        b.dataset.lastUpdate = a.lastUpdateHex;
        var c = Z(a);
        c && b.appendChild(c);
        createElement(b, "INPUT", {
            id: "chatCommentsOtherUserLogin_" + a.id,
            type: "hidden",
            value: a.login
        });
        createElement(b, "INPUT", {
            id: "chatCommentsOtherUserName_" + a.id,
            type: "hidden",
            value: a.name
        });
        a.unread_count && createElement(b, "SPAN", {
            className: "chatMessagesCount unread",
            innerHTML: a.unread_count
        });
        window.ChatsData.IsChatUnread(a) && Class(b, "unread");
        c = createElement(b, "DIV", {
            className: "user"
        });
        c.innerText = ExtractLogoLetters(a.name);
        c = createElement(c, "IMG", {
            width: ja,
            height: ja,
            title: a.name,
            id: "chat_avatar_" + a.id
        });
        a.avatar_url ? c.src = a.avatar_url : 1 === a.type && a.user_info && a.user_info.length && a.user_info[0].avatar ? (a.avatar_url = a.user_info[0].avatar,
        c.src = a.avatar_url) : c.style.display = "none";
        c = createElement(b, "A", 1 === a.type && a.user_info && a.user_info.lengt ? {
            className: "chatContentWrapper",
            href: "/" + T + "/users/" + C + "/messages?user=" + a.user_info[0].login.toLowerCase(),
            target: "_blank",
            id: "chatContentWrapper_" + a.id
        } : {
            className: "chatContentWrapper",
            id: "chatContentWrapper_" + a.id
        });
        c.onclick = function() {
            w(a.id);
            return !1
        }
        ;
        createElement(c, "DIV", {
            className: "chatTitle",
            id: "chat_title_" + a.id,
            innerText: a.name
        });
        a.text && a.text.length > sa && (a.text = a.text.substring(0, sa));
        createElement(c, "DIV", {
            className: "chatTextWrapper",
            innerText: a.text || " ",
            id: "chat_text_" + a.id
        });
        c = createElement(c, "DIV", {
            className: "chatDate updatableDateContainer"
        });
        createElement(c, "INPUT", {
            type: "hidden",
            value: a.date
        });
        createElement(c, "SPAN", {
            innerHTML: a.date_text
        });
        return b
    }
    function Z(a) {
        return ca && 1 === a.type ? createElement(null, "span", {
            className: "deleteChat",
            title: d.deleteChat + "*",
            onclick: function() {
                confirm(d.deleteChatConfirm) && Ajax.post("https://www.mql5.com/api/chat/delete", {
                    chatId: "0x" + a.id,
                    userId1: M,
                    userId2: a.user_info && a.user_info.length ? "0x" + a.user_info[0].idHex : null
                }, !1, {
                    onready: function() {
                        L === a.id && D();
                        window.ChatsData.GetAllChatsRaw()
                    },
                    onerror: function() {
                        alert("Error occured");
                        window.ChatsData.GetAllChatsRaw()
                    }
                })
            }
        }) : null
    }
    function R(a) {
        U = $(U.id);
        var b = getElementsByClass("messages", U);
        if (b && b.length) {
            var c = getElementsByClass("count", b[0]);
            c && c.length && b[0].removeChild(c[0]);
            0 < a && createElement(b[0], "span", {
                className: "count",
                innerText: a
            })
        }
    }
    function K(a, b) {
        function c() {
            if (E && E.onscroll)
                E.onscroll()
        }
        function e() {
            X.innerHTML = "";
            createElement(X, "span", {
                className: "chatWidgetCommentsListClose ico",
                onclick: function() {
                    q(!0)
                },
                title: d.closeChat
            });
            3 !== a.type || ua || (window.ChatsData.GetChatLocal(z) ? createElement(X, "a", {
                className: "chatWidgetCommentsListSubscribe unsubscribe",
                onclick: function() {
                    window.ChatsData.Subscribe(z, M, !1, S.UpdateStatusBar);
                    window.ChatsData.RemoveChat(z)
                },
                innerText: d.unsubscribe
            }) : createElement(X, "a", {
                className: "chatWidgetCommentsListSubscribe subscribe",
                onclick: function() {
                    window.ChatsData.Subscribe(z, M, !0, w)
                },
                innerText: d.subscribe
            }));
            !ya && 1 === a.type && a.user_info && a.user_info.length ? createElement(X, "a", {
                className: "chatWidgetCommentsListUserLink",
                href: "/" + T + "/users/" + a.user_info[0].login.toLowerCase(),
                target: "_blank",
                innerText: A
            }) : 2 === a.type && a.countMembers ? createElement(X, "b", {
                className: "chatWidgetCommentsListUserLink",
                innerText: A + ", " + d.ofUsers.replace("{0}", a.countMembers)
            }) : 3 === a.type && a.countMembers ? createElement(X, "b", {
                className: "chatWidgetCommentsListUserLink",
                innerText: A + ", " + d.ofSubscribers.replace("{0}", a.countMembers)
            }) : createElement(X, "b", {
                className: "chatWidgetCommentsListUserLink",
                innerText: A
            })
        }
        function f(a, b) {
            for (var c = 0; c < a.length; c++)
                if (!F || 0 > window.ChatsData.CompareHex(a[c].id, F))
                    F = a[c].id;
            console.log("loaded messages: " + a.length);
            b ? a.reverse() : G = !0;
            g(E, {
                comments: a,
                chat_id: z,
                chat_title: A
            });
            E._loading = !1;
            Class(E, "loading", !0);
            window.ChatsData.GetChat(z, I);
            !G && E.scrollHeight <= E.clientHeight && window.ChatsData.GetMessages(z, F, f)
        }
        function g(a, b, c) {
            if (a = "string" == typeof b ? window.JSON ? JSON.parse(b) : eval("(" + b + ")") : b) {
                ca || (ba = D = a.answers_count,
                A = a.chat_title,
                z = a.chat_id,
                e(),
                ca = !0);
                a = a.comments || [];
                R(window.ChatsData.GetUnreadCount());
                b = l(a);
                m(a);
                if (ba === D || c)
                    E.scrollTop = E.scrollHeight;
                ba -= b
            }
        }
        function l(a) {
            if (!a)
                return n(),
                0;
            if ((a = "string" == typeof a ? window.JSON ? JSON.parse(a) : eval("(" + a + ")") : a) && 0 < a.length && a[0].hasOwnProperty("errorMessage"))
                return n(a[0].errorMessage),
                0;
            for (var b = (new Date).setHours(0, 0, 0, 0) / 1E3, c = 0, d = 0; d < a.length; d++)
                if (!(z && a[d].parent_id !== z || 0 <= qa.indexOf(a[d].id) || 0 < a[d].record_id)) {
                    qa.push(a[d].id);
                    var e = E.scrollTop
                      , f = E.scrollHeight;
                    p(a[d], E, b);
                    E.scrollTop = e + (E.scrollHeight - f);
                    c++
                }
            return c
        }
        function m(b) {
            if (b && b.length) {
                for (var c = $("unreadMessageIndicator"), e = null, f = 0; f < b.length; f++) {
                    var g = b[f];
                    g.author_id !== M && (0 >= window.ChatsData.CompareHex(g.id, a.lastAccessHex) || (e ? 0 > window.ChatsData.CompareHex(g.id, e.id) && (e = g) : e = g))
                }
                e && (b = $("chatWidgetComment_" + a.id + "_" + e.id)) && (c && c.parentNode.removeChild(c),
                c = createElement(null, "div", {
                    className: "chatWidgetCommentLine unreadMessage",
                    id: "unreadMessageIndicator"
                }),
                createElement(c, "div", {
                    className: "chatWidgetCommentWrapper",
                    innerHTML: '<div class="chatWidgetCommentText">' + d.unreadMessages + "</div>"
                }),
                b.parentNode.insertBefore(c, b))
            }
        }
        function p(b, c, e) {
            if (b.is_system)
                a: {
                    var f = "";
                    if (b.serviceChange)
                        switch (b.serviceChange) {
                        case U.UserAdd:
                            f = b.serviceUserId === M ? d.systemYouInvited.replace("{0}", A) : d.systemUserInvited.replace("{0}", b.author_name).replace("{1}", b.serviceUserName);
                            break;
                        case U.UserRemove:
                            f = b.author_id === b.serviceUserId ? d.systemChatUserLeft.replace("{0}", b.serviceUserName) : 3 === a.type ? d.systemChannelUserRemoved.replace("{0}", b.author_name).replace("{1}", b.serviceUserName) : d.systemChatUserRemoved.replace("{0}", b.author_name).replace("{1}", b.serviceUserName);
                            break;
                        case U.IsPublic:
                            f = b.serviceChangeValue ? d.systemChannelPublic.replace("{0}", b.author_name) : d.systemChannelPrivate.replace("{0}", b.author_name);
                            break;
                        case U.IsLimited:
                            f = b.serviceChangeValue ? d.systemChatLimited.replace("{0}", b.author_name) : d.systemChatUnlimited.replace("{0}", b.author_name);
                            break;
                        case U.IsClosed:
                            f = 3 === a.type ? b.serviceChangeValue ? d.systemChannelClosed : d.systemChannelReopened : b.serviceChangeValue ? d.systemChatClosed.replace("{0}", b.author_name) : d.systemChatReopened.replace("{0}", b.author_name);
                            break;
                        case U.Name:
                            f = 3 === a.type ? d.systemChannelRename.replace("{0}", '"' + b.serviceChatName + '"') : d.systemChatRename.replace("{0}", b.author_name).replace("{1}", '"' + b.serviceChatName + '"');
                            break;
                        case U.ChatCreate:
                            f = 3 === a.type ? d.systemChannelCreate.replace("{0}", '"' + b.serviceChatName + '"') : d.systemChatCreate.replace("{0}", b.author_name).replace("{1}", '"' + b.serviceChatName + '"');
                            break;
                        default:
                            e = null;
                            break a
                        }
                    var g = createElement(null, "div", {
                        className: "chatWidgetCommentLine systemComment",
                        id: "chatWidgetComment_" + b.parent_id + "_" + b.id
                    })
                      , l = createElement(g, "div", {
                        className: "chatWidgetCommentWrapper"
                    });
                    createElement(l, "div", {
                        className: "chatWidgetCommentText",
                        innerText: f,
                        title: b.date < e ? GetDateTimeLocal(b.date) : DateToStringForTodayLocal(b.date)
                    });
                    g.dataset.seq = b.seq;
                    g.dataset.id = b.id;
                    e = g
                }
            else
                f = createElement(null, "div", {
                    className: "chatWidgetCommentLine" + (b.author_id === M ? " byOwner" : ""),
                    id: "chatWidgetComment_" + b.parent_id + "_" + b.id
                }),
                f.dataset.seq = b.seq,
                f.dataset.id = b.id,
                g = createElement(f, "div", {
                    className: "chatWidgetCommentWrapper"
                }),
                2 === a.type && b.author_id !== M && (createElement(g, "div", {
                    className: "chatWidgetCommentAuthor",
                    innerText: b.author_name
                }),
                Class(g, "has-author")),
                g = createElement(g, "div", {
                    className: "chatWidgetCommentText",
                    innerText: b.content
                }),
                g.innerHTML = urlsToLinks(g.innerHTML, h),
                l = createElement(g, "div", {
                    className: "chatWidgetCommentDate updatableDateContainer"
                }),
                createElement(l, "INPUT", {
                    type: "hidden",
                    value: b.date
                }),
                createElement(l, "SPAN", {
                    innerText: b.date < e ? GetDateTimeLocal(b.date) : DateToStringForTodayLocal(b.date),
                    title: GetDateTimeLocal(b.date)
                }),
                fa(b, g, l),
                e = f;
            if (e)
                if ((f = getElementsByClass("chatWidgetCommentLine", c)) && f.length) {
                    g = void 0;
                    l = 0;
                    var m = b.id;
                    if (m)
                        for (var n = 0; n < f.length; n++) {
                            var q = f[n].dataset.id;
                            q && 0 < window.ChatsData.CompareHex(q, m) && (!g || 0 > window.ChatsData.CompareHex(q, l)) && (g = f[n],
                            l = q)
                        }
                    g ? c.insertBefore(e, g) : c.appendChild(e);
                    b.attachments && b.attachments.length || 80 < (e.clientHeight || e.offsetHeight) && Class(e, "fullWidth")
                } else
                    c.appendChild(e)
        }
        function fa(a, b, c) {
            if (a.attachments && 0 != a.attachments.length) {
                var d = getElementsByClass("attach", b);
                d && d.length ? (d = d[0],
                c = getElementsByClass("attachBlock", d),
                c.length && (c = c[0])) : (d = createElement(null, "DIV", {
                    className: "attach"
                }),
                c ? b.insertBefore(d, c) : b.appendChild(d),
                d.style.clear = "both",
                c = createElement(d, "DIV", {
                    className: "attachBlock",
                    id: "cb_" + a.id
                }));
                for (var e = 0; e < a.attachments.length; e++) {
                    var f = a.attachments[e];
                    var g = createElement(c, "DIV", {
                        className: "attachItem"
                    });
                    var h = getFileExtension(f.name, !0);
                    h && 0 <= va.indexOf(h) || (h = "unk");
                    var l = f.name + " (" + f.size_text + ")";
                    h = createElement(null, "A", {
                        className: h,
                        target: "_blank",
                        href: f.url,
                        innerText: f.name,
                        title: l
                    });
                    if (!f.preview_url || 1 !== f.type && 2 !== f.type)
                        g.appendChild(h);
                    else {
                        var m = createElement(g, "DIV", {
                            className: "attachPreview"
                        });
                        l = createElement(m, "A", {
                            target: "_blank",
                            href: f.url,
                            title: l
                        });
                        f.mimeType.startsWith("image") ? (createElement(l, "IMG", {
                            src: f.url
                        }),
                        r(f, l, Math.min(512, (E.clientWidth || E.offsetWidth || 560) - 48)),
                        g = function(a) {
                            a.preventDefault();
                            ta.show(f.url);
                            return !1
                        }
                        ,
                        d.className = "attach image",
                        Core.AddHandler(l, "click", g),
                        Core.AddHandler(h, "click", g),
                        b.parentNode && Class(b.parentNode, "attach-wrapper")) : f.mimeType.startsWith("video") ? (r(f, l),
                        g = function(a) {
                            a = a || window.event;
                            a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                            ma.show(f.url, f.preview_url, f.mimeType)
                        }
                        ,
                        d.className = "attach video",
                        Core.AddHandler(l, "click", g),
                        Core.AddHandler(h, "click", g),
                        createElement(d, "span", {
                            className: "size-badge",
                            innerText: f.size_text
                        }),
                        b.parentNode && Class(b.parentNode, "attach-wrapper")) : g.appendChild(h)
                    }
                }
            }
        }
        function r(a, b, c) {
            c = c || 512;
            b.style.backgroundImage = "url('" + a.preview_url + "')";
            var d = a.width
              , e = a.height;
            a.width > c ? a.height > a.width ? (e = c,
            d /= a.height / c) : (d = c,
            e /= a.width / c) : a.height > c && (e = c,
            d /= a.height / c);
            b.style.width = d + "px";
            b.style.height = e + "px";
            b.style.backgroundSize = d + "px auto"
        }
        function t() {
            if (!G) {
                var a = F;
                ca || addCustomScroll(E, "#4A76B8", "#AEC2DD", 4, 4, null);
                E._loading = !0;
                window.ChatsData.GetMessages(z, a, f)
            }
        }
        function na(a) {
            K.innerHTML = "";
            N = createElement(K, "form", {
                method: "POST",
                action: ("/" + T + "/users/" + C + "/message/new").toLowerCase(),
                enctype: "multipart/form-data",
                onsubmit: function() {
                    u();
                    return !0
                }
            });
            createElement(N, "input", {
                type: "hidden",
                name: "type",
                value: "widget"
            });
            createElement(N, "input", {
                type: "hidden",
                name: "userTo",
                value: B
            });
            createElement(N, "input", {
                type: "hidden",
                name: "__signature",
                id: "chatWidgetNewMessageSignature",
                value: da
            });
            createElement(N, "input", {
                type: "hidden",
                name: "formType",
                value: "ajax"
            });
            Q = createElement(N, "input", {
                type: "hidden",
                name: "content",
                value: ""
            });
            createElement(N, "button", {
                type: "button",
                className: "ico",
                onclick: u,
                title: d.sendMessageTitle
            });
            O = createElement(N, "div", {
                className: "inputWrapper"
            });
            W = createElement(O, "div", {
                className: "fileWrapper ico"
            });
            aa();
            L = createElement(O, "textarea", {
                rows: 1
            });
            a && (L.value = a);
            L.onkeydown = function(a) {
                a = a || window.event;
                return 13 === a.keyCode && a.ctrlKey ? (u(),
                !1) : !0
            }
            ;
            L.onkeyup = function(a) {
                v(this);
                c()
            }
            ;
            L.focus();
            Z = 0
        }
        function aa() {
            return createElement(W, "INPUT", {
                title: d.attachFileTitle + ": " + ra.join(", "),
                type: "file",
                name: "attachedFile",
                onchange: function() {
                    window.ChatsData.AddFile(z, this.files[0]);
                    c()
                },
                accept: "." + ra.join(",."),
                onclick: function() {
                    return 4 > Z
                }
            })
        }
        function u() {
            if (!Y) {
                var a = L.value;
                if (a && a.length && !(1E5 < a.length)) {
                    Q.value = L.value;
                    Y = !0;
                    window.ChatsData.AddText(z, Q.value);
                    Q.value = "";
                    L.value = "";
                    v(L);
                    if ((a = getElementsByClass("readonlyAttachWrapper", N)) && a.length)
                        for (var b = a.length - 1; 0 <= b; ) {
                            var d = a[b];
                            d.parentNode.removeChild(d);
                            --b
                        }
                    Z = 0;
                    c()
                }
            }
        }
        function v(a) {
            if (window.getComputedStyle) {
                var b = a.clientHeight
                  , c = parseInt(window.getComputedStyle(E.parentNode, null).getPropertyValue("bottom") || 0);
                a.style.height = xa + "px";
                a.style.height = Math.min(a.scrollHeight, 160) + "px";
                E.parentNode.style.bottom = c - b + a.clientHeight + "px"
            }
        }
        var ca = !1;
        this.chat = a;
        var ua = M === a.author_id
          , z = a.id || 0;
        this.GetChatId = function() {
            return z
        }
        ;
        var B = a.login;
        this.GetUserToLogin = function() {
            return B
        }
        ;
        var A = a.name
          , qa = []
          , D = 0
          , ba = 0
          , F = void 0
          , G = !1
          , ea = $("chatWidgetComments");
        ea && ea.parentNode.removeChild(ea);
        ea = createElement(P, "div", {
            className: "chatWidgetComments",
            id: "chatWidgetComments"
        });
        var H = createElement(ea, "div", {
            className: "chatWidgetCommentsStatus",
            id: "chatWidgetCommentsStatus"
        })
          , X = createElement(H, "div")
          , E = createElement(ea, "div", {
            className: "chatWidgetCommentsList",
            id: "chatWidgetCommentsList"
        })
          , K = createElement(ea, "div", {
            className: "chatWidgetCommentsEditor",
            id: "chatWidgetCommentsEditor"
        })
          , ya = 18799 === a.author_id;
        ya || 3 === a.type && !ua || b ? Class(ea, "systemChat") : na();
        window.ChatsData && (window.ChatsData.OnMessageAdd2 = function(a) {
            for (var b = 0, c = !1, d = 0; d < a.length; d++) {
                var e = a[d];
                e.author_id !== M && e.date > b && (b = e.date);
                e.author_id === M && (c = !0)
            }
            c = E.scrollTop === E.scrollHeight || c;
            l(a);
            window.siteUpdates.GetUpdates();
            Y = !1;
            c && (E.scrollTop = E.scrollHeight);
            0 < b && J(null, b)
        }
        );
        this.resizeScrollContainer = c;
        e();
        t();
        (function() {
            var a = E.onscroll;
            E.onscroll = function() {
                if (!(1 > ba)) {
                    var b = 50 > E.scrollTop;
                    b && !E._loading && t();
                    a && a(arguments)
                }
            }
        }
        )();
        var O, L, N, Q, W, Z;
        this.UpdatesCallback = function(a) {
            if (!a)
                return !1;
            var b = !1;
            a: {
                if (a.a && a.a.length && 0 != a.a.length)
                    for (var c = 0; c < a.a.length; c++)
                        if ("comments" === a.a[c].key) {
                            a = a.a[c].value;
                            break a
                        }
                a = []
            }
            if (a && a.length) {
                for (c = 0; c < a.length; c++)
                    a[c].parent_id == z && (b = a[c].author_login != C);
                l(a);
                E.scrollTop = E.scrollHeight
            }
            return b
        }
        ;
        this.Close = function() {
            ea && ea.parentNode && ea.parentNode.removeChild(ea)
        }
        ;
        this.UpdateStatusBar = function() {
            e()
        }
        ;
        var U = {
            UserAdd: 1,
            UserRemove: 2,
            IsPublic: 3,
            IsLimited: 4,
            IsClosed: 5,
            Name: 6,
            ChatCreate: 7
        }
    }
    function aa(a) {
        function b(a) {
            var b = createElement(null, "DIV", {
                className: "chatLineLite tiny",
                id: "chatLineLite_" + a.id
            });
            createElement(b, "INPUT", {
                id: "chatCommentsOtherUserLogin_" + a.id,
                type: "hidden",
                value: a.login
            });
            createElement(b, "INPUT", {
                id: "chatCommentsOtherUserName_" + a.id,
                type: "hidden",
                value: a.name
            });
            var c = createElement(b, "DIV", {
                className: "user"
            });
            c.innerText = ExtractLogoLetters(a.name);
            c = createElement(c, "IMG", {
                width: 25,
                height: 25,
                title: a.name,
                id: "chat_avatar_" + a.id
            });
            a.avatar ? c.src = a.avatar : c.style.display = "none";
            c = createElement(b, "A", 3 === a.type ? {
                className: "chatContentWrapper",
                id: "chatContentWrapper_" + a.id
            } : {
                className: "chatContentWrapper",
                href: "/" + T + "/users/" + C + "/messages?user=" + a.login.toLowerCase(),
                target: "_blank",
                id: "chatContentWrapper_" + a.id
            });
            c.onclick = function() {
                3 === a.type ? w(a.id) : u(a.id);
                h.value = "";
                Class(g, "active", !0);
                return e = !1
            }
            ;
            createElement(c, "DIV", {
                className: "chatTitle",
                id: "chat_title_" + a.id,
                innerText: a.name
            });
            return b
        }
        var c = null
          , e = !1
          , f = function() {
            if (!e)
                return !1;
            Class(g, "active", !0);
            h.value = "";
            e = !1;
            return !0
        }
          , g = createElement(a ? a : P, "div", {
            className: "chatWidgetSearch"
        });
        a = createElement(g, "div", {
            className: "search-form"
        });
        var h = createElement(a, "INPUT", {
            type: "text",
            className: "input",
            placeholder: d.searchUserPlaceholder
        });
        createElement(a, "a", {
            className: "close ico"
        }).onclick = f;
        a = createElement(createElement(g, "div", {
            className: "tabs"
        }), "ul");
        var l = createElement(createElement(a, "li", {
            className: "selected"
        }), "a", {
            innerText: d.users
        })
          , m = createElement(l, "span", {
            className: "badge"
        })
          , n = createElement(createElement(a, "li"), "a", {
            innerText: d.channels
        })
          , q = createElement(n, "span", {
            className: "badge"
        })
          , ma = [l.parentNode, n.parentNode];
        a = createElement(g, "div", {
            className: "chatWidgetContent"
        });
        var p = createElement(a, "div", {
            className: "list selected"
        })
          , fa = createElement(a, "div", {
            className: "list"
        })
          , r = [p, fa]
          , M = function(a, b) {
            for (var c = 0; c < ma.length; c++)
                ma[c].className = "";
            for (c = 0; c < r.length; c++)
                r[c].className = "list";
            a.parentNode.className = "selected";
            b.className = "list selected"
        };
        l.parentNode.onclick = function() {
            M(l, p)
        }
        ;
        n.parentNode.onclick = function() {
            M(n, fa)
        }
        ;
        var t = function(a, c) {
            if (!a.firstChild && c && c.length)
                for (var d = 0; d < c.length; d++)
                    if (!c[d].login || c[d].login !== C) {
                        var e = b(c[d]);
                        a.appendChild(e)
                    }
        }
          , na = function(a, c) {
            if (c && c.length)
                for (; a.firstChild; )
                    a.removeChild(a.firstChild);
            if (c && c.length)
                for (var d = 0; d < c.length; d++)
                    if (!c[d].login || c[d].login !== C) {
                        c[d].chat_id = c[d].idHex;
                        var e = b(c[d]);
                        a.appendChild(e)
                    }
        }
          , aa = function(a) {
            clearTimeout(c);
            if (a && a.length) {
                for (var b = 0; b < r.length; b++)
                    for (; r[b].firstChild; )
                        r[b].removeChild(r[b].firstChild);
                window.ChatsData.UsersSearch(a, 100, function(a) {
                    na(p, a)
                });
                window.ChatsData.ChannelSearch(a, 100, function(a) {
                    na(fa, a)
                });
                t(p, window.ChatsData.UsersSearchLocal(a, 100), m);
                t(fa, window.ChatsData.ChannelSearchLocal(a, 100), q)
            }
        };
        h.onkeyup = function() {
            !this.value || !this.value.length || 2 > this.value.length ? f() : (Class(g, "active"),
            e = !0,
            clearTimeout(c),
            c = setTimeout(aa, 300, this.value))
        }
        ;
        this.Open = function() {
            Class(g, "active");
            e = !0;
            h.focus()
        }
        ;
        this.Close = f
    }
    var M = a
      , C = b
      , T = c
      , ca = !1;
    this.SetModerator = function() {
        ca = !0
    }
    ;
    var ba = 0, X = 0, da = g, P, O, ka, ia = !1, U = document.getElementById("notify_messages"), S = null, va = "gif jpeg jpg mq4 mq5 ex4 ex5 png rar txt zip mqh mt5".split(" "), ra = "gif png jpg jpeg zip txt log mqh ex5 mq5 mq4 ex4 mt5 set tpl".split(" "), wa = e ? !0 : !1, la, sa = m || 128, ha = !1, xa = 18, Y = !1, pa = !1, L = null, Q = {}, oa = {}, ja = 25, ta = new lightBoxImg, ma = new lightBoxVideo, fa = "undefined" !== typeof Storage && Core.isLocalStorageSupported() && window.JSON && window.JSON.stringify ? !0 : !1, na = {};
    if (fa)
        try {
            na = localStorage
        } catch (ea) {
            na = sessionStorage
        }
    if (fa)
        try {
            Q = JSON.parse(window.localStorage.getItem("chat") || "{}")
        } catch (ea) {
            Q = window.localStorage.setItem("chat", "{}"),
            Q = {}
        }
    Q = Q || {};
    Q.width = Q.width || 345;
    Q.height = Q.height || Math.max(getWindowSize().height / 2 - (getWindowSize().height / 2 % 54 - 30) | 0, 354);
    (function() {
        var a = $("notify_messages");
        a && 0 > a.className.indexOf("static") && (a.onclick = function() {
            ia ? E() : H();
            return !1
        }
        )
    }
    )();
    (function() {
        HotKeys.Add(27, function() {
            1 === ta.getState() || 1 === ma.getState() || q() || ka && ka.Close() || ha || E()
        });
        HotKeys.Add(113, function() {
            ia ? E() : H()
        })
    }
    )();
    window.ChatsData && (window.ChatsData.OnChatsUpdate = I);
    window.ChatsData && (window.ChatsData.OnMessageAdd = function(a) {
        for (var b = 0, c = 0; c < a.length; c++) {
            var d = a[c];
            d && (d.author_id !== M && d.date > b && (b = d.date),
            window.ChatsData.GetChat(d.parent_id, I))
        }
        0 < b && J(null, b)
    }
    );
    var ua = null;
    try {
        window.Audio && (ua = new window.Audio("https://c.mql5.com/i/message/new_message_click2.mp3"))
    } catch (ea) {}
    var qa = 0;
    this.SetUnreadChatsCount = function(a) {
        R(a)
    }
    ;
    this.OpenChatWith = function(a, b, c) {
        !ia && a && setTimeout(function() {
            H(!0);
            P.scrollIntoView(!1)
        }, 50);
        setTimeout(function() {
            u(b)
        }, 52)
    }
    ;
    this.InitStaticChat = function() {
        ha = !0;
        H(!1)
    }
    ;
    this.ResetCommentsList = function() {
        S = new K(S.chat,p)
    }
    ;
    l && fa && J(null, l)
}
function urlsToLinks(a, b) {
    return a && a.replace && 0 !== a.length ? a.replace(/(^|[\s\n]|<[A-Za-z]*\/?>)((?:https?|ftp):\/\/[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi, function(a, d, e) {
        if (b && b.length) {
            a = extractHostName(e);
            for (var c = 0; c < b.length; c++) {
                var g = a.indexOf(b[c]);
                if (0 <= g && g === a.length - b[c].length)
                    return [d, '<a href="', e, '" target="_blank" title="', e, '">', e, "</a>"].join("")
            }
        }
        return [d, '<a href="https://www.mql5.com/go?link=', encodeURIComponent(e), '" target="_blank" title="', e, '">', e, "</a>"].join("")
    }) : a
}
function extractHostName(a) {
    a = -1 < a.indexOf("://") ? a.split("/")[2] : a.split("/")[0];
    return a = a.split(":")[0].split("?")[0]
}
function ExtractLogoLetters(a) {
    if (!a || !a.length)
        return "";
    for (var b = [], c = 0; c < a.length; c++) {
        var d = a.charAt(c);
        if ("A" <= d && "Z" >= d && (b.push(d),
        2 === b.length))
            break
    }
    return 2 === b.length ? b.join("") : a.charAt(0)
}
function makeResizable(a, b, c, d) {
    function e(d) {
        d.preventDefault && d.preventDefault();
        0 < d.clientX && (g = Math.max(b, a.offsetLeft + a.offsetWidth - d.clientX),
        a.style.width = g + "px");
        d.clientY - document.body.offsetTop < window.innerHeight && (l = Math.max(c, d.clientY - a.offsetTop),
        a.style.height = l + "px")
    }
    function f(a) {
        a.preventDefault && a.preventDefault();
        window.removeEventListener("mousemove", e, !1);
        window.removeEventListener("mouseup", f, !1);
        d && 0 !== g && 0 !== l && d(g, l);
        window.setCursor("auto")
    }
    var g = 0
      , l = 0;
    (function() {
        for (var b = createElement(a, "DIV", {
            className: "resizeGrip"
        }), c = 0; 6 > c; c++)
            createElement(b, "DIV");
        return b
    }
    )().addEventListener("mousedown", function(a) {
        a.preventDefault && a.preventDefault();
        window.addEventListener("mousemove", e, !1);
        window.addEventListener("mouseup", f, !1);
        window.setCursor("ne-resize")
    }, !1)
}
;function ChatWs(a, b, c, d, e, f) {
    function g() {
        var a = X;
        X *= (3 + Math.random()) / 2;
        return Math.min(a, 3E4)
    }
    function l() {
        ca || (ca = !0,
        console.log("connecting"),
        da = void 0,
        T = new WebSocket("wss://" + ba),
        T.binaryType = "arraybuffer",
        T.onopen = function() {
            D(L.UserAuthorize, [{
                Uint8: 4
            }, {
                Uint8: 4
            }, {
                Uint32: 1
            }, G(M)]);
            ca = !1;
            console.log("connected");
            C && (C(),
            C = null)
        }
        ,
        T.onerror = function() {
            ca = !1;
            T.close()
        }
        ,
        T.onclose = function(a) {
            m(a);
            console.log("disconnected")
        }
        ,
        T.onmessage = z)
    }
    function m(a) {
        var b = T;
        setTimeout(function() {
            l();
            b.removeAllListeners && b.removeAllListeners();
            try {
                b.close()
            } catch (na) {}
        }, g())
    }
    function h(a, b) {
        if (a && b) {
            var c = new FileReader
              , d = b.slice(0, b.size);
            c.onloadend = function(c) {
                function d(c) {
                    function d(c) {
                        c = String.fromCharCode.apply(null, new Uint8Array(c));
                        D(L.MessageAdd, [a, {
                            Uint8: 2
                        }, c, g, {
                            Uint32: b.size
                        }, {
                            String16: b.type
                        }, {
                            String16: b.name
                        }]);
                        ha = b
                    }
                    var g = String.fromCharCode.apply(null, new Uint8Array(c));
                    c = e.digest("SHA-256", f);
                    c.then ? c.then(d) : "undefined" != typeof c.oncomplete && (c.oncomplete = function(a) {
                        d(a.target.result)
                    }
                    )
                }
                if (c.target.readyState !== FileReader.DONE)
                    console.log("read file error"),
                    ha = null;
                else {
                    var e = null;
                    window.crypto && (e = window.crypto.subtle);
                    !e && window.msCrypto && (e = window.msCrypto.subtle);
                    if (e) {
                        c = c.target.result;
                        var f = new Uint8Array(c.byteLength + xa.byteLength);
                        f.set(new Uint8Array(c));
                        f.set(xa, c.byteLength);
                        c = e.digest("SHA-256", c);
                        c.then ? c.then(d) : "undefined" != typeof c.oncomplete && (c.oncomplete = function(a) {
                            d(a.target.result)
                        }
                        )
                    }
                }
            }
            ;
            c.readAsArrayBuffer(d)
        }
    }
    function p(a) {
        var b = a.getReader32();
        a = b.getBinary(8);
        var c = b.getBinary(8)
          , d = b.getBinary(8)
          , e = b.getString16()
          , f = b.getUint8()
          , g = b.getUint8()
          , h = b.getUint8()
          , l = b.getUint8()
          , n = b.getBinary(8);
        b.getBinary(8);
        var m = b.getString16();
        b.getString16();
        b.getString16();
        b.getString16();
        b.getInt32();
        var q = b.getInt32()
          , p = b.getInt32()
          , C = b.getInt32()
          , ma = b.getInt32()
          , r = b.getUint8();
        b.getBinary(32);
        var M = b.getBinary(8)
          , t = b.getBinary(8);
        b.getInt16();
        b.getInt8();
        f === ta.Private && 0 != R(da, d) && (m = e);
        b = W(n).getTime() / 1E3 | 0;
        e = I(a);
        c = I(c);
        return {
            id: e,
            author_id: E(d),
            login: null,
            name: m,
            date: b,
            lastUpdateBin: n,
            lastAccessBin: t,
            lastSeenBin: M,
            lastUpdateHex: I(n),
            lastAccessHex: I(t),
            lastSeenHex: I(M),
            date_text: GetDateTimeLocal(b),
            avatar_url: r ? "https://" + ba + "/avatar/0x" + N(a) + "?" + c : null,
            type: f,
            avatarIsPresent: r,
            is_public: g,
            is_limited: h,
            is_closed: l,
            countMembers: q + p + C + ma
        }
    }
    function t(a, b) {
        for (b = []; !a.isEnded(); ) {
            var c = a.getReader32()
              , d = p(c);
            d.is_verified = !0;
            b[b.length] = d;
            var e = "";
            if (!c.isEnded()) {
                c = c.getReader32();
                c.getBinary(8);
                c.getBinary(8);
                c.getString16();
                c.getUint32();
                var f = c.getUint8();
                c.getBinary(8);
                f == oa.Text ? (c = c.getReader32(),
                0 < c.Size() ? (e = c.getBinary(c.getUint32()),
                c = c.getReader32(),
                e = aa(e, c),
                e = e.replace(/(?:\r\n|\r|\n)/g, " ")) : e = "[EMPTY TEXT]") : f == oa.File && (c = c.getReader32(),
                0 < c.Size() ? (c.getBinary(32),
                c.getInt32(),
                c.getString16(),
                c = c.getString16(),
                e += c) : e = "[EMPTY FILE]");
                d.text = e
            }
        }
        return b
    }
    function n(a) {
        for (var b = []; !a.isEnded(); ) {
            var c = p(a);
            b[b.length] = c
        }
        return b
    }
    function r(a) {
        for (var b = a.getBinary(8), c = []; !a.isEnded(); ) {
            var d = {}
              , e = a.getReader32()
              , f = e.getReader32()
              , g = f.getBinary(8);
            d.idHex = I(g);
            d.id = E(g);
            d.name = f.getString16();
            d.login = f.getString16();
            d.avatar = f.getString16();
            d.is_deleted = f.getUint8();
            d.chat_id = I(b);
            e.getUint16();
            0 !== R(da, g) && (c[c.length] = d)
        }
        return c
    }
    function q(a) {
        var b = a.getReader32();
        a = b.getBinary(8);
        var c = b.getBinary(8);
        b.getBinary(8);
        b.getString16();
        var d = b.getUint8();
        b.getUint8();
        b.getUint8();
        b.getUint8();
        var e = b.getBinary(8);
        b.getBinary(8);
        var f = b.getString16();
        b.getString16();
        b.getString16();
        b.getString16();
        b.getInt32();
        b.getInt32();
        b.getInt32();
        b.getInt32();
        var g = b.getUint8();
        b.getBinary(8);
        b = W(e).getTime() / 1E3 | 0;
        var h = I(a);
        c = I(c);
        return [{
            id: h,
            login: null,
            name: f,
            date: b,
            lastUpdateBin: e,
            lastAccessBin: null,
            date_text: GetDateTimeLocal(b),
            avatar_url: g ? "https://" + ba + "/avatar/0x" + N(a) + "?" + c : null,
            tupe: d,
            avatarIsPresent: g
        }]
    }
    function u(a, b) {
        a.getUint8();
        b = a.getBinary(8);
        a.getBinary(8);
        a.getInt16();
        to_download = [];
        for (var c = []; !a.isEnded(); ) {
            var d = a.getReader32()
              , e = d.getBinary(8)
              , f = d.getBinary(8)
              , g = d.getString16()
              , h = d.getUint32()
              , l = d.getUint8()
              , n = d.getBinary(8)
              , m = W(e).getTime() / 1E3 | 0;
            (d = v(e, {
                id: I(e),
                parent_id: I(b),
                author_name: g,
                author_id: E(f),
                date: m,
                content: "",
                seq: h,
                record_id: n,
                type: l
            }, d)) && 3 !== l && (c[c.length] = d)
        }
        return c
    }
    function w(a) {
        var b = a.getBinary(8);
        a = a.getReader32();
        var c = a.getBinary(8)
          , d = a.getBinary(8)
          , e = a.getString16()
          , f = a.getUint32()
          , g = a.getUint8();
        a.getBinary(8);
        var h = W(c).getTime() / 1E3 | 0;
        return [v(c, {
            id: I(c),
            parent_id: I(b),
            author_name: e,
            author_id: E(d),
            date: h,
            content: "",
            seq: f,
            type: g
        }, a)]
    }
    function v(a, b, c) {
        switch (b.type) {
        case oa.Text:
            var d = c.getReader32();
            0 < d.Size() && (a = d.getBinary(d.getUint32()),
            c = d.getReader32(),
            b.content = aa(a, c));
            break;
        case oa.Service:
            d = c.getReader32();
            if (0 < d.Size())
                switch (b.serviceChange = d.getUint8(),
                b.is_system = !0,
                b.serviceChange) {
                case ja.UserAdd:
                case ja.UserRemove:
                    b.serviceUserId = E(d.getBinary(8));
                    b.serviceUserName = d.getString16();
                    break;
                case ja.IsPublic:
                case ja.IsLimited:
                case ja.IsClosed:
                    b.serviceChangeValue = d.getUint8();
                    break;
                case ja.Name:
                case ja.ChatCreate:
                    b.serviceChatName = d.getString16()
                }
            break;
        case oa.File:
            d = c.getReader32();
            if (0 < d.Size()) {
                c = d.getBinary(32);
                var e = d.getInt32()
                  , f = d.getString16()
                  , g = d.getString16()
                  , h = void 0
                  , l = void 0
                  , n = 128
                  , m = 128;
                d.isEnded() || (d.getUint16(),
                l = d.getInt8(),
                n = d.getInt32(),
                m = d.getInt32(),
                h = d.getBlob(d.Size(), "image/png"));
                d = "https://" + ba + "/attach/0x";
                a = I(a.split("").reverse().join(""));
                b.attachments = [{
                    name: g,
                    url: d + (16 != a.length ? void 0 : a),
                    size_text: Core.geFileSizeString(e),
                    preview_url: h,
                    type: l,
                    mimeType: f,
                    width: n,
                    height: m,
                    hash: c
                }]
            }
            break;
        default:
            return null
        }
        return b
    }
    function B(a) {
        for (var b = []; !a.isEnded(); ) {
            var c = {}
              , d = a.getReader32()
              , e = d.getBinary(8);
            c.idHex = I(e);
            c.id = E(e);
            c.name = d.getString16();
            c.login = d.getString16();
            c.avatar = d.getString16();
            c.is_deleted = d.getUint8();
            b[b.length] = c
        }
        return b
    }
    function z(a) {
        if (P) {
            a = new Uint8Array(a.data);
            var b = new Uint8Array(P.byteLength + a.byteLength);
            b.set(P, 0);
            b.set(a, P.byteLength);
            P = b
        } else
            P = new Uint8Array(a.data);
        var c = new DataView(P.buffer);
        if (!(13 > c.byteLength)) {
            a = c.getUint8(0);
            b = (new A(c,1,8)).getBinary(8);
            var d = c.getUint32(9, !0);
            if (!(c.byteLength < d + 13)) {
                c = new A(c,13);
                P = P.byteLength > d + 13 ? P.slice(d + 13) : null;
                try {
                    if (a === L.EventsGet)
                        var e = c.getInt8();
                    else if (a !== L.NotifyEvent)
                        if (da)
                            if (a == L.NotifyChatUpdate) {
                                var f = q(c);
                                window.ChatsData.OnChatsUpdate && window.ChatsData.OnChatsUpdate(f)
                            } else if (a == L.NotifyLastSeen) {
                                var g = c.getBinary(8);
                                c.getBinary(8)
                            } else if (a == L.NotifyMessageAdd)
                                f = w(c),
                                window.ChatsData.OnMessageAdd && window.ChatsData.OnMessageAdd(f),
                                window.ChatsData.OnMessageAdd2 && window.ChatsData.OnMessageAdd2(f);
                            else {
                                e = c.getInt8();
                                var h = K(e);
                                0 < e || console.log("error: " + h + " [" + e + "]");
                                if (0 < e)
                                    switch (a) {
                                    case L.ChatsGet:
                                        var l = t(c, e);
                                        l.sort(function(a, b) {
                                            return R(b.lastUpdateBin, a.lastUpdateBin)
                                        });
                                        if (0 === R(b, "\x00\x00\x00\x00ÿÿÿÿ")) {
                                            Y.VerifyChats(l);
                                            break
                                        }
                                        Y.Add(l);
                                        console.log("from net: " + l.length);
                                        void 0 != pa && (l = Y.Get(pa),
                                        console.log("from storage: " + l.length));
                                        O && O(l);
                                        break;
                                    case L.ChatUsers:
                                        var m = r(c);
                                        Y.AddUsersInfo(m);
                                        ka && ka(m);
                                        break;
                                    case L.MessagesGet:
                                        var p = u(c, e);
                                        U && U(p, 2 === e);
                                        break;
                                    case L.ChatGet:
                                        l = t(c, e);
                                        Y.Add(l, !0);
                                        va && va(l);
                                        break;
                                    case L.ChatNew:
                                        g = c.getBinary(8);
                                        S && S(I(g));
                                        break;
                                    case L.UsersSearch:
                                        m = B(c, e);
                                        ra && ra(m);
                                        break;
                                    case L.MessageAdd:
                                        var C = c.getBinary(8);
                                        if (ha && "\x00\x00\x00\x00\x00\x00\x00\x00" == C) {
                                            var ma = new FileReader;
                                            ma.onloadend = function(a) {
                                                a = a.target.result;
                                                for (var b = 0; b < a.byteLength; ) {
                                                    var c = Math.min(131072, a.byteLength - b);
                                                    D(L.Upload, [{
                                                        Uint32: b
                                                    }], c);
                                                    if (1E3 < c)
                                                        for (var d = 0, e = 1; 10 >= e; e++) {
                                                            var f = parseInt(e * c / 10, 10);
                                                            d = a.slice(b + d, b + f);
                                                            T.send(d);
                                                            d = f
                                                        }
                                                    else
                                                        T.send(a.slice(b));
                                                    b += c
                                                }
                                                ha = null
                                            }
                                            ;
                                            ma.readAsArrayBuffer(ha)
                                        } else
                                            ha && (ha = null,
                                            console && console.log && console.log("file skipped by hash"));
                                        break;
                                    case L.ChatAvatarDownload:
                                        var aa = c.getBlob(d - 1, "image/png");
                                        ia && ia(I(b), aa);
                                        break;
                                    case L.ChatsSearch:
                                        l = n(c);
                                        wa && wa(l);
                                        break;
                                    case L.ChatAccessSet:
                                        var v = I(c.getBinary(8));
                                        I(c.getBinary(8));
                                        var ca = c.getUint8();
                                        c.getUint16();
                                        ca && 0 === R(b, "\x00\x00\x00\x00îîîî") ? (Y.RemoveChat(v),
                                        sa && sa(v)) : la && la(v)
                                    }
                            }
                        else
                            a == L.UserAuthorize && (e = c.getInt8(),
                            h = K(e),
                            0 < e ? (da = c.getBinary(8),
                            c.getString16(),
                            D(L.NotificationsEnable, [{
                                Uint8: 1
                            }]),
                            Ajax.post("https://" + ba + "/auth", {
                                token: M
                            }, !1, null, !1, !0),
                            X = 2E3) : console.log("auth failed: " + h))
                } catch (Aa) {
                    console.log(Aa.message)
                }
            }
        }
    }
    function D(a, b, c, d) {
        function e(a) {
            if (void 0 === a)
                return 0;
            if ("string" === typeof a)
                return a.length;
            if (Array.isArray(a)) {
                for (var b = 0, c = 0; c < a.length; ++c)
                    b += e(a[c]);
                return b
            }
            if ("String"in a)
                return F(a.String).length;
            if ("String8"in a)
                return F(a.String8).length + 1;
            if ("String16"in a)
                return F(a.String16).length + 2;
            if ("String32"in a)
                return F(a.String32).length + 4;
            if ("Uint8"in a || "Int8"in a)
                return 1;
            if ("Uint16"in a || "Int16"in a)
                return 2;
            if ("Uint32"in a || "Int32"in a)
                return 4
        }
        function f(a, b, c) {
            if ("string" === typeof c)
                for (var d = 0; d < c.length; d++)
                    a.setUint8(b++, c.charCodeAt(d));
            else if (Array.isArray(c))
                for (d = 0; d < c.length; ++d)
                    b = f(a, b, c[d]);
            else if ("String"in c || "String8"in c || "String16"in c || "String32"in c)
                for (("String8"in c) ? (c = F(c.String8),
                a.setUint8(b++, c.length)) : ("String16"in c) ? (c = F(c.String16),
                a.setUint16(b, c.length, !0),
                b += 2) : ("String32"in c) ? (c = F(c.String32),
                a.setUint32(b, c.length, !0),
                b += 4) : c = F(c.String),
                d = 0; d < c.length; d++)
                    a.setUint8(b++, c.charCodeAt(d));
            else
                "Uint8"in c ? a.setUint8(b++, c.Uint8) : "Int8"in c ? a.setInt8(b++, c.Int8) : "Uint16"in c ? (a.setUint16(b, c.Uint16, !0),
                b += 2) : "Int16"in c ? (a.setInt16(b, c.Int16, !0),
                b += 2) : "Uint32"in c ? (a.setUint32(b, c.Uint32, !0),
                b += 4) : "Int32"in c && (a.setInt32(b, c.Int32, !0),
                b += 4);
            return b
        }
        if (T.readyState !== T.OPEN)
            return setTimeout(function() {
                D(a, b, c, d)
            }, 100),
            !1;
        var g = 13 + (b ? e(b) : 0)
          , h = new ArrayBuffer(g)
          , l = new DataView(h);
        l.setUint8(0, a);
        d ? f(l, 1, d) : (l.setUint32(1, 287454020, !1),
        l.setUint32(5, 1432778632, !1));
        l.setUint32(9, g + (c ? c : 0) - 13, !0);
        f(l, 13, b);
        try {
            return T.send(h),
            !0
        } catch (za) {
            return console.log("Send message, error: " + za.message),
            T && 1 === T.readyState || (console.log("Socked closed: try reconnect"),
            m()),
            !1
        }
    }
    function A(a, b, c) {
        this.dataview = a;
        this.pos = b;
        this.pos_end = null != c ? b + c : a.byteLength
    }
    function F(a) {
        for (var b = [], c = 0, d = 0; d < a.length; d++) {
            var e = a.charCodeAt(d);
            128 > e ? b[c++] = String.fromCharCode(e) : (2048 > e ? b[c++] = String.fromCharCode(e >> 6 | 192) : (55296 === (e & 64512) && d + 1 < a.length && 56320 == (a.charCodeAt(d + 1) & 64512) ? (e = 65536 + ((e & 1023) << 10) + (a.charCodeAt(++d) & 1023),
            b[c++] = String.fromCharCode(e >> 18 | 240),
            b[c++] = String.fromCharCode(e >> 12 & 63 | 128)) : b[c++] = String.fromCharCode(e >> 12 | 224),
            b[c++] = String.fromCharCode(e >> 6 & 63 | 128)),
            b[c++] = String.fromCharCode(e & 63 | 128))
        }
        return b.join("")
    }
    function H(a) {
        for (var b, c, d = [], e = 0, f = 0; e < a.length; ) {
            var g = a.charCodeAt(e++);
            if (128 > g)
                d[f++] = String.fromCharCode(g);
            else if (191 < g && 224 > g)
                c = a.charCodeAt(e++),
                d[f++] = String.fromCharCode((g & 31) << 6 | c & 63);
            else if (239 < g && 365 > g) {
                c = a.charCodeAt(e++);
                b = a.charCodeAt(e++);
                var h = a.charCodeAt(e++);
                b = ((g & 7) << 18 | (c & 63) << 12 | (b & 63) << 6 | h & 63) - 65536;
                d[f++] = String.fromCharCode(55296 + (b >> 10));
                d[f++] = String.fromCharCode(56320 + (b & 1023))
            } else
                c = a.charCodeAt(e++),
                b = a.charCodeAt(e++),
                d[f++] = String.fromCharCode((g & 15) << 12 | (c & 63) << 6 | b & 63)
        }
        return d.join("")
    }
    function E(a) {
        for (var b = 0, c = a.length; 0 < c; c--)
            b = 256 * b + a.charCodeAt(c - 1);
        return b
    }
    function J(a) {
        for (var b = "", c = 0; 8 > c; c++)
            b += String.fromCharCode(a % 256),
            a = a / 256 | 0;
        return b
    }
    function I(a) {
        for (var b = "", c = 0; c < a.length; c++) {
            var d = a.charCodeAt(c) & 15
              , e = a.charCodeAt(c) >> 4 & 15;
            b += 10 > e ? String.fromCharCode(e + 48) : String.fromCharCode(e + 55);
            b += 10 > d ? String.fromCharCode(d + 48) : String.fromCharCode(d + 55)
        }
        return b
    }
    function G(a) {
        if (a.length % 2)
            return "";
        for (var b = "", c = 0; c + 1 < a.length; c += 2) {
            var d = Z(a.charCodeAt(c + 0))
              , e = Z(a.charCodeAt(c + 1));
            b += String.fromCharCode(16 * d + e)
        }
        return b
    }
    function N(a) {
        for (var b = "", c = a.length - 1; 0 <= c; c--) {
            var d = a.charCodeAt(c) & 15
              , e = a.charCodeAt(c) >> 4 & 15;
            b += 10 > e ? String.fromCharCode(e + 48) : String.fromCharCode(e + 55);
            b += 10 > d ? String.fromCharCode(d + 48) : String.fromCharCode(d + 55)
        }
        return b
    }
    function W(a) {
        for (var b = 0, c = 0; c < a.length; c++)
            b = 256 * b + a.charCodeAt(a.length - c - 1);
        return new Date(b / 1E4 - 116444736E5)
    }
    function Z(a) {
        return 65 <= a && 70 >= a ? a - 55 : 97 <= a && 102 >= a ? a - 87 : 48 <= a && 57 >= a ? a - 48 : 0
    }
    function R(a, b) {
        for (var c = Math.min(a.length, b.length); 0 < c; c--) {
            if (a.charCodeAt(c - 1) < b.charCodeAt(c - 1))
                return -1;
            if (a.charCodeAt(c - 1) > b.charCodeAt(c - 1))
                return 1
        }
        return a.length < b.length ? -1 : a.length > b.length ? 1 : 0
    }
    function K(a) {
        for (var b in Q)
            if (Q[b] == a)
                return b;
        return "[UNKNOWN_RESULT]"
    }
    function aa(a, b) {
        if (b)
            for (; !b.isEnded(); ) {
                b.getUint8();
                b.getVarLen();
                b.getVarLen();
                var c = b.getVarLen();
                b.getBinary(c)
            }
        return H(a)
    }
    var M = a, C = c, T = void 0, ca = !1, ba = "msg1.mql5.com", X = 2E3, da, P;
    E(e);
    b && (ba = b);
    var O = void 0
      , ka = void 0
      , ia = void 0
      , U = void 0
      , S = void 0
      , va = void 0
      , ra = void 0
      , wa = void 0
      , la = void 0
      , sa = void 0
      , ha = void 0;
    a = !1;
    var xa = new Uint8Array([139, 22, 96, 224, 115, 20, 103, 83, 95, 225, 254, 248, 9, 43, 105, 26, 39, 200, 253, 236, 146, 105, 43, 153, 4, 74, 142, 140, 44, 204, 239, 233, 137, 90, 166, 229, 193, 243, 253, 164, 31, 83, 99, 67, 154, 127, 243, 184, 19, 54, 180, 200, 198, 59, 213, 81, 215, 22, 74, 96, 224, 79, 170, 166])
      , Y = new function(a, b) {
        function c() {
            p.removeItem("mql5_chats_tok");
            p.removeItem("mql5_chats");
            p.setItem("mql5_chats", JSON.stringify(n));
            p.setItem("mql5_chats_tok", m + ";" + q);
            window.ChatsData && window.ChatsData.GetChats(e(), 100)
        }
        function d() {
            var a = {}, b;
            for (b in n)
                if (n.hasOwnProperty(b)) {
                    var c = b;
                    var d = void 0;
                    var e = n[b];
                    if (null == e || "object" != typeof e)
                        d = e;
                    else {
                        var f = e.constructor();
                        e.lastUpdateHex = I(e.lastUpdateBin || "\x00\x00\x00\x00\x00\x00\x00\x00");
                        e.lastAccessHex = I(e.lastAccessBin || "\x00\x00\x00\x00\x00\x00\x00\x00");
                        for (d in e)
                            "lastAccessBin" !== d && "lastUpdateBin" !== d && ("text" === d ? f[d] = e[d] : e.hasOwnProperty(d) && (f[d] = e[d]));
                        d = f
                    }
                    a[c] = d
                }
            p && p.supported && (a = JSON.stringify(a),
            p.setItem("mql5_chats", r.encode(a)),
            C = !1)
        }
        function e() {
            var a = "\x00\x00\x00\x00\x00\x00\x00\x00";
            if (!n)
                return a;
            for (var b in n)
                if (n.hasOwnProperty(b)) {
                    var c = n[b];
                    !0 !== c.notTrusted && 0 < R(c.lastUpdateBin, a) && (a = c.lastUpdateBin)
                }
            return a
        }
        function f(a) {
            a || (a = "\x00\x00\x00\x00\x00\x00\x00\x00");
            var b = [], c;
            for (c in n)
                if (n.hasOwnProperty(c)) {
                    var d = n[c];
                    d.notTrusted || 0 <= R(d.lastUpdateBin, a) && (b[b.length] = d)
                }
            b.sort(function(a, b) {
                return R(b.lastUpdateBin, a.lastUpdateBin)
            });
            return b
        }
        function g() {
            var a = 0, b;
            for (b in n)
                if (n.hasOwnProperty(b)) {
                    var c = n[b];
                    c.notTrusted || window.ChatsData.IsChatUnread(c) && a++
                }
            return a
        }
        function h(a, b) {
            if (a.length) {
                for (var c = 0; c < a; c++)
                    if (h(a[c], b))
                        return !0;
                return !1
            }
            c = a.login.toLowerCase();
            a = a.name.toLowerCase();
            for (var d = 0; d < b.length; d++)
                if (c.startsWith(b[d]) || a.startsWith(b[d]))
                    return !0;
            return !1
        }
        function l(a) {
            if (a && a.length) {
                for (var b = !1, c = {}, e = 0; e < a.length; e++)
                    c[a[e].id] = a[e];
                for (var f in n)
                    n.hasOwnProperty(f) && !c[f] && (delete n[f],
                    b = !0);
                c = [];
                for (e = 0; e < a.length; e++)
                    (f = n[a[e].id]) ? c.push(f) : (c.push(a[e]),
                    b = !0);
                b && (c.sort(function(a, b) {
                    return R(b.lastUpdateBin, a.lastUpdateBin)
                }),
                window.ChatsData.OnChatsVerified(c),
                d())
            }
        }
        var n = {}
          , m = a
          , q = b
          , p = window.globalStorage(window.globalStorageDomain, window.globalStoragePage)
          , C = !1;
        window.setInterval(function() {
            C && d()
        }, 5E3);
        var r = {
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            encode: function(a) {
                var b = ""
                  , c = 0;
                for (a = r._utf8_encode(a); c < a.length; ) {
                    var d = a.charCodeAt(c++);
                    var e = a.charCodeAt(c++);
                    var f = a.charCodeAt(c++);
                    var g = d >> 2;
                    d = (d & 3) << 4 | e >> 4;
                    var h = (e & 15) << 2 | f >> 6;
                    var l = f & 63;
                    isNaN(e) ? h = l = 64 : isNaN(f) && (l = 64);
                    b = b + this._keyStr.charAt(g) + this._keyStr.charAt(d) + this._keyStr.charAt(h) + this._keyStr.charAt(l)
                }
                return b
            },
            decode: function(a) {
                var b = ""
                  , c = 0;
                for (a = a.replace(/[^A-Za-z0-9+/=]/g, ""); c < a.length; ) {
                    var d = this._keyStr.indexOf(a.charAt(c++));
                    var e = this._keyStr.indexOf(a.charAt(c++));
                    var f = this._keyStr.indexOf(a.charAt(c++));
                    var g = this._keyStr.indexOf(a.charAt(c++));
                    d = d << 2 | e >> 4;
                    e = (e & 15) << 4 | f >> 2;
                    var h = (f & 3) << 6 | g;
                    b += String.fromCharCode(d);
                    64 !== f && (b += String.fromCharCode(e));
                    64 !== g && (b += String.fromCharCode(h))
                }
                return b = r._utf8_decode(b)
            },
            _utf8_encode: function(a) {
                a = a.replace(/rn/g, "n");
                for (var b = "", c = 0; c < a.length; c++) {
                    var d = a.charCodeAt(c);
                    128 > d ? b += String.fromCharCode(d) : (127 < d && 2048 > d ? b += String.fromCharCode(d >> 6 | 192) : (b += String.fromCharCode(d >> 12 | 224),
                    b += String.fromCharCode(d >> 6 & 63 | 128)),
                    b += String.fromCharCode(d & 63 | 128))
                }
                return b
            },
            _utf8_decode: function(a) {
                for (var b = "", c = 0, d, e, f; c < a.length; )
                    d = a.charCodeAt(c),
                    128 > d ? (b += String.fromCharCode(d),
                    c++) : 191 < d && 224 > d ? (e = a.charCodeAt(c + 1),
                    b += String.fromCharCode((d & 31) << 6 | e & 63),
                    c += 2) : (e = a.charCodeAt(c + 1),
                    f = a.charCodeAt(c + 2),
                    b += String.fromCharCode((d & 15) << 12 | (e & 63) << 6 | f & 63),
                    c += 3);
                return b
            }
        };
        (function() {
            p.supported && window.JSON && p.getItem("mql5_chats_tok", function(a, b) {
                "mql5_chats_tok" === a && (b && b.length ? (a = b.split(";"),
                2 !== a.length ? c() : (b = a[1],
                a[0] !== m || b != q ? c() : p.getItem("mql5_chats", function(a, b) {
                    if ("mql5_chats" === a && b && b.length) {
                        a = void 0;
                        try {
                            b = r.decode(b),
                            a = window.JSON.parse(b)
                        } catch (Ca) {}
                        if (a) {
                            b = (new Date).getTime() / 1E3;
                            for (var c in a)
                                if (a.hasOwnProperty(c) && (a[c].lastUpdateBin = G(a[c].lastUpdateHex),
                                a[c].lastAccessBin = a[c].lastAccessHex ? G(a[c].lastAccessHex) : "\x00\x00\x00\x00\x00\x00\x00\x00",
                                a[c].user_info && a[c].user_info.length))
                                    for (var d = 0; d < a[c].user_info.length; d++)
                                        if (3600 < b - a[c].user_info[d].checkDate) {
                                            a[c].user_info = void 0;
                                            break
                                        }
                            n = a;
                            window.ChatsData && (window.ChatsData.GetChats(e(), 100),
                            window.ChatsData.GetAllChatsRaw())
                        }
                    }
                }))) : c())
            })
        }
        )();
        this.Get = function(a) {
            return f(a)
        }
        ;
        this.GetLastChatUpdateBin = function() {
            return e()
        }
        ;
        this.Add = function(a, b) {
            if (a && a.length) {
                for (var c = 0; c < a.length; c++) {
                    var d = n[a[c].id];
                    !d && b && (a[c].notTrusted = !0);
                    d && d.user_info && a[c].lastUpdateHex === d.lastUpdateHex && (a[c].user_info = d.user_info);
                    n[a[c].id] = a[c]
                }
                C = !0
            }
            window.MessagesWidget && window.MessagesWidget.SetUnreadChatsCount(g())
        }
        ;
        this.GetUnreadCount = function() {
            return g()
        }
        ;
        this.AddUsersInfo = function(a) {
            if (a && a.length) {
                for (var b = (new Date).getTime() / 1E3, c = 0, d = 0; d < a.length; d++) {
                    var e = a[d];
                    e.checkDate = b;
                    var f = n[e.chat_id];
                    f && (f.user_info || (f.user_info = []),
                    f.user_info.push(e),
                    c++)
                }
                0 < c && (C = !0)
            }
        }
        ;
        this.UsersSearch = function(a, b) {
            var c = [];
            if ((a = a.toLocaleLowerCase()) && a.length) {
                a.split(" ");
                for (var d in n)
                    if (n.hasOwnProperty(d)) {
                        var e = n[d];
                        if (1 === e.type && e.user_info && h(e.user_info, a) && (c[c.length] = e.user_info,
                        c.length >= b))
                            break
                    }
                b = c
            } else
                b = [];
            return b
        }
        ;
        this.ChannelSearch = function(a, b) {
            var c = [];
            if ((a = a.toLocaleLowerCase()) && a.length) {
                a = a.split(" ");
                for (var d in n)
                    if (n.hasOwnProperty(d)) {
                        var e = n[d], f;
                        if (f = 3 === e.type)
                            b: {
                                f = a;
                                for (var g = e.name.toLowerCase(), h = 0; h < f.length; h++)
                                    if (g.startsWith(f[h])) {
                                        f = !0;
                                        break b
                                    }
                                f = !1
                            }
                        if (f && (c[c.length] = e,
                        c.length >= b))
                            break
                    }
                b = c
            } else
                b = [];
            return b
        }
        ;
        this.ChatExists = function(a) {
            a: {
                for (var b in n)
                    if (n.hasOwnProperty(b) && n[b].id === a) {
                        a = !0;
                        break a
                    }
                a = !1
            }
            return a
        }
        ;
        this.RemoveChat = function(a) {
            delete n[a];
            d()
        }
        ;
        this.VerifyChats = function(a) {
            return l(a)
        }
        ;
        this.GetTrustedChatById = function(a) {
            return (a = n[a]) && !a.notTrusted ? a : null
        }
    }
    (d,f);
    this.GetStorage = function() {
        return Y
    }
    ;
    var pa = void 0;
    window.WebSocket && (a = !0);
    this.Close = function() {
        T.close()
    }
    ;
    if (this.WsSupport = a) {
        mqGlobal.AddOnReady(function() {
            l()
        });
        this.IsChatUnread = function(a) {
            return 0 > R(a.lastAccessBin || "\x00\x00\x00\x00\x00\x00\x00\x00", a.lastUpdateBin || "\x00\x00\x00\x00\x00\x00\x00\x00")
        }
        ;
        this.CreatePrivateChat = function(a, b) {
            a && (a = J(a),
            D(L.ChatNew, [{
                Uint8: ta.Private
            }, a]),
            S = b)
        }
        ;
        this.GetChat = function(a, b, c) {
            a && (a = G(a),
            D(L.ChatGet, [a, {
                Uint8: 1
            }]),
            va = b)
        }
        ;
        this.AddText = function(a, b) {
            a = a ? G(a) : "\x00\x00\x00\x00\x00\x00\x00\x00";
            D(L.MessageAdd, [a, {
                Uint8: 1
            }, {
                String32: b
            }, {
                Uint32: 0
            }])
        }
        ;
        this.AddFile = function(a, b) {
            a = a ? G(a) : "\x00\x00\x00\x00\x00\x00\x00\x00";
            h(a, b)
        }
        ;
        this.GetMessages = function(a, b, c) {
            a = a ? G(a) : "\x00\x00\x00\x00\x00\x00\x00\x00";
            b = b ? G(b) : "\x00\x00\x00\x00\x00\x00\x00\x00";
            U = c;
            c = 0;
            0 === R(b, "\x00\x00\x00\x00\x00\x00\x00\x00") && (c = 0);
            D(L.MessagesGet, [a, {
                Uint8: c
            }, b, {
                Uint32: 4096
            }])
        }
        ;
        this.GetChatUsers = function(a, b) {
            a = a ? G(a) : "\x00\x00\x00\x00\x00\x00\x00\x00";
            ka || (ka = b);
            D(L.ChatUsers, [a, "\x00\x00\x00\x00\x00\x00\x00\x00", {
                Uint32: 0
            }])
        }
        ;
        this.GetChatAvatar = function(a, b) {
            a = a ? G(a) : "\x00\x00\x00\x00\x00\x00\x00\x00";
            ia || (ia = b);
            D(L.ChatAvatarDownload, [a, {
                Uint32: 0
            }, {
                Uint32: 0
            }], null, a)
        }
        ;
        this.GetChats = function(a, b, c) {
            a = a ? G(a) : "\x00\x00\x00\x00\x00\x00\x00\x00";
            O || (O = c);
            c = a;
            var d = Y.GetLastChatUpdateBin();
            a = c;
            0 < R(d, c) ? (pa = c,
            c = d) : pa = void 0;
            d = 1;
            0 === R(c, "\x00\x00\x00\x00\x00\x00\x00\x00") && (d = 0);
            D(L.ChatsGet, [{
                Uint8: d
            }, c, {
                Uint8: 1
            }, {
                Uint32: b
            }]) || (O && O(Y.Get(a)),
            window.MessagesWidget && window.MessagesWidget.SetUnreadChatsCount(Y.GetUnreadCount()))
        }
        ;
        this.GetAllChatsRaw = function() {
            D(L.ChatsGet, [{
                Uint8: 0
            }, "\x00\x00\x00\x00\x00\x00\x00\x00", {
                Uint8: 1
            }, {
                Uint32: 100
            }], null, "\x00\x00\x00\x00ÿÿÿÿ")
        }
        ;
        this.UsersSearch = function(a, b, c) {
            c && (ra = c);
            D(L.UsersSearch, [{
                String16: a
            }, {
                Uint32: b
            }])
        }
        ;
        this.UsersSearchLocal = function(a, b) {
            return Y.UsersSearch(a, b)
        }
        ;
        this.ChannelSearch = function(a, b, c) {
            c && (wa = c);
            D(L.ChatsSearch, [{
                String16: a
            }, {
                Uint32: b
            }])
        }
        ;
        this.ChannelSearchLocal = function(a, b) {
            return Y.ChannelSearch(a, b)
        }
        ;
        this.ChatExists = function(a) {
            return Y.ChatExists(a)
        }
        ;
        this.RemoveChat = function(a) {
            return Y.RemoveChat(a)
        }
        ;
        this.GetUnreadCount = function() {
            return Y.GetUnreadCount()
        }
        ;
        this.GetChatLocal = function(a) {
            return Y.GetTrustedChatById(a)
        }
        ;
        this.AssignChatUsers = function(a, b) {
            return Y.AssignChatUsers(a, b)
        }
        ;
        this.Subscribe = function(a, b, c, d) {
            a && (a = G(a),
            b = J(b),
            d && (la = d),
            D(L.ChatAccessSet, [a, b, {
                Uint8: c ? 0 : 1
            }, {
                Uint16: 0
            }]))
        }
        ;
        this.DeleteChat = function(a, b, c) {
            a && b && (a = G(a),
            b = J(b),
            c && (sa = c),
            D(L.ChatAccessSet, [a, b, {
                Uint8: 1
            }, {
                Uint16: 0
            }], null, "\x00\x00\x00\x00îîîî"))
        }
        ;
        this.OnChatsVerified = function(a) {
            O && O(a, !0)
        }
        ;
        A.prototype.Size = function() {
            return this.pos_end - this.pos
        }
        ;
        A.prototype.advance = function(a) {
            if (this.pos + a > this.pos_end)
                throw "Buffer overflow";
            this.pos += a
        }
        ;
        A.prototype.isEnded = function() {
            return this.pos >= this.pos_end
        }
        ;
        A.prototype.getInt32 = function() {
            if (this.pos + 4 > this.pos_end)
                throw "Buffer overflow";
            var a = this.dataview.getInt32(this.pos, !0);
            this.pos += 4;
            return a
        }
        ;
        A.prototype.getUint32 = function() {
            if (this.pos + 4 > this.pos_end)
                throw "Buffer overflow";
            var a = this.dataview.getUint32(this.pos, !0);
            this.pos += 4;
            return a
        }
        ;
        A.prototype.getInt16 = function() {
            if (this.pos + 2 > this.pos_end)
                throw "Buffer overflow";
            var a = this.dataview.getInt16(this.pos, !0);
            this.pos += 2;
            return a
        }
        ;
        A.prototype.getUint16 = function() {
            if (this.pos + 2 > this.pos_end)
                throw "Buffer overflow";
            var a = this.dataview.getUint16(this.pos, !0);
            this.pos += 2;
            return a
        }
        ;
        A.prototype.getInt8 = function() {
            if (this.pos >= this.pos_end)
                throw "Buffer overflow";
            return this.dataview.getInt8(this.pos++)
        }
        ;
        A.prototype.getUint8 = function() {
            if (this.pos >= this.pos_end)
                throw "Buffer overflow";
            return this.dataview.getUint8(this.pos++)
        }
        ;
        A.prototype.getString8 = function() {
            var a = this.getUint8();
            a = this.getBinary(a);
            return H(a)
        }
        ;
        A.prototype.getString16 = function() {
            var a = this.getUint16();
            a = this.getBinary(a);
            return H(a)
        }
        ;
        A.prototype.getString32 = function() {
            var a = this.getUint32();
            a = this.getBinary(a);
            return H(a)
        }
        ;
        A.prototype.getBinary = function(a) {
            if (0 == a)
                return "";
            if (this.pos + a > this.pos_end)
                throw "Buffer overflow";
            var b = new Uint8Array(this.dataview.buffer,this.pos,a);
            b = String.fromCharCode.apply(null, b);
            this.pos += a;
            return b
        }
        ;
        A.prototype.getBlob = function(a, b) {
            if (0 == a)
                return null;
            if (this.pos + a > this.pos_end)
                throw "Buffer overflow";
            b = new Blob([new Uint8Array(this.dataview.buffer,this.pos,a)],{
                type: b
            });
            this.pos += a;
            return URL.createObjectURL(b)
        }
        ;
        A.prototype.getReader32 = function() {
            var a = this.getUint32();
            if (a > this.pos_end - this.pos)
                throw "Buffer overflow";
            var b = new A(this.dataview,this.pos,a);
            this.pos += a;
            return b
        }
        ;
        A.prototype.getReader16 = function() {
            var a = this.getUint16();
            if (a > this.pos_end - this.pos)
                throw "Buffer overflow";
            var b = new A(this.dataview,this.pos,a);
            this.pos += a;
            return b
        }
        ;
        A.prototype.getVarLen = function() {
            var a = this.getUint8();
            if (a & 128) {
                var b = this.getUint8();
                if (b & 128) {
                    var c = this.getUint8();
                    if (c & 128) {
                        var d = this.getUint8();
                        if (d & 128)
                            throw "Invalid variable-length integer";
                        return ((a & 127) << 21) + ((b & 127) << 14) + ((c & 127) << 7) + d
                    }
                    return ((a & 127) << 14) + ((b & 127) << 7) + c
                }
                return ((a & 127) << 7) + b
            }
            return a
        }
        ;
        this.CompareHex = function(a, b) {
            a = G(a);
            b = G(b);
            return R(a, b)
        }
        ;
        var L = {
            NotifyEvent: 44,
            ChatAccessSet: 51,
            ChatUpdate: 52,
            ChatNew: 53,
            MessageAdd: 55,
            ChatsGet: 56,
            MessagesGet: 57,
            UserAuthorize: 58,
            UserUnauthorize: 59,
            NotifyChatUpdate: 62,
            NotifyMessageAdd: 63,
            NotifyAccessSet: 64,
            SetEventMask: 67,
            NotifyLastSeen: 68,
            Upload: 72,
            Download: 73,
            UsersSearch: 75,
            UsersInfo: 76,
            ChatUsers: 77,
            NotificationsEnable: 78,
            BansGet: 81,
            BanSet: 82,
            ChatsSearch: 83,
            FriendsGet: 84,
            FriendSet: 85,
            EventsGet: 86,
            EventGet: 87,
            ChatAvatarSet: 88,
            ChatAvatarDownload: 89,
            PrivateMessagesGet: 90,
            InviteLinkFind: 91,
            ChatLastAccessSet: 92,
            ChatMute: 93,
            ChatGet: 94,
            MessageGet: 95
        }
          , Q = {
            Fail: -1,
            FailAccessDenied: -2,
            FailInvalidParams: -3,
            FailInvalidRequest: -4,
            FailInvalidVersion: -5,
            FailDisconnect: -6,
            FailOutOfMemory: -7,
            FailSqlError: -8,
            FailBanned: -9,
            FailNetwork: -10,
            FailDataTooBig: -11,
            FailNotFound: -12,
            FailDuplicate: -13,
            Success: 1,
            SuccessPartial: 2,
            SuccessSame: 3,
            SuccessDisconnect: 4
        }
          , oa = {
            Text: 1,
            File: 2,
            Delete: 3,
            Service: 4
        }
          , ja = {
            UserAdd: 1,
            UserRemove: 2,
            IsPublic: 3,
            IsLimited: 4,
            IsClosed: 5,
            Name: 6,
            ChatCreate: 7
        }
          , ta = {
            Private: 1,
            Group: 2,
            Channel: 3
        }
    }
}
;function globalStorage(a, b) {
    var c = {}
      , d = null
      , e = !1
      , f = []
      , g = {}
      , l = 0;
    try {
        var m = window.postMessage && window.JSON && "localStorage"in window && null !== window.localStorage
    } catch (n) {
        m = !1
    }
    var h = function(b) {
        d && (g[b.request.id] = b,
        d.contentWindow.postMessage(JSON.stringify(b.request), a))
    }
      , p = function() {
        e = !0;
        if (f.length) {
            for (var a = 0, b = f.length; a < b; a++)
                h(f[a]);
            f = []
        }
    }
      , t = function(b) {
        b.origin === a && (b = JSON.parse(b.data),
        "undefined" != typeof g[b.id] && ("function" === typeof g[b.id].callback && g[b.id].callback(b.key, c.cleaner.execute(b.value)),
        delete g[b.id]))
    };
    c.getItem = function(a, b) {
        m && (a = {
            request: {
                id: ++l,
                type: "get",
                key: a
            },
            callback: b
        },
        e ? h(a) : f.push(a))
    }
    ;
    c.setItem = function(a, b) {
        m && (a = {
            request: {
                id: ++l,
                type: "set",
                key: a,
                value: b
            }
        },
        e ? h(a) : f.push(a))
    }
    ;
    c.removeItem = function(a) {
        m && (a = {
            request: {
                id: ++l,
                type: "unset",
                key: a
            }
        },
        e ? h(a) : f.push(a))
    }
    ;
    c.cleaner = {};
    c.cleaner.safeTags = "A B BLOCKQUOTE BR CAPTION CENTER DIV EM H1 H2 H3 H4 H5 H6 HR I IMG LI OL P PRE SMALL SPAN LABEL STRONG SUP TABLE THEAD TBODY TD TH TR UL U".split(" ");
    c.cleaner.safeAttrs = "class style width height href src title alt border target rel cellspacing cellpadding".split(" ");
    c.cleaner.execute = function(a) {
        var b = document.createElement("DIV");
        b.innerHTML = a;
        var c = function(a, b, d) {
            for (var e = 0; e < d.length; e++) {
                var f = d[e];
                if (f.nodeType != (window.Node ? Node.TEXT_NODE : 3) && -1 == a.safeTags.indexOf(f.tagName))
                    b.removeChild(f),
                    e--;
                else {
                    if (f.attributes) {
                        for (var g = [], h = 0; h < f.attributes.length; h++)
                            g[h] = f.attributes[h];
                        for (h = 0; h < g.length; h++) {
                            var l = g[h];
                            (-1 == a.safeAttrs.indexOf(l.name.toLowerCase()) || /^\s*javascript\:/i.test(l.value)) && f.removeAttribute(l.name)
                        }
                    }
                    f.childNodes && c(a, f, f.childNodes)
                }
            }
        };
        c(this, b, b.childNodes);
        return b.innerHTML
    }
    ;
    c.supported = function() {
        return m
    }
    ;
    m && (d = document.createElement("iframe"),
    d.style.cssText = "position:absolute;width:1px;height:1px;left:-9999px;",
    document.body.appendChild(d),
    window.addEventListener ? (d.addEventListener("load", function() {
        p()
    }, !1),
    window.addEventListener("message", function(a) {
        t(a)
    }, !1)) : d.attachEvent && (d.attachEvent("onload", function() {
        p()
    }, !1),
    window.attachEvent("onmessage", function(a) {
        t(a)
    })),
    d.src = a + b);
    return c
}
;var fHostNameJs = 0 < window.location.hostname.indexOf(".src") || 0 < window.location.hostname.indexOf(".dev") ? "content.finteza.org" : "content.mql5.com";
(function() {
    function a() {
        var a = window;
        a && a.addEventListener("hashchange", function() {
            K.routePage();
            K.lead(K._websiteId)
        })
    }
    function b() {
        var a = window, b;
        a && (b = a.document && a.document.body) && b.addEventListener("click", function(b) {
            var c = b.target, d, e;
            if (c && 1 === c.nodeType && c.tagName && "a" === c.tagName.toLowerCase() && (e = c.getAttribute("target"),
            d = c.getAttribute("href"),
            l(d))) {
                if (!e || "_self" === e || "_parent" === e || "_top" === e)
                    return b.preventDefault && b.preventDefault(),
                    K.leave(K._websiteId, d, function() {
                        e && "_self" !== e ? "_top" === e ? a.top.location.href = d : "_parent" === e && (a.parent.location.href = d) : a.location.href = d
                    });
                K.leave(K._websiteId, d)
            }
        })
    }
    function c(a) {
        var b = 0
          , c = setInterval(function() {
            var d;
            Z && (b += 1E3);
            b / 15E3 !== Math.floor(b / 15E3) || (d = b / 1E3,
            q(D("https://" + fHostNameJs + "/st", t({
                id: K._websiteId,
                tracking_event: "Page+Active+Timer+" + d,
                pg_act: d
            }))),
            a) ? 12E4 <= b && clearInterval(c) : clearInterval(c)
        }, 1E3)
    }
    function d() {
        var a = [], b, c, d = [], e = [], f = [];
        for (g in J)
            J.hasOwnProperty(g) && (b = J[g],
            !b.data && !b.dataLoading && (b.dataLoading = !0,
            a.push(g),
            b = document.getElementById(g))) && (d.push(encodeURIComponent(b.getAttribute("data-utm-source") || "")),
            e.push(encodeURIComponent(b.getAttribute("data-utm-campaign") || "")),
            f.push(encodeURIComponent(b.getAttribute("data-server") || "")));
        if (a.length) {
            a = {
                tz_offset: G.tz_offset,
                ids: a.join(",")
            };
            var g = !1;
            b = 0;
            for (c = d.length; b < c; b++)
                d[b] && (g = !0);
            g && (a.utm_source = d.join(","));
            g = !1;
            b = 0;
            for (c = e.length; b < c; b++)
                e[b] && (g = !0);
            g && (a.utm_campaign = e.join(","));
            g = !1;
            b = 0;
            for (c = f.length; b < c; b++)
                f[b] && (g = !0);
            g && (a.server = f.join(","));
            e = t(a);
            d = document.createElement("script");
            d.async = !0;
            d.src = D("https://" + fHostNameJs + "/rq", e || {});
            (e = document.getElementsByTagName("script")[0]) ? e.parentNode.insertBefore(d, e) : document.head.appendChild(d)
        }
    }
    function e(a) {
        var b;
        if (a && (b = J && J[a] && J[a].data || {},
        a = document.getElementById(a),
        b && a))
            if (b.format & 120) {
                var c, d;
                if (a && b && !(b.hi && (c = v(b.hi)) && (c = parseInt(c || 0, 10),
                d = Math.floor((new Date).getTime() / 1E3),
                d < c + 604800))) {
                    c = document.createElement("iframe");
                    R && R.length || (window.addEventListener ? window.addEventListener("message", F, !1) : window.attachEvent && window.attachEvent("onmessage", F));
                    R || (R = []);
                    R.push(c);
                    c.width = 0 < b.w ? b.w : "100%";
                    c.height = b.h || 0;
                    var e = {
                        link: b.link,
                        a: b.a,
                        s: b.s,
                        v: b.v,
                        w: c.width,
                        h: c.height,
                        r: window.location,
                        id: b.zone,
                        uid: b.uid
                    };
                    if (d = a.getAttribute("data"))
                        e.custom = d;
                    c.frameBorder = 0;
                    c.setAttribute("style", "vertical-align:top;max-width:100% !important");
                    c.scrolling = "no";
                    c._id = b.zone;
                    c._hi = b.hi;
                    c._advert_id = b.a;
                    c._uid = b.uid;
                    c.onload = g;
                    c.src = b.format & 32 ? b.iframe : D("https://" + fHostNameJs + "/sh/" + b.name + "/", e);
                    c.style.display = "block";
                    b.format & 16 ? (d = document.createElement("a"),
                    d.target = "_blank",
                    d.href = D("https://" + fHostNameJs + "/go", t({
                        link: b.link,
                        a: b.a,
                        s: b.s,
                        v: b.v,
                        id: b.zone,
                        uid: b.uid
                    })),
                    d.style.display = "inline-block",
                    c.style.pointerEvents = "none",
                    d.appendChild(c),
                    a.appendChild(d)) : a.appendChild(c);
                    b.tl && q(b.tl)
                }
            } else
                f(a, b)
    }
    function f(a, b) {
        var c, d, e;
        b && (c = b.img,
        c || (c = b.img = new Image,
        c.onload = g,
        c.src = "https://" + fHostNameJs + "/si/" + b.name,
        c.height && (c.height = b.h),
        b.w && (c.width = b.w,
        c.style.width = b.w + "px"),
        c._id = b.zone,
        c._advert_id = b.a,
        c._uid = b.uid,
        c._width = b.w || null,
        c._height = b.h || null),
        a && (d = document.createElement("a"),
        d.target = "_blank",
        d.href = D("https://" + fHostNameJs + "/go", t({
            link: b.link,
            a: b.a,
            s: b.s,
            v: b.v,
            id: b.zone,
            uid: b.uid
        })),
        e = c.style,
        e.overflow = "hidden",
        e.verticalAlign = "top",
        e.height = "auto",
        e.border = "0",
        d.appendChild(c),
        a.appendChild(d),
        b.tl && q(b.tl)))
    }
    function g() {
        q(D("https://" + fHostNameJs + "/wh", t({
            id: this._id,
            a: this._advert_id,
            uid: this._uid
        })));
        this._width && (this.width = this._width,
        this.style.width = this._width + "px");
        this._height && (this.height = this._height)
    }
    function l(a) {
        return a ? 0 === a.indexOf("http://") || 0 === a.indexOf("https://") ? 0 !== a.indexOf(window.location.origin) : !1 : !1
    }
    function m() {
        var a = window.document
          , b = window.ia_document
          , c = -(new Date).getTimezoneOffset()
          , d = a.documentURI || "";
        var e = {};
        var f, g, h;
        if (d)
            if (f = d.split("?"),
            1 >= f.length)
                e = {};
            else {
                f = f[1].split("#");
                f = f[0].split("&");
                var l = 0;
                for (h = f.length; l < h; l++)
                    if (g = f[l])
                        g = g.split("="),
                        1 >= g.length || (e[decodeURIComponent(g[0])] = decodeURIComponent(g[1]))
            }
        else
            e = {};
        h = a.referrer || "";
        f = a.title || "";
        !h && b && b.referrer && (h = b.referrer);
        !f && b && b.title && (f = b.title);
        b = window.location.origin;
        a = a.domain || "";
        l = h;
        h = -1 < h.indexOf("://") ? h.split("/")[2] : h.split("/")[0];
        h = h.split(":")[0];
        h = h.split("?")[0];
        var m = window.screen;
        m ? (g = m.width || 0,
        m = m.height || 0,
        g = g && m ? g + "x" + m : "") : g = "";
        return {
            tz_offset: c,
            origin: b,
            uri: d,
            domain: a,
            referrer: l,
            referrer_domain: h || "",
            title: f,
            screen_res: g,
            hdpi: 1.5 <= window.devicePixelRatio || window.matchMedia && window.matchMedia("(-webkit-min-device-pixel-ratio: 1.5),(min--moz-device-pixel-ratio: 1.5),(-o-min-device-pixel-ratio: 3/2),(min-resolution: 1.5dppx)").matches ? !0 : !1,
            utm_source: e.utm_source || "",
            utm_campaign: e.utm_campaign || "",
            utm_medium: e.utm_medium || "",
            utm_term: e.utm_term || "",
            utm_content: e.utm_content || "",
            s1: e.s1 || "",
            s2: e.s2 || "",
            s3: e.s3 || "",
            s4: e.s4 || "",
            s5: e.s5 || "",
            s6: e.s6 || "",
            s7: e.s7 || "",
            s8: e.s8 || "",
            s9: e.s9 || "",
            s10: e.s10 || "",
            s11: e.s11 || "",
            s12: e.s12 || "",
            s13: e.s13 || "",
            s14: e.s14 || "",
            s15: e.s15 || "",
            s16: e.s16 || ""
        }
    }
    function h() {
        var a = new Date
          , b = new Date(a.getTime() + 18E5);
        a = Math.floor(a.getTime() / 1E3);
        var c, d = !1;
        try {
            var e = n(document.cookie)
        } catch (X) {
            e = {}
        }
        e = e._fz_ssn;
        (c = !e) || (c = w(),
        c = (new Date).getTime() > c + 18E5 ? !1 : !0,
        c = !c);
        if (!c) {
            c = G.referrer_domain;
            var f = G.domain;
            c = !("" === c || f === c)
        }
        c || ((c = w()) ? (c = new Date(c),
        f = new Date,
        c = c.getUTCDate() === f.getUTCDate() && c.getUTCMonth() === f.getUTCMonth() && c.getUTCFullYear() === f.getUTCFullYear()) : c = !1,
        c = !c);
        if (c) {
            e = "";
            d = 9;
            for (f = 0; f < d; f++)
                c = 10 * Math.random() >>> 0,
                e += "" + c;
            e = "" + a + e;
            c = a;
            d = !0
        } else
            e && "string" === typeof e ? (c = e.length) && 9 >= c ? c = 0 : (c = e.substring(0, c - 9),
            c = parseInt(c, 10)) : c = 0;
        a = 0 < c ? Math.floor(a - c) : -1;
        try {
            document.cookie = "_fz_ssn=" + e + "; path=/; expires=" + b.toUTCString()
        } catch (X) {}
        return {
            isNew: d,
            id: e,
            duration: a
        }
    }
    function p() {
        try {
            var a = n(document.cookie)
        } catch (C) {
            a = {}
        }
        var b = a._fz_fvdt;
        if (!b) {
            a = new Date;
            b = parseInt(a.getTime() / 1E3, 10);
            a.setFullYear(a.getFullYear() + 20);
            try {
                document.cookie = "_fz_fvdt=" + b + "; path=/; expires=" + a.toUTCString()
            } catch (C) {}
        }
        return b
    }
    function t(a) {
        N = h();
        N.id && (a.ssn = N.id);
        N.isNew && (N.isNew = !1,
        a.ssn_start = 1);
        a.ssn_dr = N.duration;
        a.fv_date = W;
        a.ref = G.uri || null;
        a.back_ref = G.referrer || null;
        a.title = G.title || null;
        a.scr_res = G.screen_res || null;
        a.hdpi = G.hdpi ? 1 : null;
        var b = 99999 * Math.random() + 1 >>> 0;
        b = [(new Date).getTime(), b].join("");
        a.ac = b;
        a.sv = "1092";
        return a
    }
    function n(a) {
        var b = {}, c, d, e;
        if (!a)
            return {};
        a = a.split(";");
        var f = 0;
        for (e = a.length; f < e; f++)
            if (c = a[f])
                c = c.split("="),
                1 >= c.length || (d = decodeURIComponent(c[0]),
                d = d.trim ? d.trim() : d.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""),
                b[d] = decodeURIComponent(c[1]));
        return b
    }
    function r() {
        return {
            utm_source: G.utm_source || null,
            utm_campaign: G.utm_campaign || null,
            utm_medium: G.utm_medium || null,
            utm_term: G.utm_term || null,
            utm_content: G.utm_content || null,
            s1: G.s1 || null,
            s2: G.s2 || null,
            s3: G.s3 || null,
            s4: G.s4 || null,
            s5: G.s5 || null,
            s6: G.s6 || null,
            s7: G.s7 || null,
            s8: G.s8 || null,
            s9: G.s9 || null,
            s10: G.s10 || null,
            s11: G.s11 || null,
            s12: G.s12 || null,
            s13: G.s13 || null,
            s14: G.s14 || null,
            s15: G.s15 || null,
            s16: G.s16 || null
        }
    }
    function q(a, b) {
        var c = new Image(1,1);
        void 0 !== b && "function" === typeof b && (c.onload = function() {
            b()
        }
        );
        c.src = a;
        u()
    }
    function u() {
        var a = (new Date).getTime()
          , b = new Date(a + 18E5);
        try {
            window.localStorage ? window.localStorage.setItem("_fz_tr", a.toString()) : document.cookie = "_fz_tr=" + a + "; path=/; expires=" + b.toUTCString()
        } catch (C) {}
    }
    function w() {
        var a;
        try {
            if (window.localStorage)
                return parseInt(window.localStorage.getItem("_fz_tr") || 0, 10);
            if (a = n(document.cookie))
                if (a = a._fz_tr)
                    return parseInt(a, 10)
        } catch (M) {}
        return 0
    }
    function v(a) {
        try {
            var b = document.cookie.match(new RegExp("(?:^|; )" + a.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"))
        } catch (C) {}
        return b ? decodeURIComponent(b[1]) : null
    }
    function B(a, b) {
        var c;
        if (a && (c = z())) {
            c.open("post", a, !0);
            c.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            c.withCredentials = !0;
            c.onreadystatechange = function() {
                switch (c.readyState) {
                case 4:
                    c.abort()
                }
            }
            ;
            try {
                c.send(A(b || {}))
            } catch (T) {}
        }
    }
    function z() {
        var a = null;
        try {
            if (window.XMLHttpRequest)
                a = new XMLHttpRequest;
            else if (window.ActiveXObject)
                try {
                    a = new window.ActiveXObject("Msxml2.XMLHTTP")
                } catch (M) {
                    a = new window.ActiveXObject("Microsoft.XMLHTTP")
                }
        } catch (M) {
            a = null
        }
        return a
    }
    function D(a, b) {
        return a && b ? b ? [a, A(b)].join(-1 === a.indexOf("?") ? "?" : "&") : a : ""
    }
    function A(a) {
        var b, c, d = [];
        if (a instanceof Array) {
            var e = 0;
            for (c = a.length; e < c; ++e)
                d.push([a[e][0], encodeURIComponent(a[e][1])].join("="))
        } else
            for (b in a)
                if (a.hasOwnProperty(b))
                    if (a[b]instanceof Array)
                        for (e = 0,
                        c = a[b].length; e < c; ++e)
                            a[b][e] && d.push([b, encodeURIComponent(a[b][e])].join("="));
                    else
                        a[b] && d.push([b, encodeURIComponent(a[b])].join("="));
        return d.join("&")
    }
    function F(a) {
        var b, c, d;
        var e = 0;
        for (b = R.length; e < b; e++)
            if (d = R[e],
            a.source === d.contentWindow && (c = JSON.parse(a.data))) {
                0 <= c.height && (R[e].height = c.height);
                if (c.setCookie)
                    try {
                        document.cookie = c.setCookie
                    } catch (da) {}
                if (c.getCookie) {
                    var f = window.JSON.stringify({
                        getCookie: v(c.getCookie)
                    });
                    d && d.contentWindow && d.contentWindow.postMessage(f, "https://" + fHostNameJs + "/")
                }
                c.click && (d = d && d.parentNode) && (d = d.getAttribute("id")) && (f = J[d]) && (f = f.data) && window.open(D("https://" + fHostNameJs + "/go", t({
                    link: f.link,
                    a: f.a,
                    s: f.s,
                    v: f.v,
                    id: d,
                    uid: f.uid
                })), "_blank");
                if (c.hide) {
                    R[e].height = 0;
                    d = R[e]._hi;
                    c = Math.floor(Date.now() / 1E3);
                    try {
                        var g = new Date;
                        g.setFullYear(g.getFullYear() + 10);
                        document.cookie = d + "=" + c + "; path=/; expires=" + g.toUTCString()
                    } catch (da) {}
                }
            }
    }
    function H(a) {
        function b() {
            e && (clearInterval(e),
            e = null);
            a()
        }
        var c = window, d = c.document, e;
        if (d.addEventListener)
            d.addEventListener("DOMContentLoaded", b, !1),
            c.addEventListener("load", b, !1);
        else if (c.attachEvent) {
            c.attachEvent("onload", b);
            var f = d.createElement("div");
            try {
                var g = null === c.frameElement
            } catch (da) {}
            f.doScroll && g && c.external && (e = setInterval(function() {
                try {
                    f.doScroll(),
                    b()
                } catch (da) {}
            }, 30))
        }
        "complete" === d.readyState && b()
    }
    function E() {
        window.parent && window.parent.postMessage && window.parent.postMessage('{"height":' + document.body.offsetHeight + "}", "*")
    }
    var J = [], I = !1, G = m(), N = h(), W = p(), Z = !0, R, K = window.fcoreobj;
    K || (window.FintezaCoreObject ? (K = window.fcoreobj = window[window.FintezaCoreObject] || {},
    window.FintezaCoreObject = null) : K = window.fcoreobj = {});
    K.sv = "1092, 23 Jan 2018";
    K.act = K.act || [];
    K.q = K.q || [];
    K._websiteId = null;
    K.loaded = !0;
    K.inited = !0;
    K.register = function(a) {
        var b;
        if (!a || "string" != typeof a)
            return null;
        (b = J[a]) || (b = J[a] = {});
        return b
    }
    ;
    K.finish = function() {
        d();
        return this
    }
    ;
    K.show = function(a) {
        if (!a || "string" != typeof a)
            return null;
        K.lead(void 0, void 0, a);
        var b = this.register(a);
        b.readyToShow = !0;
        if (b.data)
            return e(a),
            b;
        d();
        return b
    }
    ;
    K.lead = function(a, b, c, d) {
        if (a || c)
            if (b || (b = "Visit"),
            "Visit" !== b || !I) {
                "Visit" === b && (I = !0);
                var e = r();
                e.event = b.split(" ").join("+");
                a ? e.id = a : c && (e.zid = c);
                q(D("https://" + fHostNameJs + "/tr", t(e)), d)
            }
    }
    ;
    K.leave = function(a, b, c) {
        function d() {
            clearTimeout(e);
            g || (c && c(),
            g = !0)
        }
        var e, f, g = !1;
        a && b && (f = r(),
        f.id = a,
        f.next_ref = b,
        q(D("https://" + fHostNameJs + "/tr", t(f)), d),
        setTimeout(d, 500))
    }
    ;
    K.response = function(a) {
        var b, c, d;
        if (a && a.b) {
            a = a.b;
            var g = 0;
            for (d = a.length; g < d; g++)
                if (b = a[g])
                    if (c = J[b.zone])
                        c.data = b,
                        c.dataLoading = !1,
                        c.readyToShow ? e(b.zone) : b.format & 120 || f(null, b)
        }
    }
    ;
    K.openlink = function(a) {
        var b, c;
        a && (b = window.location,
        c = b.href,
        B(b.protocol + "//" + b.host + "/go" + c.substr(c.lastIndexOf("?"))),
        window.open(a))
    }
    ;
    K.routePage = function() {
        G = m();
        N = h();
        W = p();
        I = !1
    }
    ;
    K.autoHeight = function() {
        var a = window;
        a.addEventListener ? a.addEventListener("resize", E, !1) : a.attachEvent && a.attachEvent("onresize", E);
        H(E)
    }
    ;
    (function() {
        var a = K.act, b;
        for (b = a.shift(); void 0 !== b; b = a.shift())
            b && "function" === typeof b && b();
        K.act.push = function(a) {
            a()
        }
    }
    )();
    (function() {
        function d(a, b) {
            b = Array.prototype.slice.call(b);
            a = a[b[0]];
            "function" === typeof a ? a.apply(null, b.slice(1)) : a instanceof Object && d(a, b.slice(1))
        }
        var e = {
            register: {
                website: function(d, e, f, g, h, l) {
                    "object" === typeof d && (e = !1 !== d.sendVisit,
                    f = d.trackHash,
                    g = d.trackLinks,
                    h = !1 !== d.accurateBounceRate,
                    l = d.timeOnPage,
                    d = d.id || d.websiteId);
                    K._websiteId = d;
                    !1 !== e && K.lead(d);
                    !0 === f && a();
                    !0 === g && b();
                    !1 === h && !0 !== l || c(!0 === l)
                },
                zone: function(a) {
                    var b;
                    if ("[object Array]" === Object.prototype.toString.call(a)) {
                        var c = 0;
                        for (b = a.length; c < b; c++)
                            K.register(a[c])
                    } else
                        K.register(a);
                    K.finish()
                }
            },
            route: {
                page: function(a) {
                    K.routePage();
                    !1 !== a && K._websiteId && K.lead(K._websiteId)
                }
            },
            track: function(a, b) {
                K._websiteId && K.lead(K._websiteId, a, void 0, b)
            },
            show: function(a) {
                K.show(a)
            }
        }, f;
        var g = K.q;
        for (f = g.shift(); void 0 !== f; f = g.shift())
            f && f.length && d.call(null, e, f);
        K.q.push = function(a) {
            d.call(null, e, a)
        }
    }
    )();
    (function() {
        var a, b;
        "undefined" !== typeof document.hidden ? (a = "hidden",
        b = "visibilitychange") : "undefined" !== typeof document.msHidden ? (a = "msHidden",
        b = "msvisibilitychange") : "undefined" !== typeof document.webkitHidden && (a = "webkitHidden",
        b = "webkitvisibilitychange");
        a && b && document.addEventListener(b, function() {
            Z = !document[a]
        }, !1)
    }
    )()
}
)();
var dateHelper = function() {
    function a(a, b) {
        var d = "";
        b || (b = {});
        b = {
            utc: "undefined" !== typeof b.utc ? b.utc : !0,
            short: "undefined" !== typeof b.short ? b.short : !1,
            date: "undefined" !== typeof b.date ? b.date : !0,
            month: "undefined" !== typeof b.month ? b.month : !0,
            year: "undefined" !== typeof b.year ? b.year : !0
        };
        a && (a = b.utc ? {
            date: a.getUTCDate(),
            month: a.getUTCMonth(),
            year: a.getUTCFullYear()
        } : {
            date: a.getDate(),
            month: a.getMonth(),
            year: a.getFullYear()
        },
        b.date && (d += a.date + " "),
        b.month && (d = b.short ? d + (c.monthShort[a.month] + " ") : d + (c.month[a.month] + " ")),
        b.year && (d += a.year));
        return d
    }
    function b(a, b) {
        return a.getUTCDate() === b.getUTCDate() && a.getUTCMonth() === b.getUTCMonth() && a.getUTCFullYear() === b.getUTCFullYear() ? !0 : !1
    }
    var c = {
        month: "January February March April May June July August September October November December".split(" "),
        monthGenitive: "January February March April May June July August September October November December".split(" "),
        monthShort: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
        daysWeek: "Mon Tue Wed Thu Fri Sat Sun".split(" ")
    };
    return {
        formatDate: a,
        compareOnDate: b,
        smartFormatDate: function(d, e, f) {
            if (!e)
                return a(d, {
                    short: !0
                });
            f = f ? c.monthShort : c.month;
            d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
            e = new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()));
            if (b(d, e))
                return d.getUTCDate() + " " + f[d.getUTCMonth()] + ", " + e.getUTCFullYear();
            if (d.getUTCFullYear() === e.getUTCFullYear()) {
                var g = "";
                g = d.getUTCMonth() === e.getUTCMonth() ? g + (d.getUTCDate() + " - " + e.getUTCDate() + " " + f[e.getUTCMonth()]) : g + (d.getUTCDate() + " " + f[d.getUTCMonth()] + " - " + e.getUTCDate() + " " + f[e.getUTCMonth()]);
                return g + ", " + e.getUTCFullYear()
            }
            return d.getUTCDate() + " " + f[d.getUTCMonth()] + ", " + d.getUTCFullYear() + " - " + e.getUTCDate() + " " + f[e.getUTCMonth()] + ", " + e.getUTCFullYear()
        },
        setPhrases: function(a) {
            if (a)
                for (var b in a)
                    a.hasOwnProperty(b) && (c[b] = a[b])
        },
        phrases: c
    }
}();
Date.prototype.daysInMonth = function() {
    return 32 - (new Date(this.getFullYear(),this.getMonth(),32)).getDate()
}
;
