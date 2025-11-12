import React, { useState } from 'react';
import { ShoppingCart, Heart, Share2, Award, ChevronLeft, ChevronRight, ZoomIn, Sparkles, Check, Star, MapPin, Clock } from 'lucide-react';
import router from 'next/router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('sogan');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const product = {
    id: 1,
    name: "Batik Kawung Klasik Premium",
    price: 850000,
    originalPrice: 1200000,
    discount: 29,
    rating: 4.9,
    reviews: 127,
    sold: 245,
    artisan: "Mbah Parmi",
    location: "Giriloyo, Yogyakarta",
    images: [
      "/kawung.png",
      "/kawung2.png",
      "/kawung3.png",
      "/kawung4.png"
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { id: 'sogan', name: 'Sogan Natural', hex: '#8B7355' },
      { id: 'indigo', name: 'Indigo Klasik', hex: '#1E3A8A' },
      { id: 'merah', name: 'Merah Merapi', hex: '#991B1B' }
    ],
    description: "Batik Kawung adalah salah satu motif batik tertua dan paling dihormati dalam tradisi Jawa. Motif ini melambangkan kesempurnaan, kemurnian, dan umur panjang. Setiap goresan dibuat dengan tangan oleh pengrajin berpengalaman menggunakan teknik tulis tradisional yang telah diwariskan turun-temurun.",
    features: [
      "100% Katun Premium",
      "Pewarna Alami",
      "Proses Tulis Tangan (7-14 hari)",
      "Sertifikat Keaslian",
      "NFT Digital Gratis",
      "Garansi Luntur 1 Tahun"
    ],
    processingTime: "7-14 hari kerja",
    nftIncluded: true
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = () => {
    alert(`Added to cart:\n${product.name}\nSize: ${selectedSize}\nColor: ${selectedColor}\nQty: ${quantity}`);
  };

  const handleBuyNow = () => {
  router.push('/checkoutpage');
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl aspect-square">
              <img 
                src={product.images[selectedImage]}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-300 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-sm">
                  -{product.discount}%
                </div>
              )}
              {product.nftIncluded && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                  <Award size={16} />
                  NFT
                </div>
              )}
              <button 
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <ZoomIn size={20} className="text-stone-800" />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition ${
                    selectedImage === idx ? 'border-amber-600 shadow-lg' : 'border-stone-200 hover:border-amber-400'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl lg:text-4xl font-bold text-stone-800 leading-tight">
                  {product.name}
                </h1>
                <button 
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`p-3 rounded-full transition ${
                    isFavorited ? 'bg-red-100 text-red-600' : 'bg-stone-100 text-stone-600 hover:bg-red-50 hover:text-red-600'
                  }`}
                >
                  <Heart size={24} fill={isFavorited ? 'currentColor' : 'none'} />
                </button>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-amber-500 fill-amber-500" />
                  <span className="font-bold text-stone-800">{product.rating}</span>
                  <span className="text-stone-600">({product.reviews} ulasan)</span>
                </div>
                <span className="text-stone-400">•</span>
                <span className="text-stone-600">{product.sold} terjual</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-amber-700">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-stone-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-stone-600">
                <MapPin size={16} />
                <span>Dibuat oleh <span className="font-semibold text-amber-800">{product.artisan}</span> • {product.location}</span>
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <label className="block text-sm font-bold text-stone-800 mb-3">
                Ukuran: <span className="text-amber-700">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-xl font-semibold transition ${
                      selectedSize === size
                        ? 'bg-amber-800 text-white shadow-lg'
                        : 'bg-white text-stone-800 border-2 border-stone-200 hover:border-amber-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <label className="block text-sm font-bold text-stone-800 mb-3">
                Warna: <span className="text-amber-700">{product.colors.find(c => c.id === selectedColor)?.name}</span>
              </label>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`relative w-16 h-16 rounded-xl border-2 transition ${
                      selectedColor === color.id ? 'border-amber-600 shadow-lg' : 'border-stone-200 hover:border-amber-400'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {selectedColor === color.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
                        <Check size={24} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-bold text-stone-800 mb-3">Jumlah</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 bg-white border-2 border-stone-200 rounded-xl font-bold text-stone-800 hover:border-amber-400 transition"
                >
                  -
                </button>
                <span className="text-2xl font-bold text-stone-800 w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 bg-white border-2 border-stone-200 rounded-xl font-bold text-stone-800 hover:border-amber-400 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-white text-amber-800 border-2 border-amber-800 px-8 py-4 rounded-full font-bold hover:bg-amber-50 transition text-lg flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Keranjang
              </button>
              <button
                onClick={handleBuyNow}
            
                className="flex-1 bg-gradient-to-r from-amber-800 to-amber-900 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition text-lg"
              >
                Beli Sekarang
              </button>
            </div>

            {/* Share */}
            <button className="w-full bg-stone-100 text-stone-800 px-8 py-3 rounded-full font-semibold hover:bg-stone-200 transition flex items-center justify-center gap-2">
              <Share2 size={18} />
              Bagikan Produk
            </button>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12 lg:mt-16 bg-white rounded-3xl shadow-xl p-8 lg:p-12">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-stone-800 mb-4">Deskripsi Produk</h2>
              <p className="text-stone-600 leading-relaxed mb-6">{product.description}</p>
              
              <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <Clock className="text-amber-700" size={24} />
                <div>
                  <p className="text-sm text-stone-600">Waktu Pembuatan</p>
                  <p className="font-bold text-stone-800">{product.processingTime}</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold text-stone-800 mb-4">Keunggulan</h2>
              <div className="space-y-3">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-green-600" />
                    </div>
                    <span className="text-stone-700">{feature}</span>
                  </div>
                ))}
              </div>

              {product.nftIncluded && (
                <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                  <div className="flex items-center gap-3 mb-3">
                    <Sparkles className="text-purple-600" size={24} />
                    <h3 className="font-bold text-stone-800">NFT Digital Certificate</h3>
                  </div>
                  <p className="text-sm text-stone-600">
                    Setiap pembelian dilengkapi dengan NFT sebagai sertifikat keaslian digital yang tersimpan permanen di blockchain.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    
  );
};

export default ProductDetailPage;