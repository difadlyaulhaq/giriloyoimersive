// pages/checkout/success.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CheckCircle, Award, Mail, ExternalLink, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CheckoutSuccess = () => {
  const router = useRouter();
  const { order_id, transaction_status, transaction_id } = router.query;
  const [order, setOrder] = useState<any>(null);
  const [nftStatus, setNftStatus] = useState<'minting' | 'minted' | 'failed'>('minting');

  useEffect(() => {
    if (order_id) {
      // Fetch order details
      fetchOrderDetails(order_id as string);
      
      // Check NFT status periodically
      const interval = setInterval(() => {
        checkNFTStatus(order_id as string);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [order_id]);

  const fetchOrderDetails = async (orderId: string) => {
    try {
      // Implementasi fetch order details dari database
      console.log('Fetching order details:', orderId);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const checkNFTStatus = async (orderId: string) => {
    try {
      // Implementasi check NFT status
      // Jika NFT sudah ready, set nftStatus ke 'minted'
      setNftStatus('minted');
    } catch (error) {
      console.error('Error checking NFT status:', error);
      setNftStatus('failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center border border-slate-200">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle size={48} className="text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Pembayaran Berhasil! 🎉
          </h1>
          
          <p className="text-slate-600 mb-8 text-lg">
            Terima kasih telah berbelanja di <span className="font-semibold text-blue-900">Desa Wisata Batik Giriloyo</span>
          </p>

          {/* Order Info */}
          <div className="bg-slate-50 rounded-xl p-6 mb-8 border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              Informasi Pesanan Premium
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-slate-600">Order ID</p>
                <p className="font-semibold font-mono text-slate-800">{order_id}</p>
              </div>
              <div>
                <p className="text-slate-600">Status Pembayaran</p>
                <p className="font-semibold text-green-600">Berhasil</p>
              </div>
            </div>
          </div>

          {/* NFT Status */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="text-amber-600" size={32} />
              <h2 className="text-xl font-bold text-blue-900">
                Sertifikat Digital Heritage NFT
              </h2>
            </div>
            
            {nftStatus === 'minting' && (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-blue-900 font-semibold">
                    Sedang mencetak sertifikat digital...
                  </p>
                </div>
                <p className="text-slate-600 text-sm">
                  Sertifikat keaslian digital heritage sedang diproses dan akan dikirim ke email Anda
                </p>
              </div>
            )}
            
            {nftStatus === 'minted' && (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle size={20} className="text-green-500" />
                  <p className="text-green-700 font-semibold">
                    Sertifikat Digital Berhasil Dicetak!
                  </p>
                </div>
                <p className="text-slate-600 text-sm">
                  Sertifikat keaslian digital heritage telah dikirim ke email Anda
                </p>
                <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-lg hover:shadow-xl transition flex items-center gap-2 mx-auto shadow-lg hover:shadow-amber-500/25">
                  <Mail size={16} />
                  Lihat di Email
                </button>
              </div>
            )}
            
            {nftStatus === 'failed' && (
              <div className="space-y-4">
                <p className="text-red-700 font-semibold">
                  Gagal mencetak sertifikat digital
                </p>
                <p className="text-slate-600 text-sm">
                  Tim premium kami akan menghubungi Anda untuk proses lebih lanjut
                </p>
              </div>
            )}
          </div>

          {/* Next Steps */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/produk')}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-lg hover:shadow-xl transition font-semibold shadow-lg hover:shadow-amber-500/25 flex items-center gap-2"
            >
              <Sparkles size={18} />
              Lanjut Berbelanja
            </button>
            <button
              onClick={() => router.push('/orders')}
              className="bg-white text-slate-700 border-2 border-slate-300 px-8 py-3 rounded-lg hover:bg-slate-50 transition font-semibold"
            >
              Lihat Pesanan Saya
            </button>
          </div>

          {/* Support Info */}
          <div className="text-center mt-8 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Butuh bantuan?{' '}
              <a href="mailto:support@giriloyo.com" className="text-blue-700 hover:underline font-medium">
                Hubungi Customer Service Premium
              </a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutSuccess;