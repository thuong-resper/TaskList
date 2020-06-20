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
                <TaskSort />
            </div>
        );
    }
}

export default TaskControl;
