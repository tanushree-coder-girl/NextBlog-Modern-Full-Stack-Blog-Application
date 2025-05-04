"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "@/redux/slices/authSlice";

const InitAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return null;
};

export default InitAuth;
