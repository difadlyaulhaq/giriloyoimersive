// pages/api/nft/order-status.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getOrderById } from '@/utils/orderUtils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { orderId } = req.query;

  try {
    const order = await getOrderById(orderId as string);
    
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    res.status(200).json({
      success: true,
      orderId: order.orderId,
      status: order.status,
      nftStatus: order.nftStatus || 'pending',
      nftIds: order.nftIds || [],
      nftTransactionHash: order.nftTransactionHash
    });

  } catch (error) {
    console.error('Error checking order status:', error);
    res.status(500).json({ success: false, error: 'Failed to check order status' });
  }
}