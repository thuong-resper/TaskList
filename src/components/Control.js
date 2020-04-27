import React from "react";
import Search from "./Search";
import Sort from "./Sort";

class Control extends React.Component {
    render() {
        return (
            <div className="w-100 d-flex mgb-20">
                {/* Search */}
                <Search />
                {/*Sort */}
                <Sort />
            </div>
        );
    }
}

export default Control;

// fix sort and
