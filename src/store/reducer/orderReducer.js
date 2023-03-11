import * as actionTypes from "../constant/constant"
import { updateObject } from "../utility"

const initialState = {
    orders: [],
    orderId: null,
    error: false,
    loading: false,
    purchased: false
}

 const orderReducer = (state=initialState, action) => {
     switch (action.type) {

        case actionTypes.ORDER_START: 
        return  updateObject(state, {loading: true})

        case actionTypes.ORDER_END: 
        return  updateObject(state, {purchased: false})
        
        case actionTypes.SEND_ORDER: 
                let newOrder = {
                    ...action.orderData,
                    orderId: action.orderId
                }
         return  updateObject(state, {loading: false, orders: state.orders.concat(newOrder), orderId: action.orderId, purchased: true, error: false})

        case actionTypes.SEND_FAIL: return  updateObject(state, {error: true, loading: false})

        case actionTypes.FECTCH_ORDERS_START: 
                return updateObject(state, {loading: true})  
        case actionTypes.FECTCH_ORDERS_SUCCESS: 
            return updateObject(state, {loading: false, orders: action.orders})
        case actionTypes.FECTCH_ORDERS_FAIL:
             return updateObject(state, {error: true, loading: false})
        default:
        return state
     }
}

export default orderReducer;