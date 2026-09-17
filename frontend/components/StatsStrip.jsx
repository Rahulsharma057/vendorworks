"use client";
import { Box, Container, Grid, Typography } from "@mui/material";
import ScrollReveal from "@/components/ScrollReveal";
import { tokens } from "@/lib/theme";

const stats = [
  { value: "500+", label: "Jobs completed" },
  { value: "13", label: "Years on site" },
  { value: "6", label: "Trades covered" },
  { value: "24hr", label: "Typical response time" },
];

export default function StatsStrip() {
  return (
    <Box sx={{ borderTop: `1px solid ${tokens.line}`, borderBottom: `1px solid ${tokens.line}`, backgroundColor: tokens.white }}>
      <Container maxWidth="lg">
        <ScrollReveal>
          <Grid container>
            {stats.map((s, i) => (
              <Grid
                item
                xs={6}
                md={3}
                key={s.label}
                sx={{
                  py: { xs: 3, md: 4 },
                  px: 2,
                  textAlign: "center",
                  borderLeft: i !== 0 ? { xs: "none", md: `1px solid ${tokens.line}` } : "none",
                  borderTop: { xs: i >= 2 ? `1px solid ${tokens.line}` : "none", md: "none" },
                }}
              >
                <Typography sx={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: { xs: "1.8rem", md: "2.2rem" }, color: tokens.rust }}>
                  {s.value}
                </Typography>
                <Typography sx={{ color: "#4A4740", fontWeight: 600, mt: 0.5 }}>{s.label}</Typography>
              </Grid>
            ))}
          </Grid>
        </ScrollReveal>
      </Container>
    </Box>
  );
}
