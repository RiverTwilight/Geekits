//平年
const ordinaryYearMonth = [null, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

//闰年
const leapYearMonth = [null, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

//是否为闰年
const isLeap = year => {
    if(year%400 === 0 && year%100 === 0)return true
    if(year%4 === 0 && year%100 !== 0)return true
    return false
}

//解析日期串
const parseDate = (date = '2020-03-06') => {
    var match = /(\d{4})-(\d{2})-(\d{2})/.exec(date);
    console.log(match)
    return {
        year: match[1],
        month: match[2].replace(/^0/, ''),
        day: match[3].replace(/^0/, ''),
        isLeap: isLeap(match[1])
    }
}

const calWhichDay = (dateStart, day) => {
    var date = parseDate(dateStart);
    console.log(date)
    var startMonth = parseInt(date.month);
    var startYear = parseInt(date.year);
    var startDay = parseInt(date.day);

    for (let i = 0; i <= day - 1 ; i++) {
        let thisYearAmonth = isLeap(startYear)?leapYearMonth[startMonth]:ordinaryYearMonth[startMonth]
        console.log(`${startMonth}月有${thisYearAmonth}天`)
        if(startDay > thisYearAmonth){
            startMonth ++
            startDay = 1
        }
        if(startMonth > 12){
            startMonth = 1;
            startYear ++
        }
        startDay ++
    }
    
    var whichDay = new Date;
    whichDay.setFullYear(startYear);
    whichDay.setMonth(startMonth - 1);
    whichDay.setDate(startDay)
    
    console.log('result', whichDay.toLocaleDateString())
    return {
        week:whichDay.getUTCDay(),
        date:whichDay.toLocaleDateString()
    }

}

const calDiffer = (dateEarly, dateLate) => {

    dateEarly = parseDate(dateEarly)
    dateLate = parseDate(dateLate)

    if(dateLate.year === dateEarly.year){
        var numOfEarlyMonthDay = isLeap(dateEarly)?leapYearMonth[dateEarly.month]:ordinaryYearMonth[dateEarly.month]
        
        var diffDay = parseInt(dateLate.day) + numOfEarlyMonthDay - parseInt(dateEarly.day)
        for (let i = dateLate.month - dateEarly.month - 1; i >= 1; i--) {
            diffDay += (dateLate.isLeap)?leapYearMonth[i]:ordinaryYearMonth[i]
        }
        return diffDay
    }

    //这一年已过天数
    var lateYearDay = parseInt(dateLate.day);
    for (let i = dateLate.month - 1; i >= 1; i--) {
        lateYearDay += (dateLate.isLeap)?leapYearMonth[i]:ordinaryYearMonth[i]
    }
    console.log(lateYearDay)

    //那一年剩下天数
    var earlyYearDay = 0
    for (let i = 13 - dateEarly.month; i >= 1; i--) {
        earlyYearDay += (dateLate.isLeap)?leapYearMonth[i]:ordinaryYearMonth[i]
    }
    earlyYearDay -= dateEarly.day
    console.log(earlyYearDay)

    //相隔年份天数，如：年份为2010 - 2020，则计算2011 - 2019的天数
    var diffYear = [];
    Array(dateLate.year - dateEarly.year - 1).fill(null).map((year,i) => {diffYear.push(parseInt(dateEarly.year) + i + 1)})

    diffDay = earlyYearDay + lateYearDay
    diffYear.map(year=>{
        diffDay += isLeap(year)?366:365
    })

    return diffDay - 1
}


export { calDiffer, calWhichDay }