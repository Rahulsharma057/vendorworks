"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Box, Grid, Typography, Paper, Button, Stack } from "@mui/material";
import api from "@/lib/api";
import { tokens } from "@/lib/theme";

export default function AdminOverviewPage() {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await api.get("/categories")).data.categories,
  });
  const { data: works } = useQuery({
    queryKey: ["admin-works-count"],
    queryFn: async () => (await api.get("/works", { params: { limit: 1 } })).data.pagination,
  });
  const { data: messages } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => (await api.get("/contact")).data.messages,
  });
  const { data: testimonials } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => (await api.get("/testimonials")).data.testimonials,
  });

  const unread = messages?.filter((m) => !m.isRead).length ?? 0;

  const cards = [
    { label: "Work items", value: works?.total ?? "–", href: "/admin/works" },
    { label: "Categories", value: categories?.length ?? "–", href: "/admin/categories" },
    { label: "Unread enquiries", value: unread, href: "/admin/messages" },
    { label: "Testimonials", value: testimonials?.length ?? "–", href: "/admin/testimonials" },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ fontSize: "1.6rem", mb: 3 }}>
        Overview
      </Typography>
      <Grid container spacing={2.5}>
        {cards.map((c) => (
          <Grid item xs={12} sm={6} md={3} key={c.label}>
            <Paper
              component={Link}
              href={c.href}
              elevation={0}
              sx={{
                display: "block",
                p: 3,
                border: `1px solid ${tokens.line}`,
                "&:hover": { borderColor: tokens.rust },
              }}
            >
              <Typography sx={{ color: "#6b665c", fontWeight: 600, mb: 1 }}>{c.label}</Typography>
              <Typography sx={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color: tokens.rust }}>
                {c.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" component={Link} href="/admin/works">
          Add a Work Item
        </Button>
        <Button variant="outlined" component={Link} href="/" sx={{ borderColor: tokens.ink, color: tokens.ink }}>
          View Live Site
        </Button>
      </Stack>
    </Box>
  );
}
