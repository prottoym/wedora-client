import {
  Briefcase,
  CalendarCheck,
  CreditCard,
  LayoutDashboard,
  PlusCircle,
  Receipt,
  ShieldCheck,
  UserCog,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Role = "admin" | "vendor" | "customer";
export type NavItem = { href: string; label: string; icon: LucideIcon };

export const isRole = (value: unknown): value is Role =>
  value === "admin" || value === "vendor" || value === "customer";

export const ROLE_LABEL: Record<Role, string> = {
  admin: "Admin",
  vendor: "Vendor",
  customer: "Customer",
};

export const NAV: Record<Role, NavItem[]> = {
  vendor: [
    { href: "/dashboard/vendor", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/vendor/services", label: "My Services", icon: Briefcase },
    { href: "/dashboard/vendor/services/new", label: "Add Service", icon: PlusCircle },
    { href: "/dashboard/vendor/bookings", label: "Booking Requests", icon: CalendarCheck },
    { href: "/dashboard/vendor/subscription", label: "Subscription", icon: CreditCard },
    { href: "/dashboard/vendor/profile", label: "Profile Settings", icon: UserCog },
  ],
  customer: [
    { href: "/dashboard/customer", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/customer/bookings", label: "My Bookings", icon: CalendarCheck },
    { href: "/dashboard/customer/profile", label: "Profile Settings", icon: UserCog },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/admin/users", label: "Manage Users", icon: Users },
    { href: "/dashboard/admin/services", label: "Manage Services", icon: ShieldCheck },
    { href: "/dashboard/admin/transactions", label: "Transactions", icon: Receipt },
  ],
};

export const PORTAL_TITLE: Record<Role, string> = {
  vendor: "Vendor Portal",
  customer: "Customer Portal",
  admin: "Admin Console",
};

export const HUB_LABEL: Record<Role, string> = {
  vendor: "Vendor Hub",
  customer: "Customer Hub",
  admin: "Admin Console",
};