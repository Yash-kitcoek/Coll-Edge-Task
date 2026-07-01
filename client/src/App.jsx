import React, { useEffect, useMemo, useState } from "react";
import { ClipboardList, RefreshCw } from "lucide-react";
import TaskFilters from "./components/TaskFilters.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import { createTask, deleteTask, fetchTasks, updateTask } from "./services/tasks.js";

const defaultFilters = {
  search: "",
  status: "all",
  priority: "all",
  sortBy: "createdAt",
  order: "desc"
};

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState("");

  const stats = useMemo(
    () => ({
      total: tasks.length,
      completed: tasks.filter((task) => task.status === "completed").length,
      active: tasks.filter((task) => task.status !== "completed").length
    }),
    [tasks]
  );

  function notify(message) {
    setToast(message);
    window.clearTimeout(notify.timeout);
    notify.timeout = window.setTimeout(() => setToast(""), 3000);
  }

  async function loadTasks(nextFilters = filters) {
    setLoading(true);
    try {
      const data = await fetchTasks(nextFilters);
      setTasks(data);
    } catch (error) {
      notify(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks(filters);
  }, [filters]);

  async function handleSubmit(payload) {
    setSubmitting(true);
    try {
      if (editingTask) {
        const updated = await updateTask(editingTask._id, payload);
        setTasks((current) => current.map((task) => (task._id === updated._id ? updated : task)));
        setEditingTask(null);
        notify("Task updated");
      } else {
        const created = await createTask(payload);
        setTasks((current) => [created, ...current]);
        notify("Task created");
      }
      return true;
    } catch (error) {
      notify(error.message);
      return false;
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Delete this task?");
    if (!confirmed) {
      return;
    }

    try {
      await deleteTask(id);
      setTasks((current) => current.filter((task) => task._id !== id));
      notify("Task deleted");
    } catch (error) {
      notify(error.message);
    }
  }

  return (
    <main className="app-shell">
      {toast && <div className="toast">{toast}</div>}

      <section className="topbar">
        <div>
          <div className="brand">
            <ClipboardList size={28} aria-hidden="true" />
            <span>Task Tracker</span>
          </div>
          <h1>Plan, track, and finish work cleanly.</h1>
        </div>
        <button className="button ghost" type="button" onClick={() => loadTasks()}>
          <RefreshCw size={18} aria-hidden="true" />
          Refresh
        </button>
      </section>

      <section className="stats-grid" aria-label="Task summary">
        <div>
          <span>Total</span>
          <strong>{stats.total}</strong>
        </div>
        <div>
          <span>Active</span>
          <strong>{stats.active}</strong>
        </div>
        <div>
          <span>Completed</span>
          <strong>{stats.completed}</strong>
        </div>
      </section>

      <div className="workspace">
        <aside className="panel">
          <TaskForm
            key={editingTask?._id || "create-task"}
            editingTask={editingTask}
            onCancel={() => setEditingTask(null)}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        </aside>

        <section className="panel task-panel">
          <TaskFilters filters={filters} onChange={setFilters} />
          <TaskList
            loading={loading}
            tasks={tasks}
            onDelete={handleDelete}
            onEdit={(task) => {
              setEditingTask(task);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </section>
      </div>
    </main>
  );
}
