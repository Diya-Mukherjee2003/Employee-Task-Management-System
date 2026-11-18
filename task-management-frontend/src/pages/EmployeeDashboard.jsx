import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

import { getAllTasks, updateTaskStatus }
    from "../services/taskService";

import { useAuth } from "../context/AuthContext";

function EmployeeDashboard() {

    const { user } = useAuth();

    const [tasks, setTasks] = useState([]);

    const loadTasks = async () => {

        try {

            const data = await getAllTasks();

            const myTasks = data.filter(
                (task) =>
                    task.assignedTo &&
                    task.assignedTo.id === user.id
            );

            setTasks(myTasks);

        } catch (error) {

            console.error(error);
        }
    };


    useEffect(() => {

        if (user) {
            loadTasks();
        }

    }, [user]);


    const handleStatusChange = async (
        taskId,
        status
    ) => {

        try {

            await updateTaskStatus(
                taskId,
                status
            );

            loadTasks();

        } catch (error) {

            alert(error.message);
        }
    };


    return (
        <div>

            <Navbar />

            <div className="dashboard">

                <h1>Employee Dashboard</h1>

                <h2>My Tasks</h2>


                {tasks.length === 0 ? (

                    <p>
                        No tasks assigned to you.
                    </p>

                ) : (

                    tasks.map((task) => (

                        <TaskCard
                            key={task.id}
                            task={task}
                            employees={[]}
                            isAdmin={false}
                            onStatusChange={
                                handleStatusChange
                            }
                        />

                    ))

                )}

            </div>

        </div>
    );
}

export default EmployeeDashboard;