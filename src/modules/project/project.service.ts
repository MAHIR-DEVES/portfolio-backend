import { IProject } from './project.interface';
import { Project } from './project.model';

// =====================
// CREATE PROJECT
// =====================
export const createProject = async (payload: IProject) => {
  try {
    const result = await Project.create(payload);
    return result;
  } catch (error) {
    throw new Error('Failed to create project');
  }
};

// =====================
// GET ALL PROJECTS
// =====================
export const getProjects = async (query: any) => {
  try {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const search = query.search?.trim() || '';
    const category = query.category || '';

    const skip = (page - 1) * limit;

    const filter: any = {};

    // 🔍 SEARCH (SMART SEARCH)
    if (search) {
      const searchRegex = new RegExp(search.split(' ').join('|'), 'i');

      filter.$or = [{ title: searchRegex }, { description: searchRegex }];
    }

    // 🎯 CATEGORY FILTER (CASE INSENSITIVE)
    if (category && category !== 'all') {
      filter.category = new RegExp(`^${category}$`, 'i');
    }

    const projects = await Project.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Project.countDocuments(filter);

    return {
      data: projects,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// =====================
// GET SINGLE PROJECT
// =====================
export const getProjectById = async (id: string) => {
  try {
    const result = await Project.findById(id);
    return result;
  } catch (error) {
    throw new Error('Invalid project ID or not found');
  }
};

// =====================
// UPDATE PROJECT
// =====================
export const updateProject = async (id: string, payload: IProject) => {
  try {
    const result = await Project.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    return result;
  } catch (error) {
    throw new Error('Failed to update project');
  }
};

// =====================
// DELETE PROJECT
// =====================
export const deleteProject = async (id: string) => {
  try {
    const result = await Project.findByIdAndDelete(id);
    return result;
  } catch (error) {
    throw new Error('Failed to delete project');
  }
};
