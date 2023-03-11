import React, {  useEffect, useState } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { addIngredient, initIngredient, removeIngredient, fetchError} from '../../store/actions/burgerBuilder';
import Spinner from '../../components/UI/Spinner/Spinner';
import { authRedirect } from '../../store/actions/Auth';







const BurgerBuilder = (props) => {

    
    const navigate = useNavigate();

    const [purchasing, setPurchasing] = useState(false);

   useEffect(()=>{
     
     props.initIngredients();
  
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])


 

    const updatePurchaseState =  () => {

        const Nsum = Object.values(props.ings).reduce((sum, el) => {
            return sum + el
        }, 0)

       return Nsum  >= 1
    }



   const  purchaseHandler = () => {
      if(props.isAuth){
        setPurchasing(true);
      } else {
        props.setRedirect("/checkout")
        navigate("/login")
      }
       
    }

    const purchaseCancelHandler = () => {  
       
        setPurchasing(false);
    

    }

    const purchaseContinueHandler = () => {

        navigate("/checkout");
    
    }

        const disabledInfo = {
            ...props.ings
        };

        

        for ( let key in disabledInfo ) {
            
            disabledInfo[key] = disabledInfo[key] <= 0
        }

    
    let orderSummary = null;
    let burger = props.error ? <div style={{
            display: "flex",
           height: "100vh",
           alignItems: "center",
           justifyContent: "center"
      }}><p>Can't load Ingredients <br/> check your connection </p></div> : <Spinner top="40vh" />;


//    checking if the ingredients as been fetched

        if(props.ings) {

         burger =(
                <><Burger ingredients={props.ings} />
                <BuildControls
                    ingredientAdded={props.addIngredient}
                    ingredientRemoved={props.removeIngredient}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState()}
                    price={props.price} 
                    ordered={purchaseHandler}
                    />
                </>
            )

         orderSummary = <OrderSummary
                        ingredients={props.ings}
                        totalAmt={props.price}
                        purchaseCancelled={purchaseCancelHandler}
                        purchaseContinued={purchaseContinueHandler} 
                        />;
         }
       

        
        return (
            <> 
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                     {orderSummary}
                </Modal>

                {burger}
               
                   
            </>
        );
    
};

const mapStateToProps = state => {

    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        error: state.burgerBuilder.error,
        isAuth: state.auth.idToken !== null,
        building: state.burgerBuilder.building
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        addIngredient: (ingName) => dispatch(addIngredient(ingName)),
        removeIngredient: (ingName) => dispatch(removeIngredient(ingName)),
        initIngredients: ()=> dispatch(initIngredient()),
        fetchError: () => dispatch(fetchError()),
        setRedirect: (path) => dispatch(authRedirect(path))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);