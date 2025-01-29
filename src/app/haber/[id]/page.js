"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../../../components/LoadingSpinner";

export default function HaberDetay({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  const [haber, setHaber] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHaberDetay = async () => {
      try {
        const apiKey = "dafdd9b171ad44fc87690c2575c7ea11";
        const apiUrl = `https://newsapi.org/v2/everything?q=tesla&from=2024-12-28&sortBy=publishedAt&apiKey=${apiKey}`;
        
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error("Haber bulunamadı!");
        }
        
        const data = await res.json();
        const selectedHaber = data.articles[id];

        if (!selectedHaber) {
          throw new Error("Geçersiz haber ID'si.");
        }

        setHaber(selectedHaber);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHaberDetay();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!haber) {
    return (
      <div className="text-center text-gray-500">
        <h1 className="text-2xl font-bold">Haber Bulunamadı</h1>
        <p>Geçersiz bir haber ID'si seçtiniz.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{haber.title}</h1>
      <p className="text-sm text-gray-500 mb-2">
        Yayın Tarihi: {new Date(haber.publishedAt).toLocaleDateString("tr-TR")}
      </p>
      {haber.urlToImage && (
        <img
          src={haber.urlToImage}
          alt={haber.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      )}
      <p className="text-gray-600 mb-4">{haber.content || "Detay mevcut değil."}</p>
      <a
        href={haber.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        Haberin Kaynağına Git
      </a>
    </div>
  );
}
