import { Router } from 'express';
import RouterPaciente from './RouterPaciente';
import RouterSignoVital from './routerSignoVital';
import RouterControl from './RouterControl';

const router = Router();

router.use('/pacientes', RouterPaciente);
router.use('/controles', RouterControl);
router.use('/signos-vitales', RouterSignoVital);

export default router;
