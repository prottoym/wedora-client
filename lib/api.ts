import { authClient } from "@/lib/auth-client";


export const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:5000" : "")
).replace(/\/+$/, "");

console.log("API_URL =", API_URL); // test shesh hole muche dio

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

type Options = Omit<RequestInit, "body"> & { auth?: boolean; body?: unknown };

/** path starts with /api/..., set auth: true for private routes */
export async function apiFetch<T>(
  path: string,
  { auth = false, body, headers, ...init }: Options = {},
): Promise<T> {
  const finalHeaders = new Headers(headers);
  if (body !== undefined) finalHeaders.set("Content-Type", "application/json");

  if (auth) {
    const { data } = await authClient.token();
    if (!data?.token) throw new ApiError("Please sign in to continue.", 401);
    finalHeaders.set("Authorization", `Bearer ${data.token}`);
  }

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: finalHeaders,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError("Cannot reach the server. Please try again.", 0);
  }

  const payload = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(payload?.message ?? "Something went wrong.", res.status);
  return payload as T;
}