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

    render() {
        let { isDisplayForm } = this.props;

        return (
            <Container>
                <Row>
                    <Col lg="12">
                        <h1 className="work_title text-center">
                            Work Management
                        </h1>
                    </Col>
                </Row>
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

                        <TaskControl />

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
