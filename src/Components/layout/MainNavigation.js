import {Link} from "react-router-dom";
import classes from "./MainNavigation.module.css";

function MainNavigation(){

    return  (
                <nav className="navbar bg-dark">
                        <div className="navbar-nav">
                            <Link to="/">Linked In</Link>
                        </div>
                    <ul className="nav navbar-nav">
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/network'>Network</Link>
                        </li>
                        <li>
                            <Link to='/jobs'>Jobs</Link>
                        </li>
                        <li>
                            <Link to='/messaging'>Messaging</Link>
                        </li>
                        <li>
                            <Link to='/notifications'>Notifications</Link>
                        </li>
                        <li>
                            <Link to='/profile'>Profile</Link>
                        </li>
                        <li>
                            <Link to='/settings'>Settings</Link>
                        </li>
                    </ul>
                </nav>
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