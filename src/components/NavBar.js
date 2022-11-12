import React, {useEffect, useState} from 'react';
import {
    Navbar,
    NavbarBrand,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Button,
    ModalFooter,
    ModalHeader,
    ModalBody,
    Modal,
    Toast,
    ToastHeader,
    ToastBody,
    Nav,
    UncontrolledDropdown,
    Collapse,
    NavbarToggler,
    NavLink,
    NavItem, NavbarText
} from "reactstrap";
import {synchronise} from "../config/SynchroFirebase";
import moment from "moment";


export function NavBar(){
    const [language, setLanguage] = useState("en");
    const [modal, setModal] = useState(false);
    const [toast, setToast] = useState(false);
    const toggleModal = () => setModal(!modal);
    const toggleToast = () => setToast(!toast);
    const [collapse, setIsOpen] = useState(false);

    const toggleNavbar = () => setIsOpen(!collapse);

    useEffect(() => {
        if (toast) {
            setTimeout(() => toggleToast(), 3000)
        }
    }, [toast])

    function tryConnection(){
        let condition = navigator.onLine ? 'online' : 'offline';
        if (condition === 'online') {
            fetch('https://www.google.com/', { // Check for internet connectivity
                mode: 'no-cors',
            })
                .then(() => {
                    synchronise().then(() => toggleToast())
                }).catch(() => {
                toggleModal()
            }  )

        }else{
            toggleModal()
        }
    }


   return (
       <div>
           <Navbar color="light" light  expand="md">
               <NavbarBrand href = "/">
                   Visual Acuity (VA) Screening App
               </NavbarBrand>
               <NavbarToggler onClick={toggleNavbar} />
               <Collapse isOpen={!collapse} navbar className="float-end text-end">
                   <Nav
                       className="me-auto px-3"
                       navbar
                   >
                       <NavItem>
                           <NavLink href = "acuityTestScreen">
                               Test Screen
                           </NavLink>
                       </NavItem>
                       <NavItem>
                           <NavLink href = "acuityTestController" target={"_blank"}>
                               Controller Screen
                           </NavLink>
                       </NavItem>
                       <NavbarText className="text-danger"> 🡠 DONT USE SYNCHRO IS TEST CREATED WITH THIS BUTTONS</NavbarText>
                   </Nav>
                   <Nav className="float-end">
                       <UncontrolledDropdown nav inNavbar>
                           <DropdownToggle nav caret>
                               Language
                           </DropdownToggle>
                           <DropdownMenu className="end-0">
                               <DropdownItem onClick={()=>{
                                   setLanguage("fr");
                                   moment().locale('fr');}
                                   }>Français</DropdownItem>
                               <DropdownItem onClick={()=>{
                                   setLanguage("en");
                                   moment().locale('en');}
                               }>English</DropdownItem>
                               <DropdownItem onClick={()=>{
                                   setLanguage("po");
                                   moment().locale('po');}
                               }>Portugais</DropdownItem>
                           </DropdownMenu>
                       </UncontrolledDropdown>
                       <Button onClick={tryConnection}>Synchronise</Button>
                   </Nav>
               </Collapse>
           </Navbar>
           <Modal isOpen={modal} toggle={toggleModal}>
               <ModalHeader toggle={toggleModal}>
                   Error
               </ModalHeader>
               <ModalBody>No internet connection. Synchronisation impossible</ModalBody>
               <ModalFooter>
                   <Button color="primary" onClick={toggleModal}>
                       Close
                   </Button>
               </ModalFooter>
           </Modal>
           <div className="position-fixed bottom-0 end-0 p-3">
           <Toast isOpen={toast} className="bottom-end">
               <ToastHeader toggle={toggleToast}>
                   Success
               </ToastHeader>
               <ToastBody>
                   Synchronisation success
               </ToastBody>
           </Toast>
           </div>
       </div>
   )
}