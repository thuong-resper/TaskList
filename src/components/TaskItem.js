import React from "react";

class TaskItem extends React.Component {
    //Update status
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    };

    //Delete work
    onDelete = () => {
        this.props.onDelete(this.props.task.id);
    };

    //Update work
    onUpdate = () => {
        this.props.onUpdate(this.props.task.id);
    };

    render() {
        var { task, index } = this.props;
        return (
            <tr>
                <th scope="row">{index}</th>
                <th>{task.name}</th>
                <th>
                    <button
                        type="button"
                        className={
                            task.status === true
                                ? "btnTable btn btn-danger"
                                : "btnTable btn btn-info"
                        }
                        onClick={this.onUpdateStatus}
                    >
                        {task.status === true ? "Finished" : "Unfinished"}
                    </button>
                </th>
                <th>
                    {" "}
                    <div className="tableIcon">
                        <button
                            type="button"
                            className="btn btn-info"
                            title="Edit"
                            onClick={this.onUpdate}
                        >
                            <span className="flaticon-edit flaticon"></span>
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            title="Delete"
                            onClick={this.onDelete}
                        >
                            <span className="flaticon-cancel flaticon"></span>
                        </button>
                    </div>
                </th>
            </tr>
        );
    }
}

export default TaskItem;
