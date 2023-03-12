import "./OrderCard.css"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Burger from '../Burger';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function OrderCard(props) {

    let orderStatusBackground = ["orderStatus"]

    switch (props.orderStatus) {

        case "pending":  orderStatusBackground.push("pending")
          break;
        case "shipped":  orderStatusBackground.push("shipped")
          break;
        case "cancelled": orderStatusBackground.push("cancelled")
          break;
        case "completed": orderStatusBackground.push("completed")
         break
        default: 
        break;
    }


    let showCancelButton = null;

    if(props.orderStatus !== "completed" && props.orderStatus !== "cancelled") {
        showCancelButton = <Button variant="contained" color="error" onClick={props.update}>Cancel Order</Button>
    }




  return (
    <div className="orderCard">
    <Card sx={{display: "flex"}}>
      <Box>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <p>{props.date}</p>
          <Typography component="div" variant="h6">
           Price: <strong>${props.price}</strong>
          </Typography>
           <p>  Order Status: <strong className={orderStatusBackground.join(" ")}>{props.orderStatus}</strong> </p>
          {showCancelButton}

      {props.orderStatus === "cancelled" && <Button onClick={props.delete} variant="outlined" color="error" startIcon={<DeleteForeverIcon />}>
        Delete
      </Button> }
        </CardContent>
      </Box>
       
      <div className="burger-box"> <Burger ingredients={props.ings}  />  </div>
   
    </Card>
    </div>
  );
}