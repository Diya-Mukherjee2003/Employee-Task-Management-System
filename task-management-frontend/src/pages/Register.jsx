import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "EMPLOYEE",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        try {

            const result = await registerUser(formData);

            setMessage(result);

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {

            setError(error.message);
        }
    };

    return (
        <div className="auth-container">

            <h1>Employee Task Management</h1>

            <h2>Register</h2>

            <form onSubmit={handleRegister}>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="EMPLOYEE">
                        Employee
                    </option>

                    <option value="ADMIN">
                        Admin
                    </option>
                </select>

                <button type="submit">
                    Register
                </button>

            </form>

            {message && (
                <p className="success">
                    {message}
                </p>
            )}

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            <p>
                Already have an account?{" "}
                <Link to="/login">
                    Login
                </Link>
            </p>

        </div>
    );
}

export default Register;