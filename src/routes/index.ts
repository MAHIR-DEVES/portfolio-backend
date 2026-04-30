import express from 'express';
import { LeadRoutes } from '../modules/lead/lead.route';
import { ProjectRoutes } from '../modules/project/project.route';
import { OrderRoutes } from '../modules/order/order.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

router.use('/projects', ProjectRoutes);
router.use('/leads', LeadRoutes);
router.use('/users', UserRoutes);
router.use('/', OrderRoutes);

export default router;
