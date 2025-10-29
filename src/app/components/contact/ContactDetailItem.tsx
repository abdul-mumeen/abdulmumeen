"use client";

import { Box, Link, Stack, Typography, useTheme } from "@mui/material";
import { ReactNode } from "react";

type ContactDetailItemProps = {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
};

const ContactDetailItem = ({
  icon,
  label,
  value,
  href,
}: ContactDetailItemProps) => {
  const theme = useTheme();
  const content = href ? (
    <Link
      href={href}
      underline="hover"
      color="primary"
      fontWeight={600}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {value}
    </Link>
  ) : (
    <Typography
      variant="body1"
      fontWeight={600}
      color={theme.palette.text.primary}
    >
      {value}
    </Typography>
  );

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{
        borderRadius: 2,
        px: 2,
        py: 1.5,
        transition: theme.transitions.create(
          ["background-color", "transform"],
          {
            duration: theme.transitions.duration.shortest,
          }
        ),
        "&:hover": {
          backgroundColor:
            theme.palette.mode === "light"
              ? theme.palette.primary.main + "0f"
              : theme.palette.primary.main + "14",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor:
            theme.palette.mode === "light"
              ? theme.palette.primary.main + "1a"
              : theme.palette.primary.main + "26",
          color: theme.palette.primary.main,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      <Stack spacing={0.5}>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        {content}
      </Stack>
    </Stack>
  );
};

export default ContactDetailItem;
