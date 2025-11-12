import React, { useState, useEffect } from 'react';
import { ShoppingBag, Gamepad2, Brain, Sparkles, Menu, X, ChevronRight, Award, Zap, Search, User } from 'lucide-react';
import Image from 'next/image';

const GiriloyoLanding = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 const featuredProducts = [
    { id: 1, name: "Batik Kawung Klasik", price: "Rp 850.000", image: "/kawung.png", artisan: "Mbah Parmi", motif: "Kawung" },
    { id: 2, name: "Batik Parang RuSak Tulis", price: "Rp 1.200.000", image: "/parang.png", artisan: "Pak Supardi", motif: "Parang" },
    { id: 3, name: "Batik Sogan Modern", price: "Rp 950.000", image: "/sogan.png", artisan: "Bu Siti", motif: "Sogan" },
    { id: 4, name: "Batik Truntum Elegan", price: "Rp 1.100.000", image: "/truntum.png", artisan: "Ibu Wahyuni", motif: "Truntum" },
    { id: 5, name: "Batik Mega Mendung", price: "Rp 980.000", image: "/mega-mendung.png", artisan: "Pak Budi", motif: "Mega Mendung" },
    { id: 6, name: "Batik Sekar Jagad", price: "Rp 1.350.000", image: "/sekar-jagad.png", artisan: "Bu Lastri", motif: "Sekar Jagad" }
  ];
