import type { Service, ServicesResponse } from "@/types";

export type ServiceResult = {
  service?: Service;
  error?: "invalid" | "notfound" | "failed";
};

export async function getService(id: string): Promise<ServiceResult> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/services/${encodeURIComponent(id)}`,
      { cache: "no-store" },
    );
    if (res.status === 400) return { error: "invalid" };
    if (res.status === 404) return { error: "notfound" };
    if (!res.ok) return { error: "failed" };

    const json = await res.json();
    return { service: json.service };
  } catch {
    return { error: "failed" };
  }
}