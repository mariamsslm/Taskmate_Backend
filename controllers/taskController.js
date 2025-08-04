import Task from "../models/task.js";
import Categorie from "../models/categorie.js";

// create new task
export const createTask = async (req, res) => {
  try {
    const userID = req.user.id;
    const { title, description, priority, deadline, status, categorieID } =
      req.body;
    //create new task from Task model
    const newTask = new Task({
      title,
      description,
      priority,
      deadline,
      status,
      userID,
      categorieID,
    });
    //save data in database
    await newTask.save();
    const populatedTask = await Task.findById(newTask._id).populate(
      "categorieID"
    );

    res.status(201).json(populatedTask);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create a new Task", error: error.message });
  }
};
//edit task authorized
export const editTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;
    const task = await Task.findOne({ userID: userId, task: taskId });
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }
    const { title, description, priority, deadline, status, categorieID } =
      req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority !== undefined) task.priority = priority;
    if (deadline !== undefined) task.deadline = deadline;
    if (status !== undefined) task.status = status;
    if (categorieID !== undefined) task.categorieID = categorieID;

    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update task", error: error.message });
  }
};
//delete task authorized
export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;
    const task = await Task.findOne({ userID: userId, task: taskId });
    if (!task) {
      return res.status(404).json({ message: "task not foumd " });
    }
    await Task.deleteOne({ _id: taskId });
    res.status(200).json({ message: "task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};
// get task by id authorized
export const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    const getTask = await Task.findOne({id: taskId, userID: userId }).populate("categorieID");

    if (!getTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(getTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//get all task authorized
export const getAllTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const getTask = await Task.find({ userID: userId }).populate(
      "categorieID"
    );;
    if (!getTask) {
      return res.status(404).json({ message: "task not found" });
    }
    return res.status(200).json(getTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};
