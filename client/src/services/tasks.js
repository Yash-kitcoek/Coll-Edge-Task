const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    ...options
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data.errors?.join(", ") || data.message || "Request failed";
    throw new Error(message);
  }

  return data;
}

export function fetchTasks(filters) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    }
  });

  return request(`/tasks?${params.toString()}`);
}

export function createTask(task) {
  return request("/tasks", {
    method: "POST",
    body: JSON.stringify(task)
  });
}

export function updateTask(id, task) {
  return request(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(task)
  });
}

export function deleteTask(id) {
  return request(`/tasks/${id}`, {
    method: "DELETE"
  });
}
