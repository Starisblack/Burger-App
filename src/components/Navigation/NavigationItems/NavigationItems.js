import React from 'react';

import './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
    <ul className="NavigationItems">
        <NavigationItem link="/">Burger Builder</NavigationItem>
       {  props.isAuth && <NavigationItem link="/orders">Orders</NavigationItem>}
       { props.isAuth ? <NavigationItem link="/logout">Logout</NavigationItem>
         : <NavigationItem link="/login">Login</NavigationItem>}
    </ul>
);

export default navigationItems;