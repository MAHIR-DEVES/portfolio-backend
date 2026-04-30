import mongoose, { Schema } from 'mongoose';

const leadSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      default: '',
    },

    status: {
      type: String,
      enum: ['new', 'contacted', 'converted', 'rejected'],
      default: 'new',
    },

    source: {
      type: String,
      default: 'website',
    },
  },
  { timestamps: true },
);

export const Lead = mongoose.model('Lead', leadSchema);
