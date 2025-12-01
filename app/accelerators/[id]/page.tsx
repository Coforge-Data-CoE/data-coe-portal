"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Card, Button, Spin, Alert } from "antd";

const apiUrl = (path: string) => {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/datacosmos";
  return base + path;
};

export default function AcceleratorDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [item, setItem] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        setErr(null);
        const res = await fetch(apiUrl(`/api/accelerator/${id}`), {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`Failed to load (HTTP ${res.status})`);
        const data = await res.json();
        setItem(data);
      } catch (e: any) {
        setErr(e.message || "Failed to load");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin tip="Loading accelerator..." />
      </div>
    );
  }

  if (err || !item) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Alert type="error" message={err || "Not found"} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <Card
        title={item.name}
        extra={
          <div className="flex gap-2">
            <Button onClick={() => router.push("/accelerators")}>
              &larr; Back
            </Button>
            <Button
              type="primary"
              onClick={() => router.push(`/accelerators/new?id=${item._id}`)}
            >
              Edit
            </Button>
          </div>
        }
      >
        <div className="flex flex-col md:flex-row gap-1 mt-1">
          <div className="flex-1 flex flex-col items-center justify-center">
            {item.imageUrl && (
              <div className="mb-4">
                <div
                  className="mb-4 w-full rounded"
                  style={{
                    // ...existing code...
                    backgroundImage: `url(${item.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                    height: 420, // same height as before
                  }}
                  aria-label={item.name}
                  role="img"
                >
                  {item.iconUrl && (
                    <div className="mb-4">
                      <Image
                        src={item.iconUrl}
                        alt={`${item.name} icon`}
                        width={96}
                        height={96}
                        className="rounded"
                      />
                    </div>
                  )}

                  <div className="prose prose-invert max-w-none">
                    {/* Summary may be rich HTML; render safely if sanitized server-side */}
                    {item.summary ? (
                      <div dangerouslySetInnerHTML={{ __html: item.summary }} />
                    ) : (
                      <p>No summary available.</p>
                    )}
                  </div>

                  <div className="mt-1 grid gap-2 text-sm">
                    <div>
                      <strong>Data Offering:</strong>{" "}
                      {item.dataOffering || "N/A"}
                    </div>
                    {item.createdBy && (
                      <div>
                        <strong>Created By:</strong> {item.createdBy}
                      </div>
                    )}
                    {item.createdAt && (
                      <div>
                        <strong>Created At:</strong>{" "}
                        {new Date(item.createdAt).toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            {item.videoUrl && (
              <div className="mt-1">
                <video
                  src={item.videoUrl}
                  controls
                  style={{ width: "100%", borderRadius: 8 }}
                />
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
