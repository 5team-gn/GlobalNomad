import { jwtDecode } from "jwt-decode";

type JwtPayload = { exp?: number };

export function getJwtExpMs(token: string): number | null {
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    return exp ? exp * 1000 : null;
  } catch {
    return null;
  }
}
