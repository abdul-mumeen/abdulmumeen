"use client";

import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Container,
  useTheme,
} from "@mui/material";
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
} from "@mui/icons-material";
import { FOOTER_HEIGHT } from "@/constants";

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.default,
        borderTop: `1px solid ${theme.palette.divider}`,
        py: 2,
        maxHeight: FOOTER_HEIGHT,
      }}
    >
      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection={{ xs: "column-reverse", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          gap={{ xs: 1, md: 2 }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2025 Abdulmumeen Olasode. All rights reserved.
          </Typography>
          <Box display="flex" gap={3}>
            <IconButton
              color="inherit"
              sx={{
                color: theme.palette.text.secondary,
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              color="inherit"
              sx={{
                color: theme.palette.text.secondary,
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              color="inherit"
              sx={{
                color: theme.palette.text.secondary,
                "&:hover": {
                  color: theme.palette.primary.main,
                },
              }}
            >
              <TwitterIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
