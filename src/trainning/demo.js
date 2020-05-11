// import { createStore } from "redux";

// var initialState = {
//     status: false,
//     sort: {
//         by: "name",
//         value: 1,
//     },
// };
// var myReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case "TOGGLE_STATUS":
//             state.status = !state.status;
//             return state;
//         case "SORT":
//             state.sort = {
//                 by: action.sort.by,
//                 value: action.sort.value,
//             };
//             return state;
//         default:
//             return state;
//     }
// };

// const store = createStore(myReducer);
// console.log(store.getState());
// var action = { type: "TOGGLE_STATUS" };
// store.dispatch(action);
// console.log(store.getState());

// let sortAction = {
//     type: "SORT",
//     sort: {
//         by: "name",
//         value: -1,
//     },
// };
// store.dispatch(sortAction);
// console.log(store.getState());

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
    // let sort = { ...state.sort }; //spread operator
    switch (action.type) {
        case "TOGGLE_STATUS":
            return {
                ...state,
                status: !status,
            };
        case "SORT":
            return {
                ...state,
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
        value: -1,
    },
};
store.dispatch(sortAction);
console.log(store.getState());
