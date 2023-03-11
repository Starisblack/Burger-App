import React, { Component } from 'react';
import Checkout from './containers/Checkout/Checkout';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Routes, Route} from 'react-router-dom';
import ContactData from './containers/Checkout/ContactData/ContactData';
import Orders from "./containers/Orders/Orders"
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { checkAuthState } from './store/actions/Auth';
import { connect } from 'react-redux';
import NotFound from './containers/NotFound/NotFound';


class App extends Component {

    componentDidMount(){
      this.props.onTryAutoSignIn()
    }

    
  render () {

     
    let protectedRoutes = null

    if(this.props.isAuth){
       protectedRoutes = (<>
                   <Route path="/"    exact  element={<BurgerBuilder />}/>
                    <Route path="/checkout" element={<Checkout />}/>
                    <Route path="/contact"  element={  <ContactData/>} />
                    <Route path="/orders"   element={ <Orders />} />
                    <Route path="/logout"  exact  element={ <Logout/> } />
                    </>
             )
    }


    return (
      <div>
        <Layout>

        <Routes>
          <Route path="/"    exact  element={<BurgerBuilder />}/>
          <Route path="/login" exact   element={ <Auth/>} />
          <Route path="*" element={<NotFound/>} />
           {protectedRoutes}
        </Routes>

       
      
        </Layout>
      </div>
    );
  }
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
