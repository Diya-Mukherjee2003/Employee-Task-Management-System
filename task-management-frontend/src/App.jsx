import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard
    from "./pages/AdminDashboard";

import EmployeeDashboard
    from "./pages/EmployeeDashboard";

import CreateTask
    from "./pages/CreateTask";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                {/* Default */}
                <Route
                    path="/"
                    element={
                        <Navigate to="/login" />
                    }
                />


                {/* Authentication */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* Admin */}
                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/admin/create-task"
                    element={<CreateTask />}
                />


                {/* Employee */}
                <Route
                    path="/employee"
                    element={<EmployeeDashboard />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;