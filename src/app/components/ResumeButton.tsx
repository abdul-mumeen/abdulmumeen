"use client";

import React from "react";
import {
  Box,
  Fab,
  Button,
  Tooltip,
  useTheme,
  alpha,
  SxProps,
  Theme,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useOwnerDetails } from "@/contexts/OwnerDetailsContext";

type ResumeButtonVariant = "floating" | "inline";

type ResumeButtonProps = {
  variant: ResumeButtonVariant;
  sx?: SxProps<Theme>;
};

const ResumeButton: React.FC<ResumeButtonProps> = ({ variant, sx }) => {
  const theme = useTheme();
  const { resumeUrl } = useOwnerDetails();

  if (!resumeUrl) {
    return null;
  }

  if (variant === "inline") {
    return (
      <Button
        component="a"
        href={resumeUrl}
        download
        variant="contained"
        color="primary"
        size="small"
        startIcon={<DownloadIcon />}
        sx={{
          fontWeight: 600,
          borderRadius: 2,
          textTransform: "none",
          display: { xs: "inline-flex", md: "none" },
          ...sx,
        }}
      >
        Resume
      </Button>
    );
  }

  return (
    <Tooltip title="Download Resume" placement="left">
      <Box
        sx={{
          position: "fixed",
          right: { xs: 16, md: 24, lg: 32 },
          top: { md: "44%", lg: "42%" },
          transform: "translateY(-50%)",
          zIndex: theme.zIndex.tooltip,
          display: { xs: "none", md: "flex" },
          ...sx,
        }}
      >
        <Fab
          component="a"
          href={resumeUrl}
          download
          color="primary"
          aria-label="Download resume"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.getContrastText(theme.palette.primary.main),
            boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.35)}`,
            textTransform: "none",
            fontWeight: 600,
            px: 3,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
              boxShadow: `0 16px 32px ${alpha(
                theme.palette.primary.main,
                0.45
              )}`,
            },
          }}
        >
          <DownloadIcon />
        </Fab>
      </Box>
    </Tooltip>
  );
};

export default ResumeButton;
