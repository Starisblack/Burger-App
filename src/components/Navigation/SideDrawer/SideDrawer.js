import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux-hoc';

const sideDrawer = ( props ) => {
    let attachedClasses = ["SideDrawer", "Close"];
    if (props.open) {
        attachedClasses = ["SideDrawer", "Open"];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div onClick={props.closed} className={attachedClasses.join(' ')} >
               
                    <Logo  
                    height="11%"
                    margin="0 0 32px 0"
                     />
              
                <nav>
                    <NavigationItems  isAuth={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;