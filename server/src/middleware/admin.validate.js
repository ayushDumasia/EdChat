import jwt from 'jsonwebtoken';
import { AsyncHandler } from '../utils/AsyncHandler.utils.js';

export const adminValidator = AsyncHandler((req, res, next) => {
  const cookie = req.cookies.userCookie;
  if (cookie) {
    jwt.verify(cookie, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      }

      console.log(decoded.user);
      if (decoded.user.role === 'Admin') {
        req.user = decoded.user;
        next();
      } else {
        return res.status(403).json({ error: 'Access denied: Admins only' });
      }
    });
  } else {
    res
      .status(401)
      .json({ error: 'You have no permission to access this functionally' });
  }
});
