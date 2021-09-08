import {Link} from "react-router-dom";
import classes from "./MainNavigation.module.css";
import {Container, Nav, Navbar, NavbarBrand, NavDropdown} from "react-bootstrap";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";

function MainNavigation(){

    return  (
        <Navbar bg="light" expand="lg">
            <Container>
                <Nav.Link href="/">React-Bootstrap</Nav.Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
                // <nav className="navbar navbar-expand-sm nav bg-dark">
                //     <Link to="/" className="navbar-brand">Linked In</Link>
                //     <ul className="navbar navbar-nav">
                //         <li className="nav-item">
                //             <Link to='/'>Home</Link>
                //         </li>
                //         <li className="nav-item">
                //             <Link to='/network'>Network</Link>
                //         </li>
                //         <li className="nav-item">
                //             <Link to='/jobs'>Jobs</Link>
                //         </li>
                //         <li className="nav-item">
                //             <Link to='/messaging'>Messaging</Link>
                //         </li>
                //         <li className="nav-item">
                //             <Link to='/notifications'>Notifications</Link>
                //         </li>
                //         <li className="nav-item">
                //             <Link to='/profile'>Profile</Link>
                //         </li>
                //         <li className="nav-item">
                //             <Link to='/settings'>Settings</Link>
                //         </li>
                //     </ul>
                // </nav>
        //         <header>
        //             <div className="px-3 py-2 bg-dark text-white">
        //                 <div className="container">
        //                     <div
        //                         className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        //                         <Link to='/'>Linked In<Link/>
        //
        //                         <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
        //                             <li>
        //                                 <a href="#" className="nav-link text-secondary">
        //                                     <svg className="bi d-block mx-auto mb-1" width="24" height="24">
        //                                         ela
        //                                     </svg>
        //                                     Home
        //                                 </a>
        //                             </li>
        //                             <li>
        //                                 <a href="#" className="nav-link text-white">
        //                                     <svg className="bi d-block mx-auto mb-1" width="24" height="24">
        //                                         ela
        //                                     </svg>
        //                                     Dashboard
        //                                 </a>
        //                             </li>
        //                             <li>
        //                                 <a href="#" className="nav-link text-white">
        //                                     <svg className="bi d-block mx-auto mb-1" width="24" height="24">
        //                                         ela
        //                                     </svg>
        //                                     Orders
        //                                 </a>
        //                             </li>
        //                             <li>
        //                                 <a href="#" className="nav-link text-white">
        //                                     <svg className="bi d-block mx-auto mb-1" width="24" height="24">
        //                                         ela
        //                                     </svg>
        //                                     Products
        //                                 </a>
        //                             </li>
        //                             <li>
        //                                 <a href="#" className="nav-link text-white">
        //                                     <svg className="bi d-block mx-auto mb-1" width="24" height="24">
        //                                         ela
        //                                     </svg>
        //                                     Customers
        //                                 </a>
        //                             </li>
        //                         </ul>
        //                     </div>
        //                 </div>
        //             </div>
        //         </header>
    );
}

export default MainNavigation;