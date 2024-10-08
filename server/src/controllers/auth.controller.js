import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.utils.js';
import { ApiResponse } from '../utils/ApiResponse.utils.js';
import { AsyncHandler } from '../utils/AsyncHandler.utils.js';

// Sign Up: Handles user registration
export const signUp = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const validEmail = await User.findOne({ email });

  // Check if email is already in use
  if (validEmail) {
    return res.status(409).json(new ApiError(409, 'Email already in use'));
  }

  const newUser = new User({ email, password });
  await newUser.save();

  const accessToken = setToken(req, newUser);

  res
    .cookie('userCookie', accessToken, {
      httpOnly: true,
    })
    .status(201)
    .json(
      new ApiResponse(
        201,
        { newUser, accessToken },
        'User logged in successfully',
      ),
    );
});

// Sign In: Handles user login
export const signIn = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json(new ApiError(401, 'Invalid Details'));
  }

  const accessToken = setToken(req, user);

  // const hundredYearsInMilliseconds = 100 * 365.25 * 24 * 60 * 60 * 1000;
  res
    .cookie('userCookie', accessToken, {
      httpOnly: true,
      // maxAge: hundredYearsInMilliseconds,
    })
    .status(200)
    .json({
      user,
      accessToken,
      message: 'User logged in successfully',
    });
});

// signOut: Handles user sign-out
export const signOut = AsyncHandler(async (req, res) => {
  console.log('Cookie delete');

  res
    .clearCookie('userCookie')
    .status(200)
    .json(new ApiResponse(200, {}, 'User logged out successfully'));
});

const setToken = (req, newUser) => {
  const { email, _id, role } = newUser;

  const accessToken = jwt.sign(
    {
      user: { email, id: _id, role: role },
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: '1h' },
  );

  req.user = { email, id: _id, role: role };

  return accessToken;
};
