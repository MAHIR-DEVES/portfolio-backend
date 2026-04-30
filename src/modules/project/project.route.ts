import express from 'express';
// import { createProject } from './project.controller';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from './project.controller';

const router = express.Router();

// =====================
// CREATE
// =====================
router.post('/', createProject);

// =====================
// READ ALL
// =====================
router.get('/', getProjects);

// =====================
// READ SINGLE
// =====================
router.get('/:id', getProjectById);

// =====================
// UPDATE
// =====================
router.patch('/:id', updateProject);

// =====================
// DELETE
// =====================
router.delete('/:id', deleteProject);

export const ProjectRoutes = router;
