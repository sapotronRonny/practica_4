import express from 'express';
import  { getAllSignosVitales,
    getSignoVitalById,
    createSignoVital,
    updateSignoVital,
    deleteSignoVital} from '../controllers';

const router = express.Router();

router.get('/', getAllSignosVitales);
router.get('/:id', getSignoVitalById);
router.post('/', createSignoVital);
router.put('/:id', updateSignoVital);
router.delete('/:id', deleteSignoVital);

export default router;
