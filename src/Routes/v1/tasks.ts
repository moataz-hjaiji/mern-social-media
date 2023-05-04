import express from 'express'
import { createTask, getAllCommentsTask, getTask, updateTask } from './../../Controller/tasksController';

const router = express.Router()

router.post('/',createTask)
router.get('/:id',getTask)
router.put('/:id',updateTask)
router.put('/:id/comment',getAllCommentsTask)



export default router;