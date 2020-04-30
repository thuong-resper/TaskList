import React from "react";

import TaskItem from "./TaskItem";

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: "",
            filterStatus: -1, // -1: all (default), 1: active, 0: de-active
        };
    }

    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.props.onFilter(
            name === "filterName" ? value : this.state.filterName, // transfer data to parent app component
            name === "filterStatus" ? value : this.state.filterStatus
        ); // transfer data to parent app component
        this.setState({
            [name]: value,
        });
    };

    render() {
        var { tasks } = this.props; //var tasks = this.props.tasks
        let { filterName, filterStatus } = this.state;
        var elementTasks = tasks.map((task, index) => {
            return (
                <TaskItem
                    key={task.id}
                    index={index + 1}
                    task={task}
                    onUpdateStatus={this.props.onUpdateStatus}
                    onDelete={this.props.onDelete}
                    onUpdate={this.props.onUpdate}
                />
            );
        });

        return (
            <table className="table ovh bg">
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
                                    name="filterName"
                                    value={filterName}
                                    onChange={this.onChange}
                                />
                            </div>
                        </th>
                        <th>
                            <select
                                className="form-control"
                                name="filterStatus"
                                value={filterStatus}
                                onChange={this.onChange}
                            >
                                <option value={-1}>All</option>
                                <option value={0}>Finished</option>
                                <option value={1}>Unfinished</option>
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
