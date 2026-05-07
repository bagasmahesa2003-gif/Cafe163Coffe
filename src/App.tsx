/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { MENU_DATA, formatRupiah, MenuItem } from './data';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'menu' | 'about'>('home');
  const [activeCategory, setActiveCategory] = useState<'makanan' | 'minuman' | 'cemilan'>('makanan');
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleCategoryChange = (category: 'makanan' | 'minuman' | 'cemilan') => {
    setActiveCategory(category);
  };

  const changeQty = (id: number, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const clearOrder = () => {
    setQuantities({});
    setTableNumber('');
    setCustomerName('');
  };

  const selectedItems = useMemo(() => {
    return MENU_DATA.filter(item => quantities[item.id] > 0).map(item => ({
      ...item,
      qty: quantities[item.id]
    }));
  }, [quantities]);

  const totalItems = selectedItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = selectedItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <div className="flex flex-col h-full w-full font-sans overflow-hidden text-[var(--color-cream)] relative">
      
      {/* Background elements are handled by index.css body background. Floating beans can optionally be kept here. */}
      <div className="fixed opacity-[0.04] pointer-events-none z-0" style={{ top: '15%', left: '-40px', transform: 'rotate(30deg)' }}>
        <svg width="180" height="180" viewBox="0 0 100 100" fill="white"><ellipse cx="50" cy="50" rx="40" ry="28" rx="40"/><path d="M50 22 Q70 50 50 78 Q30 50 50 22Z" fill="none" stroke="white" strokeWidth="4"/></svg>
      </div>
      <div className="fixed opacity-[0.04] pointer-events-none z-0" style={{ bottom: '20%', right: '-60px', transform: 'rotate(-20deg)' }}>
        <svg width="220" height="220" viewBox="0 0 100 100" fill="white"><ellipse cx="50" cy="50" rx="38" ry="26"/><path d="M50 24 Q68 50 50 76 Q32 50 50 24Z" fill="none" stroke="white" strokeWidth="4"/></svg>
      </div>

      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative z-10 text-center bg-cover bg-center"
            style={{ backgroundImage: "linear-gradient(rgba(26, 10, 0, 0.7), rgba(26, 10, 0, 0.8)), url('/foto_cafe.png')" }}
          >
          <div className="w-24 h-24 sm:w-32 sm:h-32 mb-8 rounded-full bg-gradient-to-br from-[var(--color-amber)] to-[var(--color-gold)] flex items-center justify-center shadow-[0_10px_40px_rgba(200,120,10,0.5)] overflow-hidden border-2 border-[var(--color-amber)]">
            <img src="/Coffe.png" alt="Logo Cafe 163 Coffe" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif mb-4 shadow-sm text-[var(--color-cream)]">
            Selamat Datang di <br className="sm:hidden" /><span className="text-[var(--color-gold)]">Cafe 163 Coffe</span>
          </h1>
          <p className="text-[var(--color-cream)]/70 text-sm sm:text-base max-w-md mx-auto mb-10 leading-relaxed font-light">
            Tempat di mana setiap cangkir kopi bercerita dan setiap rasa membangkitkan kenangan. Silakan jelajahi menu kami atau pelajari lebih lanjut tentang kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <button
              onClick={() => setCurrentPage('menu')}
              className="flex-1 py-4 px-6 rounded-full text-sm font-bold text-[var(--color-espresso)] shadow-[0_4px_15px_rgba(200,120,10,0.3)] transition-all hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg, var(--color-amber), var(--color-gold))' }}
            >
              Lihat Menu
            </button>
            <button
              onClick={() => setCurrentPage('about')}
              className="flex-1 py-4 px-6 rounded-full text-sm font-bold text-[var(--color-amber)] border-2 border-[var(--color-amber)] hover:bg-[var(--color-amber)]/10 transition-all active:scale-95 bg-[var(--color-espresso)]/50 backdrop-blur-sm"
            >
              Tentang Kami
            </button>
          </div>
          </motion.div>
        )}

        {currentPage === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col z-10 w-full bg-cover bg-center bg-fixed overflow-y-auto"
            style={{ backgroundImage: "linear-gradient(rgba(26, 10, 0, 0.95), rgba(26, 10, 0, 0.95)), url('/fotodalem.png')" }}
          >
          {/* Header */}
          <header className="h-20 flex items-center px-4 md:px-8 border-b border-[var(--color-amber)]/20 bg-[var(--color-espresso)] shrink-0 sticky top-0 z-20">
            <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-[var(--color-amber)] hover:text-[var(--color-gold)] transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              <span className="font-semibold text-sm uppercase tracking-wider">Kembali</span>
            </button>
          </header>

          <main className="flex-1 w-full max-w-4xl mx-auto p-6 sm:p-10 pb-20 space-y-12">
            {/* Intro */}
            <section className="text-center">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[var(--color-gold)] mb-4">Tentang Cafe 163 Coffe</h2>
              <p className="text-[var(--color-cream)]/80 leading-relaxed max-w-2xl mx-auto">
                Didirikan pada tahun 2021, Cafe 163 Coffe hadir dengan filosofi bahwa secangkir kopi lebih dari sekadar minuman, ia adalah jembatan yang menghubungkan ide, cerita, dan kebersamaan. Kami mendedikasikan diri untuk menyajikan biji kopi pilihan terbaik yang dipanggang dengan penuh cinta.
              </p>
            </section>

            {/* Keunggulan */}
            <section>
              <h3 className="text-xl font-bold font-serif text-[var(--color-cream)] border-b border-[var(--color-amber)]/30 pb-3 mb-6">Keunggulan Kami</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-[var(--color-dark-brown)]/40 p-5 rounded-xl border border-[var(--color-amber)]/20 shadow-[0_4px_15px_rgba(200,120,10,0.05)]">
                  <div className="text-3xl mb-3">🌱</div>
                  <h4 className="font-bold text-[var(--color-gold)] mb-2">Biji Kopi Pilihan</h4>
                  <p className="text-sm text-[var(--color-cream)]/70">Kami menggunakan 100% biji kopi Arabika dari petani lokal Nusantara dengan standar specialty.</p>
                </div>
                <div className="bg-[var(--color-dark-brown)]/40 p-5 rounded-xl border border-[var(--color-amber)]/20 shadow-[0_4px_15px_rgba(200,120,10,0.05)]">
                  <div className="text-3xl mb-3">👨‍🍳</div>
                  <h4 className="font-bold text-[var(--color-gold)] mb-2">Barista Ahli</h4>
                  <p className="text-sm text-[var(--color-cream)]/70">Setiap cangkir diracik oleh barista berpengalaman yang memahami betul karakter setiap biji kopi.</p>
                </div>
                <div className="bg-[var(--color-dark-brown)]/40 p-5 rounded-xl border border-[var(--color-amber)]/20 shadow-[0_4px_15px_rgba(200,120,10,0.05)]">
                  <div className="text-3xl mb-3">✨</div>
                  <h4 className="font-bold text-[var(--color-gold)] mb-2">Tempat Bersih dan Nyaman</h4>
                  <p className="text-sm text-[var(--color-cream)]/70">Lingkungan cafe yang selalu terjaga kebersihannya untuk memastikan kenyamanan Anda saat berkunjung maupun bekerja.</p>
                </div>
              </div>
            </section>

            {/* Suasana & Fasilitas */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold font-serif text-[var(--color-cream)] border-b border-[var(--color-amber)]/30 pb-3 mb-4">Suasana & Fasilitas</h3>
                <p className="text-[var(--color-cream)]/80 text-sm leading-relaxed mb-6">
                  Perpaduan nuansa alam dan desain modern menciptakan suasana yang adem, hangat, dan nyaman. Setiap sudut Cafe 163 Coffe dibuat untuk menemani waktu santai, produktif, maupun momen sederhana yang ingin dinikmati lebih lama
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-[var(--color-cream)]/80 text-sm">
                    <span className="w-6 h-6 rounded-full bg-[var(--color-amber)]/20 flex items-center justify-center text-[var(--color-amber)]">✓</span>
                    WiFi Cepat Terdedikasi
                  </li>
                  <li className="flex items-center gap-3 text-[var(--color-cream)]/80 text-sm">
                    <span className="w-6 h-6 rounded-full bg-[var(--color-amber)]/20 flex items-center justify-center text-[var(--color-amber)]">✓</span>
                    Stop Kontak di Setiap Meja
                  </li>
                  <li className="flex items-center gap-3 text-[var(--color-cream)]/80 text-sm">
                    <span className="w-6 h-6 rounded-full bg-[var(--color-amber)]/20 flex items-center justify-center text-[var(--color-amber)]">✓</span>
                    Ruangan Ber-AC & Area Smoking Outdoor
                  </li>
                  <li className="flex items-center gap-3 text-[var(--color-cream)]/80 text-sm">
                    <span className="w-6 h-6 rounded-full bg-[var(--color-amber)]/20 flex items-center justify-center text-[var(--color-amber)]">✓</span>
                    Live Music Akustik (Setiap Akhir Pekan)
                  </li>
                </ul>
              </div>
              <div className="bg-[var(--color-dark-brown)]/40 p-6 rounded-xl border border-[var(--color-amber)]/20 flex flex-col justify-center shadow-[0_4px_15px_rgba(200,120,10,0.05)]">
                 <h3 className="text-xl font-bold font-serif text-[var(--color-gold)] mb-4 text-center">Best Seller Menu</h3>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center bg-[var(--color-espresso)]/50 p-3 rounded-lg border border-[var(--color-amber)]/10">
                      <div className="flex items-center gap-3"><span className="text-xl">☕</span><span className="text-sm font-semibold">Kopi Susu Gula Aren</span></div>
                      <span className="text-xs text-[var(--color-cream)]/70 flex items-center gap-1 font-medium"><Star size={12} className="text-[var(--color-gold)] fill-[var(--color-gold)]" /> 4.9</span>
                    </div>
                    <div className="flex justify-between items-center bg-[var(--color-espresso)]/50 p-3 rounded-lg border border-[var(--color-amber)]/10">
                      <div className="flex items-center gap-3"><span className="text-xl">🍝</span><span className="text-sm font-semibold">Spaghetti Carbonara</span></div>
                      <span className="text-xs text-[var(--color-cream)]/70 flex items-center gap-1 font-medium"><Star size={12} className="text-[var(--color-gold)] fill-[var(--color-gold)]" /> 4.8</span>
                    </div>
                    <div className="flex justify-between items-center bg-[var(--color-espresso)]/50 p-3 rounded-lg border border-[var(--color-amber)]/10">
                      <div className="flex items-center gap-3"><span className="text-xl">🥤</span><span className="text-sm font-semibold">Caramel Macchiato</span></div>
                      <span className="text-xs text-[var(--color-cream)]/70 flex items-center gap-1 font-medium"><Star size={12} className="text-[var(--color-gold)] fill-[var(--color-gold)]" /> 4.9</span>
                    </div>
                 </div>
              </div>
            </section>

            {/* Galeri Suasana */}
            <section className="pt-4 relative group">
              <button 
                onClick={() => scroll('left')}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-[var(--color-dark-brown)]/80 hover:bg-[var(--color-amber)] text-[var(--color-cream)] p-2 rounded-full border border-[var(--color-amber)]/30 shadow-lg backdrop-blur-md transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Scroll left"
              >
                <ChevronLeft size={24} />
              </button>
              <div ref={scrollRef} className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 scroll-smooth px-1">
                {[
                  "/fotodalem.png",
                  "/dalem1.png",
                  "/dalem2.png",
                  "/dalem3.png",
                  "/dalem2.png"
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Suasana Cafe ${i+1}`}
                    className="w-[280px] h-[190px] sm:w-[320px] sm:h-[220px] object-cover rounded-xl snap-center shrink-0 border border-[var(--color-amber)]/20 shadow-[0_4px_15px_rgba(200,120,10,0.05)] cursor-pointer hover:border-[var(--color-amber)]/50 transition-colors"
                  />
                ))}
              </div>
              <button 
                onClick={() => scroll('right')}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-[var(--color-dark-brown)]/80 hover:bg-[var(--color-amber)] text-[var(--color-cream)] p-2 rounded-full border border-[var(--color-amber)]/30 shadow-lg backdrop-blur-md transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Scroll right"
              >
                <ChevronRight size={24} />
              </button>
            </section>

            {/* Lokasi & Kontak (Side by Side) */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[var(--color-amber)]/20 pt-8 mt-4">
              {/* Lokasi */}
              <div>
                <h3 className="text-xl font-bold font-serif text-[var(--color-gold)] mb-4 flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  Lokasi
                </h3>
                <p className="text-[var(--color-cream)]/80 text-sm leading-relaxed mb-4">
                  Merdeka Square, Jalan Lapangan Monas, RT.5/RW.2,<br />
                  Gambir, Kecamatan Gambir, Kota Jakarta Pusat,<br />
                  Daerah Khusus Ibukota Jakarta 10110
                </p>
                <div className="w-full h-48 sm:h-56 bg-[var(--color-dark-brown)] rounded-xl border border-[var(--color-amber)]/20 overflow-hidden relative shadow-[0_4px_15px_rgba(200,120,10,0.05)]">
                  <iframe
                    title="Google Maps"
                    src="https://maps.google.com/maps?q=Merdeka%20Square,%20Jalan%20Lapangan%20Monas,%20Jakarta%20Pusat&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    className="absolute inset-0 w-full h-full border-0 grayscale opacity-90 contrast-125 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

              {/* Jam Buka & Kontak */}
              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-xl font-bold font-serif text-[var(--color-gold)] mb-4 flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    Jam Buka
                  </h3>
                  <div className="space-y-2 text-sm text-[var(--color-cream)]/80">
                    <div className="flex justify-between border-b border-[var(--color-amber)]/10 pb-1"><span>Senin - Jumat</span><span className="font-medium text-[var(--color-cream)]">08:00 - 22:00</span></div>
                    <div className="flex justify-between border-b border-[var(--color-amber)]/10 pb-1"><span>Sabtu - Minggu</span><span className="font-medium text-[var(--color-cream)]">07:00 - 23:30</span></div>
                    <div className="flex justify-between pt-1 italic text-[var(--color-amber)]/70 text-xs text-right w-full block"><span>* Hari Libur Nasional tetap buka</span></div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-serif text-[var(--color-gold)] mb-4 flex items-center gap-2">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                     Kontak
                  </h3>
                  <div className="space-y-3 text-sm text-[var(--color-cream)]/80">
                    <a href="https://wa.me/6285819410509" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[var(--color-amber)] transition-colors group w-fit">
                      <span className="w-8 h-8 rounded-full bg-[var(--color-dark-brown)] flex items-center justify-center text-[var(--color-amber)] border border-[var(--color-amber)]/20 group-hover:bg-[var(--color-amber)]/10"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
                      085819410509
                    </a>
                    <a href="mailto:bagasmahesa2003@gmail.com" className="flex items-center gap-3 hover:text-[var(--color-amber)] transition-colors group w-fit">
                      <span className="w-8 h-8 rounded-full bg-[var(--color-dark-brown)] flex items-center justify-center text-[var(--color-amber)] border border-[var(--color-amber)]/20 group-hover:bg-[var(--color-amber)]/10"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></span>
                      bagasmahesa2003@gmail.com
                    </a>
                    <a href="https://www.instagram.com/_bagasmahes/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[var(--color-amber)] transition-colors group w-fit">
                      <span className="w-8 h-8 rounded-full bg-[var(--color-dark-brown)] flex items-center justify-center text-[var(--color-amber)] border border-[var(--color-amber)]/20 group-hover:bg-[var(--color-amber)]/10">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                      </span>
                      @_bagasmahes
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </main>
          </motion.div>
        )}

        {currentPage === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col z-10 w-full relative h-full overflow-hidden"
          >
      {/* HEADER */}
      <header className="relative h-20 flex items-center justify-between px-4 md:px-8 border-b border-[var(--color-amber)]/20 bg-[var(--color-espresso)] shrink-0 z-10">
        <div className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setCurrentPage('home')}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-amber)] to-[var(--color-gold)] flex items-center justify-center shadow-lg shrink-0 overflow-hidden border border-[var(--color-amber)]">
            <img src="/Coffe.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight uppercase" style={{ fontFamily: "'Georgia', serif" }}>
              Cafe 163 <span className="text-[var(--color-gold)] italic">Coffe</span>
            </h1>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-amber)]/80">Digital Menu</p>
          </div>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
          <nav className="flex gap-1 bg-[var(--color-dark-brown)] p-1 rounded-full border border-[var(--color-amber)]/10 shrink-0">
            {['makanan', 'minuman', 'cemilan'].map((cat) => (
               <button 
                 key={cat}
                 onClick={() => handleCategoryChange(cat as any)}
                 className={`px-6 py-2 rounded-full text-xs font-semibold uppercase transition-colors ${
                   activeCategory === cat 
                   ? 'bg-[var(--color-amber)] text-[var(--color-espresso)]' 
                   : 'text-[var(--color-cream)]/60 hover:text-[var(--color-cream)]'
                 }`}
               >
                 {cat}
               </button>
            ))}
          </nav>
        </div>


      </header>

      {/* MOBILE TABS */}
      <nav className="md:hidden flex gap-1 bg-[var(--color-dark-brown)] p-2 border-b border-[var(--color-amber)]/20 shrink-0 overflow-x-auto hide-scrollbar z-10">
        {['makanan', 'minuman', 'cemilan'].map((cat) => (
           <button 
             key={cat}
             onClick={() => handleCategoryChange(cat as any)}
             className={`px-4 py-2 flex-1 rounded-full text-xs font-semibold uppercase whitespace-nowrap transition-colors ${
               activeCategory === cat 
               ? 'bg-[var(--color-amber)] text-[var(--color-espresso)]' 
               : 'text-[var(--color-cream)]/60 hover:text-[var(--color-cream)]'
             }`}
           >
             {cat}
           </button>
        ))}
      </nav>

      <main className="flex-1 flex overflow-hidden z-10 relative">
        {/* Content Area */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto pb-48 md:pb-8">
          
          {/* MAKANAN */}
          {activeCategory === 'makanan' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {MENU_DATA.filter(item => item.category === 'makanan').map(item => (
                <MenuCard key={item.id} item={item} qty={quantities[item.id] || 0} onChangeQty={(delta) => changeQty(item.id, delta)} />
              ))}
            </div>
          )}

          {/* MINUMAN */}
          {activeCategory === 'minuman' && (
            <div className="space-y-8">
              {['Kopi Signature', 'Non-Coffee & Latte', 'Teh & Minuman Segar'].map(subcat => {
                const items = MENU_DATA.filter(item => item.category === 'minuman' && item.subcategory === subcat);
                if (items.length === 0) return null;
                return (
                  <div key={subcat}>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--color-amber)] mb-4">{subcat}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {items.map(item => (
                        <MenuCard key={item.id} item={item} qty={quantities[item.id] || 0} onChangeQty={(delta) => changeQty(item.id, delta)} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* CEMILAN */}
          {activeCategory === 'cemilan' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {MENU_DATA.filter(item => item.category === 'cemilan').map(item => (
                <MenuCard key={item.id} item={item} qty={quantities[item.id] || 0} onChangeQty={(delta) => changeQty(item.id, delta)} />
              ))}
            </div>
          )}

          <div className="flex justify-center gap-2 mt-10 md:hidden opacity-10">
            <svg width="28" height="18" viewBox="0 0 28 18" fill="none"><ellipse cx="14" cy="9" rx="13" ry="8" fill="#C8780A"/><path d="M14 1 Q20 9 14 17 Q8 9 14 1Z" fill="none" stroke="#1A0A00" strokeWidth="2"/></svg>
            <svg width="20" height="13" viewBox="0 0 20 13" fill="none"><ellipse cx="10" cy="6.5" rx="9" ry="5.5" fill="#C8780A"/><path d="M10 1 Q14 6.5 10 12 Q6 6.5 10 1Z" fill="none" stroke="#1A0A00" strokeWidth="1.5"/></svg>
            <svg width="28" height="18" viewBox="0 0 28 18" fill="none"><ellipse cx="14" cy="9" rx="13" ry="8" fill="#C8780A"/><path d="M14 1 Q20 9 14 17 Q8 9 14 1Z" fill="none" stroke="#1A0A00" strokeWidth="2"/></svg>
          </div>
        </div>

        {/* Desktop Sidebar (Aside) */}
        <aside className="hidden md:flex w-80 bg-[var(--color-dark-brown)]/30 border-l border-[var(--color-amber)]/20 p-6 flex-col">
          <div className="flex items-center justify-between mb-6 shrink-0">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--color-amber)]">Pesanan Anda</h2>
            <span className="px-2 py-1 bg-[var(--color-amber)]/10 text-[var(--color-amber)] rounded text-[10px] font-mono">{totalItems} ITEMS</span>
          </div>
          
          <div className="flex-1 space-y-4 overflow-y-auto pr-2 hide-scrollbar">
            {selectedItems.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{item.name}</span>
                  <span className="text-[10px] text-[var(--color-cream)]/40">{item.qty} x {formatRupiah(item.price)}</span>
                </div>
                <span className="text-sm font-mono">{formatRupiah(item.price * item.qty)}</span>
              </div>
            ))}
            {totalItems === 0 && (
              <div className="text-center text-sm text-[var(--color-cream)]/40 mt-10">Belum ada pesanan</div>
            )}
          </div>
          
          <div className="mt-6 pt-6 border-t border-[var(--color-amber)]/10 space-y-2 shrink-0">
            <div className="mb-4">
              <label className="text-xs text-[var(--color-cream)]/60 block mb-1">Atas Nama</label>
              <input 
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Masukkan nama Anda"
                className="w-full mb-3 bg-[var(--color-espresso)]/50 border border-[var(--color-amber)]/20 rounded-lg p-2 text-sm text-[var(--color-cream)] focus:border-[var(--color-amber)] focus:outline-none focus:ring-1 focus:ring-[var(--color-amber)] transition-colors placeholder:text-[var(--color-cream)]/20"
              />
              <label className="text-xs text-[var(--color-cream)]/60 block mb-1">Nomor Meja</label>
              <select 
                value={tableNumber} 
                onChange={(e) => setTableNumber(e.target.value)}
                className="w-full bg-[var(--color-espresso)]/50 border border-[var(--color-amber)]/20 rounded-lg p-2 text-sm text-[var(--color-cream)] focus:border-[var(--color-amber)] focus:outline-none focus:ring-1 focus:ring-[var(--color-amber)] transition-colors appearance-none"
              >
                <option value="">-- Pilih Meja --</option>
                {Array.from({ length: 30 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>Meja {i + 1}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-between text-xs text-[var(--color-cream)]/60 pt-2 border-t border-dashed border-[var(--color-amber)]/10">
              <span>Subtotal</span>
              <span>{formatRupiah(totalPrice)}</span>
            </div>
            <div className="flex justify-between items-end pt-4">
              <span className="text-xs font-bold uppercase text-[var(--color-amber)]">Total</span>
              <span className="text-xl font-bold text-[var(--color-gold)] font-mono">{formatRupiah(totalPrice)}</span>
            </div>
            <button 
              disabled={totalItems === 0}
              onClick={() => setIsModalOpen(true)}
              className={`w-full mt-6 py-4 rounded-xl font-bold text-sm tracking-widest uppercase transition-all
              ${totalItems > 0 
                ? 'bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-gold)] text-[var(--color-espresso)] shadow-[0_4px_15px_rgba(200,120,10,0.3)] hover:scale-[1.02] active:scale-95' 
                : 'bg-[var(--color-amber)]/10 text-[var(--color-amber)]/50 cursor-not-allowed'}`}
            >
              Kirim Pesanan
            </button>
          </div>
        </aside>

        {/* Mobile Bottom Bar */}
        <div className={`md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-espresso)] border-t border-[var(--color-amber)]/20 p-4 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] transition-transform duration-300 ${totalItems > 0 ? 'translate-y-0' : 'translate-y-full'}`}>
           <div className="flex items-center justify-between mb-4">
             <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-amber)]">Total</span>
                <div className="text-xl font-bold text-[var(--color-gold)] font-mono">{formatRupiah(totalPrice)}</div>
             </div>
             <span className="px-3 py-1 bg-[var(--color-amber)]/10 text-[var(--color-amber)] rounded text-xs font-mono">{totalItems} ITEMS</span>
           </div>
           <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-gold)] text-[var(--color-espresso)] py-3.5 rounded-xl font-bold text-sm tracking-widest uppercase shadow-[0_4px_15px_rgba(200,120,10,0.3)] active:scale-95 transition-all"
            >
              Lihat Pesanan
           </button>
        </div>
      </main>

      {/* RECEIPT MODAL */}
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[300] flex items-center justify-center p-6 modal-overlay ${isModalOpen ? 'show' : ''}`}
        onClick={() => setIsModalOpen(false)}
      >
        <div 
          className="bg-[var(--color-dark-brown)] border border-[var(--color-amber)]/20 text-[var(--color-cream)] rounded-[20px] p-8 max-w-[420px] w-full max-h-[80vh] overflow-y-auto modal-content shadow-[0_0_40px_rgba(200,120,10,0.15)] relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-amber)] to-[var(--color-gold)] flex items-center justify-center shadow-lg mx-auto mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A0A00" strokeWidth="2.5">
                <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
                <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="2" x2="6" y2="4"></line>
                <line x1="10" y1="2" x2="10" y2="4"></line>
                <line x1="14" y1="2" x2="14" y2="4"></line>
              </svg>
            </div>
            <h2 className="font-serif text-[22px] font-bold text-[var(--color-gold)] mb-1">Cafe 163 Coffe</h2>
            <p className="text-[12px] text-[var(--color-cream)]/50 uppercase tracking-widest">Detail Pesanan</p>
          </div>
          
          <div className="border-t border-dashed border-[var(--color-amber)]/20 my-4"></div>
          
          <div className="space-y-3">
            {selectedItems.map((item) => (
              <div key={item.id} className="flex justify-between items-start text-[13px]">
                <div className="flex flex-col flex-1 pr-2">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-[10px] text-[var(--color-cream)]/50 mt-0.5">{item.qty} x {formatRupiah(item.price)}</span>
                </div>
                <span className="font-mono text-[var(--color-gold)] font-bold">{formatRupiah(item.price * item.qty)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-dashed border-[var(--color-amber)]/20 my-4"></div>
          
          <div className="mb-4">
            <label className="text-xs text-[var(--color-cream)]/60 block mb-1">Atas Nama</label>
            <input 
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Masukkan nama Anda"
              className="w-full mb-3 bg-[var(--color-espresso)]/50 border border-[var(--color-amber)]/20 rounded-lg p-2 text-sm text-[var(--color-cream)] focus:border-[var(--color-amber)] focus:outline-none focus:ring-1 focus:ring-[var(--color-amber)] transition-colors placeholder:text-[var(--color-cream)]/20"
            />
            <label className="text-xs text-[var(--color-cream)]/60 block mb-1">Nomor Meja</label>
            <select 
              value={tableNumber} 
              onChange={(e) => setTableNumber(e.target.value)}
              className="w-full bg-[var(--color-espresso)]/50 border border-[var(--color-amber)]/20 rounded-lg p-2 text-sm text-[var(--color-cream)] focus:border-[var(--color-amber)] focus:outline-none focus:ring-1 focus:ring-[var(--color-amber)] transition-colors appearance-none"
            >
              <option value="">-- Pilih Meja --</option>
              {Array.from({ length: 30 }, (_, i) => (
                <option key={i + 1} value={i + 1}>Meja {i + 1}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-end py-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-amber)]">Total Pembayaran</span>
            <span className="text-xl font-bold font-mono text-[var(--color-gold)]">{formatRupiah(totalPrice)}</span>
          </div>

          <div className="flex gap-3 mt-6 relative z-10">
            <button 
              onClick={() => { setIsModalOpen(false); clearOrder(); }}
              className="flex-1 py-3.5 rounded-xl text-[13px] font-bold text-[var(--color-amber)] border border-[var(--color-amber)]/30 hover:bg-[var(--color-amber)]/10 transition-colors"
            >
              Reset
            </button>
            <button 
              disabled={!tableNumber || !customerName.trim()}
              onClick={() => {
                if (!tableNumber || !customerName.trim()) return;
                setIsModalOpen(false);
                clearOrder();
                alert(`Terima kasih ${customerName}, Pesanan Anda sedang diproses untuk Meja ${tableNumber}!`);
              }}
              className={`flex-[2] py-3.5 rounded-xl text-[14px] font-bold text-[var(--color-espresso)] shadow-[0_4px_15px_rgba(200,120,10,0.3)] transition-all
                ${(!tableNumber || !customerName.trim()) ? 'opacity-50 cursor-not-allowed' : 'active:scale-95 hover:scale-[1.02]'}`}
              style={{ background: 'linear-gradient(135deg, var(--color-amber), var(--color-gold))' }}
            >
              Kirim Order
            </button>
          </div>
        </div>
      </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function MenuCard({ item, qty, onChangeQty }: { item: MenuItem; qty: number; onChangeQty: (delta: number) => void }) {
  const hasItems = qty > 0;
  
  return (
    <div 
      className={`relative rounded-xl flex flex-col justify-between transition-all outline-none overflow-hidden
                  w-full min-h-[180px]
                  ${hasItems 
                    ? 'border border-[var(--color-amber)]/60 shadow-[0_0_15px_rgba(200,120,10,0.1)]' 
                    : 'border border-[var(--color-amber)]/20 hover:border-[var(--color-amber)]/50 group'}`}
      style={item.image ? {
        backgroundImage: `linear-gradient(to top, rgba(26, 10, 0, 0.95) 0%, rgba(26, 10, 0, 0.4) 50%, rgba(26, 10, 0, 0.8) 100%), url('${item.image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      } : { backgroundColor: 'var(--color-dark-brown)', opacity: 0.8 }}
    >
      <div className="relative z-10 p-4 flex flex-col h-full justify-between w-full flex-1">
        <div className="flex justify-between items-start gap-3 w-full">
          {!item.image ? (
            <div className="w-12 h-12 rounded-lg bg-[var(--color-espresso)]/50 flex items-center justify-center text-2xl shrink-0 border border-[var(--color-amber)]/10">
              {item.emoji}
            </div>
          ) : <div />}
          <div className="flex flex-col items-end shrink-0">
            <span className="text-xs font-bold text-[var(--color-gold)] bg-[var(--color-espresso)]/80 px-2 py-1 rounded backdrop-blur-sm border border-[var(--color-amber)]/20">
              {formatRupiah(item.price)}
            </span>
          </div>
        </div>
        <div className="mt-auto mb-4 flex-grow flex flex-col justify-end">
          <h3 className="font-bold text-base leading-snug drop-shadow-md">{item.name}</h3>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <button 
            onClick={() => onChangeQty(-1)}
            className="w-8 h-8 rounded-full border border-[var(--color-amber)] flex items-center justify-center text-[var(--color-amber)] hover:bg-[var(--color-amber)] hover:text-[var(--color-espresso)] transition-all active:scale-95 flex-shrink-0 bg-[var(--color-espresso)]/50 backdrop-blur-sm"
          >
            −
          </button>
          <span className="font-mono font-bold text-base w-8 text-center drop-shadow-md">{qty}</span>
          <button 
            onClick={() => onChangeQty(1)}
            className="w-8 h-8 rounded-full bg-[var(--color-amber)] flex items-center justify-center text-[var(--color-espresso)] font-bold shadow hover:bg-[var(--color-gold)] transition-all active:scale-95 flex-shrink-0"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
