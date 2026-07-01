import { ArrowDownAZ, ArrowUpAZ, Search } from "lucide-react";
import React from "react";

export default function TaskFilters({ filters, onChange }) {
  function update(key, value) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <section className="filters" aria-label="Task filters">
      <label className="search-field">
        <Search size={18} aria-hidden="true" />
        <input
          value={filters.search}
          onChange={(event) => update("search", event.target.value)}
          placeholder="Search tasks"
        />
      </label>

      <select value={filters.status} onChange={(event) => update("status", event.target.value)}>
        <option value="all">All statuses</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In progress</option>
        <option value="completed">Completed</option>
      </select>

      <select value={filters.priority} onChange={(event) => update("priority", event.target.value)}>
        <option value="all">All priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select value={filters.sortBy} onChange={(event) => update("sortBy", event.target.value)}>
        <option value="createdAt">Created</option>
        <option value="dueDate">Due date</option>
        <option value="title">Title</option>
        <option value="priority">Priority</option>
        <option value="status">Status</option>
      </select>

      <button
        className="icon-button"
        type="button"
        title={filters.order === "asc" ? "Sort descending" : "Sort ascending"}
        onClick={() => update("order", filters.order === "asc" ? "desc" : "asc")}
      >
        {filters.order === "asc" ? <ArrowUpAZ size={19} /> : <ArrowDownAZ size={19} />}
      </button>
    </section>
  );
}
