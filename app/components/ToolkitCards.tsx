"use client";
import React from "react";
import { Card } from "antd";
import TryOutButton from "../toolkit/TryOutButton";

export default function ToolkitCards({
  items,
  basePath,
  isAdmin = false,
  title = "Data Cosmos Toolkit",
  onEdit,
  onDelete,
  hideTryOut
}: {
  items: any[];
  basePath: string;
  isAdmin?: boolean;
  title?: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  hideTryOut?: boolean;
}) {
  return (
    <>
      {/* <h1 className="page-title">{title}</h1> */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
        {items.map((it: any) => (
          <Card
            key={it._id}
            bordered={false}
            className="rounded-xl shadow-lg border border-[#dedede] flex flex-col justify-between h-full overflow-hidden"
            style={{ minHeight: 220, padding: 0, display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ padding: 0, display: 'flex', flexDirection: 'column', flex: 1 }}
          >
            {/* Card Body */}
            <div className="flex-1 flex flex-col">
              {it.iconUrl ? (
                <div className="flex justify-center items-center p-4 h-42 bg-white">
                  <img src={it.iconUrl} alt={it.name} className="w-full h-44 object-contain rounded-t-xl w-[100px] h-[100px]" />
                </div>
              ) : (
                <div className="w-full h-44 bg-gray-200 rounded-t-xl" />
              )}
              <div className="p-4 flex flex-col gap-2 flex-1">
                <strong className="block text-lg font-semibold mb-2 text-gray-900">{it.name}</strong>
                <div className="text-gray-700 mb-2">{it.description}</div>
              </div>
            </div>
            {/* Card Footer */}
            <div className="border-t pt-3 pb-3 px-4 flex gap-2 justify-end items-center mt-auto" style={{ borderTop: '1px solid #eee', background: '#fafbfc' }}>
              <button
                onClick={() => window.location.href = `${basePath}/accelerator/${it._id}`}
                className="px-3 py-1 rounded text-white text-xs font-semibold transition"
                style={{ background: '#F15B40' }}
              >
                View
              </button>
              {!hideTryOut && it.dockerProjectName && it.dockerProjectName.trim() !== "" && (
                <div className="flex items-center">
                  <TryOutButton
                    toolkitDockerProjectId={it.dockerProjectName}
                    toolkitName={it.name}
                    // buttonProps={{ className: "px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-xs font-semibold transition h-8 flex items-center" }}
                  />
                </div>
              )}
              {isAdmin && (
                <>
                  <button
                    onClick={() => onEdit ? onEdit(it._id) : window.location.href = `${basePath}/accelerators/new?id=${it._id}`}
                    className="px-3 py-1 rounded bg-orange-500 text-white text-xs font-semibold hover:bg-orange-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete && onDelete(it._id)}
                    className="px-3 py-1 rounded bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
