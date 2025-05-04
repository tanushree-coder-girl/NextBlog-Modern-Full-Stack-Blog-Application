"use client";

import React from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/slices/authSlice";

// ✅ Validation schema
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = ({
  onSwitch,
  handleClose,
}: {
  onSwitch: () => void;
  handleClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await loginUser(data).unwrap();
      dispatch(setCredentials({ token: res.token, user: res.user }));
      enqueueSnackbar("Logged in successfully!", { variant: "success" });
      handleClose();
      router.push("/");
    } catch (err) {
      enqueueSnackbar("Login failed", { variant: "error" });
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 w-full max-w-md flex flex-col gap-6"
    >
      <div>
        <Typography
          variant="h5"
          className="text-gray-800 font-semibold text-left"
        >
          Welcome Back
        </Typography>
        <p className="text-gray-500 text-sm">
          Kindly login to write your own blog
        </p>
      </div>

      <TextField
        label="Email"
        type="email"
        {...register("email")}
        fullWidth
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Password"
        type="password"
        {...register("password")}
        fullWidth
        error={!!errors.password}
        helperText={errors.password?.message}
        sx={{ marginBottom: "20px" }}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        className="!bg-green-600 hover:!bg-green-700 text-white w-full rounded-full"
      >
        Login
      </Button>

      <Typography className="text-sm text-center text-gray-600">
        Don’t have an account?{" "}
        <span
          onClick={onSwitch}
          className="text-green-600 hover:underline cursor-pointer"
        >
          Create New One
        </span>
      </Typography>
    </form>
  );
};

export default LoginForm;
