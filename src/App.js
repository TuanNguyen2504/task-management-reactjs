import React from 'react';
import './App.css';
// bootstrap & reactstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// classnames
import classNames from 'classnames';
// components
import TaskForm from './conponents/TaskForm';
import Control from './conponents/Control';
import List from './conponents/List';
// imgs
import plusIcon from './imgs/plus.svg';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      displayTaskForm: false,
      taskEditing: {
        id: '',
        name: '',
        status: false,
      },
      filter: {
        name: '',
        status: -1
      },
      sort: -1
    }
  }

  // Lay du lieu tu local Storage
  componentWillMount() {
    let dataTasks = JSON.parse(localStorage.getItem('tasks'));
    if (!dataTasks) {
      dataTasks = [];
    }
    this.setState({
      tasks: dataTasks
    })
  }

  // toggle form and reset form
  onToggleForm = () => {
    this.setState({
      displayTaskForm: !this.state.displayTaskForm,
      taskEditing: {
        id: '',
        name: '',
        status: false
      }
    });
  }

  // lay task dang edit
  onEditForm = (idTask) => {
    // open form
    this.setState({
      displayTaskForm: true,
      taskEditing: this.state.tasks[idTask]
    });
  }

  // luu vao local storage
  saveLocalStorage(newTasks) {
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }

  // add task
  addTask = (task) => {
    const newTasks = [...this.state.tasks, task];
    // them task vao list
    this.setState({
      tasks: newTasks
    });
    this.saveLocalStorage(newTasks);
  }

  // edit task
  editTask = (task) => {
    // tim phan tu can sua
    const newTasks = this.state.tasks.map((item) => item.id !== task.id ? item : { ...item, name: task.name, status: task.status });
    this.setState({
      tasks: newTasks
    });
    this.saveLocalStorage(newTasks);
  }

  // xoa task
  onRemoveTask = (idTask) => {
    const idTaskNumber = parseInt(idTask);
    const { tasks } = this.state;
    const newTasks = [...tasks.slice(0, idTaskNumber), ...tasks.slice(idTaskNumber + 1)];
    this.setState({
      tasks: newTasks
    });
    this.saveLocalStorage(newTasks);
  }

  // check completed
  onChecked = (idTask) => {
    const newTasks = this.state.tasks.map((item, index) => index !== parseInt(idTask) ? item : { ...item, status: !item.status });
    this.setState({
      tasks: newTasks
    });
    this.saveLocalStorage(newTasks);
  }

  // filter list
  filterList = (filterName, filterStatus) => {
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: parseInt(filterStatus, 10)
      }
    });
  }
  // search
  onSearch = (value) => {
    console.log(value)
    this.setState({
      filter: {
        name: value.toLowerCase(),
        status: this.state.filter.status
      }
    })
  }

  //sort tasks
  onSort = (valueSort) => {
    this.setState({
      sort: parseInt(valueSort)
    });
  }
  // rendering ...........
  render() {
    let { tasks, displayTaskForm, taskEditing, filter, sort } = this.state;
    // filter tasks
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((item) => item.name.toLowerCase().indexOf(filter.name) !== -1);
      }
      if (filter.status !== -1) {
        tasks = tasks.filter((item) => item.status == filter.status);
      }
    }
    // sort tasks
    if (sort !== -1) {
      tasks.sort((a, b) => {
        const returned = sort === 1 ? 1 : -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return returned;
        else if (a.name.toLowerCase() < b.name.toLowerCase()) return -returned;
        return 0;
      })
    }
    return (
      <div className="App">
        <div className="container">
          <div className="row">

            {/*============ header ===============*/}
            <header className="col-sm-12">
              <h1 className="heading">Quản lý công việc</h1>
            </header>

            {/*============ task form ===============*/}
            {displayTaskForm ? <TaskForm
              taskEditing={taskEditing}
              onCloseForm={this.onToggleForm}
              onAddTask={this.addTask}
              onEditTask={this.editTask} /> : ''}

            {/*============ main task ===============*/}
            <div className={classNames({
              'main-content col-sm-12': true,
              'col-md-8': displayTaskForm,
              'col-md-12': !displayTaskForm
            })}>
              {/* =========== add task button ======== */}
              <button className="add-btn btn btn-primary mb-4" onClick={this.onToggleForm}>
                <img className="icon-btn" src={plusIcon} alt="icon" />
                Thêm công việc
              </button>

              {/* =========== search, sort ======== */}
              <Control onSearch={this.onSearch} onSort={this.onSort} />

              {/* =========== task list ======== */}
              <List
                list={tasks}
                onEditForm={this.onEditForm}
                onRemoveTask={this.onRemoveTask}
                onChecked={this.onChecked}
                onValueFilter={this.filterList} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
