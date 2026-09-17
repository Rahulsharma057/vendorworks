"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Box, Container, Grid, Stack, Typography, Divider } from "@mui/material";
import api from "@/lib/api";
import { tokens } from "@/lib/theme";

export default function Footer() {
  const year = new Date().getFullYear();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => (await api.get("/profile")).data.profile,
  });

  return (
    <Box component="footer" sx={{ backgroundColor: tokens.ink, color: tokens.paper, mt: 10 }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Typography sx={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.4rem" }}>
              {(profile?.businessName || "RANA Maintenance & Build").split(" ")[0]}{" "}
              <span style={{ color: tokens.rust }}>
                {(profile?.businessName || "RANA Maintenance & Build").split(" ").slice(1).join(" ")}
              </span>
            </Typography>
            <Typography sx={{ mt: 1.5, color: "rgba(251,250,246,0.7)", maxWidth: 340 }}>
              {profile?.tagline ||
                "Gate repair, painting, fencing, wiring, road work and complete building construction — one crew, one point of contact, jobs done on schedule."}
            </Typography>
          </Grid>
          <Grid item xs={6} md={3.5}>
            <Typography sx={{ fontWeight: 700, mb: 1.5 }}>Quick links</Typography>
            <Stack spacing={1}>
              <Typography component={Link} href="/#services" sx={{ color: "rgba(251,250,246,0.75)", "&:hover": { color: tokens.rust } }}>
                Services
              </Typography>
              <Typography component={Link} href="/works" sx={{ color: "rgba(251,250,246,0.75)", "&:hover": { color: tokens.rust } }}>
                Our Work
              </Typography>
              <Typography component={Link} href="/#contact" sx={{ color: "rgba(251,250,246,0.75)", "&:hover": { color: tokens.rust } }}>
                Contact
              </Typography>
              <Typography component={Link} href="/admin/login" sx={{ color: "rgba(251,250,246,0.45)", fontSize: "0.85rem", "&:hover": { color: tokens.rust } }}>
                Admin login
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} md={3.5}>
            <Typography sx={{ fontWeight: 700, mb: 1.5 }}>Get in touch</Typography>
            <Stack spacing={1}>
              <Typography sx={{ color: "rgba(251,250,246,0.75)" }}>{profile?.phone || "+91 98765 43210"}</Typography>
              <Typography sx={{ color: "rgba(251,250,246,0.75)" }}>{profile?.email || "contact@ranaworks.example"}</Typography>
              {profile?.address && <Typography sx={{ color: "rgba(251,250,246,0.75)" }}>{profile.address}</Typography>}
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, borderColor: "rgba(251,250,246,0.12)" }} />
        <Typography sx={{ color: "rgba(251,250,246,0.5)", fontSize: "0.85rem" }}>
          © {year} {profile?.businessName || "Rana Maintenance & Build"}. All jobs shown are completed client work.
        </Typography>
      </Container>
    </Box>
  );
}
