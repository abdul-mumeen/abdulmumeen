"use client";

import React from "react";
import { Avatar, Card, Stack, Typography } from "@mui/material";

export interface AboutSummaryProps {
  firstName: string;
  lastName: string;
  role: string;
  bio: string;
  email: string;
  location?: string;
  avatarUrl?: string;
  firstNamePronunciation?: string;
}

const AboutSummary: React.FC<AboutSummaryProps> = ({
  firstName,
  //   lastName,
  //   role,
  bio,
  //   email,
  //   location,
  avatarUrl,
  firstNamePronunciation,
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "stretch", md: "center" },
        gap: { xs: 3, md: 4 },
        p: { xs: 4, md: 5 },
        border: 0,
        backgroundImage: "none",
        bgcolor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.background.paper
            : theme.palette.background.default,
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        alignItems="center"
        justifyContent={{ xs: "center", md: "flex-start" }}
      >
        <Avatar
          src={avatarUrl}
          alt={firstName}
          sx={{
            width: { xs: 120, sm: 144 },
            height: { xs: 120, sm: 144 },
          }}
        >
          {firstName.charAt(0)}
        </Avatar>
        <Stack spacing={1} alignItems={{ xs: "center", md: "flex-start" }}>
          <Stack
            alignItems={{ xs: "center", md: "baseline" }}
            spacing={1}
            direction={{ xs: "column", md: "row" }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontSize: { xs: "1.5rem", sm: "2.5rem" },
                fontWeight: 700,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              {`Hi, I'm ${firstName}`}
            </Typography>
            <Typography
              variant="h3"
              component="h1"
              color="primary.main"
              sx={{
                fontSize: { xs: "0.75rem", sm: "2rem" },
                fontWeight: 500,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              {`{${firstNamePronunciation}}`}
            </Typography>
          </Stack>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: { xs: "1rem", md: "1.1rem" } }}
            textAlign="justify"
          >
            {bio}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default AboutSummary;
