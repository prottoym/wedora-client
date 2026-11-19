export type BookingStatus = "pending" | "accepted" | "rejected" | "cancelled";

export interface BookingService {
  serviceName?: string;
  images?: string[];
  price?: number;
  category?: string;
  location?: string;
}

export interface BookingPerson {
  name?: string;
  email?: string;
  image?: string;
  businessName?: string;
}

export interface Booking {
  _id: string;
  serviceId: string;
  vendorId: string;
  customerId: string;
  eventDate: string; // YYYY-MM-DD
  eventLocation: string;
  message: string;
  status: BookingStatus;
  createdAt: string;
  service?: BookingService;
  vendor?: BookingPerson; // customer er list e
  customer?: BookingPerson; // vendor er list e
}

export interface CustomerStats {
  total: number;
  pending: number;
  accepted: number;
  rejected: number;
  cancelled: number;
}
