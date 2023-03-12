import "./Auth.css"
import { useForm } from "react-hook-form"
import Button from "../../components/UI/Button/Button";
import { TextField} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { authInit, authRedirect, setError } from "../../store/actions/Auth";
import Spinner from "../../components/UI/Spinner/Spinner";
import Redirect from "../../components/Redirect/Redirect";



const Auth = (props) => {


 const [isSignUp, setisSignUp] = useState(false)

    const formSchema  = yup.object().shape({
        email: yup.string().email().required("enter your email address"),
        password: yup.string().min(6).required("passwors is require")
    }) 

        const {register, handleSubmit, reset, formState: {errors} } = useForm({
            resolver: yupResolver(formSchema)
        })



useEffect(()=> {

    if(!props.burgerBuilding &&  authRedirect !== "/"){
     props.setAuthRedirect();
    }
       
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [])

 const submitHandler =  async (data) => {
    await props.authInit(data.email, data.password, isSignUp)
    reset();
 }


 let authRedirect = null;

 if (props.isAuthenticated){
    authRedirect = <Redirect to={props.authRedirect} />
 }

    
   let fetchError = null;

  if(props.error === "Firebase: Error (auth/email-already-in-use)."){
       fetchError = "Email already in use"
    } else if (props.error === "Firebase: Error (auth/wrong-password)."){
        fetchError = "Incorrect Email/Password"
    } else if (props.error === "Firebase: Error (auth/user-not-found)."){
        fetchError="User not found"
    }

 const onChangeHandler = () => {
    setisSignUp(prev => !prev)
    props.setError();
 }

  
        

   return (
       <div className="auth-container">
      {props.loading ? <Spinner top="40vh" /> : 
      
      <form onSubmit={handleSubmit(submitHandler)}>
         {authRedirect}
         <p className="error" >{fetchError}</p>
         <h1>{isSignUp ? "Create an Account" : "Sign In"}</h1>
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
                    {...register("password")}
                    type="password"
                    label="password"
                    margin="normal"
                    autoComplete="true"
                    error={!!errors.password}
                    helperText={errors.password && errors?.password?.message}
                />
         <Button 
                btnType={isSignUp ? "primary" : "Success"} 
                type="submit"> {isSignUp ? "SIGN UP" : "SIGN IN" } 
        </Button>

         <p onClick={onChangeHandler} 
            className="mt-5 mb-3 text-muted">
            {isSignUp ? "Have an account? " :" Not yet registered "} 
            <span className="btn">
            {isSignUp ? "Sign In" : "Sign Up" }</span>
            
        </p>
       </form>}
       </div>

   )

}


 const mapStateToProps = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        isAuthenticated: state.auth.idToken !== null,
        authRedirect: state.auth.authRedirect,
        burgerBuilding: state.burgerBuilder.building
    }
 }

  const mapDispatchToProps = dispatch => {
    return {
        authInit: (email, password, isSignUp) => dispatch(authInit(email, password, isSignUp)),
        setAuthRedirect: () => dispatch(authRedirect("/")),
        setError: () => dispatch(setError())
       
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)