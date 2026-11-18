import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const metadata: Metadata = { title: "Manage Users" };

export default function ManageUsersPage() {
  return (
    <>
      <PageHeader title="Manage Users" description="Search users, block or unblock accounts." />
      <ComingSoon message="The user list comes in the admin step." />
    </>
  );
}