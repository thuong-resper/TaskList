import React from "react";
import TaskSearch from "./TaskSearch";
import TaskSort from "./TaskSort";

class TaskControl extends React.Component {
    render() {
        return (
            <div className="w-100 d-flex mgb-20">
                {/* Search */}
                <TaskSearch />
                {/*Sort */}
                <TaskSort onSort={this.props.onSort} />
            </div>
        );
    }
}

export default TaskControl;

// fix sort and
