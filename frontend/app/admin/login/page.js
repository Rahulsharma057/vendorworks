"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, Paper, Typography, TextField, Button, Alert } from "@mui/material";
import api from "@/lib/api";
import { tokens } from "@/lib/theme";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("vw_token", data.token);
      localStorage.setItem("vw_admin", JSON.stringify(data.admin));
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", backgroundColor: tokens.paper }}>
      <Container maxWidth="xs">
        <Paper elevation={0} sx={{ p: 4, border: `1px solid ${tokens.line}` }}>
          <Typography sx={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.3rem", mb: 0.5 }}>
            RANA <span style={{ color: tokens.rust }}>Admin</span>
          </Typography>
          <Typography sx={{ color: "#6b665c", mb: 3 }}>Sign in to manage your site.</Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              sx={{ mb: 2.5 }}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              sx={{ mb: 3 }}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth size="large" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
