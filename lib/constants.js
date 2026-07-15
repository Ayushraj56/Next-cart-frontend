export const baseAPI =
  process.env.NODE_ENV === "production"
    ? "/backend"
    : process.env.NEXT_PUBLIC_BASE_API || "http://localhost:3200";