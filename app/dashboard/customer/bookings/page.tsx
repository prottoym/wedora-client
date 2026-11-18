import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const metadata: Metadata = { title: "My Bookings" };

export default function CustomerBookingsPage() {
  return (
    <>
      <PageHeader title="My Bookings" description="Track and cancel your booking requests." />
      <ComingSoon message="Your bookings will appear here once bookings are built." />
    </>
  );
}