import React, {useEffect, useState} from 'react';
import {
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledButtonDropdown,
    Button,
    ModalFooter,
    ModalHeader,
    ModalBody, Modal, Toast, ToastHeader, ToastBody
} from "reactstrap";
import {synchronise} from "../config/SynchroFirebase";

export function NavBar(){
    const [language, setLanguage] = useState("en");
    const [modal, setModal] = useState(false);
    const [toast, setToast] = useState(false);
    const toggleModal = () => setModal(!modal);
    const toggleToast = () => setToast(!toast);

    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

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
           <Navbar color={"light"}>
               <NavbarBrand href = "/">
                   Visual Acuity (VA) Screening App
               </NavbarBrand>
               <Button onClick={tryConnection}>Synchronise</Button>
               <UncontrolledButtonDropdown>
                   <DropdownToggle caret>Language</DropdownToggle>
                   <DropdownMenu>
                       <DropdownItem onClick={()=>setLanguage("fr")}>Français</DropdownItem>
                       <DropdownItem onClick={()=>setLanguage("en")}>English</DropdownItem>
                       <DropdownItem onClick={()=>setLanguage("po")}>Portugais</DropdownItem>
                   </DropdownMenu>
               </UncontrolledButtonDropdown>

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