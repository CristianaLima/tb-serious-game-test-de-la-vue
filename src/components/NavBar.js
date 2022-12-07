import React, {useEffect, useState} from 'react';
import {
    Button,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    Toast,
    ToastBody,
    ToastHeader,
    UncontrolledDropdown
} from "reactstrap";
import {synchronise} from "../config/SynchroFirebase";
import moment from "moment";

export default NavBar;

/**
 * The navigation bar contains :
 * - a title linked to home page
 * - 3 items to navigate quickly trough application (Home, Results, Game)
 * - a button "Synchronise"
 * - a dropdown menu for Language (not implemented)
 *
 * language : use to select language of the application
 * TODO: language is not implemented and not linked with "moment" for date and time display
 * modalValidation : modal for validate synchronisation
 * modalError : modal for error message (no internet connection)
 * toast : toast at the end of synchronisation
 * collapse : allows to see the menu in a responsive way
 */
function NavBar() {
    const [language, setLanguage] = useState("en");
    const [modalValidation, setModalValidation] = useState(false);
    const toggleModalValidation = () => setModalValidation(!modalValidation);
    const [modalError, setModalError] = useState(false);
    const toggleModalError = () => setModalError(!modalError);
    const [toast, setToast] = useState(false);
    const toggleToast = () => setToast(!toast);
    const [collapse, setIsOpen] = useState(true);

    /**
     * Defines the display time of the toast
     */
    useEffect(() => {
        if (toast) {
            setTimeout(() => toggleToast(), 3000);
        }
    }, [toast])

    /**
     * The function tryConnection allows you to test the internet connection when clicking on the "Synchronise" button.
     * In case of success, it displays the modal for validation. If not, it displays the error mode.
     */
    function tryConnection() {
        let condition = navigator.onLine ? 'online' : 'offline';
        if (condition === 'online') {
            fetch('https://www.google.com/', { // Check for internet connectivity
                mode: 'no-cors',
            })
                .then(() => {
                    toggleModalValidation();
                }).catch(() => {
                toggleModalError();
            })

        } else {
            toggleModalError();
        }
    }

    return (
        <>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">
                    Visual Acuity (VA) Screening App
                </NavbarBrand>
                <NavbarToggler onClick={() => setIsOpen(!collapse)}/>
                <Collapse isOpen={!collapse} navbar className="float-end text-end">
                    <Nav className="me-auto px-3" navbar>
                        <NavItem>
                            <NavLink href="/">
                                Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="viewResults">
                                Results
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="startGame">
                                Game
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Button outline onClick={() => tryConnection()}>Synchronise</Button>
                    <Nav navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Language
                            </DropdownToggle>
                            <DropdownMenu className="end-0">
                                <DropdownItem onClick={() => {
                                    setLanguage("fr");
                                    moment().locale('fr');
                                }
                                }>Français</DropdownItem>
                                <DropdownItem onClick={() => {
                                    setLanguage("en");
                                    moment().locale('en');
                                }
                                }>English</DropdownItem>
                                <DropdownItem onClick={() => {
                                    setLanguage("po");
                                    moment().locale('po');
                                }
                                }>Portugais</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
            {/** Modal and Toast zone */}
            <Modal centered={true} isOpen={modalValidation} toggle={toggleModalValidation}>
                <ModalHeader toggle={toggleModalValidation}>
                    Synchronisation
                </ModalHeader>
                <ModalBody>Synchronise now data ? </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => synchronise().then(() => {
                        toggleModalValidation();
                        toggleToast();
                    })}>
                        Yes
                    </Button>
                    <Button color="danger" onClick={toggleModalValidation}>
                        No
                    </Button>
                </ModalFooter>
            </Modal>
            <Modal centered={true} isOpen={modalError} toggle={toggleModalError}>
                <ModalHeader toggle={toggleModalError}>
                    Error
                </ModalHeader>
                <ModalBody>No internet connection. Synchronisation impossible</ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleModalError}>
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
        </>
    );
}