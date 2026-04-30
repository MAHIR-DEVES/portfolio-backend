import { Request, Response } from 'express';
import * as ProjectService from './project.service';

// =====================
// CREATE PROJECT
// =====================
export const createProject = async (req: Request, res: Response) => {
  try {
    const result = await ProjectService.createProject(req.body);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create project',
    });
  }
};

// =====================
// GET ALL PROJECTS
// =====================
export const getProjects = async (req: Request, res: Response) => {
  try {
    console.log('QUERY:', req.query); // ✅ DEBUG

    const result = await ProjectService.getProjects(req.query);

    res.status(200).json({
      success: true,
      data: result.data,
      meta: result.meta,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================
// GET SINGLE PROJECT BY ID
// =====================
export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await ProjectService.getProjectById(id as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch project',
    });
  }
};

// =====================
// UPDATE PROJECT
// =====================
export const updateProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await ProjectService.updateProject(id as string, req.body);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Project not found for update',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update project',
    });
  }
};

// =====================
// DELETE PROJECT
// =====================
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await ProjectService.deleteProject(id as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Project not found for deletion',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete project',
    });
  }
};
