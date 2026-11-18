function TaskCard({
    task,
    employees,
    isAdmin,
    onAssign,
    onDelete,
    onApprove,
    onReject,
    onStatusChange
}) {

    return (
        <div className="task-card">

            <h3>{task.title}</h3>

            <p>
                {task.description}
            </p>

            <p>
                Status: <strong>{task.status}</strong>
            </p>

            <p>
                Assigned To:{" "}

                {task.assignedTo
                    ? task.assignedTo.name
                    : "Not Assigned"}
            </p>

            {/* ADMIN OPTIONS */}

            {isAdmin && !task.assignedTo && (

                <select
                    defaultValue=""
                    onChange={(e) =>
                        onAssign(task.id, e.target.value)
                    }
                >

                    <option value="">
                        Assign Employee
                    </option>

                    {employees.map((employee) => (

                        <option
                            key={employee.id}
                            value={employee.id}
                        >
                            {employee.name}
                        </option>

                    ))}

                </select>
            )}

            {isAdmin && (
                <div>

                    {task.status === "COMPLETED" && (
                        <>
                            <button
                                onClick={() =>
                                    onApprove(task.id)
                                }
                            >
                                Approve
                            </button>

                            <button
                                onClick={() =>
                                    onReject(task.id)
                                }
                            >
                                Reject
                            </button>
                        </>
                    )}

                    <button
                        onClick={() =>
                            onDelete(task.id)
                        }
                    >
                        Delete
                    </button>

                </div>
            )}

            {/* EMPLOYEE OPTIONS */}

            {!isAdmin && task.status === "ASSIGNED" && (

                <button
                    onClick={() =>
                        onStatusChange(
                            task.id,
                            "IN_PROGRESS"
                        )
                    }
                >
                    Start Task
                </button>
            )}

            {!isAdmin && task.status === "IN_PROGRESS" && (

                <button
                    onClick={() =>
                        onStatusChange(
                            task.id,
                            "COMPLETED"
                        )
                    }
                >
                    Mark Completed
                </button>
            )}

        </div>
    );
}

export default TaskCard;