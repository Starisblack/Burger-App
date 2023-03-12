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
                    <Route path="/checkout" element={ <Suspense fallback="loading"><CheckOut/></Suspense>}/>
                    <Route path="/contact"  element={ <Suspense fallback="loading"> <ContactData/></Suspense>} />
                    <Route path="/orders"   element={ <Suspense fallback="loading">  <Orders /> </Suspense>} />
                    <Route path="/logout"  exact  element={ <Logout/> } />
                    </>
             )
    }


    return (
      <div>
        <Layout>

        <Routes>
          <Route path="/"    exact  element={<BurgerBuilder />}/>
          <Route path="/login" exact   element={ <Suspense fallback="loading"> <Auth/> </Suspense>} />
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
