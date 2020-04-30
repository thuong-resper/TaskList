import React from "react";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
        };
    }

    onChange = (e) => {
        const target = e.target,
            name = target.name,
            value = target.value;
        this.setState({
            [name]: value,
        });
    };

    onSearch = () => {
        this.props.onSearch(this.state.keyword);
    };

    render() {
        let { keyword } = this.state;
        return (
            <div className="input-group mw-500 mgr-10">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    name="keyword"
                    value={keyword}
                    onChange={this.onChange}
                />
                <div className="input-group-append">
                    <button
                        type="button"
                        className="btn btn-info"
                        onClick={this.onSearch}
                    >
                        <span className="flaticon-search flaticon" />
                        <span>Search</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default Search;
