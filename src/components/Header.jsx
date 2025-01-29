"use client";
import { useState } from "react";
import Link from "next/link";
import { Search, Menu, Instagram, Facebook, Youtube } from "lucide-react";

export default function Header({ onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Arama terimi Header içinde yönetiliyor

  // ✅ Arama terimi değiştiğinde ana bileşene bildirim gönderiyoruz
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (onSearch) {
      onSearch(e.target.value); // ✅ Search event'i page.js'e gönderiliyor
    }
  };

  return (
    <header className="bg-red-600 text-white py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
        {/* ✅ Sol Tarafa Sabitlenen Logo ve Menü Butonu */}
        <div className="flex items-center space-x-4">
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={24} />
          </button>
          <Link href="/" className="text-2xl font-bold tracking-wide">NewHaber</Link>
        </div>

        {/* ✅ Ortada Tam Ortalanmış Arama Kutusu */}
        <div className="relative flex items-center w-2/5">
          <Search className="absolute left-3 text-gray-600" size={18} />
          <input
            type="text"
            placeholder="Haber Ara..."
            value={searchTerm}
            onChange={handleSearch} // ✅ Kullanıcı arama yaptıkça güncelleniyor
            className="w-full pl-10 pr-3 py-2 text-black rounded-md border border-gray-300"
          />
        </div>

        {/* ✅ Sağ Tarafa Hizalanmış Menü ve Sosyal Medya Linkleri */}
        <div className="hidden md:flex items-center space-x-4 font-medium">
          <Link href="/" className="hover:underline">Ana Sayfa</Link>
          <Link href="/gundem" className="hover:underline">Gündem</Link>
          <Link href="/spor" className="hover:underline">Spor</Link>
          <Link href="/ekonomi" className="hover:underline">Ekonomi</Link>
          <Link href="#" className="hover:text-gray-300"><Instagram size={20} /></Link>
          <Link href="#" className="hover:text-gray-300"><Facebook size={20} /></Link>
          <Link href="#" className="hover:text-gray-300"><Youtube size={20} /></Link>
        </div>
      </div>

      {/* ✅ Mobil Menü */}
      {menuOpen && (
        <nav className="md:hidden mt-2 p-2 bg-red-500">
          <Link href="/" className="block py-1">Ana Sayfa</Link>
          <Link href="/gundem" className="block py-1">Gündem</Link>
          <Link href="/spor" className="block py-1">Spor</Link>
          <Link href="/ekonomi" className="block py-1">Ekonomi</Link>
        </nav>
      )}
    </header>
  );
}
