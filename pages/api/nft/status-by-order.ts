// pages/api/nft/status-by-order.ts
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
    // 1. Dapatkan order dari database
    const order = await getOrderById(orderId as string);
    
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    // 2. Cek apakah order punya NFT IDs
    if (!order.nftIds || order.nftIds.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'No NFTs found for this order',
        nftStatus: order.nftStatus // 'pending', 'minted', 'failed'
      });
    }

    // 3. Ambil status untuk setiap NFT
    const nftStatuses = await Promise.all(
      order.nftIds.map(async (nftId) => {
        try {
          const response = await fetch(
            `https://www.crossmint.com/api/2022-06-09/collections/${process.env.CROSSMINT_COLLECTION_ID}/nfts/${nftId}`,
            {
              headers: {
                'X-API-KEY': process.env.CROSSMINT_API_KEY!,
              }
            }
          );

          if (response.ok) {
            return await response.json();
          } else {
            return { nftId, error: 'Not found in Crossmint' };
          }
        } catch (error) {
          return { nftId, error: 'Failed to fetch' };
        }
      })
    );

    res.status(200).json({ 
      success: true, 
      nftStatuses,
      orderStatus: order.status,
      nftStatus: order.nftStatus
    });

  } catch (error) {
    console.error('Error checking NFT status:', error);
    res.status(500).json({ success: false, error: 'Failed to check NFT status' });
  }
}