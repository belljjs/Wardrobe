import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    message: null
    // authRedirectPath: '/'
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    console.log("In reducer- authSccess, action.token:",action.token);
    console.log("In reducer- authSccess, action.userId:",action.userId);
    return updateObject( state, { 
        token: action.token,
        userId: action.userId,
        message: action.message,
        loading: false
     } );
};

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false
    });
};

const authSignOut = (state, action) => {
    return updateObject(state, { token: null, userId: null, message: null, error: null });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_SIGNOUT: return authSignOut(state, action);
        default:
            return state;
    }
};


export default reducer;