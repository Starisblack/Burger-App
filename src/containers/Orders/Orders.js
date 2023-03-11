import { useEffect, useState} from "react";
import { connect } from "react-redux";
import OrderCard from "../../components/Burger/Order/OrderCard";
import Spinner from "../../components/UI/Spinner/Spinner";
import { initFetchOrders } from "../../store/actions/order";
import { ref, set } from "firebase/database";
import { db } from "../../firebase-config";
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog";




const Orders = (props ) => {
   
    const [open, setOpen] = useState(false);
    const [orderId, setOrderId] = useState(null)


    useEffect(()=> {
        
         props.fetchOrders(props.token, props.userId);

            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

      const handleClose = () => {
        setOpen(false);    
      };

const yesHandler = ()=> {
          
     const selectedOrder = props.orders.find(order => order.id === orderId)

        set(ref(db, 'orders/' + orderId), {...selectedOrder, orderStatus: "cancelled"
          })
          .then(() => {
           console.log( "Data saved successfully!")
           setOpen(false)
          })
          .catch((error) => {
            alert( " The write failed...")
            setOpen(false)
            window.location.reload(true);
          });
    }

    const handleClick = (id) => {
     setOrderId(id)
     setOpen(prev => !prev)
          
    }

    

    return (
    
        <>
        { props.loading ? <Spinner  top="30vh"  /> :
            
          props.orders.map( order => {
           
            return (
                
                <OrderCard 
                key={order.id} 
                ings={order.ingredients}
                date={order.created}
                price={order.price}
                orderStatus={order.orderStatus}
                clicked={()=>handleClick(order.id)}
                 />
            )
          })  
        
        }

        <ConfirmationDialog 
        title="Do you want to cancel this order?"
        desc="Refund will take 2 to 5 business days"
        open={open}
        handleClose={handleClose}
        yesHandler={yesHandler}
    />

        </>
    
    )
}

const mapStateToProps = state =>{
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId)=> dispatch(initFetchOrders(token, userId))
    }}


export default connect(mapStateToProps, mapDispatchToProps) (Orders);