// app/items/page.tsx
import Accelerator from "@/app/models/accelerator";
import { connectToDB } from "@/app/lib/mongodb";
import Link from "next/link";

export default async function ItemsList() {
  await connectToDB();
  let items: any[] = [];
  try {
    fetch("/api/accelerator")
      .then((res) => res.json())
      .then((data) => data.items);
  } catch (e) {
    console.error("Failed to load accelerators", e);
    items = [];
  }

  return (
    <div style={{ maxWidth: 900, margin: "24px auto", padding: "0 16px" }}>
      <h2>Items</h2>
      <Link href="/">/items/newCreate new</Link>
      <ul>
        {items.map((it: any) => (
          <li key={it._id} style={{ margin: "12px 0" }}>
            <strong>{it.name}</strong> — {it.description}
            {it.imageUrl ? (
              <div>
                <img
                  src={it.imageUrl}
                  alt={it.name}
                  style={{ maxWidth: 200, marginTop: 8 }}
                />
              </div>
            ) : null}
            {it.videoUrl ? (
              <div style={{ marginTop: 8 }}>
                <video src={it.videoUrl} controls style={{ maxWidth: 400 }} />
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
