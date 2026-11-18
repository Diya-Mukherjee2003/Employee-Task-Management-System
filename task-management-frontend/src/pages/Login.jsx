import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();
        setError("");

        try {

            const data = await loginUser(email, password);
            console.log("Login successful:", data);
            // Store user in AuthContext
            login(data);

            // Role-based navigation
            if (data.role === "ADMIN") {
                navigate("/admin");
            } else if (data.role === "EMPLOYEE") {
                navigate("/employee");
            }
            

        } catch (error) {
          console.error("Login failed:", error);

            setError(error.message);
        }
    };

    return (
        <div className="auth-container">

            <h1>Employee Task Management</h1>

            <h2>Login</h2>

            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">
                    Login
                </button>

            </form>

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            <p>
                Don't have an account?{" "}
                <Link to="/register">
                    Register
                </Link>
            </p>

        </div>
    );
}

export default Login;