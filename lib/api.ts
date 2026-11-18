import { authClient } from "@/lib/auth-client";

const API = process.env.NEXT_PUBLIC_API_URL;

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

let cached: { token: string; exp: number } | null = null;

// logout korar shomoy eta call korbe (UserMenu e)
export function clearTokenCache() {
  cached = null;
}

async function getToken(force = false) {
  if (!force && cached && cached.exp > Date.now()) return cached.token;

  const { data, error } = await authClient.token();
  if (error || !data?.token) {
    throw new ApiError("Please sign in again", 401);
  }
  cached = { token: data.token, exp: Date.now() + 5 * 60 * 1000 };
  return data.token;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const run = async (force: boolean) => {
    const token = await getToken(force);
    return fetch(`${API}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  };

  let res: Response;
  try {
    res = await run(false);
    // token expire hole notun token niye ekbar retry
    if (res.status === 401) res = await run(true);
  } catch (e) {
    if (e instanceof ApiError) throw e;
    throw new ApiError("Could not reach the server. Please try again.", 0);
  }

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(json.message || "Something went wrong", res.status);
  }
  return json as T;
}