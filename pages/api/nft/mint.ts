// pages/api/nft/mint.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { updateNFTStatus } from '@/utils/orderUtils';

interface MintNFTRequest {
  orderId: string;
  customerEmail: string;
  customerName: string;
  productName: string;
  productImage: string;
  artisan: string;
  location: string;
  motif: string;
  processingTime: string;
}

interface CrossmintResponse {
  id: string;
  onChain: {
    txId: string;
    contractAddress: string;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {
    orderId,
    customerEmail,
    customerName,
    productName,
    productImage,
    artisan,
    location,
    motif,
    processingTime
  }: MintNFTRequest = req.body;

  // Validasi input
  if (!orderId || !customerEmail || !productName) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: orderId, customerEmail, productName'
    });
  }

  try {
    console.log('🔄 Starting NFT minting process for order:', orderId);

    // Prepare metadata for NFT
    const metadata = {
      name: `Batik Giriloyo - ${productName}`,
      image: productImage,
      description: `Sertifikat Keaslian Batik Tulis dari ${artisan}, ${location}`,
      attributes: [
        {
          trait_type: "Motif",
          value: motif
        },
        {
          trait_type: "Pengrajin",
          value: artisan
        },
        {
          trait_type: "Lokasi",
          value: location
        },
        {
          trait_type: "Waktu Proses",
          value: processingTime
        },
        {
          trait_type: "Order ID",
          value: orderId
        },
        {
          trait_type: "Pemilik",
          value: customerName
        },
        {
          trait_type: "Tanggal Penerbitan",
          value: new Date().toISOString().split('T')[0]
        },
        {
          trait_type: "Jenis",
          value: "Batik Tulis Authentic"
        },
        {
          trait_type: "Status",
          value: "Certified Authentic"
        }
      ],
      external_url: "https://giriloyo-batik.com",
      background_color: "FEF3C7"
    };

    console.log('📦 NFT Metadata prepared:', {
      orderId,
      customerEmail,
      productName,
      motif
    });

    // Call Crossmint API to mint NFT
    const crossmintResponse = await fetch(
      `https://www.crossmint.com/api/2022-06-09/collections/${process.env.CROSSMINT_COLLECTION_ID}/nfts`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': process.env.CROSSMINT_API_KEY!,
          'X-CLIENT-SECRET': process.env.CROSSMINT_CLIENT_SECRET!
        },
        body: JSON.stringify({
          recipient: `email:${customerEmail}:polygon`,
          metadata: metadata,
          reuploadLinkedFiles: true,
          compressed: true
        })
      }
    );

    if (!crossmintResponse.ok) {
      const errorText = await crossmintResponse.text();
      console.error('❌ Crossmint API error:', {
        status: crossmintResponse.status,
        statusText: crossmintResponse.statusText,
        error: errorText
      });
      
      // Update status ke failed di database
      await updateNFTStatus(orderId, 'failed');
      
      throw new Error(`Crossmint API error: ${crossmintResponse.status} - ${errorText}`);
    }

    const nftData: CrossmintResponse = await crossmintResponse.json();
    
    console.log('✅ NFT minted successfully:', {
      nftId: nftData.id,
      transactionHash: nftData.onChain.txId,
      contractAddress: nftData.onChain.contractAddress
    });

    // 🔥 SIMPAN NFT ID KE DATABASE/ORDER - IMPLEMENTASI YANG DIMINTA
    await updateNFTStatus(
      orderId, 
      'minted', 
      [nftData.id], 
      nftData.onChain.txId
    );

    console.log('💾 NFT ID saved to database:', {
      orderId,
      nftId: nftData.id,
      transactionHash: nftData.onChain.txId
    });

    // Kirim email konfirmasi NFT (opsional)
    await sendNFTConfirmationEmail(customerEmail, customerName, productName, nftData.id);

    res.status(200).json({
      success: true,
      nftId: nftData.id,
      transactionHash: nftData.onChain.txId,
      contractAddress: nftData.onChain.contractAddress,
      message: 'NFT berhasil dicetak dan dikirim ke email Anda'
    });

  } catch (error: any) {
    console.error('❌ NFT minting error:', error);
    
    // Update status ke failed di database
    try {
      await updateNFTStatus(orderId, 'failed');
    } catch (dbError) {
      console.error('Error updating NFT status to failed:', dbError);
    }
    
    // Notifikasi error ke admin (opsional)
    await sendErrorNotificationToAdmin(orderId, error.message);

    res.status(500).json({
      success: false,
      error: error.message || 'Gagal mencetak NFT',
      orderId: orderId
    });
  }
}

// Fungsi untuk mengirim email konfirmasi NFT
async function sendNFTConfirmationEmail(
  customerEmail: string, 
  customerName: string, 
  productName: string, 
  nftId: string
) {
  try {
    // Implementasi pengiriman email menggunakan service email favorit Anda
    // Contoh menggunakan SendGrid, Nodemailer, dll.
    console.log(`📧 NFT confirmation email would be sent to: ${customerEmail}`);
    console.log(`📦 NFT Details:`, {
      customerName,
      productName,
      nftId
    });
    
    // Contoh implementasi (uncomment jika sudah setup email service):
    /*
    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: customerEmail,
        subject: `🎨 NFT Certificate untuk ${productName} - Batik Giriloyo`,
        html: `
          <h1>Selamat ${customerName}!</h1>
          <p>NFT Certificate untuk produk <strong>${productName}</strong> telah berhasil dibuat.</p>
          <p><strong>NFT ID:</strong> ${nftId}</p>
          <p>NFT telah dikirim ke wallet digital Anda dan dapat dilihat di platform Crossmint.</p>
          <br>
          <p>Terima kasih telah mendukung pengrajin batik Giriloyo!</p>
        `
      })
    });
    */
    
  } catch (error) {
    console.error('Error sending NFT confirmation email:', error);
  }
}

// Fungsi untuk notifikasi error ke admin
async function sendErrorNotificationToAdmin(orderId: string, errorMessage: string) {
  try {
    // Implementasi notifikasi error ke admin
    // Bisa melalui email, Slack, Discord, dll.
    console.log(`🚨 NFT Minting Error for Order ${orderId}: ${errorMessage}`);
    
    // Contoh notifikasi ke admin (uncomment jika sudah setup):
    /*
    await fetch('/api/send-admin-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: '🚨 NFT Minting Failed',
        message: `Order: ${orderId}\nError: ${errorMessage}`,
        priority: 'high'
      })
    });
    */
  } catch (error) {
    console.error('Error sending admin notification:', error);
  }
}