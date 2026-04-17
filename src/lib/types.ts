export type Store = {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  priceRange: "$" | "$$" | "$$$";
  address: string;
  ratings: {
    service: 1 | 2 | 3 | 4 | 5;
    staff: 1 | 2 | 3 | 4 | 5;
    quality: 1 | 2 | 3 | 4 | 5;
  };
};