import mongoose, { Schema } from 'mongoose';

const projectSchema = new Schema(
  {
    // _id: {
    //   type: Schema.Types.ObjectId,
    //   default: () => new mongoose.Types.ObjectId(),
    // },
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: '',
    },

    images: {
      type: [String], // array of image URLs
      default: [],
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    technologies: {
      type: [String], // e.g. ["React", "Node.js"]
      default: [],
    },

    price: {
      type: Number,
      default: 0,
    },

    duration: {
      type: String, // e.g. "2 weeks", "1 month"
      default: '',
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    videoUrl: {
      type: String,
      default: '',
    },
    liveUrl: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
);

export const Project = mongoose.model('Project', projectSchema);
