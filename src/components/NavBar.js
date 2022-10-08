import React from 'react';
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";

export function NavBar(){
   return (
       <div>
           <Navbar color={"light"}>
               <NavbarBrand href = "/">
                   VAST
               </NavbarBrand>
               <Nav navbar>
                   <NavItem>
                       <NavLink href = "acuityTestScreen">
                           Test Screen
                       </NavLink>
                       <NavLink href = "acuityTestController" target={"_blank"}>
                           Controller Screen
                       </NavLink>
                   </NavItem>
               </Nav>
           </Navbar>

       </div>
   )
}