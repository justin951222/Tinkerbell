import express from 'express';
import account from './account';
import club from './club';
import equipment from './equipment';
import inventory from './inventory';
import finance from './finance';
import member from './member';
import calendar from './calendar';

const router = express.Router();
router.use('/account', account);
router.use('/club',club);
router.use('/equipment',equipment);
router.use('/inventory',inventory);
router.use('/finance',finance);
router.use('/member',member);
router.use('/calendar',calendar);

export default router;
