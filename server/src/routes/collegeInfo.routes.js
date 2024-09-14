import { createCollegeInfo } from '../controllers/collegeInfo.controller.js';

import express from 'express';

const router = express.router();

router.route('/createCollege').post(createCollegeInfo);

export default router;
