export const apiUrl = (path: string) => {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/datacosmos";
  return base + path;
};
