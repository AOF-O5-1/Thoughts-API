import { Router } from 'express';
import userRoutes from '../routes/userRoutes';
import thoughtRoutes from '../routes/thoughtRoutes';

const router = Router();

router.use('/users', userRoutes); 
router.use('/thoughts', thoughtRoutes);

export default router;