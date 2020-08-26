import React from 'react';
import './style.css';

/**
  *2020-2-7 江村暮早期React作品
  */

//显示分数的电子屏
const ShowScore = ({
  score
}: any) => {
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <div className="score">{score}</div>
}

const Input = (props: any) => {
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="mdui-textfield">
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <input className="mdui-textfield-input" type="text" defaultValue={props.default} />
    </div>
  )
}

function Undo({
  used,
  undo
}: any) {
  if (used) {
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <button
        disabled
        className="mdui-btn mdui-btn-raised mdui-color-theme mdui-ripple">
        撤销
      </button>
    )
  } else {
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <button
        onClick={() => undo()}
        className="mdui-btn mdui-btn-raised mdui-color-theme mdui-ripple">
        撤销
      </button>
    )
  }
}

function BtnGroup(props: any) {
  var arr = Array(Number(props.max)).fill(null);//因为传入的是string所以先转Number
  var ele = arr.map((value, i) => {
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <button
        className="mdui-btn-raised mdui-col btn-add mdui-btn"
        key={i}
        onClick={() => props.onclick(i)}>
        +{i + 1}
      </button>
    )
  })
  return ele
}

function ModeSelect(props: any) {
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <select onChange={e => props.onChange(e.target.value)} className="mdui-m-l-6 mdui-select" mdui-select="true">
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <option value="3">篮球模式</option>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <option value="1">足球模式</option>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <option value="1">乒乓球模式</option>
    </select>
  )
}

type UiState = any;

class Ui extends React.Component<{}, UiState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      valueA: 0,
      valueB: 0,
      max: 3,
      history: {
        side: null,
        value: 0,
        used: false
      }
    };
  }
  render() {
    const valueB = this.state.valueB;
    const valueA = this.state.valueA;
    return (
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message
      <center className="mdui-container mdui-row-xs-3">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className="mdui-col">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Input default='菜虚鲲队' />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <ShowScore score={valueA} />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <br></br>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <br></br>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <BtnGroup
            max={this.state.max}
            onclick={(i: any) => {
              this.setState({
                history: {
                  side: 'A',
                  value: valueA,
                  used: false
                },
                valueA: valueA + i + 1
              })
            }}
          />
        </div>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className="mdui-col">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <h2>VS</h2>
        </div>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className="mdui-col">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Input default='鸡太美队' />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <ShowScore score={valueB} />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <br></br>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <br></br>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <BtnGroup
            max={this.state.max}
            onclick={(i: any) => {
              this.setState({
                history: {
                  side: 'B',
                  value: valueB,
                  used: false
                },
                valueB: valueB + i + 1
              })
            }}
          />
        </div>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className="mdui-clearfix"></div>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <br></br>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className="mdui-row-xs-3">
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className="mdui-col">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <button onClick={() => this.setState({ valueA: valueB, valueB: valueA })} className="mdui-btn mdui-btn-raised mdui-color-theme mdui-ripple">交换</button>
          </div>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className="mdui-col">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <button onClick={() => this.setState({ valueA: 0, valueB: 0 })} className="mdui-btn mdui-btn-raised mdui-color-theme mdui-ripple">重置</button>
          </div>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className="mdui-col">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Undo
              used={this.state.history.used}
              undo={(e: any) => {
                if (this.state.history.side === 'A') {
                  this.setState({
                    history: {
                      used: true,
                      value: this.state.history.value,
                      side: this.state.history.side
                    },
                    valueA: this.state.history.value
                  })
                } else {
                  this.setState({
                    history: {
                      used: true,
                      value: this.state.history.value,
                      side: this.state.history.side
                    },
                    valueB: this.state.history.value
                  })
                }
              }}
            />
          </div>
        </div>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <br></br>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <ModeSelect
          onChange={(e: any) => {
            this.setState({
              max: e
            })
          }}
        />
      {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'center' does not exist on type 'JSX.Intr... Remove this comment to see the full error message */}
      </center>
    );
  }
}

export default Ui