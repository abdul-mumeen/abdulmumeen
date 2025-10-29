"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  TextField,
} from "@mui/material";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long.")
    .max(80, "Name must be less than 80 characters."),
  email: z.string().trim().email("Please enter a valid email address."),
  subject: z
    .string()
    .trim()
    .max(120, "Subject should be shorter than 120 characters.")
    .optional(),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters long.")
    .max(2000, "Message must be 2000 characters or fewer."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

type SubmitStatus = "idle" | "success" | "error";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    mode: "onSubmit",
  });

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitError(null);

    try {
      const payload = {
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject?.trim() || undefined,
        message: values.message.trim(),
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage =
          (errorData && errorData.message) ||
          "We couldn't send your message. Please try again later.";
        throw new Error(errorMessage);
      }

      setSubmitStatus("success");
      reset();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error occurred.";
      setSubmitStatus("error");
      setSubmitError(message);
    } finally {
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <Stack
      component="form"
      spacing={{ xs: 3, md: 4 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            {...register("name")}
            label="Your Name"
            placeholder="Enter your name"
            autoComplete="name"
            required
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            fullWidth
            slotProps={{ input: { sx: { borderRadius: 2 } } }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            {...register("email")}
            type="email"
            label="Your Email"
            placeholder="Enter your email address"
            autoComplete="email"
            required
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            fullWidth
            slotProps={{ input: { sx: { borderRadius: 2 } } }}
          />
        </Grid>
      </Grid>

      <TextField
        {...register("subject")}
        label="Subject"
        placeholder="Enter the subject of your message"
        fullWidth
        error={Boolean(errors.subject)}
        helperText={errors.subject?.message}
        slotProps={{ input: { sx: { borderRadius: 2 } } }}
      />

      <TextField
        {...register("message")}
        label="Message"
        placeholder="Enter your message"
        multiline
        minRows={6}
        fullWidth
        required
        error={Boolean(errors.message)}
        helperText={errors.message?.message}
        slotProps={{ input: { sx: { borderRadius: 2 } } }}
      />

      <Stack spacing={2}>
        <Button
          type="submit"
          size="large"
          variant="contained"
          sx={{ alignSelf: { xs: "stretch", sm: "flex-start" }, minWidth: 160 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Box display="flex" alignItems="center" gap={1}>
              <CircularProgress size={20} color="inherit" />
            </Box>
          ) : (
            "Send Message"
          )}
        </Button>

        {submitStatus === "success" && (
          <Alert severity="success">
            Thanks for reaching out! I&apos;ll be in touch shortly.
          </Alert>
        )}
        {submitStatus === "error" && submitError && (
          <Alert severity="error">{submitError}</Alert>
        )}
      </Stack>
    </Stack>
  );
};

export default ContactForm;
