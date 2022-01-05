import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(evnt) {
        this.props.toggleCell(this.props.listId, this.props.isLit);
    }
    render() {
        let classes  = "Cell";
        classes += (this.props.isLit) ? " Cell-Lit" : "";
        return(
            <td className={classes} onClick={this.handleClick}></td>
        )
    }
}

export default Cell;