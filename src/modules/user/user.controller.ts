import { Request, Response } from 'express';
import * as UserService from './user.service';

// =====================
// LOGIN
// =====================
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const result = await UserService.loginUser(email, password);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message || 'Login failed',
    });
  }
};

// =====================
// REGISTER
// =====================
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, profilePhoto } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and name are required',
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    const result = await UserService.registerUser({
      email,
      password,
      name,
      profilePhoto,
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Registration failed',
    });
  }
};

// =====================
// GET CURRENT USER
// =====================
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    // User ID comes from auth middleware (to be added)
    const userId = (req as any).user?.id;
    console.log(userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const user = await UserService.getUserById(userId);

    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: user,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Failed to fetch user',
    });
  }
};
