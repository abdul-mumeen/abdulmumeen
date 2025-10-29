"use client";

import { Grid, Paper, Stack, Typography, useTheme } from "@mui/material";
import ContactForm from "./ContactForm";
import ContactDetailsCard from "./ContactDetailsCard";

const ContactSection = () => {
  const theme = useTheme();

  return (
    <Stack
      spacing={{ xs: 4, md: 6 }}
      sx={{ mt: { xs: 2, md: 4 } }}
      direction={{ xs: "column", md: "row" }}
    >
      <Grid size={{ xs: 12, md: 8, lg: 8 }} display="flex">
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            p: { xs: 3, md: 4 },
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: { xs: 3, md: 4 },
            border: `1px solid ${theme.palette.divider}`,
            background:
              theme.palette.mode === "light"
                ? theme.palette.background.paper
                : theme.palette.background.paper,
          }}
        >
          <Stack spacing={1} sx={{ textAlign: "left" }}>
            <Typography variant="h4" component="h3" fontWeight={800}>
              Let’s build something great
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Share a few details about your project or question and I’ll get
              back to you within two business days.
            </Typography>
          </Stack>
          <ContactForm />
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 4, lg: 4 }} display="flex">
        <ContactDetailsCard />
      </Grid>
    </Stack>
  );
};

export default ContactSection;
