import express, { Router} from 'express';
import Users from '../../Controllers/UserTestController/User.test';
const router = express.Router();
router.get('api', Users);
export default router;