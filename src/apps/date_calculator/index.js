import React from 'react'
import Input from '../../components/Input.tsx'
import { calDiffer, calWhichDay } from './engine.ts'
import Tab from '../../components/Tab'

const getToday = () => {
    var time = new Date();
    var day = ("0" + time.getDate()).slice(-2);
    var month = ("0" + (time.getMonth() + 1)).slice(-2);
    return time.getFullYear() + "-" + (month) + "-" + (day);
}

class DateDiffer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateLate: '2020-04-17',
            dateEarly: '2020-04-16',
            timeEarly: '12:00',
            timeLate: '14:00',
            diffDay: null,
            diffHour: 0,
            diffMin: 0
        }
    }
    componentDidMount() {
        var today = getToday()
        this.setState({
            dateLate: today,
            dateEarly: today
        })
    }
    render() {
        const { timeEarly, timeLate, dateEarly, dateLate, diffDay, diffDayMin, diffDayHour, diffHour, diffMin } = this.state
        return (
            <>
                <div className="">
                    <Input
                        onValueChange={newText => {
                            this.setState({ dateEarly: newText })
                        }}
                        header="从"
                        placeholder=" "
                        icon="date_range"
                        type="date"
                        value={dateEarly}
                    />
                    <Input
                        onValueChange={newText => {
                            this.setState({ timeEarly: newText })
                        }}
                        value={timeEarly}
                        icon="access_time"
                        type="time"
                    />
                    <Input
                        onValueChange={newText => {
                            this.setState({ dateLate: newText })
                        }}
                        header="到"
                        placeholder=" "
                        icon="date_range"
                        type="date"
                        value={dateLate}
                    />
                    <Input
                        onValueChange={newText => {
                            this.setState({ timeLate: newText })
                        }}
                        value={timeLate}
                        icon="access_time"
                        type="time"
                    />
                    <p
                        style={{ display: !diffDay ? 'none' : 'block' }}
                        className="mdui-typo-title mdui-text-center">
                        <small>相差</small>{diffDay}<small>天</small>{diffDayHour}<small>小时</small>{diffDayMin}<small>分钟</small>
                        <br></br>
                        <small>折合</small>{diffHour}<small>小时</small>{diffMin}<small>分钟</small>
                    </p>
                    <button
                        onClick={() => {
                            var res = calDiffer(dateEarly, dateLate, timeEarly, timeLate)
                            this.setState({
                                diffDay: res.day,
                                diffDayHour: res.overflowHour,
                                diffDayMin: res.overflowMin,
                                diffHour: res.hour,
                                diffMin: res.min
                            })
                        }}
                        className="mdui-color-theme mdui-btn-raised mdui-ripple mdui-btn mdui-float-right">
                        计算
                    </button>
                </div>
            </>
        )
    }
}

class WhichDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateStart: '2020-01-06',
            day: 10,
            whichDay: ''
        }
    }
    componentDidMount() {
        var today = getToday()
        this.setState({
            dateStart: today
        })
    }
    render() {
        const { dateStart, day, whichDay } = this.state
        return (
            <div className="">
                <Input
                    onValueChange={newText => {
                        this.setState({ dateStart: newText })
                    }}
                    header="从"
                    placeholder=" "
                    icon="date_range"
                    type="date"
                    value={dateStart}
                />
                <Input
                    onValueChange={newText => {
                        this.setState({ day: newText })
                    }}
                    header={`${Math.abs(day)}天之${day >= 0 ? "后" : "前"}`}
                    icon={day >= 0 ? "fast_forward" : "fast_rewind"}
                    type="number"
                    value={day}
                />
                <p style={{ display: (whichDay === '') ? 'none' : 'block' }} className="mdui-typo-title mdui-text-center">
                    {whichDay}
                </p>
                <button
                    onClick={() => {
                        const res = calWhichDay(dateStart, day)
                            , weeks = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
                            , week = weeks[res.week];
                        this.setState({ whichDay: `${res.date} ${week}` })
                    }}
                    className="mdui-color-theme mdui-btn-raised mdui-ripple mdui-btn mdui-float-right">
                    计算
                    </button>
            </div>
        )
    }
}

export default () => (
    <Tab
        tabs={[
            {
                text: '日期&时间间隔',
                id: 'calDiffer',
                component: <DateDiffer />
            }, {
                text: '日期推算',
                id: 'calWhichDay',
                component: <WhichDay />
            }
        ]}
    />
)
