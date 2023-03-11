import { useEffect} from "react";
import { connect } from "react-redux";
import Order from "../../components/Burger/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import { initFetchOrders } from "../../store/actions/order";




const Orders = (props ) => {



    useEffect(()=> {
        
         props.fetchOrders(props.token, props.userId);
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



  
    

    return (
    
        <>
        { props.loading ? <Spinner  top="30vh"  /> :
            
          props.orders.map( order => {

            return (
                <Order key={order.id}
                    price={order.price}
                    ingredients={order.ingredients}
                />
            )
          })  
        
        }

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