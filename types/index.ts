export type Service = {
  _id: string;
  serviceName: string;
  category: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  status: "pending" | "approved" | "rejected";
  vendor?: {
    name?: string;
    businessName?: string;
    subscriptionPlan?: "free" | "premium";
  };
};