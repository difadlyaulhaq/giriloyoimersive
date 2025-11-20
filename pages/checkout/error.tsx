// pages/checkout/error.tsx
import { useRouter } from 'next/router';
import { XCircle, RotateCcw, Mail, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const CheckoutError = () => {
  const router = useRouter();
  const { order_id, transaction_status, transaction_id, error_message } = router.query;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
          {/* Header Error - Premium Theme */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-center text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `url('https://cdn.pixabay.com/photo/2020/11/29/10/41/batik-5787939_1280.jpg')`,
                  backgroundSize: '150px 150px',
                  backgroundRepeat: 'repeat',
                }}
              />
            </div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-300/30">
                <XCircle size={40} className="text-amber-200" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">Pembayaran Gagal ❌</h1>
              <p className="text-lg opacity-90">Terjadi kesalahan dalam proses pembayaran premium</p>
            </div>
          </div>

          <div className="p-8">
            {/* Error Details */}
            <div className="bg-red-50 rounded-xl p-6 mb-6 border border-red-200">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="text-red-600" size={20} />
                Informasi Error Premium
              </h2>
              <div className="space-y-3">
                {order_id && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Order ID:</span>
                    <span className="font-bold text-slate-800 font-mono">{order_id}</span>
                  </div>
                )}
                {transaction_status && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Status:</span>
                    <span className="font-bold text-red-600 capitalize">{transaction_status}</span>
                  </div>
                )}
                {error_message && (
                  <div className="bg-white rounded-lg p-4 border border-red-300">
                    <p className="text-sm text-red-600 font-medium">{error_message}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Possible Causes */}
            <div className="bg-amber-50 rounded-xl p-6 mb-6 border border-amber-200">
              <h3 className="text-lg font-bold text-slate-800 mb-3">Kemungkinan Penyebab</h3>
              <div className="space-y-2 text-sm text-slate-600">
                <p>• Saldo tidak mencukupi</p>
                <p>• Kartu kredit ditolak</p>
                <p>• Timeout transaksi</p>
                <p>• Masalah jaringan</p>
                <p>• Batas transaksi terlampaui</p>
              </div>
            </div>

            {/* Solutions */}
            <div className="bg-blue-50 rounded-xl p-6 mb-6 border border-blue-200">
              <h3 className="text-lg font-bold text-slate-800 mb-3">Solusi Premium</h3>
              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                  <p>Pastikan saldo atau limit kartu kredit mencukupi</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                  <p>Coba gunakan metode pembayaran lain</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</div>
                  <p>Hubungi bank atau provider pembayaran Anda</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/checkout" className="flex-1">
                <button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-lg font-bold hover:shadow-xl transition flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/25">
                  <RotateCcw size={20} />
                  Coba Lagi
                </button>
              </Link>
              <Link href="/keranjang" className="flex-1">
                <button className="w-full bg-white text-slate-700 border-2 border-slate-300 px-6 py-3 rounded-lg font-bold hover:bg-slate-50 transition">
                  Kembali ke Keranjang
                </button>
              </Link>
            </div>

            {/* Support Info */}
            <div className="text-center mt-6 pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-500 mb-2">
                Masih mengalami masalah?{' '}
                <a href="mailto:support@giriloyo.com" className="text-blue-700 hover:underline font-medium">
                  Hubungi Customer Service Premium
                </a>
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                <Mail size={16} />
                support@giriloyo.com • WhatsApp: +62 812-3456-7890
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutError;