import { Router } from 'express';
import {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar, getCurrentUser,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUserById);

router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

export default router;
