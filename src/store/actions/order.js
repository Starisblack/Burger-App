import * as actionTypes from "../constant/constant"
import { collection, addDoc, orderBy, onSnapshot, query, where } from "firebase/firestore"; 
import { db } from "../../firebase-config";


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


export const sendOrder = (id) => {
    return {
        type: actionTypes.SEND_ORDER,
        orderId: id
    }
}

export const sendFail = (err) => {
    return {
        type: actionTypes.SEND_FAIL,
        errorMsg: err
    }
}

export const initOrder = (order, token) => {
    return  dispatch => {

        dispatch(orderStart());

          addDoc(collection(db, "orders"), order).then(res => {
                dispatch(sendOrder(res.id))
            })
            .catch(e => {
                console.error("Error adding document: ", e);
                dispatch(sendFail(e.code));
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

export const initFetchOrders = (userId)=> {
    return dispatch => {
          
       dispatch (fetchOrdersStart());
       const q = query(collection(db, 'orders'), orderBy('created', 'desc'), where("userId", "==", userId))


         try {

            onSnapshot(q, (querySnapshot) => {
   
                const orderList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                    ...doc.data()
                }))

                dispatch(fetchOrdersSuccess(orderList))
              
           })
            
         } catch (error) {
             alert(error.message)
             dispatch(fetchOrdersFail(error))
         }

    }
}