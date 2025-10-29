"use client";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/material/styles";

export interface SkillCardProps {
  icon: React.ReactNode;
  name: string;
  level: string;
  proficiency: number;
}

const SkillCard: React.FC<SkillCardProps> = ({
  icon,
  name,
  level,
  proficiency,
}) => {
  const theme = useTheme();

  const clampedProficiency = Math.min(100, Math.max(0, proficiency));

  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
        border: 0,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
        }}
      >
        <Box sx={{ flexGrow: 1 }} />
      </Box>
      <CardContent
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 2.5,
          py: 2.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            borderRadius: 2,
            color: theme.palette.primary.main,
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        <Stack spacing={0.5} flex={1} minWidth={0}>
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{ lineHeight: 1.2 }}
          >
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {level}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
            <Box
              sx={{
                flexGrow: 1,
                height: 6,
                borderRadius: 999,
                overflow: "hidden",
                bgcolor:
                  theme.palette.mode === "light"
                    ? alpha(theme.palette.primary.main, 0.18)
                    : alpha(theme.palette.primary.light, 0.3),
              }}
            >
              <Box
                sx={{
                  width: `${clampedProficiency}%`,
                  height: "100%",
                  borderRadius: 999,
                  bgcolor: theme.palette.primary.main,
                  transition: "width 0.4s ease",
                }}
              />
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
