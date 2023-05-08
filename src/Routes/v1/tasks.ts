import express from 'express';
import {
  getAlltasks,
  createTask,
  getAllCommentsTask,
  getTask,
  updateTask,
  sharedMyTask,
  getMySharedTask,
} from './../../Controller/tasksController';

const router = express.Router();

router.get('/', getAlltasks);
router.post('/', createTask);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.put('/:id/comment', getAllCommentsTask);
router.patch('/:id/share',sharedMyTask)
router.get('/shared/me',getMySharedTask)

export default router;
