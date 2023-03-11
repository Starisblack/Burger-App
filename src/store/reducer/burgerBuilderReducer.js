import * as actionTypes from "../constant/constant";
import { updateObject } from "../utility";


const initialState = ( {

   ingredients: null,
    price: 4.00,
    error: false,
    building: false
}
)

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};


const burgerBuilderReducer = (state=initialState, action ) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return  updateObject(state, { ingredients: {
                ...state.ingredients, [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                price: state.price + INGREDIENT_PRICES[action.ingredientName] ,
                building: true

            } )
            
        case actionTypes.REMOVE_INGREDIENT: 
                return   updateObject(state, { ingredients: {
            ...state.ingredients, [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            },
            price: state.price - INGREDIENT_PRICES[action.ingredientName],
            building: true
        } )

        case actionTypes.SET_INGREDIENT: 
        return   updateObject(state, { ingredients: action.ingredients, price: 4.00,  building: false} )

        case actionTypes.FECTCH_ERROR: 
         return updateObject(state, {error: true})

        default:
         return state;
    }
}

export default burgerBuilderReducer;