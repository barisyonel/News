"use client";

import Link from "next/link";
import { Instagram, Facebook, Youtube, Apple, Play } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* ✅ Sol Taraf: Logo & Açıklama */}
        <div>
          <h2 className="text-2xl font-bold">NewHaber</h2>
          <p className="text-gray-400 mt-2">Güncel haberlerin en güvenilir adresi.</p>
        </div>

        {/* ✅ Orta Bölüm: Hızlı Erişim Linkleri */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Kategoriler</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/gundem" className="hover:underline">Gündem</Link></li>
            <li><Link href="/ekonomi" className="hover:underline">Ekonomi</Link></li>
            <li><Link href="/spor" className="hover:underline">Spor</Link></li>
            <li><Link href="/teknoloji" className="hover:underline">Teknoloji</Link></li>
          </ul>
        </div>

        {/* ✅ Sağ Taraf: Uygulama Linkleri */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Mobil Uygulamalar</h3>
          <div className="flex flex-col space-y-2">
            <Link href="#" className="flex items-center space-x-2 bg-gray-800 py-2 px-4 rounded-md hover:bg-gray-700">
              <Apple size={20} />
              <span>App Store'dan İndir</span>
            </Link>
            <Link href="#" className="flex items-center space-x-2 bg-gray-800 py-2 px-4 rounded-md hover:bg-gray-700">
              <Play size={20} />
              <span>Google Play'den İndir</span>
            </Link>
          </div>
        </div>

        {/* ✅ Sağ Üst: Sosyal Medya Linkleri */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Bizi Takip Edin</h3>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-gray-400"><Instagram size={24} /></Link>
            <Link href="#" className="hover:text-gray-400"><Facebook size={24} /></Link>
            <Link href="#" className="hover:text-gray-400"><Youtube size={24} /></Link>
          </div>
        </div>
      </div>

      {/* ✅ Alt Bilgi */}
      <div className="text-center text-sm text-gray-400 mt-8 border-t border-gray-700 pt-4">
        © 2025 NewHaber. Tüm Hakları Saklıdır.
      </div>
    </footer>
  );
}