const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Mencegah "lompatan" instan
    const targetId = e.currentTarget.href.split('#')[1];
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth', // Ini adalah kuncinya
        block: 'start' 
      });
    }
    // Menutup menu mobile jika sedang terbuka
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 overflow-x-hidden">
      {/* Animated Batik Background Pattern */}
        <div className="fixed inset-0 opacity-5 pointer-events-none">
          <div 
            className="absolute inset-0 animate-bg-scroll-slow"
            style={{
              backgroundImage: `url('/batik2.jpg')`, // Path yang benar
              backgroundSize: '300px 3000px', // Ukuran pola yang lebih baik
              backgroundRepeat: 'repeat',
            }}
          />
        </div>

      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-lg shadow-md sticky top-0 z-50 border-b-2 border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <div className="flex items-center space-x-3">
              {/* --- PERBAIKAN 1: Logo diubah ke next/image --- */}
              <Image 
                  src="/logo-web.png"
                  alt="Logo"
                  width={120}
                  height={120}
                  className="w-full h-full object-contain"
                />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-8 items-center">
              {/* --- PERBAIKAN 2: Menambahkan onClick={handleNavClick} --- */}
              <a href="#home" onClick={handleNavClick} className="text-stone-700 hover:text-amber-800 transition font-medium">Beranda</a>
              <a href="#products" onClick={handleNavClick} className="text-stone-700 hover:text-amber-800 transition font-medium">Katalog</a>
              <a href="#games" onClick={handleNavClick} className="text-stone-700 hover:text-amber-800 transition font-medium">Games</a>
              <a href="#ai" onClick={handleNavClick} className="text-stone-700 hover:text-amber-800 transition font-medium">AI Insight</a>
              <button className="p-2 hover:bg-amber-50 rounded-full transition">
                <Search className="text-stone-600" size={20} />
              </button>
              <button className="p-2 hover:bg-amber-50 rounded-full transition">
                <User className="text-stone-600" size={20} />
              </button>
              <button className="bg-linear-to-rrom-amber-800 to-amber-900 text-amber-50 px-6 py-2.5 rounded-full font-semibold hover:shadow-xl transition transform hover:scale-105 flex items-center gap-2">
                <ShoppingBag size={18} />
                Belanja
              </button>
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
              {/* --- PERBAIKAN 2: Menambahkan onClick={handleNavClick} --- */}
              <a href="#home" onClick={handleNavClick} className="block py-3 text-stone-700 hover:text-amber-800 hover:bg-amber-50 rounded-lg px-4 transition font-medium">Beranda</a>
              <a href="#products" onClick={handleNavClick} className="block py-3 text-stone-700 hover:text-amber-800 hover:bg-amber-50 rounded-lg px-4 transition font-medium">Katalog</a>
              <a href="#games" onClick={handleNavClick} className="block py-3 text-stone-700 hover:text-amber-800 hover:bg-amber-50 rounded-lg px-4 transition font-medium">Games</a>
              <a href="#ai" onClick={handleNavClick} className="block py-3 text-stone-700 hover:text-amber-800 hover:bg-amber-50 rounded-lg px-4 transition font-medium">AI Insight</a>
              <button className="w-full bg-linear-to-r from-amber-800 to-amber-900 text-amber-50 px-6 py-3 rounded-full font-semibold flex items-center justify-center gap-2">
                <ShoppingBag size={18} />
                Belanja Sekarang
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative py-12 lg:py-20 px-4 overflow-hidden">
        {/* Animated Batik Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 animate-slide-right"
            style={{
              backgroundImage: `url('https://cdn.pixabay.com/photo/2020/11/29/10/41/batik-5787937_1280.jpg')`,
              backgroundSize: '300px 300px',
              backgroundRepeat: 'repeat',
            }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left space-y-6 lg:space-y-8">
              <div className="inline-block bg-amber-100 text-amber-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
                🏛️ Warisan UNESCO
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block text-stone-800 mb-2">Satu-satunya tempat</span>
                <span className="block bg-linear-to-r from-amber-700 via-amber-800 to-amber-900 bg-clip-text text-transparent">batik kustom Anda</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-stone-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Buat batik kustom Anda dengan 300+ motif kami yang dibuat dengan kualitas premium dalam 3 hari kerja
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <button className="bg-linear-to-r from-amber-800 to-amber-900 text-amber-50 px-8 py-4 rounded-full font-semibold hover:shadow-2xl transform hover:scale-105 transition text-base lg:text-lg">
                  BELANJA SEKARANG
                </button>
                <button className="bg-white text-amber-800 px-8 py-4 rounded-full font-semibold border-2 border-amber-800 hover:bg-amber-50 transition text-base lg:text-lg">
                  <Gamepad2 className="inline mr-2" size={22} />
                  Coba Mencanting
                </button>
              </div>

              {/* Question Section */}
              <div className="pt-8 lg:pt-12">
                <p className="text-stone-700 font-medium mb-3">Anda memakai batik untuk acara apa?</p>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <button className="px-6 py-2 bg-white border-2 border-amber-200 rounded-full text-stone-700 hover:border-amber-500 hover:bg-amber-50 transition font-medium text-sm">
                    Formal
                  </button>
                  <button className="px-6 py-2 bg-white border-2 border-amber-200 rounded-full text-stone-700 hover:border-amber-500 hover:bg-amber-50 transition font-medium text-sm">
                    Kasual
                  </button>
                  <button className="px-6 py-2 bg-white border-2 border-amber-200 rounded-full text-stone-700 hover:border-amber-500 hover:bg-amber-50 transition font-medium text-sm">
                    Acara
                  </button>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex-1 w-full max-w-md lg:max-w-xl relative">
              <div className="relative">
                <div className="absolute -inset-4 bg-linear-to-br from-amber-300 to-amber-500 rounded-3xl blur-3xl opacity-20 animate-pulse"></div>
                <img 
                  src="/Muslimbatik.png" 
                  alt="Model Batik"
                  className="relative w-120 h-auto rounded-3xl shadow-2xl"
                />
                <div className="absolute top-6 right-6 flex flex-col gap-3">
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                        <span className="text-amber-800 text-xs font-bold">01</span>
                      </div>
                      <div>
                        <p className="text-xs text-stone-500">Langkah 1</p>
                        <p className="text-sm font-bold text-stone-800">Pilih Motif</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                        <span className="text-amber-800 text-xs font-bold">02</span>
                      </div>
                      <div>
                        <p className="text-xs text-stone-500">Langkah 2</p>
                        <p className="text-sm font-bold text-stone-800">Pilih Ukuran</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 300+ Patterns Section */}
      <section className="py-16 lg:py-24 px-4 bg-white/70 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold text-stone-800 mb-4">
              300+ Motif
            </h2>
            <p className="text-base lg:text-lg text-stone-600 max-w-2xl mx-auto">
              Buat batik kustom Anda dengan lebih dari 300 motif autentik yang dibuat dengan kualitas premium
            </p>
          </div>

          {/* Pattern Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6 mb-8">
            {featuredProducts.slice(0, 5).map((product, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.motif}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition">
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-bold text-sm">{product.motif}</p>
                    <p className="text-amber-200 text-xs">{product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-linear-to-r from-amber-800 to-amber-900 text-amber-50 px-10 py-4 rounded-full font-bold hover:shadow-xl transition transform hover:scale-105 text-base lg:text-lg">
              JELAJAHI MOTIF
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 lg:py-24 px-4 bg-amber-50 relative">
        <div 
          className="absolute inset-0 opacity-5 animate-slide-left"
          style={{
            backgroundImage: `url('https://cdn.pixabay.com/photo/2020/11/29/10/42/batik-5787950_1280.jpg')`,
            backgroundSize: '250px 250px',
            backgroundRepeat: 'repeat',
          }}
        />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-stone-800 mb-4">
              Cara Kerjanya
            </h2>
            <p className="text-base lg:text-lg text-stone-600">
              Setiap batik dilengkapi dengan <span className="text-amber-600 font-semibold">NFT</span> sebagai sertifikat keaslian digital
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: '🎨', title: 'Pilih Motif', desc: 'Pilih dari 300+ motif batik autentik' },
              { icon: '📏', title: 'Pilih Ukuran', desc: 'Pilih ukuran dan jenis kain pilihan Anda' },
              { icon: '🎭', title: 'Kustomisasi', desc: 'Sesuaikan warna dan penempatan sesuai gaya Anda' },
              { icon: '🚚', title: 'Pengiriman', desc: 'Terima batik Anda dalam 3 hari kerja + sertifikat NFT' },
            ].map((step, index) => (
              <div key={index} className="bg-white rounded-3xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition text-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-linear-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl lg:text-4xl">
                  {step.icon}
                </div>
                <div className="w-10 h-10 bg-amber-800 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  {index + 1}
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-stone-800 mb-2">{step.title}</h3>
                <p className="text-sm lg:text-base text-stone-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customize Your Style */}
      <section className="py-16 lg:py-24 px-4 bg-linear-to-br from-amber-100 to-amber-200 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://cdn.pixabay.com/photo/2020/11/29/10/41/batik-5787937_1280.jpg')`,
            backgroundSize: '400px 400px',
            backgroundRepeat: 'repeat',
          }}
        />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <span className="inline-block bg-white/80 text-amber-900 px-4 py-2 rounded-full text-sm font-bold mb-4">
                ✨ Personalisasi Sempurna
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-stone-800 mb-6 leading-tight">
                Kustomisasi<br />gaya Anda
              </h2>
              <p className="text-lg lg:text-xl text-stone-700 mb-8 leading-relaxed">
                Padu padankan motif, warna, dan ukuran untuk menciptakan batik sempurna Anda. Setiap karya dibuat tangan oleh pengrajin ahli dari Giriloyo.
              </p>
              <button className="bg-linear-to-r from-amber-800 to-amber-900 text-amber-50 px-10 py-4 rounded-full font-bold hover:shadow-2xl transition transform hover:scale-105 text-lg">
                MULAI KUSTOMISASI
              </button>
            </div>

            <div className="flex-1 relative">
              <div className="relative">
                <img 
                  src="/female-batik.jpg"
                  alt="Kustomisasi"
                  width={400}
                  height={400}
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-linear-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                      <Sparkles className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-stone-500">Didukung AI</p>
                      <p className="font-bold text-stone-800">Rekomendasi Cerdas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Games Section */}
      <section id="games" className="py-16 lg:py-24 px-4 bg-white/70 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-stone-800">
              Pengalaman Imersif
            </h2>
            <p className="text-base lg:text-lg text-stone-600 max-w-2xl mx-auto">
              Jelajahi dunia batik melalui teknologi interaktif dan AI
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Game 1 */}
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 hover:shadow-2xl transition transform hover:-translate-y-2 border-2 border-transparent hover:border-amber-300">
              <div className="bg-linear-to-br from-amber-100 to-amber-200 w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center mb-6 transform hover:rotate-12 transition">
                <Gamepad2 className="text-amber-800" size={32} />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4 text-stone-800">Mencanting Virtual</h3>
              <p className="text-sm lg:text-base text-stone-600 mb-6 leading-relaxed">
                Rasakan sensasi membatik secara virtual! Ikuti pola tradisional dan pelajari filosofi di balik setiap goresan.
              </p>
              <button className="text-amber-800 font-semibold flex items-center gap-2 hover:gap-4 transition-all group">
                Main Sekarang 
                <ChevronRight size={20} className="group-hover:animate-bounce" />
              </button>
            </div>

            {/* Game 2 */}
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 hover:shadow-2xl transition transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-300">
              <div className="bg-linear-to-br from-blue-100 to-blue-200 w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center mb-6 transform hover:rotate-12 transition">
                <Brain className="text-blue-800" size={32} />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4 text-stone-800">Kuis Cerdas Budaya</h3>
              <p className="text-sm lg:text-base text-stone-600 mb-6 leading-relaxed">
                Uji pengetahuan Anda tentang batik! Kompetisi real-time dengan sistem leaderboard yang dinamis.
              </p>
              <button className="text-blue-800 font-semibold flex items-center gap-2 hover:gap-4 transition-all group">
                Ikut Kuis 
                <ChevronRight size={20} className="group-hover:animate-bounce" />
              </button>
            </div>

            {/* AI Insight */}
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 hover:shadow-2xl transition transform hover:-translate-y-2 border-2 border-transparent hover:border-amber-300 sm:col-span-2 lg:col-span-1">
              <div className="bg-linear-to-br from-amber-100 to-yellow-200 w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center mb-6 transform hover:rotate-12 transition">
                <Sparkles className="text-amber-600" size={32} />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4 text-stone-800">AI Insight</h3>
              <p className="text-sm lg:text-base text-stone-600 mb-6 leading-relaxed">
                Dapatkan rekomendasi batik personal dari AI yang memahami filosofi dan kecocokan untuk Anda.
              </p>
              <button className="text-amber-700 font-semibold flex items-center gap-2 hover:gap-4 transition-all group">
                Tanya AI 
                <ChevronRight size={20} className="group-hover:animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Batik Stories Section */}
      <section className="py-16 lg:py-24 px-4 bg-linear-to-br from-stone-100 to-amber-50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold text-stone-800 mb-4">
              Cerita Batik
            </h2>
            <p className="text-base lg:text-lg text-stone-600">
              Cerita di balik setiap motif batik Giriloyo
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition group">
              <img 
                src="/batik1.jpg"
                alt="Cerita"
                className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="p-6 lg:p-8">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold mb-3">
                  TRADISI
                </span>
                <h3 className="text-xl lg:text-2xl font-bold text-stone-800 mb-3">
                  Komunitas 50+ Pengrajin Ahli
                </h3>
                <p className="text-stone-600 text-sm lg:text-base mb-4 leading-relaxed">
                  Temui para pengrajin yang melestarikan teknik batik berusia berabad-abad di desa Giriloyo...
                </p>
                <button className="text-amber-800 font-semibold flex items-center gap-2 hover:gap-4 transition-all">
                  Baca Selengkapnya <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phygital Banner with Batik Pattern */}
      <section id="ai" className="py-16 lg:py-24 px-4 bg-linear-to-r from-amber-800 via-amber-900 to-stone-900 relative overflow-hidden">
        {/* Animated Batik Pattern */}
        <div 
          className="absolute inset-0 opacity-10 animate-slide-up"
          style={{
            backgroundImage: `url('https://cdn.pixabay.com/photo/2020/11/29/10/41/batik-5787939_1280.jpg')`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
          }}
        />
        
        <div className="max-w-5xl mx-auto text-center text-amber-50 relative z-10">
          <div className="inline-block bg-amber-700/30 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold mb-6 border border-amber-500/30">
            🚀 Inovasi Web3
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Pengalaman Phygital
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl mb-10 opacity-95 max-w-3xl mx-auto leading-relaxed">
            Beli batik asli, dapatkan <span className="font-bold text-amber-300 underline decoration-amber-400">NFT gratis</span> sebagai sertifikat digital yang tersimpan selamanya di blockchain
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 justify-center items-center mb-10">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 hover:bg-white/20 transition transform hover:scale-105 w-full sm:w-auto border border-amber-500/20">
              <div className="text-5xl lg:text-6xl mb-4">🎨</div>
              <p className="font-bold text-lg lg:text-xl mb-2">Batik Fisik</p>
              <p className="text-sm lg:text-base opacity-90">Karya tulis tangan asli</p>
            </div>
            
            <div className="flex items-center justify-center">
              <Zap className="text-amber-300 animate-pulse" size={40} />
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 lg:p-8 hover:bg-white/20 transition transform hover:scale-105 w-full sm:w-auto border border-amber-500/20">
              <div className="text-5xl lg:text-6xl mb-4">🔗</div>
              <p className="font-bold text-lg lg:text-xl mb-2">NFT Digital</p>
              <p className="text-sm lg:text-base opacity-90">Sertifikat blockchain</p>
            </div>
          </div>

          <button className="bg-amber-50 text-amber-900 px-8 lg:px-12 py-4 rounded-full font-bold text-base lg:text-xl hover:bg-white transition shadow-2xl transform hover:scale-110 hover:shadow-amber-500/50">
            Mulai Berbelanja Sekarang
          </button>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section id="products" className="py-16 lg:py-24 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-stone-800">
              Koleksi Premium
            </h2>
            <p className="text-base lg:text-lg text-stone-600 max-w-2xl mx-auto">
              Setiap batik dilengkapi dengan <span className="text-amber-600 font-semibold">NFT</span> sebagai sertifikat keaslian digital
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 group border border-stone-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden bg-stone-100">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                  <div className="absolute top-4 right-4 bg-linear-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-xs lg:text-sm font-bold shadow-lg flex items-center gap-1">
                    <Award size={14} />
                    NFT
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-stone-800 px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                    Motif {product.motif}
                  </div>
                </div>
                <div className="p-5 lg:p-6">
                  <h3 className="text-lg lg:text-xl font-bold mb-2 text-stone-800">{product.name}</h3>
                  <p className="text-stone-600 text-xs lg:text-sm mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Dibuat oleh {product.artisan}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl lg:text-2xl font-bold text-amber-700">{product.price}</span>
                    <button className="bg-linear-to-r from-amber-800 to-amber-900 text-amber-50 px-4 lg:px-6 py-2 rounded-full font-semibold hover:shadow-lg transition transform hover:scale-105 text-sm lg:text-base">
                      Lihat Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-white text-amber-800 px-8 py-4 rounded-full font-bold border-2 border-amber-800 hover:bg-amber-800 hover:text-amber-50 transition text-base lg:text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
              Lihat Semua Koleksi →
            </button>
          </div>
        </div>
      </section>

      {/* Footer with Batik Pattern */}
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
              <div className="flex items-center gap-3 mb-4">
                <div className="w-40 h-25 bg-linear-to-br from-amber-600 to-amber-800 rounded-lg flex items-center justify-center shadow-lg">
                  <Image 
                  src="/logo-web.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
                </div>
              </div>
              <p className="text-stone-400 mb-6 text-sm lg:text-base leading-relaxed">
                Melestarikan warisan budaya batik tulis Giriloyo melalui teknologi Web3 dan pengalaman digital yang imersif.
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
                <li><a href="#" className="hover:text-amber-400 transition">Katalog Batik</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Games</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">AI Insight</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Tentang Kami</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold mb-4 text-base lg:text-lg text-amber-400">Bantuan</h4>
              <ul className="space-y-2 text-stone-400 text-sm lg:text-base">
                <li><a href="#" className="hover:text-amber-400 transition">FAQ</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Cara Pembelian</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Panduan NFT</a></li>
                <li><a href="#" className="hover:text-amber-400 transition">Kontak</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-stone-800 pt-8 text-center">
            <p className="text-stone-500 text-sm lg:text-base mb-2">
              © 2024 Giriloyo Imersive. Powered by Next.js • NestJS • Crossmint • Midtrans
            </p>
            <p className="text-stone-600 text-xs">
              Batik Tulis Giriloyo - Warisan Budaya UNESCO 🏛️
            </p>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes bg-scroll-slow {
          from { background-position: 0 0; }
          to { background-position: 0 -300px; } /* -300px = 1x backgroundSize */
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes slide-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(50px); }
        }
        
        @keyframes slide-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50px); }
        }
        
        @keyframes slide-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50px); }
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-slide-right {
          animation: slide-right 30s linear infinite;
        }
        
        .animate-slide-left {
          animation: slide-left 25s linear infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 20s linear infinite;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default GiriloyoLanding;