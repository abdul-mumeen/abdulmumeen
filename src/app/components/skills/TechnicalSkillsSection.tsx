"use client";

import React from "react";
import { Divider, Stack } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";
import CodeIcon from "@mui/icons-material/Code";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import DataObjectIcon from "@mui/icons-material/DataObject";
import TerminalIcon from "@mui/icons-material/Terminal";
import JavascriptIcon from "@mui/icons-material/Javascript";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import DeveloperModeIcon from "@mui/icons-material/DeveloperMode";
import ApiIcon from "@mui/icons-material/Api";
import CloudIcon from "@mui/icons-material/Cloud";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CommitIcon from "@mui/icons-material/Commit";
import BuildIcon from "@mui/icons-material/Build";
import { useOwnerDetails } from "@/contexts/OwnerDetailsContext";
import SkillCategorySection from "./SkillCategorySection";

type OwnerSkill = {
  name?: string;
  level?: string;
  proficiency?: number;
  icon?: string;
};

type OwnerSkillCategory = {
  title?: string;
  description?: string;
  skills?: OwnerSkill[];
};

const iconMap: Record<string, SvgIconComponent> = {
  Code: CodeIcon,
  IntegrationInstructions: IntegrationInstructionsIcon,
  DataObject: DataObjectIcon,
  Terminal: TerminalIcon,
  Javascript: JavascriptIcon,
  ViewTimeline: ViewTimelineIcon,
  DeveloperMode: DeveloperModeIcon,
  Api: ApiIcon,
  Cloud: CloudIcon,
  CloudDone: CloudDoneIcon,
  Commit: CommitIcon,
  Build: BuildIcon,
};

const TechnicalSkillsSection: React.FC = () => {
  const ownerDetails = useOwnerDetails();
  const categories = (ownerDetails.skillCategories ??
    []) as OwnerSkillCategory[];

  if (!categories.length) {
    return null;
  }

  return (
    <Stack spacing={{ xs: 5, md: 7 }}>
      {categories.map((category, index) => {
        const skills = (category.skills ?? []).map((skill) => {
          const IconComponent = iconMap[skill.icon ?? ""] ?? CodeIcon;
          return {
            name: skill.name ?? "",
            level: skill.level ?? "",
            proficiency: Number(skill.proficiency ?? 0),
            icon: <IconComponent fontSize="medium" />,
          };
        });

        return (
          <>
            <Divider flexItem sx={{ borderColor: "divider" }} />
            <SkillCategorySection
              key={category.title ?? `skill-category-${index}`}
              title={category.title ?? ""}
              skills={skills}
            />
          </>
        );
      })}
    </Stack>
  );
};

export default TechnicalSkillsSection;
