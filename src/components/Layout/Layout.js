import "./Layout.css"
import Aux from '../../hoc/Aux-hoc';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { useState } from 'react';
import { connect } from "react-redux";


const Layout = (props) => {
      
    const [showSideDrawer, setShowSideDrawer] = useState(false)


   const sideDrawerClosedHandler = () => {

        setShowSideDrawer(false)
       
    }

   const sideDrawerToggleHandler = () => {
        setShowSideDrawer(prevValue => !prevValue)
    }
     
        return (
            <Aux>
                <Toolbar  
                isAuth={props.isAuthenticated} 
                drawerToggleClicked={sideDrawerToggleHandler} />
                <SideDrawer
                    isAuth={props.isAuthenticated}
                    open={showSideDrawer}
                    closed={sideDrawerClosedHandler} />
                <main className="Content">
                    {props.children}
                </main>
            </Aux>
        )
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.idToken !== null
    }
}

export default connect(mapStateToProps)(Layout);

