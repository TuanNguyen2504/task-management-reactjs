import React, { Component } from 'react';
import randomString from 'randomstring';
// images
import closeIcon from '../imgs/close.svg';
import plusIcon from '../imgs/plus.svg';
import crossIcon from '../imgs/cross.svg';

export default class TaskForm extends Component {
  // cóntructor
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      status: false
    }
    this.onFormChange = this.onFormChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  // close form
  onCloseForm = () => {
    this.props.onCloseForm();
  }

  // prevent submit form and add task
  onFormSubmit(event) {
    event.preventDefault();
    // add task
    const { id, name } = this.state;
    if (id === '') {
      if (name.trim() !== '') {
        const task = {
          id: randomString.generate(),
          name: this.state.name,
          status: this.state.status === 'true' ? true : false
        }
        this.props.onAddTask(task);
      } 
    }else {
      // edit task
      if (name.trim() !== '') {
        const task = {
          id: this.state.id,
          name: this.state.name,
          status: this.state.status === 'true' ? true : false
        }
        this.props.onEditTask(task);
      }
    }
    // reset form
    this.onCloseForm();
  }

  // change task form
  onFormChange(event) {
    const target = event.target;
    const name = target.name;
    let value = target.value;
    this.setState({
      [name]: value
    });
  }

  // Khi mà form được gắn vào (hiển thị)
  componentWillMount() {
    const { taskEditing } = this.props;
    if (taskEditing) {
      this.setState({
        id: taskEditing.id,
        name: taskEditing.name,
        status: taskEditing.status
      });
    }
  }

  // rendering ....
  render() {
    const { id, name, status } = this.state;
    return (
      <div className="TaskForm col-sm-12 col-md-4">
        <form onSubmit={this.onFormSubmit}>
          <h5 className="heading">
            {id === '' ? 'Thêm Công Việc' : 'Sửa Công Việc'}
            <img className="icon-btn close-icon" src={closeIcon} alt="close" onClick={this.onCloseForm} />
          </h5>
          <div className="form-content">
            <div className="name form-item">
              <label>Tên:</label>
              <input type="text" ref="name" value={name} name="name" onChange={this.onFormChange} />
            </div>
            <div className="status form-item">
              <label>Trạng thái:</label>
              <select value={status} name="status" onChange={this.onFormChange}>
                <option value={false}>Đang Làm</option>
                <option value={true}>Hoàn Thành</option>
              </select>
            </div>
            <div className="button-group">
              <button className="btn btn-success" onClick={this.onFormSubmit}>
                <img className="icon-btn" src={plusIcon} alt="icon" />
                Lưu Lại
                  </button>
              <button className="btn btn-danger" onClick={this.onCloseForm}>
                <img className="icon-btn" src={crossIcon} alt="icon" />
                Huỷ Bỏ
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}