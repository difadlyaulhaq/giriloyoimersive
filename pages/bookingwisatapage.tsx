import React, { useState } from 'react';
import { Calendar, Users, School, Mail, Phone, MapPin, Clock, Check, ChevronRight, Award, Sparkles } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

// PERBAIKAN: Definisikan tipe data untuk paket
const packages = {
  'half-day': {
    title: "Paket Half Day",
    duration: "4-5 Jam",
    price: 150000,
    minParticipants: 20,
    features: [
      "Workshop Membatik 2 jam",
      "Tour Sentra Batik",
      "Welcome Drink",
      "Sertifikat & Hasil Karya"
    ],
    popular: false
  },
  'full-day': {
    title: "Paket Full Day",
    duration: "8-9 Jam",
    price: 275000,
    minParticipants: 20,
    features: [
      "Workshop Membatik 4 jam",
      "Makan Siang Tradisional",
      "Trekking Desa & Watu Gagak",
      "Homestay Experience",
      "Sertifikat & Hasil Karya"
    ],
    popular: true
  },
  'study-tour': {
    title: "Paket Study Tour",
    duration: "2 Hari 1 Malam",
    price: 450000,
    minParticipants: 20,
    features: [
      "Workshop Batik Intensif",
      "Menginap di Homestay",
      "3x Makan (Lunch, Dinner, Breakfast)",
      "Cultural Night",
      "Dokumentasi Profesional",
      "Sertifikat & Souvenir"
    ],
    popular: false
  }
};

type PackageKey = keyof typeof packages;

