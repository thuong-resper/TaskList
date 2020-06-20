import React from "react";

import { connect } from "react-redux";
import * as actions from "../actions/index";

import { InputGroup, InputGroupAddon, Input, Button } from "reactstrap";

class TaskSearch extends React.Component {
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
            <InputGroup className="mw-500 mgr-10">
                <Input
                    type="text"
                    placeholder="Search"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    name="keyword"
                    value={keyword}
                    onChange={this.onChange}
                />
                <InputGroupAddon addonType="prepend">
                    <Button type="button" color="info" onClick={this.onSearch}>
                        <span className="flaticon-search flaticon" />
                        <span>Search</span>
                    </Button>
                </InputGroupAddon>
            </InputGroup>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSearch: (keyword) => {
            dispatch(actions.searchTask(keyword));
        },
    };
};

export default connect(null, mapDispatchToProps)(TaskSearch);
