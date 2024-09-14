import express from 'express';
import {
  createMessage,
  deleteMessage,
} from '../controllers/message.controller.js';

const router = express.Router();

router.route('/addMessage').post(createMessage);

router.route('/deleteAll').post(deleteMessage);

export default router;
