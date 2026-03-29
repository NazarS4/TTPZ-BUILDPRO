export interface Property {
  id: string;
  name: string;
  location: string;
  type: string;
  basePrice: number;
  pricePerSqm: number;
  minArea: number;
  maxArea: number;
  floors: number;
  completionDate: string;
  images: string[];
  features: string[];
  description: string;
  availableUnits: number;
}

export const properties: Property[] = [
  {
    id: "1",
    name: "Aurora Heights",
    location: "Downtown District",
    type: "Luxury Residential",
    basePrice: 250000,
    pricePerSqm: 2500,
    minArea: 45,
    maxArea: 150,
    floors: 20,
    completionDate: "Q4 2026",
    images: [
      "https://images.unsplash.com/photo-1770625296856-cb865be093da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb25zdHJ1Y3Rpb24lMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc3NDc5NDMzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1738168279272-c08d6dd22002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzc0NzgxMTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1610177534644-34d881503b83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBraXRjaGVuJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzc0NzAyNjYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    features: [
      "Underground Parking",
      "Fitness Center",
      "Rooftop Garden",
      "24/7 Security",
      "Smart Home System",
      "Swimming Pool"
    ],
    description: "Modern luxury residential complex in the heart of downtown. Features state-of-the-art amenities and spectacular city views.",
    availableUnits: 45
  },
  {
    id: "2",
    name: "Green Valley Residence",
    location: "Suburban Area",
    type: "Family Residential",
    basePrice: 180000,
    pricePerSqm: 1800,
    minArea: 60,
    maxArea: 200,
    floors: 12,
    completionDate: "Q2 2027",
    images: [
      "https://images.unsplash.com/photo-1587771518560-d4e96de71240?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBidWlsZGluZyUyMGZhY2FkZXxlbnwxfHx8fDE3NzQ3NTM4NTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1750420556288-d0e32a6f517b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzc0NzY3NDM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    features: [
      "Children Playground",
      "Green Spaces",
      "Parking",
      "Storage Units",
      "Pet-Friendly",
      "Community Center"
    ],
    description: "Perfect for families seeking comfort and tranquility. Surrounded by parks and excellent schools.",
    availableUnits: 68
  },
  {
    id: "3",
    name: "Skyline Tower",
    location: "Business District",
    type: "Premium Residential",
    basePrice: 320000,
    pricePerSqm: 3200,
    minArea: 50,
    maxArea: 180,
    floors: 35,
    completionDate: "Q1 2027",
    images: [
      "https://images.unsplash.com/photo-1774309480928-4dd072d67181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGNvbXBsZXglMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc3NDc5NDMzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1738168279272-c08d6dd22002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzc0NzgxMTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    ],
    features: [
      "Concierge Service",
      "Spa & Wellness",
      "Sky Lounge",
      "Business Center",
      "Valet Parking",
      "Wine Cellar"
    ],
    description: "Iconic tower offering unparalleled luxury and breathtaking panoramic views. Premium amenities for sophisticated living.",
    availableUnits: 32
  }
];

export interface FinishingOption {
  id: string;
  name: string;
  priceMultiplier: number;
  description: string;
}

export const finishingOptions: FinishingOption[] = [
  {
    id: "standard",
    name: "Standard",
    priceMultiplier: 1.0,
    description: "Quality materials and finishes"
  },
  {
    id: "premium",
    name: "Premium",
    priceMultiplier: 1.25,
    description: "High-end materials and appliances"
  },
  {
    id: "luxury",
    name: "Luxury",
    priceMultiplier: 1.5,
    description: "Top-tier designer finishes"
  }
];

export interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  customerName: string;
  email: string;
  phone: string;
  area: number;
  floor: number;
  finishing: string;
  totalPrice: number;
  date: string;
  status: "pending" | "confirmed" | "cancelled";
}

// Helper function to get all properties (default + custom)
export function getAllProperties(): Property[] {
  const customProperties = localStorage.getItem("customProperties");
  const custom = customProperties ? JSON.parse(customProperties) : [];
  return [...properties, ...custom];
}