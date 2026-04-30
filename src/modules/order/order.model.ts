import mongoose, { Schema, Document } from 'mongoose';
import { IOrder } from './order.interface';

export interface IOrderDocument extends IOrder, Document {}

const orderSchema = new Schema<IOrderDocument>(
  {
    customerName: { type: String, required: true, trim: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    projectId: { type: String },

    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
      },
    ],

    totalPrice: { type: Number, required: true },

    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'cancelled'],
      default: 'pending',
    },

    paymentMethod: { type: String, default: 'cash' },
    address: { type: String, default: '' },
  },
  { timestamps: true },
);

export const Order = mongoose.model<IOrderDocument>('Order', orderSchema);
