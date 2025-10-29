"use client";

import React from "react";
import { Container, Divider, Stack } from "@mui/material";
import { useOwnerDetails } from "@/contexts/OwnerDetailsContext";
import AboutSummary from "./about/AboutSummary";
import EducationSection from "./about/EducationSection";
import InterestsSection from "./about/InterestsSection";

const Hero: React.FC = () => {
  const ownerDetails = useOwnerDetails();

  const {
    firstName,
    lastName,
    role,
    bio,
    email,
    location,
    avatarUrl,
    education = [],
    interests = [],
    firstNamePronunciation,
  } = ownerDetails;

  const detailSections = [
    {
      key: "education",
      shouldRender: education.length > 0,
      content: <EducationSection education={education} />,
    },
    {
      key: "interests",
      shouldRender: interests.length > 0,
      content: <InterestsSection interests={interests} />,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Stack spacing={{ xs: 4, md: 6 }} pt={{ xs: 4, md: 6 }}>
        <AboutSummary
          firstName={firstName}
          lastName={lastName}
          role={role}
          bio={bio}
          email={email}
          location={location}
          avatarUrl={avatarUrl}
          firstNamePronunciation={firstNamePronunciation}
        />
        {detailSections
          .filter(({ shouldRender }) => shouldRender)
          .map(({ key, content }) => (
            <React.Fragment key={key}>
              <Divider flexItem sx={{ borderColor: "divider" }} />
              {content}
            </React.Fragment>
          ))}
      </Stack>
    </Container>
  );
};

export default Hero;
