"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { apiFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";
import { todayISO } from "@/lib/format";

export default function BookingForm({ serviceId }: { serviceId: string }) {
  const { data: session, isPending } = useSession();
  const role = (session?.user as { role?: string } | undefined)?.role;

  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  if (isPending) return null;

  // Booking shudhu customer er jonno
  if (role !== "customer") {
    return (
      <div className="rounded-xl border p-5 text-sm">
        <p className="font-medium">Booking is for customer accounts</p>
        <p className="text-muted-foreground mt-1">
          You are signed in as {role ?? "a user"}. Use a customer account to send booking requests.
        </p>
      </div>
    );
  }

  if (done) {
    return (
      <div className="rounded-xl border p-5 text-center">
        <CheckCircle2 className="mx-auto size-8 text-emerald-500" />
        <p className="mt-2 font-medium">Request sent!</p>
        <p className="text-muted-foreground mt-1 text-sm">The vendor will accept or reject your request.</p>
        <Link href="/dashboard/customer/bookings" className={buttonVariants({ className: "mt-4" })}>
          View my bookings
        </Link>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!eventDate) return toast.error("Please choose the event date");
    if (eventLocation.trim().length < 3) return toast.error("Please enter the event location");

    setSaving(true);
    try {
      await apiFetch("/api/bookings", {
        method: "POST",
        auth: true,
        body: { serviceId, eventDate, eventLocation: eventLocation.trim(), message: message.trim() },
      });
      toast.success("Booking request sent");
      setDone(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send request"); // 409 duplicate ekhane ashbe
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border p-5">
      <h3 className="text-lg font-semibold">Request a booking</h3>
      <div className="space-y-2">
        <Label htmlFor="eventDate">Event date</Label>
        <Input
          id="eventDate"
          type="date"
          min={todayISO()}
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="eventLocation">Event location</Label>
        <Input
          id="eventLocation"
          value={eventLocation}
          maxLength={150}
          onChange={(e) => setEventLocation(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message (optional)</Label>
        <Textarea id="message" rows={3} maxLength={500} value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <Button type="submit" className="w-full" disabled={saving}>
        {saving && <Loader2 className="mr-2 size-4 animate-spin" />}
        Send request
      </Button>
    </form>
  );
}
