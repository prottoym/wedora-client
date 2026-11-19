import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/PageHeader";
import MyBookings from "@/components/customer/MyBookings";

export const metadata: Metadata = { title: "My Bookings" };

export default function CustomerBookingsPage() {
  return (
    <>
      <PageHeader title="My Bookings" description="Your requests and their status." />
      <MyBookings />
    </>
  );
}
