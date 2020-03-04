import React, { Component } from 'react'
import Search from './Search';
import Sort from './Sort';


export default class Control extends Component {
    onSearch = (value) => {
        this.props.onSearch(value);
    }

    onSort = (value) =>{
        this.props.onSort(value);
    }
    // rendering...
    render() {
        return (
            <div className="FormControl">
                <div className="control">
                    <Search onValueSearch={this.onSearch} />
                    <Sort onSort={this.onSort}/>
                </div>
            </div>
        )
    }
}
