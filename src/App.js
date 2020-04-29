import React from "react";

// import TackForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";

import "./FontIcon/flaticon.css";

import "./App.css";
import TaskForm from "./components/TaskForm";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isDisplayForm: false,
            taskEditing: null,
        };
    }

    componentDidMount() {
        if (localStorage && localStorage.getItem("tasks")) {
            var tasks = JSON.parse(localStorage.getItem("tasks"));
            this.setState({ tasks: tasks }); //state is an object
        }
    }

    // create unique id by native way
    id() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    generateId() {
        return (
            this.id() +
            this.id() +
            "-" +
            this.id() +
            "-" +
            this.id() +
            "-" +
            this.id()
        );
    }
    //toggle display form
    toggleForm = () => {
        if (this.state.isDisplayForm && this.state.taskEditing !== null) {
            this.setState({
                isDisplayForm: true,
                taskEditing: null,
            });
        } else {
            this.setState({
                isDisplayForm: !this.state.isDisplayForm,
                taskEditing: null,
            });
        }
    };

    //close form when click icon close button
    onCloseForm = () => {
        this.setState({
            isDisplayForm: false,
        });
    };

    onShowForm = () => {
        this.setState({
            isDisplayForm: true,
        });
    };

    onSubmit = (data) => {
        let { tasks } = this.state; // let tasks = this.state.tasks
        if (data.id === "") {
            //Add and save new work
            data.id = this.generateId();
            tasks.push(data);
        } else {
            let index = this.findIndex(data.id);
            tasks[index] = data;
        }

        this.setState({
            tasks: tasks,
            taskEditing: null,
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    // Update Status
    onUpdateStatus = (id) => {
        let { tasks } = this.state;
        // 1st way

        // if (findId !== -1) {
        //     tasks[findId].status = !tasks[findId].status;
        //     this.setState({
        //         tasks: tasks,
        //     });
        // }
        // for (let i = 0; i < findId.length; i++) {
        //     findId[i] = !findId[i];
        //     // console.log(findId[i]);
        //     this.setState({
        //         tasks: tasks,
        //     });
        // }
        // tasks[index].status = !tasks[index].status;
        // // 2nd way

        // setState and save at local storage
        let index = this.findIndex(id);
        if (index !== -1) {
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks: tasks,
            });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    };

    findIndex = (id) => {
        let { tasks } = this.state;
        let result = -1;
        tasks.forEach((task, index) => {
            if (task.id === id) {
                result = index;
            }
        });
        return result;
    };

    // Delete Work and close form
    onDelete = (id) => {
        const { tasks } = this.state;

        //1st way
        // let filterResult = tasks.filter((task) => task.id !== id);
        // this.setState({
        //     tasks: filterResult,
        // });
        // localStorage.setItem("tasks", JSON.stringify(filterResult));
        // this.onCloseForm();

        // 2nd way
        let index = this.findIndex(id);
        if (index !== -1) {
            tasks.splice(index, 1);
            this.setState({
                tasks: tasks,
            });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
        this.onCloseForm();
    };

    // Update work
    onUpdate = (id) => {
        const { tasks } = this.state;
        let index = this.findIndex(id);
        this.setState(
            //setState is asynchronous
            {
                taskEditing: tasks[index],
            }
            //so if want receive data before do next steps, must make asynchronous to synchronous by use function
        );
        this.onShowForm();
    };

    render() {
        var { tasks, isDisplayForm, taskEditing } = this.state; // var tasks = this.state.tasks

        //Condition for display Task Form
        var elementTaskForm = isDisplayForm ? (
            <TaskForm
                onCloseForm={this.onCloseForm}
                onSubmit={this.onSubmit}
                task={taskEditing}
            />
        ) : (
            ""
        );
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="work_title text-center">
                            Work Management
                        </h1>
                    </div>
                </div>

                {/* Control has Search and Sort */}

                <div className="row mgt-30">
                    {/* Task Form */}
                    <div className={isDisplayForm ? "col-lg-4 bg tran-5" : ""}>
                        {elementTaskForm}
                    </div>
                    {/* Task List */}
                    <div className={isDisplayForm ? "col-lg-8" : "col-lg-12"}>
                        <button
                            type="button"
                            className="btn btn-info mgb-20 mgr-10"
                            onClick={this.toggleForm}
                        >
                            <span className="flaticon-add-1 flaticon"></span>
                            <span>Add new work</span>
                        </button>

                        <Control />

                        <TaskList
                            tasks={tasks}
                            // isDisplayForm={isDisplayForm}
                            onUpdateStatus={this.onUpdateStatus}
                            onDelete={this.onDelete}
                            onUpdate={this.onUpdate}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
