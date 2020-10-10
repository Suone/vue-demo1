const Base64 = require('js-base64').Base64;

/**
 * 判断是否为json字符串
 * @param {*} str 需要判断的字符串
 */
function isJsonString(str) {
    try {
        if (typeof JSON.parse(str) === 'object') {
            return true;
        }
    } catch (e) {}
    return false;
}

/**
 * base64 加密
 * @param {*} obj 需要加密的对象
 */
const encrypt = obj => {
    let data = '';
    if (typeof obj === 'object') {
        let str = JSON.stringify(obj);
        data = Base64.encode(str);
    }
    return data;
};

/**
 * base64 解密
 * @param {*} s 需要解密的字符串
 */
const decrypt = s => {
    let data = {};
    if (typeof s === 'string') {
        try {
            let str = Base64.decode(s);
            if (isJsonString(str)) {
                data = JSON.parse(str);
            }
        } catch (e) {}
        // console.log(s);
        // Base64.decode(s);
        // let str = Base64.decode(s);
        // if (isJsonString(str)) {
        //     data = JSON.parse(str);
        // }
    }
    return data;
};
/**
 * 数组变特定对象
 *
 */
const arrToObj = arr => {
    let result = {};
    let newArr = JSON.parse(JSON.stringify(arr));
    newArr.unshift('0');
    for(var i = 0; i < arr.length; i++){
        result[newArr[i]] = arr[i];
    }
   return result;
};

/**
 * 特定对象变数组
 *
 */
const objToArr = obj => {
    let result = [];
    if (obj) {
        for(let i in obj) {
            result.push(obj[i]);
        }
    }
    return result;
};

/**
 * 对象转成特定对象
 *
 */
const objToObj = (obj, a, b) => {
    if (obj) {
        let result = {};
        result[a] = obj[a];
        result[b] = obj[b];
        return result;
    } else {
        return '';
    }
};
/**
 * 数组转成特定数组
 *
 */
const arrToArr = (arr) => {
    let result = [];
    if (arr) {
        arr.forEach((val) => {
            result.push({
                id: val.id,
                url: val.url
            })
        });
    }
    return result;
};

/**
 * js判断是否有引入某个js
 */
const isInclude = (name) => {
    var js= /js$/i.test(name);
    var es=document.getElementsByTagName(js);
    console.log(es);
    for(var i=0;i<es.length;i++)
    if(es[i][js?'src':'href'].indexOf(name)!=-1) return true;
    return false;
}
export default {
    encrypt,
    decrypt,
    arrToObj,
    objToArr,
    objToObj,
    arrToArr,
    isInclude
};
