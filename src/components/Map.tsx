"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Store } from "@/lib/types";
import tanDinhWard from "@/data/tan-dinh-ward.json";

type MapProps = {
  stores: Store[];
  selectedStoreId: string;
  onSelectStore: (storeId: string) => void;
};

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "";

export default function Map({
  stores,
  selectedStoreId,
  onSelectStore,
}: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [106.6903, 10.7889],
      zoom: 15.5,
      attributionControl: false,
    });

    mapRef.current.on("load", () => {
      mapRef.current!.addSource("tan-dinh", {
        type: "geojson",
        data: tanDinhWard as GeoJSON.FeatureCollection,
      });

      mapRef.current!.addLayer({
      id: "tan-dinh-fill",
      type: "fill",
      source: "tan-dinh",
      paint: {
        "fill-color": "#ff4fa3",
        "fill-opacity": 0.35,
      },
    });

    mapRef.current!.addLayer({
      id: "tan-dinh-outline",
      type: "line",
      source: "tan-dinh",
      paint: {
        "line-color": "#ff2d95",
        "line-width": 3,
      },
    });
  });

    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    stores.forEach((store) => {
      const el = document.createElement("button");
      el.style.width = "18px";
      el.style.height = "18px";
      el.style.borderRadius = "9999px";
      el.style.border = "2px solid white";
      el.style.boxShadow = "0 2px 6px rgba(0,0,0,0.25)";
      el.style.backgroundColor =
        store.id === selectedStoreId ? "#ec4899" : "#3b82f6";
      el.onclick = () => onSelectStore(store.id);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([store.coordinates.lng, store.coordinates.lat])
        .addTo(mapRef.current!);

      markersRef.current.push(marker);
    });

    const selected = stores.find((store) => store.id === selectedStoreId);
    if (selected) {
      mapRef.current.flyTo({
        center: [selected.coordinates.lng, selected.coordinates.lat],
        zoom: 16,
        essential: true,
      });
    }
  }, [stores, selectedStoreId, onSelectStore]);

  return <div ref={mapContainerRef} className="h-full w-full" />;
}