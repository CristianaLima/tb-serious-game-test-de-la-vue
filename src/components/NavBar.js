import React, {useEffect, useState} from 'react';
import {
    Nav, Navbar, NavbarBrand, NavItem, NavLink, DropdownMenu,
    DropdownItem, ButtonDropdown, DropdownToggle, UncontrolledButtonDropdown, Button
} from "reactstrap";
import {synchronise} from "../config/synchroFirebase";

export function NavBar(){
    const [language, setLanguage] = useState("en");

    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);
   return (
       <div>
           <Navbar color={"light"}>
               <NavbarBrand href = "/">
                   Esco Visual Acuity (VA) Screening App
               </NavbarBrand>
               <Button onClick={()=>synchronise()}>Synchronise</Button>
               <UncontrolledButtonDropdown>
                   <DropdownToggle caret>Language</DropdownToggle>
                   <DropdownMenu>
                       <DropdownItem onClick={()=>setLanguage("fr")}>Français</DropdownItem>
                       <DropdownItem onClick={()=>setLanguage("en")}>English</DropdownItem>
                       <DropdownItem onClick={()=>setLanguage("po")}>Portugais</DropdownItem>
                   </DropdownMenu>
               </UncontrolledButtonDropdown>

               {/*<Nav navbar>*/}
               {/*    <NavItem>*/}
               {/*        <NavLink href = "acuityTestScreen">*/}
               {/*            Test Screen*/}
               {/*        </NavLink>*/}
               {/*        <NavLink href = "acuityTestController" target={"_blank"}>*/}
               {/*            Controller Screen*/}
               {/*        </NavLink>*/}
               {/*    </NavItem>*/}
               {/*</Nav>*/}
           </Navbar>

       </div>
   )
}