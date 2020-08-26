import React from 'react'
import { Input } from 'mdui-in-react'
// @ts-expect-error ts-migrate(2691) FIXME: An import path cannot end with a '.ts' extension. ... Remove this comment to see the full error message
import { calDiffer, calWhichDay } from './engine.ts'
// @ts-expect-error ts-migrate(2305) FIXME: Module '"mdui-in-react"' has no exported member 'T... Remove this comment to see the full error message
import { Tab } from 'mdui-in-react'

const getToday = () => {
    var time = new Date();
    var day = ("0" + time.getDate()).slice(-2);
    var month = ("0" + (time.getMonth() + 1)).slice(-2);
    return time.getFullYear() + "-" + (month) + "-" + (day);
}

type DateDifferState = any;

class DateDiffer extends React.Component<{}, DateDifferState> {
    constructor(props: {}) {
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
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Input
                        onValueChange={newText => {
                            this.setState({ timeEarly: newText })
                        }}
                        value={timeEarly}
                        icon="access_time"
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '"time"' is not assignable to type '"number" ... Remove this comment to see the full error message
                        type="time"
                    />
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Input
                        onValueChange={newText => {
                            this.setState({ timeLate: newText })
                        }}
                        value={timeLate}
                        icon="access_time"
                        // @ts-expect-error ts-migrate(2322) FIXME: Type '"time"' is not assignable to type '"number" ... Remove this comment to see the full error message
                        type="time"
                    />
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <p
                        style={{ display: !diffDay ? 'none' : 'block' }}
                        className="mdui-typo-title mdui-text-center">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <small>相差</small>{diffDay}<small>天</small>{diffDayHour}<small>小时</small>{diffDayMin}<small>分钟</small>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <br></br>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <small>折合</small>{diffHour}<small>小时</small>{diffMin}<small>分钟</small>
                    </p>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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

type WhichDayState = any;

class WhichDay extends React.Component<{}, WhichDayState> {
    constructor(props: {}) {
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
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className="">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Input
                    onValueChange={newText => {
                        this.setState({ day: newText })
                    }}
                    header={`${Math.abs(day)}天之${day >= 0 ? "后" : "前"}`}
                    icon={day >= 0 ? "fast_forward" : "fast_rewind"}
                    type="number"
                    value={day}
                />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <p style={{ display: (whichDay === '') ? 'none' : 'block' }} className="mdui-typo-title mdui-text-center">
                    {whichDay}
                </p>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Tab
        tabs={[
            {
                text: '日期&时间间隔',
                id: 'calDiffer',
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                component: <DateDiffer />
            }, {
                text: '日期推算',
                id: 'calWhichDay',
                // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                component: <WhichDay />
            }
        ]}
    />
)
