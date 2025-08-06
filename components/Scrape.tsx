// /app/page.tsx or /pages/index.tsx (depending on your setup)

'use client'; // if using App Router

import React, { useEffect, useState } from 'react';

export default function HomePage() {
  const [models, setModels] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/scrape-models')
      .then(res => res.json())
      .then(data => {
        if (data.models) setModels(data.models);
        else setError('No models found');
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch models');
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">OpenAI Model Names</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="list-disc ml-5">
        {models.map((model, i) => (
          <li key={i}>{model}</li>
        ))}
      </ul>
    </div>
  );
}
