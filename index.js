import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numSteps: 0,
      XisSelected: false,
      OisSelected: false,
      squares: Array(9).fill(null),
      xIsNext: true, //default start as X
      selectedPos: null
    };
  }

  handleClick(i) {
    //is called when props.onClick in square
    const squares = this.state.squares.slice();
    //squares[i] = this.state.xIsNext ? 'X' : 'O';

    if (calculateWinner(squares)) {
      //do nothing if someone won
      return;
    }

    if (this.state.numSteps < 6) {
      //regular tic tac toe behavior until >6 steps
      if (squares[i])
        //do nothing if square already filled
        return;

      this.state.numSteps++;

      if (this.state.xIsNext) {
        squares[i] = "X";
      } else {
        squares[i] = "O";
      }

      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext //flips xIsNext
      });
    } else if (!this.state.XisSelected && this.state.xIsNext) {
      //now define chorus lapilli behavior if NOT YET selected item
      if (squares[i] == "X") {
        this.state.XisSelected = true;
        this.state.selectedPos = i; //store selected's position to check for adjacent-ness later

        this.setState({ squares: squares });
        squares[i] = null;
      }
    } else if (!this.state.OisSelected && !this.state.xIsNext) {
      //now define chorus lapilli behavior if NOT YET selected item
      if (squares[i] == "O") {
        this.state.OisSelected = true;
        this.state.selectedPos = i; //store selected's position to check for adjacent-ness later

        this.setState({ squares: squares });
        squares[i] = null;
      }
    } //if already selected, try to place it
    else {
      if (i == this.state.selectedPos) {
        //if same place, place back down (always allowed)
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.state.XisSelected = false;
        this.state.OisSelected = false;
        this.setState({ squares: squares }); //does NOT switch player's turn (compared to line 125)
        return;
      } else if (isAdjacent(i, this.state.selectedPos) && squares[i] == null) {
        if (squares[4] == "X" && this.state.xIsNext) {
          //if X stepped in center in previous step, must move it out now
          const whatif = this.state.squares.slice();
          whatif[i] = "X";

          if (calculateWinner(whatif)) {
            //if player wins immediately with this move, allow it
            this.setState({ squares: squares });
            squares[i] = "X"; //place it down
            this.state.XisSelected = false;
            this.setState({ squares: squares });
            return;
          } else if (i != 4) {
            //only allow 4
            return;
          }
        } else if (squares[4] == "O" && !this.state.xIsNext) {
          //if O stepped in center in previous step, must move it out now
          const whatif = this.state.squares.slice();
          whatif[i] = "O";

          if (calculateWinner(whatif)) {
            //if player wins immediately with this move, allow it
            this.setState({ squares: squares });
            squares[i] = "O"; //place it down
            this.state.OisSelected = false;
            this.setState({ squares: squares });
            return;
          } else if (i != 4) {
            //only allow 4
            return;
          }
        }
        squares[i] = this.state.xIsNext ? "X" : "O"; //place it down
        this.state.XisSelected = false;
        this.state.OisSelected = false;
        this.setState({ squares: squares, xIsNext: !this.state.xIsNext });
      }
    }
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    //const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isAdjacent(i, j) {
  if (i === 0) return j === 1 || j === 3 || j === 4;
  else if (i === 1) return j === 0 || j === 2 || j === 4 || j === 3 || j === 5;
  else if (i === 2) return j === 1 || j === 4 || j === 5;
  else if (i === 3) return j === 0 || j === 1 || j === 4 || j === 6 || j === 7;
  else if (i === 4) return true;
  else if (i === 5) return j === 1 || j === 2 || j === 4 || j === 7 || j === 8;
  else if (i === 6) return j === 3 || j === 4 || j === 7;
  else if (i === 7) return j === 3 || j === 4 || j === 5 || j === 6 || j === 8;
  else if (i === 8) return j === 4 || j === 5 || j === 7;
}