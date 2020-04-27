import React from "react";

class Search extends React.Component {
    render() {
        return (
            <div className="input-group mw-500 mgr-10">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Recipient's username"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                />
                <div className="input-group-append">
                    <button type="button" className="btn btn-info">
                        <span className="flaticon-search flaticon" />
                        <span>Search</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default Search;
