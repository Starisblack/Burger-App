import "./ThankYou.css"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


const ThankYou = (props) => {



   

    return (
        <div className="thank-you-container">
        <div className="card">
            <div className="mb-4 text-center">
              <CheckCircleOutlineIcon  color="success" />
            </div>
            <div className="text-center">
                <h1>YOUR ORDER HAS BEEN RECEIVED</h1>
                <p> Your order # is: <strong> {props.orderId} </strong></p>
                <p>You will receive an order confirmation email with details of your order and a link to track your process.</p>
                <button onClick={props.clicked} className="btn" >Continue</button>
            </div>
        </div>
        </div>
    )

}

export default ThankYou;