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
        if (this.props.itemEditing) {
            this.setState({
                id: this.props.itemEditing.id,
                name: this.props.itemEditing.name,
                status: this.props.itemEditing.status,
            });
        }
    }

    // receive props when taskForm is displayed
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditing) {
            this.setState({
                // when user click editing btn
                id: nextProps.itemEditing.id,
                name: nextProps.itemEditing.name,
                status: nextProps.itemEditing.status,
            });
        } else if (!nextProps.itemEditing) {
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

        this.props.onSaveTask(this.state);

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
        //Condition for display Task Form
        if (!this.props.isDisplayForm) return null;
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
    return {
        isDisplayForm: state.isDisplayForm,
        itemEditing: state.itemEditing,
    };
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask: (task) => {
            dispatch(actions.saveTask(task));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
