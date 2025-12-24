export const apiUrl = (path: string) => {
  // Base path for this app
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/datacosmos";
  // Prefer current origin in the browser to avoid hardcoding localhost
  if (typeof window !== "undefined") {
    const origin = window.location.origin;
    return origin + basePath + path;
  }
  // Server-side fallback: allow overriding via env
  const base = process.env.NEXT_PUBLIC_BASE_URL || basePath;
  return base + path;
};
