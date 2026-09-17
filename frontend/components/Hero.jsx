"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Box, Container, Grid, Stack, Typography, Button, Chip } from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import PlaceIcon from "@mui/icons-material/PlaceOutlined";
import api, { imgUrl } from "@/lib/api";
import { tokens } from "@/lib/theme";

const trades = ["Gates", "Painting", "Wiring", "Roads", "Fencing", "Construction"];

export default function Hero() {
  // a single orchestrated load-in sequence for the hero — not scattered
  // per-element animation, just one moment when the page opens.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  // show a featured job's photo if the vendor has marked one; otherwise
  // fall back to the most recently added work item. Shares its cache key
  // with FeaturedWorks below, so this doesn't cost an extra request.
  const { data: featured } = useQuery({
    queryKey: ["works", "featured"],
    queryFn: async () => (await api.get("/works", { params: { featured: true, limit: 6 } })).data.works,
  });
  const { data: recent } = useQuery({
    queryKey: ["works", "recent"],
    queryFn: async () => (await api.get("/works", { params: { limit: 6 } })).data.works,
    enabled: featured?.length === 0,
  });
  const heroWork = featured?.[0] || recent?.[0];

  return (
    <Box component="section" sx={{ pt: { xs: 6, md: 9 }, pb: { xs: 7, md: 10 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                opacity: ready ? 1 : 0,
                transform: ready ? "translateY(0)" : "translateY(18px)",
                transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <Chip
                label="Serving Aligarh & nearby areas since 2011"
                size="small"
                sx={{
                  backgroundColor: "transparent",
                  border: `1px solid ${tokens.line}`,
                  color: tokens.steel,
                  fontWeight: 600,
                  mb: 3,
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.4rem", sm: "3.1rem", md: "3.8rem" },
                  color: tokens.ink,
                }}
              >
                One crew for every job
                <br />
                your property needs.
              </Typography>
              <Typography sx={{ mt: 3, fontSize: "1.15rem", color: "#4A4740", maxWidth: 480 }}>
                Gate repair, painting, wiring, road and fencing work, or a full building
                build — we handle it site to finish and show you exactly what we&apos;ve
                delivered before.
              </Typography>

              <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  component={Link}
                  href="/#contact"
                  endIcon={<ArrowOutwardIcon />}
                >
                  Request a Quote
                </Button>
                <Button variant="outlined" size="large" component={Link} href="/works" sx={{ borderColor: tokens.ink, color: tokens.ink }}>
                  See Our Work
                </Button>
              </Stack>

              <Stack direction="row" flexWrap="wrap" spacing={1} sx={{ mt: 4, rowGap: 1 }}>
                {trades.map((t) => (
                  <Chip key={t} label={t} size="small" sx={{ backgroundColor: tokens.white, border: `1px solid ${tokens.line}` }} />
                ))}
              </Stack>
            </Box>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box
              sx={{
                opacity: ready ? 1 : 0,
                transform: ready ? "translateY(0)" : "translateY(28px)",
                transition: "opacity 0.8s ease 0.15s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s",
                position: "relative",
                aspectRatio: "4 / 5",
                border: `1px solid ${tokens.line}`,
                backgroundColor: tokens.white,
                p: 1.5,
              }}
            >
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: tokens.paperAlt,
                  border: heroWork ? "none" : `1px dashed ${tokens.line}`,
                  display: "flex",
                  alignItems: "flex-end",
                  p: heroWork ? 0 : 2,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {heroWork?.images?.[0] ? (
                  <Image
                    src={imgUrl(heroWork.images[0])}
                    alt={heroWork.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 40vw"
                    priority
                    style={{ objectFit: "cover" }}
                  />
                ) : null}

                <Box
                  sx={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    px: 1,
                    py: 0.4,
                    backgroundColor: tokens.rust,
                    color: tokens.white,
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.03em",
                    zIndex: 1,
                  }}
                >
                  {heroWork ? "RECENTLY COMPLETED" : "JOB SITE — LIVE"}
                </Box>

                {heroWork ? (
                  <Box
                    sx={{
                      position: "relative",
                      zIndex: 1,
                      width: "100%",
                      p: 2,
                      background: "linear-gradient(0deg, rgba(28,35,33,0.75) 0%, rgba(28,35,33,0) 65%)",
                    }}
                  >
                    <Typography sx={{ color: tokens.white, fontWeight: 700, fontFamily: "var(--font-display)" }} noWrap>
                      {heroWork.title}
                    </Typography>
                    {heroWork.location && (
                      <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mt: 0.25 }}>
                        <PlaceIcon sx={{ fontSize: 15, color: "rgba(251,250,246,0.85)" }} />
                        <Typography sx={{ color: "rgba(251,250,246,0.85)", fontSize: "0.85rem" }}>{heroWork.location}</Typography>
                      </Stack>
                    )}
                  </Box>
                ) : (
                  <Typography sx={{ color: "#5c584f", fontWeight: 600 }}>
                    Photo of your latest completed job goes here — add it from the admin
                    dashboard.
                  </Typography>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}