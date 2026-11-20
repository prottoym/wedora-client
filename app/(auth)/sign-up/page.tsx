import type { Metadata } from "next";
import { SignUpForm } from "@/components/auth/SignUpForm";

export const metadata: Metadata = { title: "Sign Up | Wedore" };

export default function SignUpPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Join Wedora as a customer or a wedding vendor.
        </p>
      </div>
      <SignUpForm />
    </>
  );
}
