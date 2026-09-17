"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Stack, Typography, Button, CircularProgress } from "@mui/material";
import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibraryOutlined";
import CategoryIcon from "@mui/icons-material/CategoryOutlined";
import MailIcon from "@mui/icons-material/MailOutlineOutlined";
import StorefrontIcon from "@mui/icons-material/StorefrontOutlined";
import RateReviewIcon from "@mui/icons-material/RateReviewOutlined";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import useAdminAuth from "@/hooks/useAdminAuth";
import { tokens } from "@/lib/theme";

const nav = [
  { href: "/admin/dashboard", label: "Overview", icon: DashboardIcon },
  { href: "/admin/works", label: "Work Gallery", icon: PhotoLibraryIcon },
  { href: "/admin/categories", label: "Categories", icon: CategoryIcon },
  { href: "/admin/profile", label: "Business Profile", icon: StorefrontIcon },
  { href: "/admin/testimonials", label: "Testimonials", icon: RateReviewIcon },
  { href: "/admin/messages", label: "Enquiries", icon: MailIcon },
];

export default function AdminDashboardLayout({ children }) {
  const { admin, checked, logout } = useAdminAuth();
  const pathname = usePathname();

  if (!checked) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress size={22} sx={{ color: tokens.rust }} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", backgroundColor: tokens.paper }}>
      <Box
        component="nav"
        sx={{
          width: 240,
          flexShrink: 0,
          borderRight: `1px solid ${tokens.line}`,
          backgroundColor: tokens.white,
          p: 3,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
        }}
      >
        <Typography sx={{ fontFamily: "var(--font-display)", fontWeight: 800, mb: 4 }}>
          RANA <span style={{ color: tokens.rust }}>Admin</span>
        </Typography>

        <Stack spacing={0.5} sx={{ flexGrow: 1 }}>
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Stack
                key={item.href}
                component={Link}
                href={item.href}
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{
                  px: 1.5,
                  py: 1.1,
                  color: active ? tokens.rust : tokens.ink,
                  backgroundColor: active ? tokens.paperAlt : "transparent",
                  fontWeight: 600,
                  "&:hover": { backgroundColor: tokens.paperAlt },
                }}
              >
                <Icon fontSize="small" />
                <Typography sx={{ fontWeight: 600, fontSize: "0.95rem" }}>{item.label}</Typography>
              </Stack>
            );
          })}
        </Stack>

        <Box sx={{ pt: 2, borderTop: `1px solid ${tokens.line}` }}>
          <Typography sx={{ fontSize: "0.85rem", color: "#6b665c", mb: 1 }}>{admin?.email}</Typography>
          <Button startIcon={<LogoutIcon />} onClick={logout} size="small" sx={{ color: tokens.ink }}>
            Log out
          </Button>
        </Box>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2.5, md: 4 }, minWidth: 0 }}>
        {children}
      </Box>
    </Box>
  );
}
