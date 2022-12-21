import { useEffect, useState } from "react";
import axios from "./axios";

export function getColorList(data) {
    return data.map(item => '#' + (Math.random() * 0xFFFFFF << 0).toString(16));
}

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        axios.get("/categories")
            .then(res => {
                setIsAuthenticated(res.status === 200);
            })
            .catch(e => {
                setIsAuthenticated(false);
            });
    }, []);

    return [isAuthenticated, setIsAuthenticated];
}