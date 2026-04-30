import { Lead } from './lead.model';

// =====================
// CREATE LEAD
// =====================
export const createLead = async (payload: any) => {
  try {
    const result = await Lead.create(payload);
    return result;
  } catch (error: any) {
    throw new Error(`Failed to create lead: ${error.message}`);
  }
};

// =====================
// GET ALL LEADS
// =====================
export const getLeads = async () => {
  try {
    const result = await Lead.find().sort({ createdAt: -1 });
    return result;
  } catch (error: any) {
    throw new Error(`Failed to fetch leads: ${error.message}`);
  }
};

// =====================
// GET SINGLE LEAD
// =====================
export const getLeadById = async (id: string) => {
  try {
    const result = await Lead.findById(id);

    if (!result) {
      throw new Error('Lead not found');
    }

    return result;
  } catch (error: any) {
    throw new Error(`Failed to fetch lead: ${error.message}`);
  }
};

// =====================
// DELETE LEAD
// =====================
export const deleteLead = async (id: string) => {
  try {
    const result = await Lead.findByIdAndDelete(id);

    if (!result) {
      throw new Error('Lead not found for deletion');
    }

    return result;
  } catch (error: any) {
    throw new Error(`Failed to delete lead: ${error.message}`);
  }
};
