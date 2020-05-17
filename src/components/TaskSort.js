import React from "react";

import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";

class TaskSort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: {
                by: "",
                value: 1,
            },
            dropdownOpen: false,
        };
    }

    onClick = async (sortBy, sortValue) => {
        //setState is asynchronous so use asyn/await to solve it
        await this.setState({
            //use await word mean: program will stop this function(contain await) and not do next function. when this function done do next function
            sort: {
                by: sortBy,
                value: sortValue,
            },
        });
        this.props.onSort(this.state.sort);
    };

    toggle = () => {
        this.setState((prevState) => ({
            dropdownOpen: !prevState.dropdownOpen,
        }));
    };

    render() {
        let { sort } = this.state;
        return (
            <div>
                <ButtonDropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggle}
                >
                    <DropdownToggle
                        caret
                        className="mgr-5 fw-500"
                        color="danger"
                        type="button"
                    >
                        SORT
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            className="flaticon-sort-down"
                            onClick={() => {
                                this.onClick("name", 1); //insert data
                            }}
                        >
                            <span
                                className={
                                    sort.by === "name" && sort.value === 1
                                        ? "tick mgl-10"
                                        : "mgl-10"
                                }
                            >
                                A - Z
                            </span>
                        </DropdownItem>
                        <DropdownItem
                            className="flaticon-sort-ascending"
                            onClick={() => {
                                this.onClick("name", -1); //insert data
                            }}
                        >
                            <span
                                className={
                                    sort.by === "name" && sort.value === -1
                                        ? "tick mgl-10"
                                        : "mgl-10"
                                }
                            >
                                Z - A
                            </span>
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem
                            onClick={() => {
                                this.onClick("status", 1); //insert data
                            }}
                        >
                            <span
                                className={
                                    sort.by === "status" && sort.value === 1
                                        ? "tick"
                                        : ""
                                }
                            >
                                Finished
                            </span>
                        </DropdownItem>
                        <DropdownItem
                            onClick={() => {
                                this.onClick("status", -1); //insert data
                            }}
                        >
                            <span
                                className={
                                    sort.by === "status" && sort.value === -1
                                        ? "tick"
                                        : ""
                                }
                            >
                                Unfinished
                            </span>
                        </DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </div>
        );
    }
}

export default TaskSort;
