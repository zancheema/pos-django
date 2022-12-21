function Logout({ setIsAuthenticated }) {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);

    return <div>Logout</div>;
}

export default Logout;