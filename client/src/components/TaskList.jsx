import { CheckCircle2, Clock3, Edit3, LoaderCircle, Trash2 } from "lucide-react";
import React from "react";

const statusLabels = {
  pending: "Pending",
  "in-progress": "In progress",
  completed: "Completed"
};

function formatDate(date) {
  if (!date) {
    return "No due date";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(date));
}

function StatusIcon({ status }) {
  if (status === "completed") {
    return <CheckCircle2 size={18} aria-hidden="true" />;
  }

  if (status === "in-progress") {
    return <LoaderCircle size={18} aria-hidden="true" />;
  }

  return <Clock3 size={18} aria-hidden="true" />;
}

export default function TaskList({ loading, tasks, onDelete, onEdit }) {
  if (loading) {
    return <div className="empty-state">Loading tasks...</div>;
  }

  if (!tasks.length) {
    return <div className="empty-state">No tasks match the current view.</div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <article className="task-card" key={task._id}>
          <div className="task-card-header">
            <div>
              <h3>{task.title}</h3>
              <p>{task.description || "No description added."}</p>
            </div>
            <span className={`priority priority-${task.priority}`}>{task.priority}</span>
          </div>

          <div className="task-meta">
            <span className={`status status-${task.status}`}>
              <StatusIcon status={task.status} />
              {statusLabels[task.status]}
            </span>
            <span>{formatDate(task.dueDate)}</span>
          </div>

          <div className="task-actions">
            <button className="button ghost" type="button" onClick={() => onEdit(task)}>
              <Edit3 size={17} aria-hidden="true" />
              Edit
            </button>
            <button className="button danger" type="button" onClick={() => onDelete(task._id)}>
              <Trash2 size={17} aria-hidden="true" />
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
