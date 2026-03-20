"use client";

import { useState, useEffect } from "react";
import { getAllUsers, User } from "@/app/src/auth.service";
import Button from "@/components/shared/Button";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getAllUsers();
        let userList: User[] = [];

        if (data?.users) {
          userList = data.users;
        } else if (data?.data) {
          if (Array.isArray(data.data)) {
            userList = data.data;
          } else if (data.data.users && Array.isArray(data.data.users)) {
            userList = data.data.users;
          }
        }

        setUsers(userList);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  /* ---------------- LOADING STATE ---------------- */

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-48 bg-foreground/10 rounded-md" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 w-full bg-foreground/5 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  /* ---------------- ERROR STATE ---------------- */

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-8 text-center">
        <p className="text-red-500 font-bold mb-4 uppercase tracking-tighter">
          Error loading users
        </p>
        <p className="text-sm text-red-500/70 mb-6">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  /* ---------------- MAIN UI ---------------- */

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            Community{" "}
            <span className="text-foreground/40">({users.length})</span>
          </h1>
          <p className="text-sm text-foreground/50">
            Manage and view all registered accounts.
          </p>
        </div>
        <Button>Export List</Button>
      </div>

      {users.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-foreground/10 rounded-3xl">
          <p className="text-foreground/40 font-medium">
            No users found in the database.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {/* HEADER ROW (Desktop Only) */}
          <div className="hidden md:grid grid-cols-5 px-6 py-2 text-[10px] font-black uppercase tracking-widest text-foreground/40">
            <span>ID / Created</span>
            <span>Name</span>
            <span>Email</span>
            <span>Role</span>
            <span className="text-right">Actions</span>
          </div>

          {/* USER ROWS */}
          {users.map((user: User) => (
            <div
              key={user.id}
              className="group bg-foreground/2 border border-foreground/50 hover:border-foreground/20 hover:bg-foreground/4 transition-all rounded- p-4 md:px-6 md:py-4 grid grid-cols-1 md:grid-cols-5 items-center gap-4"
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-foreground/30 truncate">
                  #{user.id.slice(-6)}
                </span>
                <span className="text-xs text-foreground/50">
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>

              <div className="font-bold text-sm tracking-tight capitalize">
                {user.name}
              </div>

              <div className="text-sm text-foreground/60 truncate">
                {user.email}
              </div>

              <div>
                <span
                  className={`inline-flex px-3 py-1 text-[10px] font-black uppercase tracking-tighter rounded-full ${
                    user.role === "admin"
                      ? "bg-foreground text-background"
                      : "bg-foreground/10 text-foreground"
                  }`}
                >
                  {user.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
