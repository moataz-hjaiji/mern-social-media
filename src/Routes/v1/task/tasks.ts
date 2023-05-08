import express from 'express';
import validator from './../../../helpers/validator';
import taskSchema from './schema'
import {
  getAlltasks,
  createTask,
  getAllCommentsTask,
  getTask,
  updateTask,
  sharedMyTask,
  getMySharedTask,
} from '../../../Controller/tasksController';

const router = express.Router();

router.get('/', getAlltasks);
router.post('/',validator(taskSchema), createTask);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.put('/:id/comment', getAllCommentsTask);
router.patch('/:id/share',sharedMyTask)
router.get('/shared/me',getMySharedTask)

export default router;
