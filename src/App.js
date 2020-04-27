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
        };
    }

    generateData = () => {
        var tasks = [
            {
                id: this.generateId(),
                name: "Check Mail",
                status: true,
            },
            {
                id: this.generateId(),
                name: "Check Social Media",
                status: false,
            },
            {
                id: this.generateId(),
                name: "sdwe",
                status: true,
            },
        ];
        localStorage.setItem("tasks", JSON.stringify(tasks)); //save data by json
    };

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
    toggleForm = () => {
        this.setState({
            isDisplayForm: !this.state.isDisplayForm,
        });
    };

    onCloseForm = () => {
        this.setState({
            isDisplayForm: false,
        });
    };

    render() {
        var { tasks, isDisplayForm } = this.state; // var tasks = this.state.tasks

        //Condition for display Task Form
        var elementTaskForm = isDisplayForm ? (
            <TaskForm onCloseForm={this.onCloseForm} />
        ) : (
            ""
        );
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="work_title bg text-center">
                            Work Management
                        </h1>
                    </div>
                </div>

                {/* Control has Search and Sort */}

                <div className="row">
                    {/* Task Form */}
                    <div className={isDisplayForm ? "col-lg-4 bg mgt-30" : ""}>
                        {elementTaskForm}
                    </div>
                    {/* Task List */}
                    <div
                        className={
                            isDisplayForm
                                ? "col-lg-8 mgt-30"
                                : "col-lg-12 mgt-30"
                        }
                    >
                        <button
                            type="button"
                            className="btn btn-info mgb-20 mgr-10"
                            onClick={this.toggleForm}
                        >
                            <span className="flaticon-add-1 flaticon"></span>
                            <span>Add new work</span>
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger mgb-20"
                            onClick={this.generateData}
                        >
                            <span className="flaticon-add-1 flaticon"></span>
                            <span>Generate Data</span>
                        </button>
                        <Control />

                        <TaskList tasks={tasks} isDisplayForm={isDisplayForm} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
