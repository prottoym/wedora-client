"use client";

import { CreditCard } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { StatCard } from "@/components/dashboard/StatCard";

export function PlanStat() {
  const { data } = authClient.useSession();
  const plan = data?.user?.subscriptionPlan;
  const label = plan ? plan.charAt(0).toUpperCase() + plan.slice(1) : "—";
  return <StatCard label="Current Plan" value={label} icon={CreditCard} />;
}