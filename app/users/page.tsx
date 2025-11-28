"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar } from "antd";
import { Card, Button, Spin, message, Popconfirm } from "antd";
import { IUser } from "../models/user";
import { useSession } from "next-auth/react";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/datacosmos";

const fetchUsers = async () => {
  const res = await fetch(`${basePath}/api/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export default function UsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const { data: session } = useSession();
  const currentUser = users.find(u => u.email === session?.user?.email);

  useEffect(() => {
    fetchUsers()
      .then(data => setUsers(data))
      .catch(() => message.error("Could not load users"))
      .finally(() => setLoading(false));
  }, []);

  const makeAdmin = async (userId: string) => {
    setUpdating(userId);
    try {
      const res = await fetch(`${basePath}/api/users/${userId}/admin`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to update user");
      message.success("User promoted to administrator");
      setUsers(users => users.map((u: IUser) => u._id === userId ? { ...u, isAdmin: true } as IUser : u));
    } catch {
      message.error("Could not update user");
    } finally {
      setUpdating(null);
    }
  };


  const removeAdmin = async (userId: string) => {
    setUpdating(userId);
    try {
      const res = await fetch(`${basePath}/api/users/${userId}/admin`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAdmin: false })
      });
      if (!res.ok) throw new Error("Failed to update user");
      message.success("Administrator rights removed");
      setUsers(users => users.map((u: IUser) => u._id === userId ? { ...u, isAdmin: false } as IUser : u));
    } catch {
      message.error("Could not update user");
    } finally {
      setUpdating(null);
    }
  };


  if (loading) return <div className="flex justify-center items-center min-h-screen"><Spin size="large" /></div>;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">All Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {users.map((user: any) => (
          <Card
            key={user._id}
            bordered={false}
            className="rounded-xl shadow-lg border border-[#dedede] flex flex-col justify-between"
            style={{ minHeight: 220, padding: 0 }}
            bodyStyle={{ padding: 0 }}
          >
            <div className="flex items-center p-6 pb-2">
              <div className="flex-shrink-0">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || user.email}
                    width={60}
                    height={60}
                    className="rounded-full object-cover border-1 border-[#dedede] shadow"
                  />
                ) : (
                  <Avatar
                    size={60}
                    style={{ backgroundColor: '#dedede', color: '#333', fontWeight: 600 }}
                  >
                    {(user.name || user.email || "U").charAt(0).toUpperCase()}
                  </Avatar>
                )}
              </div>
              <div className="ml-6 flex-1">
                <h2 className="text-lg font-semibold mb-1">{user.name || user.email}</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-1">{user.email}</p>
                {/* <p className="text-gray-500 text-sm">OID: {user.oid || "-"}</p> */}
                {user.isAdmin && (
                  <span className="mt-2 inline-block px-3 py-1 rounded bg-green-600 text-white font-semibold text-xs">Administrator</span>
                )}
              </div>
            </div>
            <div className="flex justify-end items-center px-6 pb-4 pt-2">
              {!user.isAdmin && currentUser?.isAdmin && (
                <Popconfirm
                  title="Promote to Administrator?"
                  description={`Are you sure you want to grant administrator rights to ${user.name || user.email}?`}
                  onConfirm={async () => {
                    await makeAdmin(user._id);
                    message.success(`${user.name || user.email} is now an administrator.`);
                  }}
                  onCancel={() => message.info('Promotion cancelled.')}
                  okText="Yes"
                  cancelText="No"
                  placement="topRight"
                  disabled={updating === user._id}
                >
                  <Button
                    type="primary"
                    loading={updating === user._id}
                    className="bg-[#f15840] border-none hover:bg-[#d94c2f]"
                  >
                    Make Administrator
                  </Button>
                </Popconfirm>
              )}
              {user.isAdmin && currentUser?.isAdmin && user.email !== currentUser.email && (
                <Popconfirm
                  title="Remove Administrator Rights?"
                  description={`Are you sure you want to remove administrator rights from ${user.name || user.email}?`}
                  onConfirm={async () => {
                    await removeAdmin(user._id);
                    message.success(`Administrator rights removed from ${user.name || user.email}.`);
                  }}
                  onCancel={() => message.info('Removal cancelled.')}
                  okText="Yes"
                  cancelText="No"
                  placement="topRight"
                  disabled={updating === user._id}
                >
                  <Button
                    danger
                    loading={updating === user._id}
                    className="border-none ml-2"
                  >
                    Remove Administrator
                  </Button>
                </Popconfirm>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
