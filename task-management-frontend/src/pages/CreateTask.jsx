import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../services/taskService";

function CreateTask() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createTask({
                title: title,
                description: description
            });

            alert("Task created successfully");

            navigate("/admin");

        } catch (error) {

            setError(error.message);
        }
    };

    return (
        <div className="dashboard">

            <h1>Create Task</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                    required
                />

                <textarea
                    placeholder="Task description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    required
                />
                {/* <select name="" id=""></select> */}

                <button type="submit">
                    Create Task
                </button>

            </form>

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

        </div>
    );
}

export default CreateTask;