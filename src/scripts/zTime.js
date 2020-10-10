/**
 * 格式化时间
 */
const format = v => {
    if (/^(-)?\d{1,10}$/.test(v)) {
        v = v * 1000;
    } else if (/^(-)?\d{1,13}$/.test(v)) {
        v = v * 1;
    }
    var dateObj = new Date(v);
    var month = dateObj.getMonth() + 1;
    var date = dateObj.getDate();
    // var day = dateObj.getDay();
    var hours = dateObj.getHours();
    var minutes = dateObj.getMinutes();
    // var seconds = dateObj.getSeconds();
    if (month < 10) {
        month = '0' + month;
    }
    if (date < 10) {
        date = '0' + date;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    // if (seconds < 10) {
    //     seconds = '0' + seconds;
    // }
    // var days = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
    // var UnixTimeToDate = dateObj.getFullYear() + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds + '  ' + days[day - 1];
    var UnixTimeToDate = dateObj.getFullYear() + '-' + month + '-' + date + ' ' + hours + ':' + minutes;
    return UnixTimeToDate;
};

export default {
    format
};
