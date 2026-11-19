export interface AdminStats {
  totalUsers: number;
  totalVendors: number;
  totalCustomers: number;
  totalServices: number;
  pendingServices: number;
  totalTransactions: number;
  totalRevenue: number; // cents
}

export interface AdminUser {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: "admin" | "vendor" | "customer";
  isBlocked?: boolean;
  businessName?: string;
  subscriptionPlan?: "free" | "premium";
  subscriptionExpiresAt?: string | null;
  createdAt?: string;
}

export interface Transaction {
  _id: string;
  vendorId: string;
  plan: string;
  amount: number; // cents
  currency: string;
  status: "paid" | "failed";
  stripeSessionId: string;
  createdAt: string;
  vendor?: { name?: string; email?: string; businessName?: string };
}
