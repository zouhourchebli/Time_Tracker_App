import { TRY_CREATE_TASK , AJOUT_FAIL} from '../actionTypes';
import axios from "axios";
import * as settings from '../../../settings';
import moment from 'moment';

export const ajoutStart = (payload) => {
    return {
        type: TRY_CREATE_TASK ,
        payload
    };
};

export const ajoutFail = error => {
    return {
        type: AJOUT_FAIL,
        error: error
    };
};

export const ajoutTask = (Taskame, stop, heure_debut, heure_fin) => {
    return dispatch => {
        dispatch(ajoutStart());
        axios.post(`${settings.API_SERVER}/api/task/ajout/`, {
            Taskame: Taskame,
            stop: stop,
            heure_debut:  moment(heure_debut).format("HH:MM"),
            heure_fin:  moment(heure_fin).format("HH:MM"),
        })
        .then(res => {
     

        })
        .catch(err => {
            dispatch(ajoutFail(err))
        });
    }
}