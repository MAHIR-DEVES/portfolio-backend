import { Request, Response } from 'express';
import * as OrderService from './order.service';
import mongoose from 'mongoose';

// =====================
// CREATE ORDER
// =====================
export const createOrder = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.createOrder(req.body);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================
// GET ALL ORDERS
// =====================
export const getOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderService.getOrders();

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================
// GET ORDER BY ID
// =====================
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID',
      });
    }

    const result = await OrderService.getOrderById(id as string);

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================
// UPDATE ORDER
// =====================
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // ObjectId validation
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID',
      });
    }

    const result = await OrderService.updateOrder(id as string, req.body);

    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================
// DELETE ORDER
// =====================
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order ID',
      });
    }

    await OrderService.deleteOrder(id as string);

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
