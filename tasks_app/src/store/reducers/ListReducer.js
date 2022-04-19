import {GET_LIST_TASKS} from "../../actions/actionTypes.js";

const initialState = {
    tasks : []
}

export default function(state = initialState, action) {
    switch(action.type){
        case GET_LIST_TASKS:
            return {
                ...state,
                tasks: action.payload
            };
        default:
            return state;
    }
}