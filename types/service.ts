export type ServiceStatus = "pending" | "approved" | "rejected";

export interface VendorInfo {
  name?: string;
  email?: string;
  businessName?: string;
  image?: string;
  subscriptionPlan?: "free" | "premium";
}

export interface Service {
  _id: string;
  vendorId: string;
  serviceName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  status: ServiceStatus;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  vendor?: VendorInfo; // public / admin list e ashe
}

export interface Paged {
  total: number;
  page: number;
  pages: number;
}

export interface VendorStats {
  totalServices: number;
  activeServices: number;
  pendingBookings: number;
  acceptedBookings: number;
  plan: "free" | "premium";
  subscriptionExpiresAt: string | null;
  serviceLimit: number | null; // premium hole null
  activeSlots: number;
}
