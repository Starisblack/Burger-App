import { useEffect } from "react";
import Button from "../../../components/UI/Button/Button"
import "./ContactData.css"
import Spinner from "../../../components/UI/Spinner/Spinner"
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initOrder, orderEnd } from "../../../store/actions/order";
import ThankYou from "../../../components/ThankYou/ThankYou";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { TextField, FormHelperText, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { format } from 'date-fns';



const ContactData = (props) => {


 const orderFormSchema = yup.object().shape({
    name: yup.string().required("Your name is required!"),
    email: yup.string().email("Enter a valid email address!").required("Enter your email address"),
    street: yup.string().required("Enter your address"),
    postalCode: yup.string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(5, 'Must be exactly 5 digits')
    .max(5, 'Must be exactly 5 digits'),
    deliveryMethod: yup.string().required("Select delivery method")
 })

    const navigate = useNavigate();

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(orderFormSchema)
    });


      useEffect(() => {
        return () => {
             props.endOrder() ;
         };
       // eslint-disable-next-line react-hooks/exhaustive-deps
       }, []);


    const cancelHandler = ()=>{
         navigate(-1);
    }

    const orderPlacedHandler = () => {
        props.endOrder();
        navigate("/");
      
    }



    const orderHandler = async (data) => {



              // add filter method to remove ingredient that wasnt selected 

        const selectedIngredient =  Object.keys(props.ings).filter( igKey => {
            return props.ings[igKey] > 0
        }).map( igKey => {
            return  { [igKey] : props.ings[igKey] }
         })

        const updatedList = Object.assign({}, ...selectedIngredient )
        const date = new Date();
        console.log(date)
        const formattedString = format(date, 'MMM d, yyyy.');

                const order = {
                    ingredients: updatedList,
                    price: props.price.toFixed(2),
                    orderData: data,
                    userId: props.userId,
                    created: formattedString,
                    orderStatus: "pending"
                }

                

        await  props.initOrder(order, props.token);
        reset();


    }



    return (
         <>
        {   props.purchased ? <ThankYou  orderId={props.orderId} clicked={orderPlacedHandler} /> :
            
            props.loading ? <div className="contact-spinner"> <Spinner /> </div> : 
            <div className="ContactData">
               {props.error && <p className="error"> Permission denied!! Login please </p>}
                <h4>Enter your Contact Data</h4>
                <form onSubmit={handleSubmit(orderHandler)}>

                <TextField
                    fullWidth
                    {...register("name")}
                    label="name"
                    error={!!errors.name}
                    helperText={errors.name && errors?.name?.message}
                />

                <TextField
                    fullWidth
                    {...register("email")}
                    type="email"
                    label="email"
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email && errors?.email?.message}
                />


            <TextField
                    fullWidth
                    {...register("street")}
                    type="text"
                    label="street"
                    margin="normal"
                    error={!!errors.street}
                    helperText={errors.street && errors?.street?.message}
                />

            <TextField
                    fullWidth
                    {...register("postalCode")}
                    type="text"
                    label="Postal Code"
                    margin="normal"
                    error={!!errors.postalCode}
                    helperText={errors.postalCode && errors?.postalCode?.message}
                />
                
                <FormControl variant="standard"  margin="normal"  fullWidth error={!!errors.deliveryMethod}>
                <InputLabel id="demo-simple-select-standard-label">Delivery Method</InputLabel>
                <Select
                  {...register("deliveryMethod")}
                   labelId="demo-simple-select-standard-label"
                   id="demo-simple-select-standard"
                   label="Age"
                   defaultValue = ""
                >
                    <MenuItem value="Fastest">Fastest</MenuItem>
                    <MenuItem value="Cheapest">Cheapest</MenuItem>
                
                </Select>
                <FormHelperText  >{errors.deliveryMethod && errors?.deliveryMethod?.message}</FormHelperText>
                </FormControl>

               
                     
                     <Button btnType="Success" type="submit">ORDER</Button>
                   
                </form>
                <Button btnType="Danger" clicked={cancelHandler}>CANCEL</Button>
        </div>
        
        }

        </>
    )



}


const mapStateToProps = state => {
   
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        loading: state.order.loading,
        error: state.order.error,
        orderId: state.order.orderId,
        purchased: state.order.purchased,
        token: state.auth.idToken,
        userId: state.auth.userId
    }
}


const mapDispatchToProps = dispatch => {
    return {
        initOrder: (order, token)=> dispatch(initOrder(order, token)),
        endOrder: () => dispatch(orderEnd())
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);