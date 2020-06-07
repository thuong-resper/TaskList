import React from "react";

import { connect } from "react-redux";
import * as actions from "../actions/index";

import TaskItem from "./TaskItem";

import { Table } from "reactstrap";
import { FormGroup, Input, Button } from "reactstrap";

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
        var filter = {
            name: name === "filterName" ? value : this.state.filterName,
            status: name === "filterStatus" ? value : this.state.filterStatus,
        };
        this.props.onFilterTable(filter);
        this.setState({
            [name]: value,
        });
    };

    render() {
        var { tasks, filterTable } = this.props; //var tasks = this.props.tasks
        // filter on table
        if (filterTable) {
            // filter exist
            // filter by name
            if (filterTable.name) {
                tasks = tasks.filter((task) => {
                    return (
                        task.name.toLowerCase().indexOf(filterTable.name) !== -1
                    );
                });
            }
            // filter by status
            tasks = tasks.filter((task) => {
                if (filterTable.status === -1) {
                    //default: return all work
                    return task;
                } else {
                    return (
                        task.status ===
                        (filterTable.status === 1 ? false : true)
                    );
                }
            });
        }
        let { filterName, filterStatus } = this.state;
        var elementTasks = tasks.map((task, index) => {
            return (
                <TaskItem
                    key={task.id}
                    index={index + 1}
                    task={task}
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
                        <th>
                            <Button
                                color="info"
                                className="reset fw-500"
                                onClick={() => {
                                    this.onClick(filterTable);
                                }}
                            >
                                RESET
                            </Button>
                        </th>
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
        filterTable: state.filterTable,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onFilterTable: (filter) => {
            dispatch(actions.filterTask(filter));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
