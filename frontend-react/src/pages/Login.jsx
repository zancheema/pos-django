import { Card } from "react-bootstrap";
import LoginForm from "../components/login/LoginForm";

function Login({ setIsAuthenticated }) {
    return (
        <div className="d-flex justify-content-center pt-4">
            <Card>
                <Card.Header>
                    <Card.Title>Login</Card.Title>
                </Card.Header>
                <Card.Body>
                    <LoginForm setIsAuthenticated={setIsAuthenticated} />
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;