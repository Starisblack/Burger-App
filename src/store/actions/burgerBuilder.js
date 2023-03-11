import * as actionTypes from "../constant/constant"
import Axios from "../../axios-orders"



export const addIngredient = (ings) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ings
    }
}

export const removeIngredient = (ings) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ings
    }
}

export const setIngredients = (ingredients) => {
       return {
          type: actionTypes.SET_INGREDIENT,
          ingredients: ingredients
       }
}

export const fetchError = () => {
     return {
        type: actionTypes.FECTCH_ERROR
     }
}


export const initIngredient = () => {
    return dispatch => {

        Axios.get("/ingredients.json").then(res => {
            return dispatch(setIngredients(res.data))
        })
        .catch(err => {
           return dispatch(fetchError());
        })
    }

}