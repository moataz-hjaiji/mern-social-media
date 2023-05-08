import asyncHandler from './../helpers/asyncHandler';
import tasksRepo from './../db/repository/tasks';
import { ProtectRequest } from 'app-request';

export const getAlltasks = asyncHandler(async (req, res) => {
  const tasks = await tasksRepo.getAllTasks();
  res.status(200).json({ status: 'success', data: tasks });
});
export const createTask = asyncHandler(async (req: any, res) => {
  const madeById = req.user.id;
  const newTask = await tasksRepo.createTask({ ...req.body, madeById });
  console.log(newTask);
  res.status(201).json({ status: 'success', data: newTask });
});
export const getTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await tasksRepo.getTask(id);
  res.status(200).json({ status: 'success', data: task });
});
export const getAllCommentsTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const taskComments = await tasksRepo.getAllCommentsTask(id);
  res.status(200).json({ status: 'success', data: { taskComments } });
});
export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = req.body;
  const newTask = await tasksRepo.updateTask(id, { ...task });
  res.status(201).json({ status: 'success', data: newTask });
});
export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await tasksRepo.deleteTask(id);
  res.status(204).json({ status: 'success', data: null });
});
export const sharedMyTask = asyncHandler(async (req: any, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;
  console.log({ taskId, userId });
  const task = await tasksRepo.getTask(taskId);
  console.log({ task });
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
export const getMySharedTask = asyncHandler(async (req: any, res) => {
  const myselfId = req.user.id;
  const userSharedTasksWith = await tasksRepo.getTaksSharedWith(myselfId);
  console.log({
    tasks: await tasksRepo.getTaksSharedWith('6453deca02218d74b0f546db'),
  });
  res.status(200).json({
    status: 'success',
    data: {
      tasks: userSharedTasksWith,
    },
  });
});
