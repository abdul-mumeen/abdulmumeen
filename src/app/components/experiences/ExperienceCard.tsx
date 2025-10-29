"use client";

import React from "react";
import {
  Box,
  Button,
  Chip,
  Collapse,
  Divider,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { alpha } from "@mui/material/styles";
import { formatDateRange } from "../about/dateUtils";

export interface ExperienceRecord {
  position: string;
  company: string;
  team?: string;
  employmentType?: string;
  startDate?: string | null;
  endDate?: string | null;
  location?: string;
  description?: string;
  highlights?: string[];
  tools?: string[];
}

export interface ExperienceCardProps {
  experience: ExperienceRecord;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  const {
    position,
    company,
    team,
    employmentType,
    startDate,
    endDate,
    location,
    description,
    highlights = [],
    tools = [],
  } = experience;

  const dateLabel = formatDateRange(startDate, endDate);

  const hasContent = Boolean(description) || highlights.length > 0;

  return (
    <Paper
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        border: "none",
        backgroundImage: "none",
        px: { xs: 3, sm: 4 },
        py: { xs: 3.5, sm: 4 },
        bgcolor:
          theme.palette.mode === "light"
            ? alpha(theme.palette.background.paper, 0.95)
            : alpha(theme.palette.background.default, 0.92),
        "&::before": {
          content: "''",
          position: "absolute",
          top: { xs: 24, sm: 28 },
          bottom: { xs: 24, sm: 28 },
          left: 0,
          width: 4,
          borderRadius: 999,
          background: `linear-gradient(180deg, ${alpha(
            theme.palette.primary.main,
            0.95
          )} 0%, ${alpha(theme.palette.primary.light, 0.6)} 100%)`,
        },
      }}
    >
      <Stack spacing={{ xs: 2.75, sm: 3.5 }}>
        <Stack spacing={1.75} sx={{ pl: { xs: 0, sm: 1 } }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 1.5, md: 2.5 }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
          >
            <Stack spacing={1}>
              <Typography
                variant="h5"
                component="h3"
                fontWeight={700}
                sx={{
                  letterSpacing: "-0.01em",
                  fontSize: { xs: "1.4rem", sm: "1.6rem" },
                }}
              >
                {company}
              </Typography>
              <Stack
                direction="row"
                flexWrap="wrap"
                gap={1}
                alignItems="flex-end"
              >
                <Typography
                  variant="body1"
                  fontWeight={500}
                  sx={{ fontSize: { xs: "1.1rem", sm: "1.15rem" } }}
                >
                  {position}
                </Typography>
                {team && (
                  <Chip
                    label={team}
                    size="small"
                    sx={{
                      borderRadius: 999,
                      fontWeight: 600,
                      bgcolor:
                        theme.palette.mode === "light"
                          ? alpha(theme.palette.text.primary, 0.06)
                          : alpha(theme.palette.text.primary, 0.12),
                      border: "none",
                      px: 1.5,
                    }}
                  />
                )}
                {employmentType ? (
                  <Chip
                    label={employmentType}
                    size="small"
                    sx={{
                      borderRadius: 999,
                      fontWeight: 600,
                      bgcolor: alpha(theme.palette.primary.main, 0.12),
                      color: theme.palette.primary.main,
                      border: "none",
                      px: 1.5,
                    }}
                  />
                ) : null}
              </Stack>
            </Stack>
            <Stack
              spacing={0.5}
              alignItems={{ xs: "flex-start", md: "flex-end" }}
            >
              {location ? (
                <Typography
                  variant="body1"
                  fontWeight={500}
                  color="text.secondary"
                >
                  {location}
                </Typography>
              ) : null}
              {dateLabel ? (
                <Typography variant="body1" color="text.secondary">
                  {dateLabel}
                </Typography>
              ) : null}
            </Stack>
          </Stack>
          <Divider
            flexItem
            sx={{ borderColor: alpha(theme.palette.divider, 0.4) }}
          />
        </Stack>
        {hasContent ? (
          <>
            <Box
              sx={{
                display: "grid",
                gap: 1.75,
                transition: "all 0.3s ease",
              }}
            >
              {description ? (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "1rem", md: "1.05rem" },
                    lineHeight: 1.7,
                    ...(expanded
                      ? {}
                      : {
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          WebkitMaskImage:
                            theme.palette.mode === "light"
                              ? "linear-gradient(180deg, #fff 60%, rgba(255,255,255,0))"
                              : "linear-gradient(180deg, rgba(15,23,42,1) 60%, rgba(15,23,42,0))",
                          maskImage:
                            theme.palette.mode === "light"
                              ? "linear-gradient(180deg, #fff 60%, rgba(255,255,255,0))"
                              : "linear-gradient(180deg, rgba(15,23,42,1) 60%, rgba(15,23,42,0))",
                        }),
                  }}
                >
                  {description}
                </Typography>
              ) : null}
              {highlights.length ? (
                <Collapse in={expanded} timeout={250} unmountOnExit>
                  <Stack spacing={1.5} sx={{ pl: { xs: 0.5, sm: 1 } }}>
                    {highlights.map((highlight, index) => (
                      <Stack
                        key={index}
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                      >
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            mt: 0.75,
                            bgcolor:
                              theme.palette.mode === "light"
                                ? theme.palette.primary.main
                                : theme.palette.primary.light,
                          }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {highlight}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Collapse>
              ) : null}
            </Box>
            <Button
              variant="text"
              disableRipple
              size="medium"
              onClick={() => setExpanded((prev) => !prev)}
              endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              sx={{
                alignSelf: "flex-end",
                fontWeight: 600,
                px: 0,
                textTransform: "none",
                color: theme.palette.primary.main,
                "&:hover": {
                  bgcolor: "unset",
                },
              }}
            >
              {expanded ? "Hide Details" : "View Details"}
            </Button>
          </>
        ) : null}
        {tools.length ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
            }}
          >
            {tools.map((tool) => (
              <Chip
                key={tool}
                label={tool}
                size="small"
                sx={{
                  borderRadius: 999,
                  fontWeight: 500,
                  px: 1.5,
                  bgcolor:
                    theme.palette.mode === "light"
                      ? alpha(theme.palette.primary.main, 0.12)
                      : alpha(theme.palette.primary.light, 0.18),
                  color: theme.palette.primary.main,
                  border: "none",
                }}
              />
            ))}
          </Box>
        ) : null}
      </Stack>
    </Paper>
  );
};

export default ExperienceCard;
