"use client";

import React from "react";
import { Stack } from "@mui/material";
import { useOwnerDetails } from "@/contexts/OwnerDetailsContext";
import ExperienceCard, { ExperienceRecord } from "./ExperienceCard";

const ExperienceSection: React.FC = () => {
  const { experiences = [] } = useOwnerDetails();

  if (!experiences.length) {
    return null;
  }

  return (
    <Stack spacing={{ xs: 3, md: 4 }}>
      {(experiences as ExperienceRecord[]).map((experience, index) => (
        <ExperienceCard
          key={`${experience.company}-${experience.position}-${index}`}
          experience={experience}
        />
      ))}
    </Stack>
  );
};

export default ExperienceSection;
