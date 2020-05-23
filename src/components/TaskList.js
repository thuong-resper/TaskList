import React from "react";

import { connect } from "react-redux";

import TaskItem from "./TaskItem";

import { Table } from "reactstrap";
import { FormGroup, Input } from "reactstrap";

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
            <Table className="ovh bg">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Work</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th></th>
                        <td>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="filterName"
                                    id="formGroupExampleInput"
                                    placeholder="Example input"
                                    value={filterName}
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                        </td>
                        <td>
                            <FormGroup>
                                <Input
                                    name="filterStatus"
                                    value={filterStatus}
                                    onChange={this.onChange}
                                    type="select"
                                    id="exampleSelect"
                                >
                                    <option value={-1}>All</option>
                                    <option value={0}>Finished</option>
                                    <option value={1}>Unfinished</option>
                                </Input>
                            </FormGroup>
                        </td>
                        <td></td>
                    </tr>
                    {elementTasks}
                </tbody>
            </Table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
    };
};

export default connect(mapStateToProps, null)(TaskList);
