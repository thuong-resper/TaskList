import React from "react";

class TaskSort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: {
                by: "",
                value: 1,
            },
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

    render() {
        let { sort } = this.state;
        return (
            <div className="btn-group">
                <button
                    type="button"
                    className="btn btn-danger dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <span className="mgr-5">Sort</span>
                </button>
                <div className="dropdown-menu">
                    <a
                        className="dropdown-item flaticon-sort-down"
                        href="/#"
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
                    </a>
                    <a
                        className="dropdown-item flaticon-sort-ascending"
                        href="/#"
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
                    </a>
                    <div className="dropdown-divider" />
                    <a
                        className="dropdown-item"
                        href="/#"
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
                    </a>
                    <a
                        className="dropdown-item"
                        href="/#"
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
                    </a>
                </div>
            </div>
        );
    }
}

export default TaskSort;
