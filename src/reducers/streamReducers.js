import _ from 'lodash';
import {
    FETCH_STREAM,
    FETCH_STREAMS,
    EDIT_STREAM,  
    DELETE_STREAM,
    CREATE_STREAM
} from '../actions/types';


export default (state={}, action) => {
    switch (action.type) {
        case CREATE_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case EDIT_STREAM: return {...state, [action.payload.id]: action.payload};
        case FETCH_STREAM: return {...state, [action.payload.id]: action.payload};
        case DELETE_STREAM: return _.omit(state,action.payload);
        case FETCH_STREAMS: return {...state, ..._.mapKeys(action.payload,'id')}
        default: 
            return state;
    }
}

// export default (state={}, action) => {
//     if (action.type === FETCH_STREAM || action.type === CREATE_STREAM || action.type === EDIT_STREAM){
//         return {...state, [action.payload.id]: action.payload};
//     } else if (action.type === DELETE_STREAM) {
//         return _.omit(state,action.payload)
//     } else if (action.type === FETCH_STREAMS) {
//         return {...state, ..._.mapKeys(action.payload,'id')}
//     }

//     return state;
// }