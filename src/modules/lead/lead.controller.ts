import { Request, Response } from 'express';
import * as LeadService from './lead.service';
import mongoose from 'mongoose';

// =====================
// CREATE LEAD
// =====================
export const createLead = async (req: Request, res: Response) => {
  try {
    const result = await LeadService.createLead(req.body);

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create lead',
    });
  }
};

// =====================
// GET ALL LEADS
// =====================
export const getLeads = async (req: Request, res: Response) => {
  try {
    const result = await LeadService.getLeads();

    res.status(200).json({
      success: true,
      message: 'Leads fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch leads',
    });
  }
};

// =====================
// GET LEAD BY ID
// =====================
export const getLeadById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid lead ID',
      });
    }

    const result = await LeadService.getLeadById(id as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lead fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch lead',
    });
  }
};

// =====================
// DELETE LEAD
// =====================
export const deleteLead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid lead ID',
      });
    }

    const result = await LeadService.deleteLead(id as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lead deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete lead',
    });
  }
};
