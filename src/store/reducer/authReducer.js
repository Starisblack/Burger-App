import * as  actionTypes from "../constant/constant"
import { updateObject } from "../utility";

const initialState = {
    userId: null,
    idToken: null,
    error: false,
    loading: false, 
    authRedirect: "/"
}


const authReducer = (state=initialState, action) => {
        switch (action.type) {
            case actionTypes.AUTH_START: return updateObject(state, {loading: true})
            case actionTypes.AUTH_SUCCESS: return updateObject(state, {userId: action.authData.localId, idToken: action.authData.idToken, loading: false})
            case actionTypes.AUTH_FAIL: return updateObject(state, {error: action.error, loading: false})
            case actionTypes.AUTH_LOGOUT: return updateObject(state, {userId: null, idToken: null})
            case actionTypes.AUTH_REDIRECT: return updateObject(state, {authRedirect: action.path})
            case actionTypes.SET_ERROR: return updateObject(state, {error: false})
        
            default:
                return state
        }

}

export default authReducer;