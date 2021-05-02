import { Router } from 'express';
import bouquetRoutes from './routes/bouquet.route';
import clientRoutes from './routes/client.route';
import fleuristeRoutes from './routes/fleuriste.route';
import commandeRoutes from './routes/commande.route';
import fleurRoutes from './routes/fleur.route';
import userRoutes from './routes/user.route';
import verifyToken from './middleware/verifyToken.middleware';
import { Roles } from './constants/role.enum';

const router = Router();

router.use('/api/users', userRoutes);
router.use('/api/fleurs', verifyToken([Roles.FLORIST]), fleurRoutes);
router.use('/api/bouquets', bouquetRoutes);
router.use('/api/commandes', commandeRoutes);
router.use('/api/fleuristes', fleuristeRoutes);
router.use('/api/clients', verifyToken([Roles.CLIENT]), clientRoutes);

export default router;
