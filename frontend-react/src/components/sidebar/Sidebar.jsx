import { useState } from "react";
import { Container } from "react-bootstrap";
import { List } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";
import routes from "../../util/routes";
import SidebarMenu from "./SidebarMenu";

function Sidebar({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="d-flex">
            <nav className="sidebar bg-dark text-light" style={{ width: isOpen ? "250px" : "60px" }}>
                <div className="nav-header p-2 d-flex align-items-center border-bottom">
                    {isOpen && <div className="navbar-brand">Recommender POS</div>}
                    <List size={30} color="white" className={isOpen ? "ms-auto" : "m-1"} role="button" onClick={toggle} />
                </div>

                <div>
                    {
                        routes.map(route => {
                            if (route.subroutes) {
                                return <SidebarMenu route={route} sidebarOpen={isOpen} />
                            }

                            return <NavLink
                                to={route.path}
                                key={route.path}
                                style={{ textDecoration: "none" }}
                            >
                                <div className="sidebar-item d-flex align-items-center p-3 text-light">
                                    <div>{route.icon}</div>
                                    <div className="ps-3">{route.name}</div>
                                </div>
                            </NavLink>
                        })
                    }
                </div>
            </nav>

            <main><Container>{children}</Container></main>
        </div>
    );
}

export default Sidebar;