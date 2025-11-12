import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Calendar } from 'lucide-react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur-lg shadow-md sticky top-0 z-50 border-b-2 border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <div className="flex items-center space-x-3">
            <Link href="/" className="cursor-pointer">
              <Image 
                src="/logo-web.png"
                alt="Logo"
                width={40}
                height={40}
                className="w-40 h-30 object-contain"
              />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-8 items-center">
            <Link href="/" className="text-stone-700 hover:text-amber-800 transition font-medium">
              Beranda
            </Link>
            <a href="#desa-wisata" onClick={(e) => handleNavClick(e, 'desa-wisata')} className="text-stone-700 hover:text-amber-800 transition font-medium">Desa Wisata</a>
            <a href="#eduwisata" onClick={(e) => handleNavClick(e, 'eduwisata')} className="text-stone-700 hover:text-amber-800 transition font-medium">Eduwisata</a>
            <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="text-stone-700 hover:text-amber-800 transition font-medium">Belanja</a>
            <a href="#games" onClick={(e) => handleNavClick(e, 'games')} className="text-stone-700 hover:text-amber-800 transition font-medium">Games</a>
            <Link href="/bookingwisatapage">
              <button className="bg-gradient-to-r from-amber-800 to-amber-900 text-amber-50 px-6 py-2.5 rounded-full font-semibold hover:shadow-xl transition transform hover:scale-105 flex items-center gap-2">
                <Calendar size={18} />
                Booking Paket
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-amber-100 transition"
          >
            {menuOpen ? <X size={28} className="text-amber-800" /> : <Menu size={28} className="text-amber-800" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-amber-200 animate-slide-down">
          <div className="px-4 py-4 space-y-3">
            <Link href="/" className="block py-3 text-stone-700 hover:text-amber-800 hover:bg-amber-50 rounded-lg px-4 transition font-medium">
              Beranda
            </Link>
            <a href="#desa-wisata" onClick={(e) => handleNavClick(e, 'desa-wisata')} className="block py-3 text-stone-700 hover:text-amber-800 hover:bg-amber-50 rounded-lg px-4 transition font-medium">Desa Wisata</a>
            <a href="#eduwisata" onClick={(e) => handleNavClick(e, 'eduwisata')} className="block py-3 text-stone-700 hover:text-amber-800 hover:bg-amber-50 rounded-lg px-4 transition font-medium">Eduwisata</a>
            <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="block py-3 text-stone-700 hover:text-amber-800 hover:bg-amber-50 rounded-lg px-4 transition font-medium">Belanja</a>
            <a href="#games" onClick={(e) => handleNavClick(e, 'games')} className="block py-3 text-stone-700 hover:text-amber-800 hover:bg-amber-50 rounded-lg px-4 transition font-medium">Games</a>
            <Link href="/bookingwisatapage" className="w-full">
              <button className="w-full bg-gradient-to-r from-amber-800 to-amber-900 text-amber-50 px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2">
                <Calendar size={18} />
                Booking Paket Wisata
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;