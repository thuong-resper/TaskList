import React from "react";

import { connect } from "react-redux";
import * as actions from "../actions/index";

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
        this.props.onSort({
            by: sortBy,
            value: sortValue,
        });
    };

    toggle = () => {
        this.setState((prevState) => ({
            dropdownOpen: !prevState.dropdownOpen,
        }));
    };

    render() {
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
                                    this.props.sort.by === "name" &&
                                    this.props.sort.value === 1
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
                                    this.props.sort.by === "name" &&
                                    this.props.sort.value === -1
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
                                    this.props.sort.by === "status" &&
                                    this.props.sort.value === 1
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
                                    this.props.sort.by === "status" &&
                                    this.props.sort.value === -1
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

const mapStateToProps = (state) => {
    return {
        sort: state.sort,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSort: (sort) => {
            dispatch(actions.sortTask(sort));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskSort);
