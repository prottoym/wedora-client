import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const metadata: Metadata = { title: "Booking Requests" };

export default function VendorBookingsPage() {
  return (
    <>
      <PageHeader title="Booking Requests" description="Accept or reject requests for your services." />
      <ComingSoon message="Booking requests will appear here once bookings are built." />
    </>
  );
}