const BookingWisataPage = () => {
  const [selectedPackage, setSelectedPackage] = useState<PackageKey>('full-day');
  
  const [bookingData, setBookingData] = useState({
    packageType: 'full-day' as PackageKey,
    visitDate: '',
    participants: 20,
    groupName: '',
    contactName: '',
    email: '',
    phone: '',
    institution: '',
    notes: ''
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const calculateTotal = () => {
    const pkg = packages[selectedPackage];
    return pkg.price * bookingData.participants;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const handlePackageChange = (packageType: PackageKey) => {
    setSelectedPackage(packageType);
    setBookingData({
      ...bookingData,
      packageType: packageType
    });
  };

  const handleSubmit = () => {
    if (!bookingData.visitDate || !bookingData.contactName || !bookingData.email || !bookingData.phone) {
      alert('Mohon lengkapi semua data yang diperlukan');
      return;
    }

    if (bookingData.participants < packages[selectedPackage].minParticipants) {
      alert(`Minimal peserta untuk paket ini adalah ${packages[selectedPackage].minParticipants} orang`);
      return;
    }

    const message = `Halo! Saya ingin booking:\n\nPaket: ${packages[selectedPackage].title}\nTanggal: ${bookingData.visitDate}\nJumlah: ${bookingData.participants} peserta\nNama Kontak: ${bookingData.contactName}\nEmail: ${bookingData.email}\nHP: ${bookingData.phone}\n\nTotal: ${formatPrice(calculateTotal())}`;
    
    const whatsappUrl = `https://wa.me/628816413617?text=${encodeURIComponent(message)}`;
    alert(`Redirecting to WhatsApp...\n\nIn production, will open:\n${whatsappUrl}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Header - Premium Digital Heritage Theme */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 animate-pulse"
            style={{
              backgroundImage: `url('https://cdn.pixabay.com/photo/2020/11/29/10/41/batik-5787937_1280.jpg')`,
              backgroundSize: '200px 200px',
              backgroundRepeat: 'repeat',
            }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold mb-4 border border-amber-500/30">
              <School className="inline w-5 h-5 mr-2 text-amber-400" />
              <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
                Premium Digital Heritage Experience
              </span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">
                Wujudkan Wisata Edukasi Premium
              </span>
            </h1>
            <p className="text-lg lg:text-xl opacity-90 max-w-2xl mx-auto text-blue-100">
              Pengalaman belajar batik eksklusif dengan sentuhan digital heritage untuk pelajar, mahasiswa, dan profesional
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Package Selection */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full mr-3"></div>
                1. Pilih Paket Wisata Premium
              </h2>
              
              <div className="grid md:grid-cols-3 gap-4">
                {(Object.keys(packages) as PackageKey[]).map((key) => {
                  const pkg = packages[key];
                  return (
                    <button
                      key={key}
                      onClick={() => handlePackageChange(key)}
                      className={`relative p-6 rounded-xl border-2 transition text-left group ${
                        selectedPackage === key
                          ? 'border-amber-500 bg-amber-50 shadow-lg'
                          : 'border-slate-200 hover:border-amber-400 hover:shadow-md'
                      }`}
                    >
                      {pkg?.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          ⭐ PREMIUM CHOICE
                        </div>
                      )}
                      <h3 className="font-bold text-slate-800 mb-2 group-hover:text-blue-900 transition">{pkg.title}</h3>
                      <p className="text-sm text-slate-600 mb-3">{pkg.duration}</p>
                      <p className="text-2xl font-bold text-amber-600 mb-3">{formatPrice(pkg.price)}</p>
                      <p className="text-xs text-slate-500">per peserta</p>
                      {selectedPackage === key && (
                        <div className="absolute top-4 right-4 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center shadow-md">
                          <Check size={14} className="text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="font-bold text-blue-900 text-sm mb-3 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-amber-600" />
                  Termasuk dalam paket premium:
                </h4>
                <div className="grid md:grid-cols-2 gap-2">
                  {packages[selectedPackage].features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check size={16} className="text-amber-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-blue-800">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-700 to-blue-800 rounded-full mr-3"></div>
                2. Detail Kunjungan Eksklusif
              </h2>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      <Calendar className="inline w-4 h-4 mr-2 text-blue-700" />
                      Tanggal Kunjungan *
                    </label>
                    <input
                      type="date"
                      name="visitDate"
                      value={bookingData.visitDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full text-slate-800 px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:outline-none transition focus:ring-2 focus:ring-amber-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      <Users className="inline w-4 h-4 mr-2 text-blue-700" />
                      Jumlah Peserta *
                    </label>
                    <input
                      type="number"
                      name="participants"
                      value={bookingData.participants}
                      onChange={handleInputChange}
                      min={packages[selectedPackage].minParticipants}
                      className="w-full px-4 py-3 border-2 text-slate-800 border-slate-200 rounded-lg focus:border-amber-500 focus:outline-none transition focus:ring-2 focus:ring-amber-200"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Minimal {packages[selectedPackage].minParticipants} peserta
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <School className="inline w-4 h-4 mr-2 text-blue-700" />
                    Nama Grup/Rombongan
                  </label>
                  <input
                    type="text"
                    name="groupName"
                    value={bookingData.groupName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 text-slate-800 border-slate-200 rounded-lg focus:border-amber-500 focus:outline-none transition focus:ring-2 focus:ring-amber-200"
                    placeholder="Contoh: SMK Negeri 1 Yogyakarta"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Institusi/Sekolah/Perusahaan
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={bookingData.institution}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 text-slate-800 border-slate-200 rounded-lg focus:border-amber-500 focus:outline-none transition focus:ring-2 focus:ring-amber-200"
                    placeholder="Nama institusi"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                <div className="w-2 h-8 bg-gradient-to-b from-slate-700 to-slate-800 rounded-full mr-3"></div>
                3. Informasi Kontak Premium
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Nama Penanggung Jawab *
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={bookingData.contactName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 text-slate-800 border-slate-200 rounded-lg focus:border-amber-500 focus:outline-none transition focus:ring-2 focus:ring-amber-200"
                    placeholder="Nama lengkap"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      <Mail className="inline w-4 h-4 mr-2 text-blue-700" />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 text-slate-800 border-slate-200 rounded-lg focus:border-amber-500 focus:outline-none transition focus:ring-2 focus:ring-amber-200"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      <Phone className="inline w-4 h-4 mr-2 text-blue-700" />
                      No. WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 text-slate-800 border-slate-200 rounded-lg focus:border-amber-500 focus:outline-none transition focus:ring-2 focus:ring-amber-200"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Catatan Khusus (Opsional)
                  </label>
                  <textarea
                    name="notes"
                    value={bookingData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border-2 text-slate-800 border-slate-200 rounded-lg focus:border-amber-500 focus:outline-none transition focus:ring-2 focus:ring-amber-200 resize-none"
                    placeholder="Permintaan khusus atau informasi tambahan..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8 sticky top-8 border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <Award className="w-6 h-6 mr-2 text-amber-600" />
                Ringkasan Booking Premium
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <p className="text-sm text-slate-600 mb-1">Paket Premium Dipilih</p>
                  <p className="font-bold text-slate-800">{packages[selectedPackage].title}</p>
                  <p className="text-xs text-slate-600">{packages[selectedPackage].duration}</p>
                </div>

                {bookingData.visitDate && (
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <Calendar className="text-amber-600" size={20} />
                    <div>
                      <p className="text-xs text-slate-600">Tanggal Eksklusif</p>
                      <p className="font-semibold text-slate-800 text-sm">
                        {new Date(bookingData.visitDate).toLocaleDateString('id-ID', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <Users className="text-amber-600" size={20} />
                  <div>
                    <p className="text-xs text-slate-600">Peserta Premium</p>
                    <p className="font-semibold text-slate-800 text-sm">{bookingData.participants} orang</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Harga premium per orang</span>
                  <span className="font-semibold text-slate-800">
                    {formatPrice(packages[selectedPackage].price)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Jumlah peserta</span>
                  <span className="font-semibold text-slate-800">× {bookingData.participants}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between">
                  <span className="font-bold text-slate-800">Total Estimasi</span>
                  <span className="font-bold text-amber-600 text-xl">
                    {formatPrice(calculateTotal())}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <Check size={14} className="text-amber-600 shrink-0 mt-0.5" />
                  <span>Free konsultasi & planning premium</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <Check size={14} className="text-amber-600 shrink-0 mt-0.5" />
                  <span>Pembayaran bisa dicicil untuk rombongan besar</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <Check size={14} className="text-amber-600 shrink-0 mt-0.5" />
                  <span>Sertifikat digital heritage premium</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-4 rounded-lg font-bold hover:shadow-xl transition text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/25"
              >
                <Sparkles className="w-5 h-5" />
                Booking Paket Premium
              </button>

              <p className="text-xs text-center text-slate-500 mt-4">
                Tim konsultan premium kami akan merespons dalam 1-2 jam kerja
              </p>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-12 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-8 lg:p-12 text-center text-white relative overflow-hidden">
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
            <Award className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Harga Eksklusif untuk Institusi Premium
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Dapatkan diskon hingga 20% untuk rombongan lebih dari 50 peserta. 
              Konsultasi gratis dengan tim heritage specialist kami!
            </p>
            <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-bold border-2 border-amber-400 hover:bg-amber-50 transition shadow-lg">
              Download Proposal Premium PDF
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingWisataPage;