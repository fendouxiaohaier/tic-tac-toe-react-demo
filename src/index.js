import React from "react";
import ReactDOM from "react-dom/client";

import { calculateWinner } from "./util";

import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i, coordinate) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i, coordinate)}
      />
    );
  }

  render() {
    // 三行
    const boardRows = [0, 1, 2];
    return (
      <div>
        {boardRows.map((item, row) => (
          <div className="board-row" key={item}>
            {boardRows.map((item_, col) =>
              this.renderSquare(row * 3 + col, [col, row])
            )}
          </div>
        ))}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepNumber: 0,
      history: [
        {
          squares: Array(9).fill(null),
          /** 历史坐标 */
          coordinate: [],
        },
      ],
      xIsNext: true,
    };
  }

  handleClick = (i, coordinate) => {
    // 丢弃未来的数据，只保留时间旅行回到的某个时刻
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // 当有玩家胜出时，或者某个 Square 已经被填充时，该函数不做任何处理直接返回。
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
          coordinate,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  };

  // 时间旅行 跳转回去
  jumpTo = (step) => {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  };

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    // 渲染跳转步骤按钮UI
    const moves = history.map((step, move) => {
      // 在描述后面展示坐标（列号，行号）
      const desc = move
        ? "Go to move #" +
          move +
          "  坐标(列,横)：(" +
          step.coordinate.toString() +
          ")"
        : "Go to game start";
      return (
        <li key={move}>
          <button
            style={{
              fontWeight: move === this.state.stepNumber ? "bold" : "normal",
            }}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });

    // 展示胜者是谁
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={this.handleClick} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
