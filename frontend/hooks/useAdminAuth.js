"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Simple client-side guard for the admin area: no token, no entry.
// Real session validation still happens server-side via the JWT on every API call.
export default function useAdminAuth() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("vw_token");
    const stored = localStorage.getItem("vw_admin");
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    setAdmin(stored ? JSON.parse(stored) : null);
    setChecked(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    localStorage.removeItem("vw_token");
    localStorage.removeItem("vw_admin");
    router.replace("/admin/login");
  };

  return { admin, checked, logout };
}
