import { Order } from './order.model';
import { IOrder } from './order.interface';

// =====================
// CREATE ORDER
// =====================
export const createOrder = async (payload: IOrder) => {
  try {
    const result = await Order.create(payload);
    return result;
  } catch (error: any) {
    throw new Error(`Failed to create order: ${error.message}`);
  }
};

// =====================
// GET ALL ORDERS
// =====================
export const getOrders = async () => {
  try {
    const result = await Order.find().sort({ createdAt: -1 });
    return result;
  } catch (error: any) {
    throw new Error(`Failed to fetch orders: ${error.message}`);
  }
};

// =====================
// GET ORDER BY ID
// =====================
export const getOrderById = async (id: string) => {
  try {
    const result = await Order.findById(id);

    if (!result) {
      throw new Error('Order not found');
    }

    return result;
  } catch (error: any) {
    throw new Error(`Failed to fetch order: ${error.message}`);
  }
};

// =====================
// UPDATE ORDER
// =====================
export const updateOrder = async (id: string, payload: Partial<IOrder>) => {
  try {
    const result = await Order.findByIdAndUpdate(id, payload, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!result) {
      throw new Error('Order not found for update');
    }

    return result;
  } catch (error: any) {
    throw new Error(`Failed to update order: ${error.message}`);
  }
};

// =====================
// DELETE ORDER
// =====================
export const deleteOrder = async (id: string) => {
  try {
    const result = await Order.findByIdAndDelete(id);

    if (!result) {
      throw new Error('Order not found for deletion');
    }

    return result;
  } catch (error: any) {
    throw new Error(`Failed to delete order: ${error.message}`);
  }
};
