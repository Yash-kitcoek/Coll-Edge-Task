import Task from "../models/Task.js";

const allowedSortFields = new Set(["createdAt", "updatedAt", "dueDate", "title", "priority", "status"]);

function buildQuery(query) {
  const filters = {};

  if (query.status && query.status !== "all") {
    filters.status = query.status;
  }

  if (query.priority && query.priority !== "all") {
    filters.priority = query.priority;
  }

  if (query.search) {
    filters.$or = [
      { title: { $regex: query.search, $options: "i" } },
      { description: { $regex: query.search, $options: "i" } }
    ];
  }

  return filters;
}

export async function getTasks(req, res, next) {
  try {
    const sortBy = allowedSortFields.has(req.query.sortBy) ? req.query.sortBy : "createdAt";
    const order = req.query.order === "asc" ? 1 : -1;
    const tasks = await Task.find(buildQuery(req.query)).sort({ [sortBy]: order });

    res.json(tasks);
  } catch (error) {
    next(error);
  }
}

export async function createTask(req, res, next) {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

export async function getTaskById(req, res, next) {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.json(task);
  } catch (error) {
    next(error);
  }
}

export async function updateTask(req, res, next) {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.json(task);
  } catch (error) {
    next(error);
  }
}

export async function deleteTask(req, res, next) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.json({ message: "Task deleted successfully", id: req.params.id });
  } catch (error) {
    next(error);
  }
}
