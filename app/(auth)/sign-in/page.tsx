import type { Metadata } from "next";
import { SignInForm } from "@/components/auth/SignInForm";

export const metadata: Metadata = { title: "Sign In | WedPlan" };

export default function SignInPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Sign in to manage your bookings and services.
        </p>
      </div>
      <SignInForm />
    </>
  );
}