import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "../../util/axios";

function LoginForm({ setIsAuthenticated }) {
    const [payload, setPayload] = useState({});

    function handleInputChange(event) {
        const { name, value } = event.target;
        setPayload(prevState => ({ ...prevState, [name]: value }))
    }

    async function onLogin() {
        console.log(`onLogin: ${JSON.stringify(payload)}`)
        if (!payload.username || payload.username === "") {
            return alert("Username must not be empty.");
        }
        if (!payload.password || payload.password === "") {
            return alert("Password must not be empty.");
        }

        try {
            const { access, refresh } = (await axios.post("/login/", payload)).data;
            console.log(`access: ${access}, refresh: ${refresh}`);
            localStorage.setItem("access", access);
            localStorage.setItem("refresh", refresh);

            // wait for the storage and retrieval of item
            console.log(localStorage.getItem("access")); 

            setIsAuthenticated(true);
        } catch (e) {
            console.log(`Error: ${e}`);
            alert("Invalid Credentials.");
        }
    }

    return (
        <Form>
            <Form.Group>
                <Form.Control
                    name="username"
                    type="text"
                    value={payload.username}
                    placeholder="Username"
                    onChange={handleInputChange}
                    className="mb-3"
                />
            </Form.Group>
            <Form.Group>
                <Form.Control
                    name="password"
                    type="password"
                    value={payload.password}
                    placeholder="Password"
                    onChange={handleInputChange}
                    className="mb-3"
                />
            </Form.Group>

            <Button className="w-100" onClick={onLogin}>Login</Button>
        </Form>
    );
}

export default LoginForm;