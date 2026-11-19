import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/PageHeader";
import BookingRequests from "@/components/vendor/BookingRequests";

export const metadata: Metadata = { title: "Booking Requests" };

export default function VendorBookingsPage() {
  return (
    <>
      <PageHeader title="Booking Requests" description="Accept or reject requests from customers." />
      <BookingRequests />
    </>
  );
}
