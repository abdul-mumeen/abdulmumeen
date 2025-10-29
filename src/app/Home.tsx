"use client";

import React from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import TechnicalSkillsSection from "./components/skills/TechnicalSkillsSection";
import ExperienceSection from "./components/experiences/ExperienceSection";
import ContactSection from "./components/contact/ContactSection";
import ResumeButton from "./components/ResumeButton";
import { FOOTER_HEIGHT, PAGE_MINIMUM_HEIGHT } from "@/constants";

type SectionConfig = {
  id: string;
  title: string;
  description: string;
  content?: React.ReactNode;
};

const sections: SectionConfig[] = [
  {
    id: "skills",
    title: "Technical Skills",
    description:
      "A curated snapshot of the languages, frameworks, and platforms I use to deliver resilient, scalable products.",
    content: <TechnicalSkillsSection />,
  },
  {
    id: "experiences",
    title: "Experiences",
    description:
      "Snapshots from my professional journey, highlighting impactful collaborations, leadership moments, and shipped products.",
    content: <ExperienceSection />,
  },
  {
    id: "contact",
    title: "Contact",
    description:
      "Ready to collaborate or have a question? Here’s how you can reach out and start the conversation.",
    content: <ContactSection />,
  },
];

const SectionPlaceholder: React.FC<SectionConfig & { isLast: boolean }> = ({
  id,
  title,
  description,
  content,
  isLast,
}) => (
  <Box
    component="section"
    id={id}
    sx={{
      pb: { xs: 8, sm: 10, md: 12 },
      scrollMarginTop: { xs: 80, md: 96 },
    }}
    minHeight={
      isLast
        ? `calc(${PAGE_MINIMUM_HEIGHT} - ${FOOTER_HEIGHT})`
        : PAGE_MINIMUM_HEIGHT
    }
  >
    <Container maxWidth="lg">
      <Stack spacing={{ xs: 3, md: 4 }}>
        <Stack spacing={1}>
          <Typography variant="h4" component="h2" fontWeight={700}>
            {title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontSize: { xs: "1.05rem", md: "1.1rem" } }}
          >
            {description}
          </Typography>
        </Stack>
        {content}
      </Stack>
    </Container>
  </Box>
);

export default function Home() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <ResumeButton variant="floating" />
      <Box component="main" flexGrow={1}>
        <Box
          component="section"
          id="about"
          sx={{
            scrollMarginTop: { xs: 80, md: 96 },
            mb: { xs: 12, sm: 16 },
          }}
          minHeight={PAGE_MINIMUM_HEIGHT}
        >
          <Hero />
        </Box>
        {sections.map((section, index) => (
          <SectionPlaceholder
            key={section.id}
            {...section}
            isLast={index === sections.length - 1}
          />
        ))}
      </Box>
      <Footer />
    </Box>
  );
}
