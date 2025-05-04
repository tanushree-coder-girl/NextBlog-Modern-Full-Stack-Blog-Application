"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";
import { useAuth } from "@/hooks/useAuth";
import { CircularProgress } from "@mui/material";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect to home if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="flex items-center justify-center min-h-[70vh] bg-white py-20 px-4">
        {isLogin ? (
          <LoginForm
            onSwitch={() => setIsLogin(false)}
            handleClose={() => {}}
          />
        ) : (
          <SignupForm onSwitch={() => setIsLogin(true)} />
        )}
      </main>
    );
  }
};

export default LoginPage;
