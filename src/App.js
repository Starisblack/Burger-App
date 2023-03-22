import React, {  useEffect } from 'react';
// import Checkout from './containers/Checkout/Checkout';
import { lazy, Suspense } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Routes, Route} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { checkAuthState } from './store/actions/Auth';
import { connect } from 'react-redux';
import NotFound from './containers/NotFound/NotFound';
import Spinner from './components/UI/Spinner/Spinner';



const App = (props) => {

    

  const CheckOut = lazy(() => import("./containers/Checkout/Checkout"));
  const ContactData  = lazy(() => import("./containers/Checkout/ContactData/ContactData"))
  const Orders  = lazy(() => import("./containers/Orders/Orders"))
  const Auth  = lazy(() => import("./containers/Auth/Auth"))



    useEffect(()=> {
      props.onTryAutoSignIn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  

     
    let protectedRoutes = null

    if(props.isAuth){
       protectedRoutes = (<>
                   <Route path="/"    exact  element={<BurgerBuilder />}/>
                    <Route path="/checkout" element={ <Suspense fallback={<Spinner top="30vh"/>}><CheckOut/></Suspense>}/>
                    <Route path="/contact"  element={ <Suspense fallback={<Spinner top="30vh"/>}> <ContactData/></Suspense>} />
                    <Route path="/orders"   element={ <Suspense fallback={<Spinner top="30vh"/>}>  <Orders /> </Suspense>} />
                    <Route path="/logout"  exact  element={ <Logout/> } />
                    </>
             )
    }


    return (
      <div>
        <Layout>

        <Routes>
          <Route path="/"    exact  element={<BurgerBuilder />}/>
          <Route path="/login" exact   element={ <Suspense fallback={<Spinner top="30vh"/>} > <Auth/> </Suspense>} />
          <Route path="*" element={<NotFound/>} />
           {protectedRoutes}
        </Routes>

       
      
        </Layout>
      </div>
    );
  }


const mapStateToProps = state => {
  return {
     isAuth: state.auth.idToken
  }
}

const mapDispatchToProps = dispatch => {
  return {
     onTryAutoSignIn: () => dispatch(checkAuthState())
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(App);
