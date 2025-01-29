"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [haberler, setHaberler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Arama state burada

  const apiKey = "dafdd9b171ad44fc87690c2575c7ea11";
  const apiUrl = `https://newsapi.org/v2/everything?q=tesla&from=2024-12-29&sortBy=publishedAt&apiKey=${apiKey}`;

  useEffect(() => {
    const fetchHaberler = async () => {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("API isteği başarısız!");

        const data = await res.json();
        setHaberler(data.articles || []);
      } catch (error) {
        console.error("API Hatası:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHaberler();
  }, []);

  // ✅ Search işlemi için filtreleme
  const filteredHaberler = haberler.filter((haber) =>
    haber.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center text-2xl font-semibold mt-10">Haberler yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-6 text-center mt-6">Tesla Haberleri</h1>

      {filteredHaberler.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">Aramanızla eşleşen haber bulunamadı.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHaberler.map((haber, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              {haber.urlToImage ? (
                <img
                  src={haber.urlToImage}
                  alt={haber.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gray-300 flex items-center justify-center rounded-md">
                  <span className="text-gray-500">Görsel Yok</span>
                </div>
              )}
              <h2 className="text-xl font-semibold mb-2">{haber.title}</h2>
              <p className="text-gray-600">{haber.description || "Açıklama mevcut değil."}</p>
              <a href={haber.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 block">
                Devamını Oku
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
