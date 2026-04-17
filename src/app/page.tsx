"use client";

import { useMemo, useState } from "react";
import Map from "@/components/Map";
import { stores } from "@/data/stores";

function Stars({ value }: { value: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div className="flex gap-1 text-base">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < value ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [selectedStoreId, setSelectedStoreId] = useState(stores[0].id);

  const selectedStore = useMemo(() => {
    return stores.find((store) => store.id === selectedStoreId) ?? stores[0];
  }, [selectedStoreId]);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-pink-100">
      <div className="absolute inset-0">
        <Map
          stores={stores}
          selectedStoreId={selectedStoreId}
          onSelectStore={setSelectedStoreId}
        />
      </div>

      <section className="absolute left-4 top-4 z-10 w-[280px] rounded-md border-4 border-black bg-[#fff3c9] p-4 shadow-[6px_6px_0px_#000]">
        <h2 className="mb-3 text-2xl font-black uppercase tracking-wide text-[#d16a2e]">
          Suggestion
        </h2>

        <div className="space-y-2 text-base font-bold uppercase text-[#3b49b6]">
          {stores.map((store, index) => (
            <button
              key={store.id}
              onClick={() => setSelectedStoreId(store.id)}
              className={`block w-full text-left transition hover:translate-x-1 ${
                store.id === selectedStoreId ? "text-black" : ""
              }`}
            >
              {index + 1}. {store.name}
            </button>
          ))}
        </div>
      </section>

      <section className="absolute right-4 top-4 z-10">
        <img
          src="/logo.png"
          alt="Thrift Map logo"
          className="w-[220px] md:w-[280px] h-auto"
        />
      </section>

      <section className="absolute bottom-4 left-1/2 z-10 w-[min(92vw,850px)] -translate-x-1/2 rounded-md border-4 border-black bg-[#ffe6f2] p-4 shadow-[6px_6px_0px_#000]">
        <div className="grid gap-4 md:grid-cols-[110px_1fr]">
          <div className="flex h-[100px] w-[100px] items-center justify-center rounded-md border-4 border-black bg-pink-400 text-4xl">
            🧍
          </div>

          <div>
            <p className="mb-2 inline-block rounded-md border-2 border-black bg-white px-3 py-1 text-lg font-bold">
              Hello!
            </p>

            <div className="space-y-2">
              <h3 className="text-xl font-black uppercase">{selectedStore.name}</h3>
              <p className="text-sm font-semibold text-gray-700">
                {selectedStore.address}
              </p>
              <p className="text-sm font-bold">Price: {selectedStore.priceRange}</p>

              <div className="grid gap-2 text-sm font-semibold md:grid-cols-3">
                <div>
                  <p>Service</p>
                  <Stars value={selectedStore.ratings.service} />
                </div>
                <div>
                  <p>Staff</p>
                  <Stars value={selectedStore.ratings.staff} />
                </div>
                <div>
                  <p>Quality</p>
                  <Stars value={selectedStore.ratings.quality} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}