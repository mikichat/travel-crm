import { Router } from 'express';
import { getHello } from '../controllers';

const router = Router();

router.get('/', getHello);

export default router; 