"use client";

import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import { GitHub, LinkedIn, LocationOnOutlined } from "@mui/icons-material";
import ContactDetailItem from "./ContactDetailItem";
import { useOwnerDetails } from "@/contexts/OwnerDetailsContext";

const formatLink = (url: string) => {
  try {
    const { hostname, pathname } = new URL(url);
    const cleanPath = pathname.replace(/\/$/, "");
    return `${hostname}${cleanPath}`;
  } catch (error) {
    return url;
  }
};

const ContactDetailsCard = () => {
  const theme = useTheme();
  const { location, socials } = useOwnerDetails();

  const socialItems = [
    location
      ? {
          label: "Location",
          value: location,
          icon: <LocationOnOutlined fontSize="small" />,
        }
      : null,
    socials?.linkedin
      ? {
          label: "LinkedIn",
          value: formatLink(socials.linkedin),
          href: socials.linkedin,
          icon: <LinkedIn fontSize="small" />,
        }
      : null,
    socials?.github
      ? {
          label: "GitHub",
          value: formatLink(socials.github),
          href: socials.github,
          icon: <GitHub fontSize="small" />,
        }
      : null,
  ].filter(Boolean) as Array<{
    label: string;
    value: string;
    href: string;
    icon: JSX.Element;
  }>;

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        p: { xs: 3, md: 4 },
        display: "flex",
        flexDirection: "column",
        gap: { xs: 3, md: 4 },
        flex: 1,
        position: "relative",
        overflow: "hidden",
        border: `1px solid ${theme.palette.divider}`,
        background:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, rgba(34,197,94,0.08) 0%, rgba(15,118,110,0.05) 100%)"
            : "linear-gradient(180deg, rgba(74,222,128,0.16) 0%, rgba(34,197,94,0.05) 100%)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            theme.palette.mode === "light"
              ? "radial-gradient(circle at top right, rgba(34,197,94,0.22), transparent 45%)"
              : "radial-gradient(circle at top right, rgba(74,222,128,0.27), transparent 45%)",
        }}
      />

      <Typography variant="h5" component="h3" fontWeight={800}>
        Connect with me
      </Typography>

      {socialItems.length > 0 && (
        <Stack
          spacing={1.5}
          sx={{
            "& a": {
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
            },
          }}
        >
          {socialItems.map((item) => (
            <ContactDetailItem
              key={item.label}
              label={item.label}
              value={item.value}
              href={item.href}
              icon={item.icon}
            />
          ))}
        </Stack>
      )}

      {socials?.linkedin && (
        <Box position="relative">
          <Typography variant="body2" color="text.secondary">
            Prefer async updates? I share engineering deep dives and launch
            notes over on my{" "}
            <Typography
              component="span"
              color="primary"
              style={{ textDecoration: "underline" }}
            >
              blog
            </Typography>
            <Typography sx={{ fontStyle: "italic" }} component="span">
              {" (coming soon)."}
            </Typography>
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default ContactDetailsCard;
