import { Router } from 'express';
import { deleteContribuyente, getContribuyente, getContribuyentes, newContribuyente, updateContribuyente } from '../controllers/contributors.controller';

const router = Router();
router.get('/', getContribuyentes);
router.get('/:ciu', getContribuyente);
router.post('/', newContribuyente);
router.put('/:ciu', updateContribuyente);
router.delete('/:ciu', deleteContribuyente);

export default router;