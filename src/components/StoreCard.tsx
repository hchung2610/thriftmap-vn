"use client";

import { useMemo, useState } from "react";
import Map from "@/components/Map";
import { stores } from "@/data/stores";

function InlineStoreCard({
  store,
}: {
  store: (typeof stores)[number];
}) {
  function Stars({ value }: { value: 1 | 2 | 3 | 4 | 5 }) {
    return (
      <div className="flex gap-1 text-lg">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}>{i < value ? "★" : "☆"}</span>
        ))}
      </div>
    );
  }

  return (
    <aside className="w-full max-w-md rounded-2xl bg-white p-5 shadow-lg">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">{store.name}</h2>
        <p className="mt-1 text-sm text-gray-500">{store.address}</p>
      </div>

      <div className="mb-4 inline-block rounded-full bg-black px-3 py-1 text-sm text-white">
        Price: {store.priceRange}
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium">Service</p>
          <Stars value={store.ratings.service} />
        </div>
        <div>
          <p className="text-sm font-medium">Staff</p>
          <Stars value={store.ratings.staff} />
        </div>
        <div>
          <p className="text-sm font-medium">Quality</p>
          <Stars value={store.ratings.quality} />
        </div>
      </div>
    </aside>
  );
}

export default function HomePage() {
  const [selectedStoreId, setSelectedStoreId] = useState(stores[0].id);

  const selectedStore = useMemo(() => {
    return stores.find((store) => store.id === selectedStoreId) ?? stores[0];
  }, [selectedStoreId]);

  return (
    <main className="min-h-screen bg-neutral-100 p-4 md:p-6">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[1.5fr_0.9fr]">
        <section className="rounded-2xl bg-white p-3 shadow-sm">
          <Map
            stores={stores}
            selectedStoreId={selectedStoreId}
            onSelectStore={setSelectedStoreId}
          />
        </section>

        <section className="flex items-start justify-center md:justify-start">
          <InlineStoreCard store={selectedStore} />
        </section>
      </div>
    </main>
  );
}