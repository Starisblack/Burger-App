import * as actionTypes from "../constant/constant"
import Axios from "../../axios-orders"


export const orderStart = ()=> {
    return {
        type: actionTypes.ORDER_START
    }
}

export const orderEnd = () => {
    return {
        type: actionTypes.ORDER_END
    }
}


export const sendOrder = (orderId, order) => {
    return {
        type: actionTypes.SEND_ORDER,
        orderData: order,
        orderId: orderId 
    }
}

export const sendFail = (err) => {
    return {
        type: actionTypes.SEND_FAIL,
        errorMsg: err
    }
}

export const initOrder = (order, token) => {
    return dispatch => {

        dispatch(orderStart());
        
        Axios.post("/orders.json?auth=" + token, order)
        .then(response => {
            let orderId = response.data.name;

           dispatch(sendOrder(orderId, order))
            
        })
        .catch(err => {
            console.log(err.code)
            dispatch(sendFail(err.code));
        })
    }
}



export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FECTCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orders) => {
       return {
        type: actionTypes.FECTCH_ORDERS_SUCCESS,
        orders: orders
       }
}

export const fetchOrdersFail = (err) => {
    return {
        type: actionTypes.FECTCH_ORDERS_FAIL,
    }
}

export const initFetchOrders = (token, userId)=> {
    return dispatch => {
          
       dispatch (fetchOrdersStart());

       const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'

        Axios.get("/orders.json" + queryParams)
        
        .then(res => {

            const fetchOrders =[]

            for (let key in res.data) {

                 fetchOrders.push({...res.data[key], id:key });    
            }

          dispatch(fetchOrdersSuccess(fetchOrders))
            
        })
        .catch(err => {
           dispatch(fetchOrdersFail(err))
        })
    }
}