import * as actionTypes from "../constant/constant"
import { auth } from "../../firebase-config"
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword 
} from "firebase/auth";


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: data
    }
}

export const logout = () => {
    localStorage.removeItem("expirationDate")
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
   
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authInit = (email, password, isSignUp)=> {
     return dispatch => {
          dispatch(authStart());

          if(isSignUp) {

            createUserWithEmailAndPassword(auth, email, password).then((res)=>{
                const expirationDate = new Date (new Date().getTime() + res._tokenResponse.expiresIn * 1000)
                localStorage.setItem("expirationDate", expirationDate)
                localStorage.setItem("token", res._tokenResponse.idToken)
                localStorage.setItem("userId", res._tokenResponse.localId)
              dispatch(authSuccess(res._tokenResponse))
              dispatch(checkAuthTimeout(res._tokenResponse.expiresIn));
              }).catch((err)=>{
               return  dispatch(authFail(err.message))
            });      

          } else {
              signInWithEmailAndPassword(auth, email, password).then((res)=>{
                const expirationDate = new Date (new Date().getTime() + res._tokenResponse.expiresIn * 1000)
                localStorage.setItem("expirationDate", expirationDate)
                localStorage.setItem("token", res._tokenResponse.idToken)
                localStorage.setItem("userId", res._tokenResponse.localId)
                dispatch(authSuccess(res._tokenResponse))
                dispatch(checkAuthTimeout(res._tokenResponse.expiresIn));
              }).catch((err)=>{
               return  dispatch(authFail(err.message))
            })
          }
         
     }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authRedirect = (path) => {
    return {
        type: actionTypes.AUTH_REDIRECT,
        path: path
    }
}

export const setError = () => {
    return {
        type: actionTypes.SET_ERROR
    }
}


export const checkAuthState = () => {
    return dispatch => {
           const token = localStorage.getItem("token")
         if(!token) {
            dispatch(logout())
         } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
         
            if(expirationDate > new Date()) {
                const authData = {
                    localId: localStorage.getItem("userId"),
                    idToken: localStorage.getItem("token")
                }

                dispatch(authSuccess(authData))
                 const timeLeft = (expirationDate.getTime() - new Date().getTime())/1000;
                dispatch(checkAuthTimeout(timeLeft));
            } else {
                dispatch(logout());
            }
         }
    }
}