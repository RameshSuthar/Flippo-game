import React, { Component } from 'react';
import Cell from '../Cell/Cell';
import "./LightsOut.css";

class LightsOut extends Component {
    //Default props is having a grid of size 5 * 5
    //chanceOfLightToBeOn will decide if the cell will be on or off
    static defaultProps = {
        nRows: 5,
        nColumns: 5,
        chanceOfLightToBeOn: 0.20
    }

    constructor(props) {
        super(props);
        //we will have 2 states: hasWon(type: bool) and board(type array of array with bool values)
        this.state = {
            hasWon: false,
            board: this.createGrid()
        }
        this.toggleCell = this.toggleCell.bind(this);
    }

    createGrid() {
        let grid = [];
        for(let y = 0; y < this.props.nRows; y++) {
            let row = [];
            for(let x = 0; x < this.props.nColumns; x++) {
                row.push(Math.random() < this.props.chanceOfLightToBeOn);
            }
            grid.push(row);
        }
        return grid;
    }

    toggleCell(cellCoord, val) {
        let y = cellCoord.split("-").map(Number)[0];
        let x = cellCoord.split("-").map(Number)[1];


        // this is a immutable state change
        let new_board = this.state.board.map((row, rowInd) =>
            row.map((col, colInd) => {
                if((colInd === x && rowInd === y) || (colInd === x-1 && rowInd === y) || 
                   (colInd === x+1 && rowInd === y) || (colInd === x && rowInd === y-1) || 
                   (colInd === x && rowInd === y+1)) {
                    return !col;
                }
                return col;
            }
        ));

        let hasWon = new_board.every(row => row.every(col => !col));

        // This is a mutuable state change
        // let colSize = this.props.nColumns;
        // let rowSize = this.props.nRows;
        // let new_board = this.state.board;
        // function flipCell(y, x) {
        //     console.log(y,x);
        //     if(y >= 0 && y < rowSize && x >= 0 && x < colSize) {
        //         new_board[y][x] = !new_board[y][x];
        //     }
        // }

        // //toggle the selected cell
        // flipCell(y, x);
        // //toggle the left neighbour cell
        // flipCell(y, x - 1);
        // //toggle the right neighbour cell
        // flipCell(y, x + 1);
        // //toggle the up neighbour cell
        // flipCell(y - 1, x);
        // //toggle the down neighbour cell
        // flipCell(y + 1, x);
        
        this.setState({
            board: new_board,
            hasWon: hasWon
        })
    }

    render() {

        if(this.state.hasWon) {
            return <h1 className="LightsOut-title">You Won!!</h1>
        }

        let tblRows = [];
        for(let y = 0; y < this.props.nRows; y++) {
            let tblRow = [];
            for(let x = 0; x < this.props.nColumns; x++) {
                let coord = `${y}-${x}`
                tblRow.push(<Cell key={coord} listId={coord} isLit={this.state.board[y][x]} toggleCell={this.toggleCell} />);
            }
            tblRows.push(<tr key={y}>{tblRow}</tr>);
        }


        return (
            <div>
                <h1 className="LightsOut-title">FLIPPO</h1>
                <h4 className="LightsOut-note">FLIP THE WHITE CELL INTO GRAY</h4>
                <table className="LightsOut-board">
                    <tbody>
                        {tblRows}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default LightsOut;