import type { NextRequest } from "next/server";

export function getIpAddress(request: NextRequest): string {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0]?.trim() || "unknown";
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  return "unknown";
}

export function jsonError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}
