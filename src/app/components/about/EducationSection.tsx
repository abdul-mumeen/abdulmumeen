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
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import { formatDateRange } from "./dateUtils";

export interface EducationItem {
  institution: string;
  degree: string;
  startDate?: string | null;
  endDate?: string | null;
  City?: string;
  State?: string;
  Country?: string;
}

export interface EducationSectionProps {
  education: EducationItem[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  const theme = useTheme();

  if (!education.length) {
    return null;
  }

  return (
    <Stack spacing={2} component="section">
      <Typography variant="h5" component="h2" fontWeight={700}>
        Education
      </Typography>
      <Stack spacing={2}>
        {education.map((item, index) => (
          <Card
            key={`${item.institution}-${index}`}
            variant="outlined"
            sx={{
              backgroundImage: "none",
              border: 0,
              bgcolor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.background.paper
                  : theme.palette.background.default,
            }}
          >
            <CardContent
              sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  bgcolor: (theme) =>
                    theme.palette.mode === "light"
                      ? theme.palette.grey[100]
                      : theme.palette.grey[900],
                  color: theme.palette.text.secondary,
                  flexShrink: 0,
                }}
              >
                <SchoolOutlinedIcon fontSize="medium" />
              </Box>
              <Stack spacing={0.5} flex={1}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {item.degree}
                </Typography>
                <Stack
                  spacing={0.5}
                  direction={{ xs: "column-reverse", sm: "row" }}
                  justifyContent={"space-between"}
                >
                  <Typography variant="body2" color="text.secondary">
                    {item.institution}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontWeight={600}
                  >
                    {formatDateRange(item.startDate, item.endDate)}
                  </Typography>
                </Stack>
                {(item.City || item.State || item.Country) && (
                  <Typography variant="body2" color="text.secondary">
                    {[item.City, item.State, item.Country]
                      .filter(Boolean)
                      .join(", ")}
                  </Typography>
                )}
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};

export default EducationSection;
