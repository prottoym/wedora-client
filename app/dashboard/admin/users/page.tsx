import type { Metadata } from "next";
import { PageHeader } from "@/components/dashboard/PageHeader";
import ManageUsers from "@/components/admin/ManageUsers";

export const metadata: Metadata = { title: "Manage Users" };

export default function AdminUsersPage() {
  return (
    <>
      <PageHeader title="Users" description="Search, filter and block accounts." />
      <ManageUsers />
    </>
  );
}
