import jwt from 'jsonwebtoken';
import { User } from './user.model';

const JWT_SECRET =
  process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

// =====================
// LOGIN USER
// =====================
export const loginUser = async (email: string, password: string) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new Error('Account is deactivated');
    }

    // Compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // Return user info and token
    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profilePhoto: user.profilePhoto,
      },
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// =====================
// REGISTER USER
// =====================
export const registerUser = async (payload: {
  email: string;
  password: string;
  name: string;
  profilePhoto?: string;
}) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      email: payload.email.toLowerCase(),
    });

    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Create new user
    const user = await User.create({
      email: payload.email.toLowerCase(),
      password: payload.password,
      name: payload.name,
      profilePhoto: payload.profilePhoto || '',
    });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // Return user info and token
    return {
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        profilePhoto: user.profilePhoto,
      },
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// =====================
// GET USER BY ID
// =====================
export const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user._id,
      email: user.email,
      name: user.name,
      profilePhoto: user.profilePhoto,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
