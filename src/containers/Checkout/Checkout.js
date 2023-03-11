
import { useNavigate } from "react-router-dom";
import CheckOutSummary from "../../components/Burger/Order/CheckOutSummary/CheckOutSummary";
import { connect } from "react-redux";




const Checkout = (props) => {

    const navigate = useNavigate();

     const checkoutCancelHandler = () => {
                navigate("/")
     }
   
     const checkoutContinueHandler = () => {
            navigate("/contact")
     }

   



    return (
            <CheckOutSummary 
            ingredients={props.ings} 
            checkoutCancelHandler={checkoutCancelHandler}
            checkoutContinueHandler={checkoutContinueHandler}
            />    
       
    )

    
}
const mapStateToProps = state => {
   return {ings: state.burgerBuilder.ingredients, price: state.burgerBuilder.price } 
}


export default connect(mapStateToProps)(Checkout);