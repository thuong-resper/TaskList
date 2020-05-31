import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions/index";

import { Button } from "reactstrap";

class TaskItem extends React.Component {
    //Update status
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    };

    //Delete work
    onDelete = () => {
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();
    };

    //Update work
    onEditTask = () => {
        this.props.onOpenForm();
        this.props.onEditTask(this.props.task);
    };

    render() {
        var { task, index } = this.props;
        return (
            <tr>
                <th>{index}</th>
                <th>{task.name}</th>
                <th>
                    <Button
                        type="button"
                        color={task.status === true ? "danger" : "info"}
                        className="btnTable"
                        onClick={this.onUpdateStatus}
                    >
                        {task.status === true ? "Finished" : "Unfinished"}
                    </Button>
                </th>
                <th>
                    {" "}
                    <div className="tableIcon">
                        <Button
                            type="button"
                            color="info"
                            title="Edit"
                            onClick={this.onEditTask}
                        >
                            <span className="flaticon-edit flaticon"></span>
                        </Button>
                        <Button
                            type="button"
                            color="danger"
                            title="Delete"
                            onClick={this.onDelete}
                        >
                            <span className="flaticon-cancel flaticon"></span>
                        </Button>
                    </div>
                </th>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id));
        },
        onDeleteTask: (id) => {
            dispatch(actions.deleteTask(id));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
        onEditTask: (task) => {
            dispatch(actions.editTask(task));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
