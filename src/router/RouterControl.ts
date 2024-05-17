import express from 'express';
import {getAllControles, getControlById, createControl, updateControl, deleteControl} from '../controllers'

const router = express.Router();

router.get('/', getAllControles);
router.get('/:id', getControlById);
router.post('/', createControl);
router.put('/:id', updateControl);
router.delete('/:id', deleteControl);

export default router;