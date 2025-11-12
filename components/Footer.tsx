import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
  };

  return (
    <footer className="bg-stone-900 text-amber-50 py-12 lg:py-16 px-4 relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url('https://cdn.pixabay.com/photo/2020/11/29/10/42/batik-5787948_1280.jpg')`,
          backgroundSize: '300px 300px',
          backgroundRepeat: 'repeat',
        }}
      />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 mb-4 bg-white px-3 py-2 rounded-2xl w-max border border-amber-800/30">
              <Image 
                src="/logo-web.png"
                alt="Logo"
                width={40}
                height={40}
                className="w-30 h-20 object-contain"
              />
            </div>
            <p className="text-stone-400 mb-6 text-sm lg:text-base leading-relaxed">
              Desa Wisata Batik Giriloyo - Melestarikan warisan budaya melalui eduwisata, teknologi Web3, dan pengalaman digital yang imersif.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-700 transition border border-amber-800/30">
                <span className="text-xl">📷</span>
              </button>
              <button className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-700 transition border border-amber-800/30">
                <span className="text-xl">💬</span>
              </button>
              <button className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-amber-700 transition border border-amber-800/30">
                <span className="text-xl">✉️</span>
              </button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4 text-base lg:text-lg text-amber-400">Jelajahi</h4>
            <ul className="space-y-2 text-stone-400 text-sm lg:text-base">
              <li><a href="#desa-wisata" onClick={(e) => handleNavClick(e, 'desa-wisata')} className="hover:text-amber-400 transition">Desa Wisata</a></li>
              <li><a href="#eduwisata" onClick={(e) => handleNavClick(e, 'eduwisata')} className="hover:text-amber-400 transition">Paket Eduwisata</a></li>
              <li><a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="hover:text-amber-400 transition">Belanja Batik</a></li>
              <li><a href="#games" onClick={(e) => handleNavClick(e, 'games')} className="hover:text-amber-400 transition">Games Interaktif</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4 text-base lg:text-lg text-amber-400">Bantuan</h4>
            <ul className="space-y-2 text-stone-400 text-sm lg:text-base">
              <li><Link href="/bookingwisatapage" className="hover:text-amber-400 transition">Cara Booking</Link></li>
              <li><a href="#" className="hover:text-amber-400 transition">Panduan Wisata</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Panduan NFT</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Kontak Kami</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 text-center">
          <p className="text-stone-500 text-sm lg:text-base mb-2">
            © 2024 Desa Wisata Batik Giriloyo. Powered by Next.js • NestJS • Crossmint • Midtrans
          </p>
          <p className="text-stone-600 text-xs">
            Best Tourism Village UNESCO 2021 🏛️ • Batik Tulis Warisan Budaya
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;