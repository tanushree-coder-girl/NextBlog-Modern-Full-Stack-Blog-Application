"use client";

import React, { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import SignupForm from "@/components/auth/SignupForm";

const LoginModal = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  const handleClose = () => {
    router.back(); // Close modal by navigating back
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="relative bg-white rounded-2xl p-8 shadow-lg w-full max-w-lg">
        {/* Close Icon */}
        <IconButton
          onClick={handleClose}
          className="!absolute top-4 right-4 !text-gray-500 hover:!text-gray-700"
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>

        {/* Login Form */}
        {isLogin ? (
          <LoginForm onSwitch={() => setIsLogin(false)} handleClose={handleClose} />
        ) : (
          <SignupForm onSwitch={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default LoginModal;
