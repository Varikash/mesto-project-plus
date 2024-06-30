import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
} from '../controllers/users';

const router = Router();

router.post('/', createUser);

router.get('/', getUsers);
router.get('/:userId', getUserById);

router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

export default router;
