import React, { Component } from 'react'
import searchIcon from '../imgs/search.svg';

export default class Search extends Component {
  onSerachTask = () =>{
    this.props.onValueSearch(this.refs.search.value);
    this.refs.search.value = '';
  }
  // rendering ....
  render() {
    return (
      <div className="Search">
        <input type="text" name="search" ref="search" placeholder="Nhập từ khoá ..." />
        <button className="btn btn-primary search-btn" onClick={this.onSerachTask}>
          <img src={searchIcon} alt="icon" className="icon-btn" />
          Tìm
              </button>
      </div>
    )
  }
}