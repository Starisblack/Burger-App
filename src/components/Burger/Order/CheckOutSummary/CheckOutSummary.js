import Burger from "../../Burger";
import Button from "../../../UI/Button/Button";
import "./CheckOutSummary.css"



const CheckOutSummary = (props) => {


return (
     <div>
    <div  className="CheckoutSummary">
        <h1>We hope it tastes well </h1>
        <div style={{width: "100%", margin: "auto"}}>
            
            <Burger ingredients={props.ingredients}/>
        </div>

        <Button btnType="Danger" clicked={props.checkoutCancelHandler}> CANCEL </Button>
        <Button btnType="Success" clicked={props.checkoutContinueHandler}> CONTINUE </Button>
    </div>
    </div>
    
)
}

export default CheckOutSummary;