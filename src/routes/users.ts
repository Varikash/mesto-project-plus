import { Router } from 'express';
import {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar, getCurrentUser,
} from '../controllers/users';
import { avatarValidation, profileValidation, userIdValidation } from '../utilits/validation';

const router = Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', userIdValidation, getUserById);

router.patch('/me', profileValidation, updateUserInfo);
router.patch('/me/avatar', avatarValidation, updateUserAvatar);

export default router;
