import express from 'express';
import {getAllPacientes, getPacienteById, createPaciente, updatePaciente, deletePaciente} from '../controllers';

const router = express.Router();

router.get('/', getAllPacientes);
router.get('/:id', getPacienteById);
router.post('/', createPaciente);
router.put('/:id', updatePaciente);
router.delete('/:id',deletePaciente);

export default router;
