import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ProfileForm } from "@/components/profile/ProfileForm";

export const metadata: Metadata = { title: "Profile Settings" };

export default function VendorProfilePage() {
  return (
    <>
      <PageHeader title="Profile Settings" description="Update your name, business name and photo." />
      <ProfileForm />
    </>
  );
}