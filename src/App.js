import React from "react";

import { connect } from "react-redux";
import * as actions from "./actions/index";
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
        let { itemEditing } = this.props;
        if (itemEditing && itemEditing.id !== "") {
            this.props.onOpenForm();
        } else {
            this.props.onToggleForm();
        }
        this.props.onClearTask({
            id: "",
            name: "",
            status: false,
        });
    };

    onShowForm = () => {
        this.setState({
            isDisplayForm: true,
        });
    };

    // onSubmit = (data) => {
    //     let { tasks } = this.state; // let tasks = this.state.tasks
    //     if (data.id === "") {
    //         //Add and save new work
    //         data.id = this.generateId();
    //         tasks.push(data);
    //     } else {
    //         let index = this.findIndex(data.id);
    //         tasks[index] = data;
    //     }

    //     this.setState({
    //         tasks: tasks,
    //         taskEditing: null,
    //     });
    //     localStorage.setItem("tasks", JSON.stringify(tasks));
    // };

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
        let { isDisplayForm } = this.props;

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
                        <TaskForm />
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
                            onUpdateStatus={this.onUpdateStatus}
                            onUpdate={this.onUpdate}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayForm: state.isDisplayForm,
        itemEditing: state.itemEditing,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm: () => {
            dispatch(actions.toggleForm());
        },
        onClearTask: (task) => {
            dispatch(actions.editTask(task));
        },
        onOpenForm: (task) => {
            dispatch(actions.openForm(task));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
