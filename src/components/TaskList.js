import React from "react";

import TaskItem from "./TaskItem";

class TaskList extends React.Component {
    render() {
        var { tasks } = this.props; //var tasks = this.props.tasks
        var elementTasks = tasks.map((task, index) => {
            return <TaskItem key={task.id} index={index + 1} task={task} />;
        });

        return (
            <table className="table bg ovh">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Work</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row" />
                        <th>
                            <div className="form-group mgb-0">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="formGroupExampleInput"
                                    placeholder="Example input"
                                />
                            </div>
                        </th>
                        <th>
                            <select className="form-control">
                                <option>Select</option>
                            </select>
                        </th>
                        <th></th>
                    </tr>
                    {/* Tasks Item */}
                    {elementTasks}
                </tbody>
            </table>
        );
    }
}

export default TaskList;
