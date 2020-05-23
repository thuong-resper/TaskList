import React from "react";

// import TackForm from "./components/TaskForm";
import TaskControl from "./components/TaskControl";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

import "./FontIcon/flaticon.css";

import "./App.css";

import { Container, Row, Col, Button } from "reactstrap";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisplayForm: false,
            taskEditing: null,
            filter: {
                name: "",
                status: -1,
            },
            keyword: "",
            sort: {
                by: "",
                value: 1,
            },
        };
    }

    // componentDidMount() {
    //     if (localStorage && localStorage.getItem("tasks")) {
    //         var tasks = JSON.parse(localStorage.getItem("tasks"));
    //         this.setState({ tasks: tasks }); //state is an object
    //     }
    // }

   
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

    // filter work
    onFilter = (filterName, filterStatus) => {
        filterStatus = +filterStatus; //convert string to number
        this.setState({
            filter: {
                name: filterName.toLowerCase(),
                status: filterStatus,
            },
        });
    };

    // search
    onSearch = (keyword) => {
        this.setState({
            keyword: keyword,
        });
    };

    // Sort
    onSort = (value) => {
        this.setState({
            sort: {
                by: value.by,
                value: value.value,
            },
        });
    };

    render() {
        var {
            isDisplayForm,
            taskEditing,
            // filter,
            // keyword,
            // sort,
        } = this.state; // var tasks = this.state.tasks

        // filter
        // if (filter) {
        //     // filter exist
        //     // filter by name
        //     if (filter.name) {
        //         tasks = tasks.filter((task) => {
        //             return task.name.toLowerCase().indexOf(filter.name) !== -1;
        //         });
        //     }
        //     // filter by status
        //     tasks = tasks.filter((task) => {
        //         if (filter.status === -1) {
        //             //default: return all work
        //             return task;
        //         } else {
        //             return task.status === (filter.status === 1 ? false : true);
        //         }
        //     });
        // }

        // find
        // if (keyword) {
        //     tasks = tasks.filter((task) => {
        //         return task.name.toLowerCase().indexOf(keyword) !== -1;
        //     });
        // }
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

        //sort
        // if (sort.by === "name") {
        //     tasks.sort((a, b) => {
        //         if (a.name > b.name) return sort.value;
        //         else if (a.name < b.name) return -sort.value;
        //         else return 0;
        //     });
        // } else if (sort.by === "status") {
        //     tasks.sort((a, b) => {
        //         if (a.status > b.status) return -sort.value;
        //         else if (a.status < b.status) return sort.value;
        //         else return 0;
        //     });
        // }
        return (
            <Container>
                <Row>
                    <Col lg="12">
                        <h1 className="work_title text-center">
                            Work Management
                        </h1>
                    </Col>
                </Row>

                {/* Control has Search and Sort */}

                <Row className="mgt-30">
                    {/* Task Form */}
                    <Col lg={isDisplayForm ? "4 bg tran-5" : ""}>
                        {elementTaskForm}
                    </Col>
                    {/* Task List */}
                    <Col lg={isDisplayForm ? "8" : "12"}>
                        <Button
                            color="info"
                            type="button"
                            className="mgb-20 mgr-10"
                            onClick={this.toggleForm}
                        >
                            <span className="flaticon-add-1 flaticon"></span>
                            <span>Add new work</span>
                        </Button>

                        <TaskControl
                            onSearch={this.onSearch}
                            onSort={this.onSort}
                        />

                        <TaskList
                            // isDisplayForm={isDisplayForm}
                            onUpdateStatus={this.onUpdateStatus}
                            onDelete={this.onDelete}
                            onUpdate={this.onUpdate}
                            onFilter={this.onFilter}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;
