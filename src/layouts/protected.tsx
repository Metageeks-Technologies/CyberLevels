"use client";
import { useEffect } from "react";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import React from "react";
import { usePathname } from "next/navigation";

const Protected = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathName = usePathname();

  const { currUser, isAuthenticated } = useAppSelector(
    (s) => s.persistedReducer.user
  );

  useEffect(() => {
    if (pathName !== "/callback" && (!currUser || !isAuthenticated)) {
      router.push("/");
    }
  }, [currUser, isAuthenticated]);

  return children;
};

export default Protected;
