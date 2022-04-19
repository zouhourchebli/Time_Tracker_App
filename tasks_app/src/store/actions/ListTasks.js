import axios from 'axios';

import {GET_LIST_TASKS} from '../actionTypes.js';
import * as settings from '../../../settings';

// GET TASKS
export const getTasks= () => dispatch => {
   
        axios.get(`${settings.API_SERVER}/api/task/list/`)
        .then(res => {
            dispatch({
                type: GET_LIST_TASKS,
                payload: res.data
            });
            
        })
        .catch(err => console.log(err));
};