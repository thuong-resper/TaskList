import * as types from "../constants/ActionTypes";

// create unique id by native way
const id = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};
const generateId = () => {
    return id() + id() + "-" + id() + "-" + id() + "-" + id();
};
var data = JSON.parse(localStorage.getItem("tasks")); //get data from localStorage

var findIndex = (tasks, id) => {
    let result = -1;
    tasks.forEach((task, index) => {
        if (task.id === id) {
            result = index;
        }
    });
    return result;
};
const initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.ADD_TASK:
            let newTask = {
                id: generateId(),
                name: action.task.name,
                status: action.task.status === "true" ? true : false,
            };
            state.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS_TASK:
            // Update Status
            let id = action.id;
            let index = findIndex(state, id);
            state[index] = {
                ...state[index],
                status: !state[index].status,
            };
            localStorage.setItem("tasks", JSON.stringify(state));
            return [...state];
        default:
            return state;
    }
};

export default myReducer;
