"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Box, Container, Stack, Typography, Button, IconButton, Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import CallIcon from "@mui/icons-material/Call";
import { tokens } from "@/lib/theme";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/works", label: "Our Work" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        borderBottom: `1px solid ${scrolled ? tokens.line : "transparent"}`,
        backgroundColor: scrolled ? "rgba(251, 250, 246, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        transition: "background-color 0.25s ease, border-color 0.25s ease",
      }}
    >
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ height: 76 }}>
          <Link href="/">
            <Stack direction="row" alignItems="baseline" spacing={0.75}>
              <Typography sx={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.35rem", color: tokens.ink }}>
                RAKESH
              </Typography>
              <Typography sx={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.85rem", color: tokens.rust, letterSpacing: "0.02em" }}>
                Maintenance & Build
              </Typography>
            </Stack>
          </Link>

          <Stack direction="row" spacing={4} alignItems="center" sx={{ display: { xs: "none", md: "flex" } }}>
            {links.map((l) => (
              <Typography
                key={l.href}
                component={Link}
                href={l.href}
                sx={{ fontWeight: 600, fontSize: "0.95rem", color: tokens.ink, "&:hover": { color: tokens.rust } }}
              >
                {l.label}
              </Typography>
            ))}
            <Button
              variant="contained"
              color="primary"
              startIcon={<CallIcon fontSize="small" />}
              component={Link}
              href="/#contact"
            >
              Get a Quote
            </Button>
          </Stack>

          <IconButton sx={{ display: { xs: "inline-flex", md: "none" } }} onClick={() => setOpen(true)} aria-label="Open menu">
            <MenuIcon />
          </IconButton>
        </Stack>
      </Container>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260, p: 3, height: "100%", backgroundColor: tokens.paper }}>
          <Stack direction="row" justifyContent="flex-end">
            <IconButton onClick={() => setOpen(false)} aria-label="Close menu">
              <CloseIcon />
            </IconButton>
          </Stack>
          <Stack spacing={3} sx={{ mt: 2 }}>
            {links.map((l) => (
              <Typography
                key={l.href}
                component={Link}
                href={l.href}
                onClick={() => setOpen(false)}
                sx={{ fontWeight: 700, fontSize: "1.1rem", fontFamily: "var(--font-display)" }}
              >
                {l.label}
              </Typography>
            ))}
            <Button variant="contained" color="primary" component={Link} href="/#contact" onClick={() => setOpen(false)}>
              Get a Quote
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </Box>
  );
}
