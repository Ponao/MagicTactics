import { declension } from "./FunctionsController"

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

export const times = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
]

export const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
]

export function getHM(date) {
    let time = new Date(date)

    let hours = time.getHours()
    let minutes = time.getMinutes()

    if (minutes.toString().length === 1) {
        minutes = "0" + minutes;
    }
    if (hours.toString().length === 1) {
        hours = "0" + hours;
    }

    return hours + ":" + minutes
}

export const getDateWithMonth = (date) => {
    date = new Date(date)

    return date.getDate() + ' ' + months[date.getMonth()].slice(0, 3)
}

export const getTimes = () => {
    let times = []
    let dayAll = 86400
    let step = 1800 // 900 for each 15 minutes, 1800 for each 30 minutes, 3200 for each hour, etc...
    let mult = 0

    while (true) {
        times.push(step*mult)
        if(step*mult === dayAll) {
            break;
        }
        mult = mult + 1
    }

    return times
}

export function timeAt(date) {
    let time = new Date(date)

    let day_diff = new Date().getDate() - time.getDate(),
        month_diff = new Date().getMonth() - time.getMonth(),
        year_diff = new Date().getFullYear() - time.getFullYear();
    let year = time.getFullYear(),
        month = time.getMonth()+1,
        day = time.getDate();
        
    if (year_diff > 0)
        return (
            year.toString()+'.'
            +((month<10) ? '0'+month.toString() : month.toString())+'.'
            +((day<10) ? '0'+day.toString() : day.toString())
        );

    return ( 
        (
            day_diff === 0 && month_diff === 0 && 'Today'
        )
        || (day_diff === 1 && month_diff === 0 && 'Yesterday')
        || (year_diff === 0 && day + ' ' + months[month-1])
    )
}

export function onlineAt(timeR) {
    let time = new Date(timeR)

    let hours = time.getHours()
    let minutes = time.getMinutes()

    if (minutes.toString().length === 1) {
        minutes = "0" + minutes;
    }
    if (hours.toString().length === 1) {
        hours = "0" + hours;
    }

    let year = time.getFullYear(),
        month = time.getMonth()+1,
        day = time.getDate();

    let diff = (((new Date()).getTime() - time.getTime()) / 1000),
        day_diff = new Date().getDate() - time.getDate();
    let month_diff = (new Date().getMonth()+1) - (time.getMonth()+1)

    if (isNaN(day_diff) || day_diff < 0 || month_diff >= 1 )
        return (
            day.toString() + ' ' + months[month-1] + ' ' + year.toString() + ' at ' + hours + ':' +  minutes
        );
    
        
    let r =
    ( 
        (
            day_diff === 0 && 
            (
                (diff < 60 && 'just now')
                || (diff < 120 && '1 minute ago')
                || (diff < 3600 && Math.floor(diff / 60) + ' ' + declension(Math.ceil(diff / 60), ['minute', 'minutes', 'minutes']) + ' ago')
                || (diff < 7200 && '1 hour ago')
                || (diff < 86400 && Math.floor(diff / 3600) + ' ' + declension(Math.ceil(diff / 3600), ['hour', 'hours', 'hours']) + ' ago')
            )
        )
        || (day_diff === 1 && 'yesterday in ' + hours + ':' +  minutes)
        || (day_diff < 7 && day_diff + ' ' + declension(Math.ceil(day_diff), ['day', 'days', 'days']) + ' ago in '  + hours + ':' +  minutes)
        || (day_diff < 31 && Math.ceil(day_diff / 7) + ' ' + declension(Math.ceil(day_diff / 7), ['week', 'weeks', 'weeks']) + ' ago in ' + hours + ':' +  minutes)
    );
    return r;
}

export function lastMessageAt(timeR) {
    let time = new Date(timeR)

    let hours = time.getHours()
    let minutes = time.getMinutes()

    if (minutes.toString().length === 1) {
        minutes = "0" + minutes;
    }
    if (hours.toString().length === 1) {
        hours = "0" + hours;
    }

    let day_diff = new Date().getDate() - time.getDate(),
        month_diff = new Date().getMonth() - time.getMonth(),
        year_diff = new Date().getFullYear() - time.getFullYear();
    let year = time.getFullYear(),
        month = time.getMonth()+1,
        day = time.getDate();
    if (year_diff > 0)
        return (
            year.toString()+'.'
            +((month<10) ? '0'+month.toString() : month.toString())+'.'
            +((day<10) ? '0'+day.toString() : day.toString())
        );

    let r =
    ( 
        (
            day_diff === 0 && month_diff === 0 && 
            (hours + ':' +  minutes)
        )
        || (day_diff === 1 && month_diff === 0 && 'yesterday')
        || (year_diff === 0 && day + ' ' + months[month-1])
    );

    return r;
}

export function getTimezoneOffset() {
    function z(n){return (n<10? '0' : '') + n}
    let offset = new Date().getTimezoneOffset();
    let sign = offset < 0? '+' : '-';
    offset = Math.abs(offset);
    return sign + z(offset/60 | 0);
}