import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function SidebarMenu({ route, sidebarOpen }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <div
                className="sidebar-item d-flex align-items-center p-3 text-light"
                role="button"
                onClick={toggle}
            >
                <div>{route.icon}</div>
                <div className="ps-3">{route.name}</div>
            </div>

            <Collapse in={isOpen}>
                <div>
                    {
                        route.subroutes.map(subroute => (
                            <NavLink
                                to={subroute.path}
                                key={subroute.path}
                                style={{ textDecoration: "none" }}
                            >
                                <div className={`sidebar-item d-flex align-items-center py-2 ${sidebarOpen ? "px-5" : "px-3"} text-light border-bottom`}>
                                    <div>{subroute.icon}</div>
                                    <div className="ms-3">{subroute.name}</div>
                                </div>
                            </NavLink>
                        ))
                    }
                </div>
            </Collapse>
        </>
    );
}

export default SidebarMenu;