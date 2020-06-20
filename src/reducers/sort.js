import * as types from "../constants/ActionTypes";

const initialState = {
    by: "name",
    value: 1, //1: ascending, -1: descending
};

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SORT:
            return {
                by: action.sort.by,
                value: action.sort.value,
            };
        default:
            return state;
    }
};

export default myReducer;
