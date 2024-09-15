import express from 'express';
import { createCollegeInfo } from '../controllers/collegeInfo.controller.js';
import { adminValidator } from '../middleware/admin.validate.js';

const router = express.Router();

router.route('/createCollege').post(adminValidator, createCollegeInfo);

export default router;
