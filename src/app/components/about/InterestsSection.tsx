"use client";

import React from "react";
import { Box, Chip, Stack, Typography, useTheme } from "@mui/material";
import TerrainIcon from "@mui/icons-material/Terrain";
import CodeIcon from "@mui/icons-material/Code";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

export interface InterestsSectionProps {
  interests: string[];
}

const getInterestIcon = (interest: string) => {
  const normalized = interest.toLowerCase();

  if (normalized.includes("hiking") || normalized.includes("outdoor")) {
    return <TerrainIcon fontSize="medium" />;
  }

  if (normalized.includes("open") || normalized.includes("source")) {
    return <CodeIcon fontSize="medium" />;
  }

  if (normalized.includes("culinary") || normalized.includes("cook")) {
    return <RestaurantMenuIcon fontSize="medium" />;
  }

  return <StarOutlineIcon fontSize="medium" />;
};

const InterestsSection: React.FC<InterestsSectionProps> = ({ interests }) => {
  const theme = useTheme();

  if (!interests.length) {
    return null;
  }

  return (
    <Stack spacing={3} component="section">
      <Typography variant="h5" component="h2" fontWeight={700}>
        Interests
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1.5,
        }}
      >
        {interests.map((interest, index) => (
          <Chip
            key={`${interest}-${index}`}
            icon={getInterestIcon(interest)}
            label={interest}
            variant="outlined"
            sx={{
              px: 1.5,
              py: 1,
              height: "auto",
              borderRadius: 999,
              fontWeight: 600,
              fontSize: { xs: "0.95rem", md: "1rem" },
              color: theme.palette.text.primary,
              borderColor: theme.palette.divider,
              backgroundColor:
                theme.palette.mode === "light"
                  ? theme.palette.background.paper
                  : theme.palette.background.default,
              "& .MuiChip-icon": {
                color: theme.palette.primary.main,
                fontSize: "1.25rem",
              },
            }}
          />
        ))}
      </Box>
    </Stack>
  );
};

export default InterestsSection;
