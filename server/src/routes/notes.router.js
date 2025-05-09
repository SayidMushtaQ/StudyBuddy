import {Router} from 'express';
import {read} from '../controllers/notes/student/read.controller.js'
import {create} from '../controllers/notes/student/create.controller.js'
import {deleteNote} from '../controllers/notes/student/delete.controller.js'
import {update} from '../controllers/notes/student/update.controller.js'

const router = Router();

router.route('/read').get(read)
router.route('/create').post(create)
router.route('/delete/:id').delete(deleteNote)
router.route('/update/:id').put(update)


export default router