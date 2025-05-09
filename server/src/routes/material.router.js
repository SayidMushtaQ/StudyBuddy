import {Router} from 'express';
import {getMaterial} from '../controllers/notes/teacher/getMaterial.controller.js'
import {getMaterialBySub} from '../controllers/notes/teacher/getMaterialsBySubject.controller.js'
import {uploadMaterial} from '../controllers/notes/teacher/uploadMaterial.controller.js'
import {deleteMaterial} from '../controllers/notes/teacher/deleteMaterial.controller.js'


const router = Router();

router.route('/').get(getMaterial)
router.route('/subject/:subject').get(getMaterialBySub)
router.route('/upload').post(uploadMaterial)
router.route('/delete/:id').delete(deleteMaterial)




export default router