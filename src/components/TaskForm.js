import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";

import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            status: false,
        };
    }

    componentDidMount() {
        if (this.props.task) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status,
            });
        }
    }

    // receive props when taskForm is displayed
    UNSAFE_componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        // console.log(nextProps.task);
        if (nextProps && nextProps.task) {
            this.setState({
                // when user click editing btn
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status,
            });
        } else if (!nextProps.task) {
            //when user editing and click add btn
            this.setState({
                id: "",
                name: "",
                status: false,
            });
        }
    }

    //close form
    onCloseForm = () => {
        this.props.onCloseForm();
    };

    //receive data form input tag
    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if (name === "status") {
            value = JSON.parse(target.value);
        }
        this.setState({
            [name]: value,
        });
    };

    //get data when click submit button
    onSubmit = (event) => {
        event.preventDefault(); //delete default submit

        // this.props.onSubmit(this.state);
        //receive props from app.js

        this.props.onAddTask(this.state);
        //receive props from store

        // clear data when click submit (submit done) and close form
        this.onClear();
        this.onCloseForm();
    };

    //delete data when click button remove
    onClear = () => {
        this.setState({
            name: "",
            status: false,
        });
    };

    render() {
        let { id } = this.state;
        return (
            <div className="w-100">
                <div className="header">
                    <h3>{id !== "" ? "Update" : "Add new work"}</h3>
                    <span
                        className="flaticon-cancel"
                        onClick={this.onCloseForm}
                    ></span>
                </div>
                <Form onSubmit={this.onSubmit}>
                    <FormGroup>
                        <Label for="Input">Action</Label>
                        <Input
                            type="text"
                            id="Input"
                            placeholder="What will you do?"
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleSelect">Status</Label>
                        <Input
                            type="select"
                            name="status"
                            id="exampleSelect"
                            value={this.state.status}
                            onChange={this.onChange}
                        >
                            <option value={true}>Finished</option>
                            <option value={false}>UnFinished</option>
                        </Input>
                    </FormGroup>
                    <div className="btn-save">
                        <Button type="submit" color="info">
                            <span className="flaticon-add-1 flaticon" />
                            <span>Save</span>
                        </Button>
                        <Button
                            type="button"
                            color="danger"
                            onClick={this.onClear}
                        >
                            <span className="flaticon-cancel flaticon" />
                            <span>Remove</span>
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddTask: (task) => {
            dispatch(actions.addTask(task));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
