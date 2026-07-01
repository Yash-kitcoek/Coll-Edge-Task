import { CalendarPlus, Save, X } from "lucide-react";
import React from "react";

const initialTask = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
  dueDate: ""
};

export default function TaskForm({ editingTask, onCancel, onSubmit, submitting }) {
  const task = editingTask || initialTask;

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      title: formData.get("title").trim(),
      description: formData.get("description").trim(),
      status: formData.get("status"),
      priority: formData.get("priority"),
      dueDate: formData.get("dueDate") || null
    };

    onSubmit(payload);
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-title">
        <CalendarPlus size={20} aria-hidden="true" />
        <h2>{editingTask ? "Edit task" : "Create task"}</h2>
      </div>

      <label>
        <span>Title</span>
        <input
          name="title"
          minLength="3"
          maxLength="80"
          defaultValue={task.title}
          placeholder="Prepare weekly progress report"
          required
        />
      </label>

      <label>
        <span>Description</span>
        <textarea
          name="description"
          maxLength="500"
          defaultValue={task.description}
          placeholder="Add useful context, links, or acceptance criteria"
          rows="4"
        />
      </label>

      <div className="form-grid">
        <label>
          <span>Status</span>
          <select name="status" defaultValue={task.status}>
            <option value="pending">Pending</option>
            <option value="in-progress">In progress</option>
            <option value="completed">Completed</option>
          </select>
        </label>

        <label>
          <span>Priority</span>
          <select name="priority" defaultValue={task.priority}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>

      <label>
        <span>Due date</span>
        <input
          name="dueDate"
          type="date"
          defaultValue={task.dueDate ? task.dueDate.slice(0, 10) : ""}
        />
      </label>

      <div className="form-actions">
        {editingTask && (
          <button className="button ghost" type="button" onClick={onCancel}>
            <X size={18} aria-hidden="true" />
            Cancel
          </button>
        )}
        <button className="button primary" type="submit" disabled={submitting}>
          <Save size={18} aria-hidden="true" />
          {submitting ? "Saving..." : editingTask ? "Save changes" : "Add task"}
        </button>
      </div>
    </form>
  );
}
