import express from 'express';
import {
  createLead,
  getLeads,
  getLeadById,
  deleteLead,
} from './lead.controller';

const router = express.Router();

// =====================
// CREATE
// =====================
router.post('/', createLead);

// =====================
// GET ALL
// =====================
router.get('/', getLeads);

// =====================
// GET BY ID
// =====================
router.get('/:id', getLeadById);

// =====================
// DELETE
// =====================
router.delete('/:id', deleteLead);

export const LeadRoutes = router;
