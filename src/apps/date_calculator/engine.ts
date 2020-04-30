/**
 * 计算日期&时间间隔/推算几天前后是哪一天
 * @author 江村暮
 */

//平年
const ordinaryYearMonth: Array<any> = [null, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

//闰年
const leapYearMonth: Array<any> = [null, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

//是否为闰年
const isLeap = (year: number): boolean => {
    if (year % 400 === 0 && year % 100 === 0) return true
    if (year % 4 === 0 && year % 100 !== 0) return true
    return false
}

//解析时间串
type Num = number
const parseTime = (time: string): {
    hour: Num;
    min: Num
} => {
    var bound: Num = time.indexOf(':')
    return {
        hour: parseInt(time.substring(0, bound)),
        min: parseInt(time.substring(bound + 1))
    }
}

//解析日期串
const parseDate = (date = '2020-03-06'): Readonly<{
    year: number;
    month: number;
    day: number;
    isLeap: boolean
}> => {
    var match = /(\d{4})-(\d{2})-(\d{2})/.exec(date);
    if (!match) throw Error
    return {
        year: parseInt(match[1]),
        month: parseInt(match[2].replace(/^0/, '')),
        day: parseInt(match[3].replace(/^0/, '')),
        isLeap: isLeap(parseInt(match[1]))
    }
}

const calWhichDay = (dateStart: string, day: number): { week: number; date: string } => {
    var date = parseDate(dateStart);
    console.log(date)
    var startMonth = date.month;
    var startYear = date.year;
    var startDay = date.day;

    if (day >= 0) {
        for (let i = 0; i <= day - 1; i++) {
            let thisYearAmonth = isLeap(startYear) ? leapYearMonth[startMonth] : ordinaryYearMonth[startMonth]
            console.log(`${startMonth}月有${thisYearAmonth}天`)
            if (startDay > thisYearAmonth) {
                startMonth++
                startDay = 1
            }
            if (startMonth > 12) {
                startMonth = 1;
                startYear++
            }
            startDay++
        }
    } else {
        for (let i = 0; i <= Math.abs(day); i++) {
            let thisYearAmonth = isLeap(startYear) ? leapYearMonth[startMonth] : ordinaryYearMonth[startMonth]
            if (startDay < 1) {
                startMonth--
                startDay = thisYearAmonth
            }
            if (startMonth < 1) {
                startMonth = 12;
                startYear--
            }
            startDay--
        }
    }

    var whichDay = new Date();
    whichDay.setFullYear(startYear);
    whichDay.setMonth(startMonth - 1);
    whichDay.setDate(startDay)

    console.log('result', whichDay.toLocaleDateString())
    return {
        week: whichDay.getUTCDay(),
        date: whichDay.toLocaleDateString()
    }
}

const calDiffer = (
    defaultDateEarly: string,
    defaultDateLate: string,
    defaultTimeEarly?: string,
    defaultTimeLate?: string
): {
    day: number,
    hour: number,
    min: number,
    overflowHour: number,
    overflowMin: number
} => {

    var dateEarly = parseDate(defaultDateEarly)
        , dateLate = parseDate(defaultDateLate)
        , diffDay: number;

    //两个日期在同一年
    if (dateLate.year === dateEarly.year) {
        var numOfEarlyMonthDay = dateEarly.isLeap ? leapYearMonth[dateEarly.month] : ordinaryYearMonth[dateEarly.month]
        // 两个日期在同一月份
        if (dateLate.month === dateEarly.month) {
            diffDay = dateLate.day - dateEarly.day
        } else {
            diffDay = dateLate.day + numOfEarlyMonthDay - dateEarly.day;//两个日期所在月的非整月天数和
            for (let i = dateEarly.month; i < dateLate.month - 1; i++) {
                diffDay += (dateLate.isLeap) ? leapYearMonth[i] : ordinaryYearMonth[i]
            }
        }
    } else {
        //这一年已过天数
        var lateYearDay = dateLate.day;
        for (let i = dateLate.month - 1; i >= 1; i--) {
            lateYearDay += (dateLate.isLeap) ? leapYearMonth[i] : ordinaryYearMonth[i]
        }
        console.log(lateYearDay)

        //那一年剩下天数
        var earlyYearDay = 0
        for (let i = 13 - dateEarly.month; i >= 1; i--) {
            earlyYearDay += (dateLate.isLeap) ? leapYearMonth[i] : ordinaryYearMonth[i]
        }
        earlyYearDay -= dateEarly.day
        console.log(earlyYearDay)

        //相隔年份天数，如：年份为2010 - 2020，则计算2011 - 2019的天数
        var diffYear: number[] = [];
        for (let i = 0; i <= dateLate.year - dateEarly.year - 1; i++) {
            diffYear.push(dateEarly.year + i + 1)
        }

        diffDay = earlyYearDay + lateYearDay
        diffYear.map(year => {
            diffDay += isLeap(year) ? 366 : 365
        })
    }

    //计算这天剩下的时间与那天已经过的分钟之和
    var timeEarly = parseTime(defaultTimeEarly || '00:00'),
        timeLate = parseTime(defaultTimeLate || '00:00');
    var overflowDiffMin = 60 * (25 - timeEarly.hour + timeLate.hour) + 60 - timeEarly.min + timeLate.min
    var diffMin = (diffDay - 1) * 1440 + overflowDiffMin
    console.log(timeEarly, timeLate, diffMin)
    return {
        day: diffDay,
        overflowHour: Math.floor(diffMin/60) - diffDay * 24,
        overflowMin: diffMin % 60,//(overflowDiffMin - 1440 * diffDay) % 60,
        hour: Math.floor(diffMin/60),
        min: diffMin % 60
    }
}

export { calDiffer, calWhichDay }
