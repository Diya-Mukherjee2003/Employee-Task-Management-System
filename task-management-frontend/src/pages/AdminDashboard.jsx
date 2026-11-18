import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

import {
    getAllTasks,
    assignTask,
    deleteTask,
    approveTask,
    rejectTask
} from "../services/taskService";

import { getEmployees } from "../services/userService";

function AdminDashboard() {

    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [employees, setEmployees] = useState([]);

    const loadData = async () => {

    try {

        console.log("ADMIN DASHBOARD: loadData started");

        const taskData = await getAllTasks();

        console.log("TASK DATA:", taskData);

        const employeeData = await getEmployees();

        setTasks(taskData);
        setEmployees(employeeData);

    } catch (error) {

        console.error("LOAD DATA ERROR:", error);
    }
};

    useEffect(() => {

        loadData();

    }, []);


    const handleAssign = async (taskId, employeeId) => {

        if (!employeeId) {
            return;
        }

        try {

            await assignTask(taskId, employeeId);

            loadData();

        } catch (error) {

            alert(error.message);
        }
    };


    const handleDelete = async (taskId) => {

        if (!window.confirm("Delete this task?")) {
            return;
        }

        try {

            await deleteTask(taskId);

            loadData();

        } catch (error) {

            alert(error.message);
        }
    };


    const handleApprove = async (taskId) => {

        try {

            await approveTask(taskId);

            loadData();

        } catch (error) {

            alert(error.message);
        }
    };


    const handleReject = async (taskId) => {

        try {

            await rejectTask(taskId);

            loadData();

        } catch (error) {

            alert(error.message);
        }
    };


    return (
        <div>

            <Navbar />

            <div className="dashboard">

                <div className="dashboard-header">

                    <h1>Admin Dashboard</h1>

                    <button
                        onClick={() =>
                            navigate("/admin/create-task")
                        }
                    >
                        + Create Task
                    </button>

                </div>


                <h2>All Tasks</h2>


                {tasks.length === 0 ? (

                    <p>No tasks available.</p>

                ) : (

                    tasks.map((task) => (
                       

                        <TaskCard
                            key={task.id}
                            task={task}
                            employees={employees}
                            isAdmin={true}
                            onAssign={handleAssign}
                            onDelete={handleDelete}
                            onApprove={handleApprove}
                            onReject={handleReject}
                        />
                    ))
                )}

            </div>

        </div>
    );
}

export default AdminDashboard;