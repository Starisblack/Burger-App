import { useEffect, useState} from "react";
import { connect } from "react-redux";
import OrderCard from "../../components/Burger/Order/OrderCard";
import Spinner from "../../components/UI/Spinner/Spinner";
import { initFetchOrders } from "../../store/actions/order";
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog";
import orderActions from "./orderActions/orderActions";


const Orders = (props ) => {
   
    const [open, setOpen] = useState(false);
    const [orderId, setOrderId] = useState(null)
    const {deleteOrder, updateOrder} = orderActions()
    const [isdelete, setIsdelete] = useState(false)
    const [loading, setLoading] = useState(false)


    useEffect(()=> {
        
         props.fetchOrders(props.userId);

            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

      const handleClose = () => {
        setOpen(false);    
      };



const yesHandler = async ()=> {
       setLoading(true)
    if(isdelete){
        try {
            await deleteOrder(orderId)
            setOpen(false)
            setLoading(false)
        
        } catch (error) {
            alert(error)
            setOpen(false)
            setLoading(false)
           
        }
    } else { 
        
    try {
        await updateOrder(orderId)
        setOpen(false)
        setLoading(false)
    
    } catch (error) {
        alert(error)
        setOpen(false)
        setLoading(false)
       
    }
    }


    }

    const handleClick = (id, buttonClick) => {
        
        if(buttonClick === "delete"){
            setIsdelete(true)
        } else {
            setIsdelete(false)
        }
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
                date={order.date}
                price={order.price}
                orderStatus={order.orderStatus}
                update={()=>handleClick(order.id)}
                delete={()=>handleClick(order.id, "delete")}
                 />
            )
          })  
        
        }

    <ConfirmationDialog 
        title={isdelete ? "Delete order from the list" :"Do you want to cancel this order?"}
        desc={isdelete ? null : "Refund will take 2 to 5 business days"}
        open={open}
        handleClose={handleClose}
        yesHandler={yesHandler}
        loading={loading}
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
        fetchOrders: (userId)=> dispatch(initFetchOrders(userId))
    }}


export default connect(mapStateToProps, mapDispatchToProps) (Orders);