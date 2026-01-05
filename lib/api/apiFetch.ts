export class ApiError extends Error {
  constructor(public status: number, message: string, public body?: unknown) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(path: string, init?: RequestInit) {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) throw new Error("Missing API_BASE_URL");

  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });

  let data: unknown = null;
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    const msg =
      data && typeof data === "object" && "message" in data
        ? String((data as any).message)
        : `Request failed: ${res.status}`;
    throw new ApiError(res.status, msg, data);
  }

  return data as T;
}
