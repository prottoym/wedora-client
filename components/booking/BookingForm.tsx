"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { apiFetch, ApiError } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const todayStr = () => {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
};

const schema = z.object({
  eventDate: z
    .string()
    .min(1, "Please choose your event date")
    .refine((v) => v >= todayStr(), "Event date cannot be in the past"),
  eventLocation: z.string().trim().min(3, "Please enter the event location"),
  message: z.string().trim().max(500, "Message is too long (max 500)").optional(),
});

type Values = z.infer<typeof schema>;

export function BookingForm({
  serviceId,
  role,
  disabledReason,
}: {
  serviceId: string;
  role: string;
  disabledReason: string | null;
}) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  async function onSubmit(values: Values) {
    try {
      await apiFetch("/bookings", {
        method: "POST",
        body: JSON.stringify({ serviceId, ...values }),
      });
      toast.success("Booking request sent! The vendor will review it shortly.");
      reset();
      router.push(role === "customer" ? "/dashboard/customer/bookings" : "/dashboard");
    } catch (err) {
      toast.error(
        err instanceof ApiError ? err.message : "Could not send your request",
      );
    }
  }

  if (disabledReason) {
    return (
      <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-muted/30 p-4 text-xs text-muted-foreground">
        <Lock className="mt-0.5 size-4 shrink-0" />
        <p>{disabledReason}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="space-y-1.5">
        <Label htmlFor="eventDate" className="text-xs">Event Date</Label>
        <Input id="eventDate" type="date" min={todayStr()} {...register("eventDate")} />
        {errors.eventDate && (
          <p className="text-[11px] text-destructive">{errors.eventDate.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="eventLocation" className="text-xs">Event Location</Label>
        <Input id="eventLocation" placeholder="e.g. Gulshan, Dhaka" {...register("eventLocation")} />
        {errors.eventLocation && (
          <p className="text-[11px] text-destructive">{errors.eventLocation.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message" className="text-xs">Additional Message (optional)</Label>
        <Textarea
          id="message"
          rows={4}
          placeholder="Tell the vendor about your wedding, guest count, preferences..."
          {...register("message")}
        />
        {errors.message && (
          <p className="text-[11px] text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-10 w-full text-xs shadow-[0_0_20px_-4px] shadow-primary/70"
      >
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        {isSubmitting ? "Sending request..." : "Send Booking Request"}
      </Button>
    </form>
  );
}