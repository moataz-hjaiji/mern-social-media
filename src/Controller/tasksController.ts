import asyncHandler from './../helpers/asyncHandler';
import tasksRepo from './../db/repository/tasks';

export const getAlltasks = asyncHandler(async (req, res) => {
  const tasks = tasksRepo.getAllTasks();
  res.status(200).json(tasks);
});
export const createTask = asyncHandler(async (req, res) => {
  const newTask = tasksRepo.createTask(req.body);
  res.status(201).json({ status: 'success', data: newTask });
});
export const getTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = tasksRepo.getTask(id);
  res.status(200).json({ status: 'success', data: task });
});
export const getAllCommentsTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const taskComment = tasksRepo.getAllCommentsTask(id);
  res.status(200).json({ status: 'success', data: taskComment });
});
export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = req.body;
  const newTask = tasksRepo.updateTask(id, JSON.parse(task));
  res.status(201).json({ status: 'success', data: newTask });
});
export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  tasksRepo.deleteTask(id);
  res.status(204).json({ status: 'success', data: null });
});
export const sharedMyTask = asyncHandler(async (req: any, res) => {
  const taskId = req.params.id;
  const userId = req.user._id;
  const task = await tasksRepo.getTask(taskId);
  const { sharedWith, title, description, comments, madeById }: any = task;
  const updatedTask = await tasksRepo.updateTask(taskId, {
    sharedWith: sharedWith.concat(userId),
    title,
    description,
    comments,
    madeById,
  });
  res.status(200).json({ status: 'success', task: updatedTask });
});
