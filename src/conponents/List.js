import React, { Component } from 'react';
// imgs
import pencilIcon from '../imgs/pencil.svg';
import binIcon from '../imgs/bin.svg';
import checkIcon from '../imgs/check.svg';
import checkCompleteIcon from '../imgs/check-complete.svg';

export default class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1 //-1 all, 0 active, 1 completed
        }
    }

    //tra ve thong tin task can sua 
    onEditForm = (event) => {
        const idTask = event.target.id;
        this.props.onEditForm(idTask);
    }

    //tra ve thong tin task can xoa 
    onRemoveTask = (event) => {
        const idTask = event.target.id;
        this.props.onRemoveTask(idTask);
    }

    onChecked = (event) => {
        this.props.onChecked(event.target.id);
    }

    filterList = (event) => {
        const { filterName, filterStatus } = this.state;
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
        this.props.onValueFilter(
            name === 'filterName' ? value : filterName,
            name === 'filterStatus' ? value : filterStatus
        );
    }
    // rendering ....
    render() {
        const { list } = this.props;
        const { filterName, filterStatus } = this.state;
        return (
            <div className="List">
                <table className="table table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Trạng Thái</th>
                            <th scope="col">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* filter */}
                        <tr>
                            <td></td>
                            <td className="name-filter filter">
                                <input placeholder="Nhập 1 tên để lọc" name="filterName" value={filterName} onChange={this.filterList} type="text" />
                            </td>
                            <td className="status-filter filter">
                                <select value={filterStatus} name="filterStatus" onChange={this.filterList}>
                                    <option value={-1}>Tất Cả</option>
                                    <option value={0}>Đang Làm</option>
                                    <option value={1}>Hoàn Thành</option>
                                </select>
                            </td>
                            <td></td>
                        </tr>
                        {/* list */}
                        {
                            list.length > 0 && list.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td className="name-task"><p>{item.name}</p></td>
                                        <td className="td-status">
                                            <img
                                                className="status-icon"
                                                id={index}
                                                src={item.status ? checkCompleteIcon : checkIcon}
                                                onClick={this.onChecked} />
                                        </td>
                                        <td className="td-btn">
                                            <button id={index} className="btn btn-warning" onClick={this.onEditForm}>
                                                <img className="icon-btn" src={pencilIcon} alt="icon" /> Sửa
                                            </button>
                                            <button id={index} className="btn btn-danger" onClick={this.onRemoveTask}>
                                                <img className="icon-btn" src={binIcon} alt="icon" /> Xoá
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        )
    }
}
