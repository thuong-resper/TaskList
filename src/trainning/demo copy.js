import { createStore } from "redux";

const initialState = {
    status: false,
    sort: {
        by: "name",
        value: 1,
    },
};

const reducer = (state = initialState, action) => {
    let { status } = state; //status = state.status
    let sort = { ...state.sort }; //spread operator
    switch (action.type) {
        case "TOGGLE_STATUS":
            return {
                status: !status,
                sort,
            };
        case "sortAction":
            return {
                status,
                sort: {
                    by: action.sort.by,
                    value: action.sort.value,
                },
            };
        default:
            return state;
    }
};

const store = createStore(reducer);
console.log(store.getState());

let toggleStatus = {
    type: "TOGGLE_STATUS",
};
store.dispatch(toggleStatus);
console.log(store.getState());

let sortAction = {
    type: "SORT",
    sort: {
        by: "name",
        value: 1,
    },
};
store.dispatch(sortAction);
console.log(store.getState());
