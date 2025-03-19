
import React, { useState, useContext } from 'react';
import instance from '../../axiosconfig'; 
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Auth';

function Login() {
    const { setIsLogged } = useContext(AuthContext);
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await instance.post("./user/login", data, { withCredentials: true });
            setIsLogged(true);
            navigate("/");
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    value={data.email}
                    placeholder="Enter Email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    value={data.password}
                    placeholder="Choose a Strong Password"
                    onChange={handleChange}
                />
                <button type="submit">Login</button>
            </form>
            <Link to="/register">Register</Link>
        </>
    );
}

export default Login;
