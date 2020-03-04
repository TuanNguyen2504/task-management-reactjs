import React, { Component } from 'react';
// imgs
import sortIconA from '../imgs/sort-a-z.svg'
import sortIconZ from '../imgs/sort-z-a.svg'
export default class Sort extends Component {
    onClick = (value) => {
        this.props.onSort(value);
    }
    // rendering ........
    render() {
        return (
            <div className="Sort">
                <div className="btn-group">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        Sắp xếp
                   </button>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="triggerId">
                        <a className="dropdown-item" onClick={() => this.onClick(1)}>
                            <img className="sort-icon" src={sortIconA} /> <span>A-Z</span>
                        </a>
                        <a className="dropdown-item" onClick={() => this.onClick(0)}>
                            <img className="sort-icon" src={sortIconZ} /> <span>Z-A</span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}
