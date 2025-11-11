import React, { useState, useEffect } from 'react';
import { ShoppingBag, Gamepad2, Brain, Sparkles, Menu, X, ChevronRight, Award, Zap } from 'lucide-react';

const GiriloyoLanding = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const featuredProducts = [
    {
      id: 1,
      name: "Batik Kawung Klasik",
      price: "Rp 850.000",
      image: "https://images.unsplash.com/photo-1622994524768-6b7b1d4e0b5e?w=800&h=800&fit=crop&q=80",
      artisan: "Mbah Parmi",
      motif: "Kawung"
    },
    {
      id: 2,
      name: "Batik Parang Tulis",
      price: "Rp 1.200.000",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=800&fit=crop&q=80",
      artisan: "Pak Supardi",
      motif: "Parang"
    },
    {
      id: 3,
      name: "Batik Sogan Modern",
      price: "Rp 950.000",
      image: "https://images.unsplash.com/photo-1598378612686-45ef0e5b6a1c?w=800&h=800&fit=crop&q=80",
      artisan: "Bu Siti",
      motif: "Sogan"
    },
    {
      id: 4,
      name: "Batik Truntum Elegan",
      price: "Rp 1.100.000",
      image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&h=800&fit=crop&q=80",
      artisan: "Ibu Wahyuni",
      motif: "Truntum"
    },
    {
      id: 5,
      name: "Batik Mega Mendung",
      price: "Rp 980.000",
      image: "https://images.unsplash.com/photo-1616522999838-3a0e1d1e5a9e?w=800&h=800&fit=crop&q=80",
      artisan: "Pak Budi",
      motif: "Mega Mendung"
    },
    {
      id: 6,
      name: "Batik Sekar Jagad",
      price: "Rp 1.350.000",
      image: "https://images.unsplash.com/photo-1622994524768-6b7b1d4e0b5e?w=800&h=800&fit=crop&q=80",
      artisan: "Bu Lastri",
      motif: "Sekar Jagad"
    }
  ];

  return (
    <div className="min-h-screen bg-amber-50 overflow-x-hidden">
      {/* Animated Batik Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div 
          className="absolute inset-0 animate-pulse"
          style={{
            backgroundImage: `url('https://cdn.pixabay.com/photo/2020/11/29/10/42/batik-5787950_1280.jpg')`,
            backgroundSize: '400px 400px',
            backgroundRepeat: 'repeat',
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />
      </div>

      {/* Floating Batik Pattern Decoration */}
      <div className="fixed top-20 right-10 w-32 h-32 md:w-48 md:h-48 opacity-10 animate-spin-slow pointer-events-none hidden lg:block">
        <img 
          src="https://cdn.pixabay.com/photo/2020/11/29/10/41/batik-5787939_1280.jpg" 
          alt="decoration"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="fixed bottom-20 left-10 w-24 h-24 md:w-40 md:h-40 opacity-10 animate-bounce-slow pointer-events-none hidden lg:block">
        <img 
          src="https://cdn.pixabay.com/photo/2020/11/29/10/42/batik-5787948_1280.jpg" 
          alt="decoration"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-linear-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl lg:text-2xl">G</span>
              </div>
              <span className="text-xl lg:text-2xl font-bold bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Giriloyo Imersive
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-8 items-center">
              <a href="#home" className="text-gray-700 hover:text-orange-600 transition font-medium">Beranda</a>
              <a href="#products" className="text-gray-700 hover:text-orange-600 transition font-medium">Katalog</a>
              <a href="#games" className="text-gray-700 hover:text-orange-600 transition font-medium">Games</a>
              <a href="#ai" className="text-gray-700 hover:text-orange-600 transition font-medium">AI Insight</a>
              <button className="bg-linear-to-r from-orange-600 to-red-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-xl transition transform hover:scale-105">
                <ShoppingBag className="inline mr-2" size={18} />
                Belanja
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-orange-100 transition"
            >
              {menuOpen ? <X size={28} className="text-orange-600" /> : <Menu size={28} className="text-orange-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-orange-200 animate-slide-down">
            <div className="px-4 py-4 space-y-3">
              <a href="#home" className="block py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg px-4 transition font-medium">Beranda</a>
              <a href="#products" className="block py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg px-4 transition font-medium">Katalog</a>
              <a href="#games" className="block py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg px-4 transition font-medium">Games</a>
              <a href="#ai" className="block py-3 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg px-4 transition font-medium">AI Insight</a>
              <button className="w-full bg-linear-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-full font-semibold">
                <ShoppingBag className="inline mr-2" size={18} />
                Belanja Sekarang
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Batik Pattern */}
      <section id="home" className="relative py-12 lg:py-24 px-4 overflow-hidden">
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
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left space-y-6">
              <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-bounce-slow">
                🎨 Warisan UNESCO
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 bg-linear-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                Batik Tulis<br />Giriloyo
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0">
                Warisan Budaya Bertemu Teknologi Web3.<br />
                <span className="text-orange-600 font-semibold">Beli Batik Asli, Dapat NFT Gratis!</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-linear-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl transform hover:scale-105 transition flex items-center justify-center gap-2 text-base lg:text-lg">
                  <ShoppingBag size={22} />
                  Jelajahi Katalog
                </button>
                <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold border-2 border-orange-600 hover:bg-orange-50 transition flex items-center justify-center gap-2 text-base lg:text-lg">
                  <Gamepad2 size={22} />
                  Coba Mencanting
                </button>
              </div>
            </div>

            {/* Hero Image with Batik Pattern */}
            <div className="flex-1 w-full max-w-lg lg:max-w-none">
              <div className="relative group">
                <div className="absolute -inset-4 bg-linear-to-r from-orange-400 to-red-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition animate-pulse"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform group-hover:scale-105 transition duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1622994524768-6b7b1d4e0b5e?w=800&h=600&fit=crop&q=80" 
                    alt="Batik Giriloyo"
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce-slow">
                    🔗 + NFT Digital
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mt-12 lg:mt-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 text-center shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-2">150+</div>
              <div className="text-sm lg:text-base text-gray-600">Karya Batik</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 text-center shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-sm lg:text-base text-gray-600">Pengrajin</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 text-center shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-2">2000+</div>
              <div className="text-sm lg:text-base text-gray-600">Pembeli Puas</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 text-center shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-sm lg:text-base text-gray-600">Tulis Tangan</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="games" className="py-12 lg:py-20 px-4 bg-white/70 backdrop-blur-sm relative">
        {/* Batik Pattern Background */}
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
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-gray-800">
              Pengalaman Imersif
            </h2>
            <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
              Jelajahi dunia batik melalui teknologi interaktif dan AI
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Game 1 */}
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 hover:shadow-2xl transition transform hover:-translate-y-2 border-2 border-transparent hover:border-orange-300">
              <div className="bg-linear-to-br from-orange-100 to-red-100 w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center mb-6 transform hover:rotate-12 transition">
                <Gamepad2 className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4 text-gray-800">Mencanting Virtual</h3>
              <p className="text-sm lg:text-base text-gray-600 mb-6 leading-relaxed">
                Rasakan sensasi membatik secara virtual! Ikuti pola tradisional dan pelajari filosofi di balik setiap goresan.
              </p>
              <button className="text-orange-600 font-semibold flex items-center gap-2 hover:gap-4 transition-all group">
                Main Sekarang 
                <ChevronRight size={20} className="group-hover:animate-bounce" />
              </button>
            </div>

            {/* Game 2 */}
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 hover:shadow-2xl transition transform hover:-translate-y-2 border-2 border-transparent hover:border-blue-300">
              <div className="bg-linear-to-br from-blue-100 to-purple-100 w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center mb-6 transform hover:rotate-12 transition">
                <Brain className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4 text-gray-800">Kuis Cerdas Budaya</h3>
              <p className="text-sm lg:text-base text-gray-600 mb-6 leading-relaxed">
                Uji pengetahuan Anda tentang batik! Kompetisi real-time dengan sistem leaderboard yang dinamis.
              </p>
              <button className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-4 transition-all group">
                Ikut Kuis 
                <ChevronRight size={20} className="group-hover:animate-bounce" />
              </button>
            </div>

            {/* AI Insight */}
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 hover:shadow-2xl transition transform hover:-translate-y-2 border-2 border-transparent hover:border-purple-300 sm:col-span-2 lg:col-span-1">
              <div className="bg-linear-to-br from-purple-100 to-pink-100 w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center mb-6 transform hover:rotate-12 transition">
                <Sparkles className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold mb-4 text-gray-800">AI Insight</h3>
              <p className="text-sm lg:text-base text-gray-600 mb-6 leading-relaxed">
                Dapatkan rekomendasi batik personal dari AI yang memahami filosofi dan kecocokan untuk Anda.
              </p>
              <button className="text-purple-600 font-semibold flex items-center gap-2 hover:gap-4 transition-all group">
                Tanya AI 
                <ChevronRight size={20} className="group-hover:animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-12 lg:py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4 text-gray-800">
              Koleksi Pilihan
            </h2>
            <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
              Setiap batik dilengkapi dengan <span className="text-orange-600 font-semibold">NFT</span> sebagai sertifikat keaslian digital
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
                  <div className="absolute top-4 right-4 bg-linear-to-r from-orange-600 to-red-600 text-white px-3 py-1 rounded-full text-xs lg:text-sm font-bold shadow-lg flex items-center gap-1">
                    <Award size={14} />
                    NFT
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Motif {product.motif}
                  </div>
                </div>
                <div className="p-5 lg:p-6">
                  <h3 className="text-lg lg:text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 text-xs lg:text-sm mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Dibuat oleh {product.artisan}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl lg:text-2xl font-bold text-orange-600">{product.price}</span>
                    <button className="bg-linear-to-r from-orange-600 to-red-600 text-white px-4 lg:px-6 py-2 rounded-full font-semibold hover:shadow-lg transition transform hover:scale-105 text-sm lg:text-base">
                      Lihat Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold border-3 border-orange-600 hover:bg-orange-600 hover:text-white transition text-base lg:text-lg shadow-xl hover:shadow-2xl transform hover:scale-105">
              Lihat Semua Koleksi →
            </button>
          </div>
        </div>
      </section>

      {/* Phygital Banner with Batik Pattern */}
      <section id="ai" className="py-12 lg:py-20 px-4 bg-linear-to-r from-orange-600 via-red-600 to-pink-600 relative overflow-hidden">
        {/* Animated Batik Pattern */}
        <div 
          className="absolute inset-0 opacity-10 animate-slide-up"
          style={{
            backgroundImage: `url('https://cdn.pixabay.com/photo/2020/11/29/10/41/batik-5787939_1280.jpg')`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
          }}
        />
        
        <div className="max-w-5xl mx-auto text-center text-white relative z-10">
          <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold mb-6 animate-bounce-slow">
            🚀 Inovasi Terbaru
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Phygital Experience
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl mb-10 opacity-95 max-w-3xl mx-auto leading-relaxed">
            Beli batik asli, dapatkan <span className="font-bold underline">NFT gratis</span> sebagai sertifikat digital yang tersimpan selamanya di blockchain
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 justify-center items-center mb-10">
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 lg:p-8 hover:bg-white/30 transition transform hover:scale-105 w-full sm:w-auto">
              <div className="text-5xl lg:text-6xl mb-4 animate-bounce-slow">🎨</div>
              <p className="font-bold text-lg lg:text-xl">Batik Fisik</p>
              <p className="text-sm lg:text-base opacity-90 mt-2">Karya tulis tangan</p>
            </div>
            
            <div className="flex items-center justify-center">
              <Zap className="text-yellow-300 animate-pulse" size={40} />
            </div>
            
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 lg:p-8 hover:bg-white/30 transition transform hover:scale-105 w-full sm:w-auto">
              <div className="text-5xl lg:text-6xl mb-4 animate-bounce-slow">🔗</div>
              <p className="font-bold text-lg lg:text-xl">NFT Digital</p>
              <p className="text-sm lg:text-base opacity-90 mt-2">Sertifikat blockchain</p>
            </div>
          </div>

          <button className="bg-white text-orange-600 px-8 lg:px-12 py-4 rounded-full font-bold text-base lg:text-xl hover:bg-gray-100 transition shadow-2xl transform hover:scale-110 hover:shadow-orange-300/50">
            Mulai Berbelanja Sekarang
          </button>
        </div>
      </section>

      {/* Footer with Batik Pattern */}
      <footer className="bg-gray-900 text-white py-12 lg:py-16 px-4 relative overflow-hidden">
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
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 bg-linear-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Giriloyo Imersive
              </h3>
              <p className="text-gray-400 mb-6 text-sm lg:text-base leading-relaxed">
                Melestarikan warisan budaya batik tulis Giriloyo melalui teknologi Web3 dan pengalaman digital yang imersif.
              </p>
              <div className="flex gap-4">
                <button className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-600 transition">
                  <span className="text-xl">📷</span>
                </button>
                <button className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-600 transition">
                  <span className="text-xl">💬</span>
                </button>
                <button className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-orange-600 transition">
                  <span className="text-xl">✉️</span>
                </button>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold mb-4 text-base lg:text-lg">Jelajahi</h4>
              <ul className="space-y-2 text-gray-400 text-sm lg:text-base">
                <li><a href="#" className="hover:text-orange-400 transition">Katalog Batik</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Games</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">AI Insight</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Tentang Kami</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold mb-4 text-base lg:text-lg">Bantuan</h4>
              <ul className="space-y-2 text-gray-400 text-sm lg:text-base">
                <li><a href="#" className="hover:text-orange-400 transition">FAQ</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Cara Pembelian</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Panduan NFT</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Kontak</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 text-sm lg:text-base">
              © 2024 Giriloyo Imersive. Powered by Next.js • NestJS • Crossmint • Midtrans
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Batik Tulis Giriloyo - Warisan Budaya UNESCO
            </p>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
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