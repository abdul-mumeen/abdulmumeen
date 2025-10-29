"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  useTheme,
} from "@mui/material";
import {
  Code as CodeIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useColorMode } from "../../theme/ThemeRegistry";
import { HEADER_HEIGHT } from "@/constants";
import ResumeButton from "./ResumeButton";

type NavItem = {
  label: string;
  targetId: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "About", targetId: "about" },
  { label: "Skills", targetId: "skills" },
  { label: "Experiences", targetId: "experiences" },
  { label: "Contact", targetId: "contact" },
];

const Header: React.FC = () => {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeSection, setActiveSection] = useState<string>(
    NAV_ITEMS[0].targetId
  );
  const isDark = theme.palette.mode === "dark";

  const navItems = useMemo(() => NAV_ITEMS, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavClick = (targetId: string) => {
    setActiveSection(targetId);

    if (targetId === "about") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    handleMenuClose();
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const sectionElements = navItems
      .map((item) => document.getElementById(item.targetId))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sectionElements.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length > 0) {
          const topSection = visibleEntries[0];
          setActiveSection(topSection.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0.15, 0.4, 0.6],
      }
    );

    sectionElements.forEach((section) => observer.observe(section));

    const handleScrollTop = () => {
      if (window.scrollY < 100) {
        setActiveSection(navItems[0].targetId);
      }
    };

    window.addEventListener("scroll", handleScrollTop, { passive: true });

    return () => {
      sectionElements.forEach((section) => observer.unobserve(section));
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollTop);
    };
  }, [navItems]);

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: theme.palette.background.default,
        backdropFilter: "blur(8px)",
        borderBottom: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.primary,
        height: HEADER_HEIGHT,
      }}
      elevation={0}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <CodeIcon sx={{ fontSize: 28, color: theme.palette.primary.main }} />
          <Typography variant="h5" fontWeight="bold">
            AO
          </Typography>
        </Box>

        <Box display={{ xs: "none", md: "flex" }} gap={3}>
          {navItems.map((item) => {
            const isActive = activeSection === item.targetId;
            return (
              <Button
                key={item.targetId}
                color="inherit"
                onClick={() => handleNavClick(item.targetId)}
                sx={{
                  backgroundColor: "transparent",
                  color: isActive
                    ? theme.palette.primary.main
                    : theme.palette.text.secondary,
                  fontWeight: isActive ? 600 : 500,
                  textTransform: "unset",
                  position: "relative",
                  transition: theme.transitions.create(["color"], {
                    duration: theme.transitions.duration.short,
                  }),
                  "&:after": {
                    content: "''",
                    position: "absolute",
                    left: 0,
                    bottom: -6,
                    width: "100%",
                    height: 2,
                    backgroundColor: theme.palette.primary.main,
                    opacity: isActive ? 1 : 0,
                    transform: `scaleX(${isActive ? 1 : 0.2})`,
                    transformOrigin: "center",
                    transition: theme.transitions.create(
                      ["opacity", "transform"],
                      {
                        duration: theme.transitions.duration.shorter,
                      }
                    ),
                  },
                  "&:hover": {
                    color: theme.palette.primary.main,
                    "&:after": {
                      opacity: 1,
                      transform: "scaleX(1)",
                    },
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <ResumeButton variant="inline" />
          <IconButton onClick={toggleColorMode} color="inherit">
            {!isDark ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={handleMenuOpen}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          {navItems.map((item) => (
            <MenuItem
              key={item.targetId}
              selected={activeSection === item.targetId}
              onClick={() => handleNavClick(item.targetId)}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
