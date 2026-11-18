import api from "./api";


// Get all tasks
export const getAllTasks = async () => {

    const response = await api.get("/tasks");

    return response.data;
};


// Create task
export const createTask = async (taskData) => {

    const formData = new FormData();

    formData.append("title", taskData.title);
    formData.append("description", taskData.description);

    if (taskData.file) {
        formData.append("file", taskData.file);
    }

    const response = await api.post("/tasks", formData);
    console.log(response.data);
    return response.data;
};


// Delete task
export const deleteTask = async (taskId) => {

    const response = await api.delete(`/tasks/${taskId}`);

    return response.data;
};


// Assign task
export const assignTask = async (taskId, employeeId) => {

    const response = await api.put(
        `/tasks/${taskId}/assign/${employeeId}`
    );

    return response.data;
};


// Update status
export const updateTaskStatus = async (taskId, status) => {

    const response = await api.put(
        `/tasks/${taskId}/status?status=${status}`
    );

    return response.data;
};


// Approve task
export const approveTask = async (taskId) => {

    const response = await api.put(
        `/tasks/${taskId}/approve`
    );

    return response.data;
};


// Reject task
export const rejectTask = async (taskId) => {

    const response = await api.put(
        `/tasks/${taskId}/reject`
    );

    return response.data;
};