"use client";

import React from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@/redux/api/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSnackbar } from "notistack";

// ✅ Zod schema for form validation
const SignupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "At least one uppercase letter")
      .regex(/[a-z]/, "At least one lowercase letter")
      .regex(/[0-9]/, "At least one number")
      .regex(/[^A-Za-z0-9]/, "At least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupInput = z.infer<typeof SignupSchema>;

const SignupForm = ({ onSwitch }: { onSwitch: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(SignupSchema),
  });

  const [registerUser, { isLoading }] = useRegisterMutation();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: SignupInput) => {
    try {
      const { ...rest } = data;
      await registerUser(rest).unwrap();
      enqueueSnackbar("Registered successfully!", { variant: "success" });
      onSwitch();
    } catch (err: any) {
      enqueueSnackbar(err?.data?.error || "Something went wrong", {
        variant: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 w-full max-w-md gap-6 flex flex-col"
    >
      <Typography
        variant="h5"
        className="text-gray-800 font-semibold text-left"
      >
        Create an Account
      </Typography>

      <TextField
        label="Name"
        fullWidth
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        label="Email"
        type="email"
        fullWidth
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        className="!bg-green-600 hover:!bg-green-700 text-white w-full rounded-full"
      >
        Sign Up
      </Button>

      <Typography className="text-sm text-center text-gray-600">
        Already have an account?{" "}
        <span
          onClick={onSwitch}
          className="text-green-600 hover:underline cursor-pointer"
        >
          Login
        </span>
      </Typography>
    </form>
  );
};

export default SignupForm;
