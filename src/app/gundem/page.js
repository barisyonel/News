"use client";
import { useState, useEffect } from "react";

export default function Gundem() {
  const [haberler, setHaberler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "dafdd9b171ad44fc87690c2575c7ea11";
  const apiUrl = `https://newsapi.org/v2/everything?q=tesla&from=2024-12-29&sortBy=publishedAt&apiKey=${apiKey}`;

  useEffect(() => {
    const fetchHaberler = async () => {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        if (data.status !== "ok") {
          throw new Error(`API Hatası: ${data.message}`);
        }

        setHaberler(data.articles || []);
      } catch (error) {
        console.error("API Hatası:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHaberler();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6"> {/* ✅ Navbar ile boşluk oluştur */}
      <h1 className="text-4xl font-bold text-center mt-6">Gündem Haberleri</h1>

      {/* API yüklenirken gösterilecek mesaj */}
      {loading && <p className="text-center text-gray-500 mt-10">Haberler yükleniyor...</p>}

      {/* API Hatası Varsa Göster */}
      {error && <p className="text-center text-red-500 mt-10">{error}</p>}

      {/* Eğer haber bulunamazsa */}
      {!loading && haberler.length === 0 && !error && (
        <p className="text-center text-gray-500 mt-10">Haber bulunamadı.</p>
      )}

      {/* API'den gelen haberler listeleniyor */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 mt-6">
        {haberler.map((haber, index) => (
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
            <a
              href={haber.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-2 block"
            >
              Devamını Oku
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
