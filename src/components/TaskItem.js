import React from "react";

class TaskItem extends React.Component {
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
                        >
                            <span className="flaticon-edit flaticon"></span>
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            title="Delete"
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
