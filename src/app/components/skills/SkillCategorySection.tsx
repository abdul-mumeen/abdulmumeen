"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import SkillCard, { SkillCardProps } from "./SkillCard";

export interface SkillCategorySectionProps {
  title: string;
  skills: SkillCardProps[];
}

const SkillCategorySection: React.FC<SkillCategorySectionProps> = ({
  title,
  skills,
}) => {
  if (!skills.length) {
    return null;
  }

  return (
    <Stack spacing={3} component="section">
      <Stack spacing={1.5}>
        <Typography variant="h5" component="h2" fontWeight={600}>
          {title}
        </Typography>
      </Stack>
      <Box
        sx={{
          display: "grid",
          gap: { xs: 2, sm: 2.5, md: 3 },
          gridTemplateColumns: {
            xs: "repeat(1, minmax(0, 1fr))",
            sm: "repeat(3, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },
        }}
      >
        {skills.map((skill) => (
          <SkillCard key={skill.name} {...skill} />
        ))}
      </Box>
    </Stack>
  );
};

export default SkillCategorySection;
