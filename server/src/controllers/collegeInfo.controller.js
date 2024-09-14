import { College } from '../models/collegeInfo.model.js';
import { AsyncHandler } from '../utils/AsyncHandler.utils.js';

export const createCollegeInfo = AsyncHandler(async (req, res) => {
  const data = req.body;
  console.log(data);

  const newCollege = new College(data);
  console.log(newCollege);

  res.json(newCollege);
});
