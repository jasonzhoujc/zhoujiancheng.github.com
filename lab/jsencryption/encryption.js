/**
 * 用于字符串加密
 * 通过随机截取字符再加入随机文字，再把此内容放入html tag 加入到原字符串内容中
 * 如：'百度欢迎你' => '百度<em>荔枝国欢迎芝加哥夺茜</em>你'
 * 注：防君子不防小人
 * @author jason.zhou
 * @description 迁移fis后去掉了BP上的引用
 */

var util = require("hotel:widget/index/ota/js/util.js"),
    getWidth, getRandomHanzi;

/**
 * 得到字符串的宽度
 * @param {String} text 字符串内容
 * @return {Number} 字符串内容的宽度
 */
getWidth = function(text, opts) {
    var el = $('#wordwidthelement'),
        w = 0,
        defaultCfg = {'fontWeight': 'normal'};
    if (!el.length > 0) {
        el = $(util.beforeEndHTML(document.body, '<span id="wordwidthelement" style="position:absolute;top:-100px;right:-100px;margin:0;padding:0;border:none;"></span>'));
    } else {
        for (var i in defaultCfg) {
            if (defaultCfg.hasOwnProperty(i)) {
                el.css(i, defaultCfg[i])
            }
        }
    }
    for (var i in opts) {
        if (opts.hasOwnProperty(i)) {
            el.css(i, opts[i]);
        }
    }
    el.html(text);
    w = el.outerWidth();
    el.html('');
    return w;
}

/**
 * 得到随机汉字
 * @param {Number} num
 * @author jason.zhou
 */
getRandomHanzi = function(num) {
    var num = num || 1,
        str = '';
    while (num--) {
        str += unescape("%u" + (Math.round(Math.random() * 20901) + 19968).toString(16));
    }
    return str;
}

/**
 * 字符串加密
 * @param {String} text 字符串内容
 * @return {Number} 加密后的字符串内容
 */
exports.getEncryptionString = function(text, opts) {
    opts = opts || {};
    try {
        var len = text.length,
            randomText = '',
            randomIdx = Math.round(Math.random() * Math.floor((len-1)/2)),
            randomNum = Math.round(Math.random() * Math.floor(len/2)) || 1,
            randomStr = text.substr(randomIdx, randomNum),
            randomWidth = getWidth(randomStr),
            randomPrefixStr = getRandomHanzi(Math.round(Math.random() * len)),
            randomPrefixWidth = getWidth(randomPrefixStr), 
            randomSuffixStr = getRandomHanzi(Math.round(Math.random() * len)),
            textPrefixStr = '',
            textSuffixStr = '',
            html = [];
        textPrefixStr = text.substring(0, randomIdx);
        textSuffixStr = text.substring(randomIdx + randomNum, len);
        randomText = randomPrefixStr + randomStr + randomSuffixStr;
        html.push(textPrefixStr);
        html.push('<em style="width:' + (randomWidth) +'px;text-indent:-'+(randomPrefixWidth)+'px;');
        if (!textPrefixStr) {
            if ($.support.boxModel < 8) {
                html.push('margin-left:'+randomPrefixWidth + ';');
                html.push('margin-bottom:-1px;');
            }
        }
        html.push('">');
        html.push(randomText);
        html.push('</em>');
        html.push(textSuffixStr);
        return html.join('');
    } catch(e) {
        return text;
    }
}

/**
 * 字符串加密
 * @param {String} text 字符串内容
 * @return {Object} 加密后的字符串内容
 */
exports.getEncryptionString1 = function(text, opts) {
    opts = opts || {};
    try {
        var len = text.length,
            randomText = '',
            randomText1 = '',
            randomIdx = Math.round(Math.random() * Math.floor(len-1)),
            randomStr = text.substring(0, randomIdx),
            randomStr1 = text.substring(randomIdx, len),
            randomWidth = getWidth(randomStr, opts),
            randomWidth1 = getWidth(randomStr1, opts),
            randomPrefixStr = getRandomHanzi(Math.round(Math.random() * len)),
            randomPrefixStr1 = getRandomHanzi(Math.round(Math.random() * len)),
            randomPrefixWidth = getWidth(randomPrefixStr, opts), 
            randomPrefixWidth1 = getWidth(randomPrefixStr1, opts), 
            randomSuffixStr = getRandomHanzi(Math.round(Math.random() * len)),
            randomSuffixStr1 = getRandomHanzi(Math.round(Math.random() * len)),
            html = [];
        randomText = randomPrefixStr + randomStr + randomSuffixStr;
        randomText1 = randomPrefixStr1 + randomStr1 + randomSuffixStr1;
        html.push('<em style="width:' + (randomWidth) +'px;text-indent:-'+(randomPrefixWidth)+'px;');
        if ($.support.boxModel < 8) {
            //html.push('margin-left:'+randomPrefixWidth + ';');
            html.push('margin-bottom:-1px;');
        }
        html.push('">');
        html.push(randomText);
        html.push('</em>');
        html.push('<em style="width:' + (randomWidth1) +'px;text-indent:-'+(randomPrefixWidth1)+'px;');
        if ($.support.boxModel < 8) {
            html.push('margin-bottom:-1px;');
        }
        html.push('">');
        html.push(randomText1);
        html.push('</em>');
        return {
            html:html.join(''),
            width: randomWidth + randomWidth1
        };
    } catch(e) {
        return {
            html: text,
            width: 0
        };
    }
}
