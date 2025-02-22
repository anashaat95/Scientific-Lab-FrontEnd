"use client";
import { IUser } from "@/app/(PagesInDashboard)/users/usersInterfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  forgetPasswordService,
  loginService,
  logoutService,
  resendConfirmationEmailService,
  resetPasswordService,
  signupService,
} from "../authServicesClient";

const refreshPage = (router: any) =>
  setTimeout(() => {
    router.refresh();
  }, 250);

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: loginService,
    onSuccess: (data: { message: string; isAuthenticated: Boolean; currentUser?: IUser }) => {
      if (typeof window !== "undefined") sessionStorage.setItem("currentUser", JSON.stringify(data.currentUser));
      if (data.isAuthenticated) refreshPage(router);
      if (data?.message.includes("not confirmed")) throw data;
    },
  });

  const logout = useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      if (typeof window !== "undefined") sessionStorage.removeItem("currentUser");
      router.refresh();
    },
  });

  const signup = useMutation({
    mutationFn: signupService,
    onSuccess: (data: any) => {
      router.replace(`/register/success?email=${data.email}`);
    },
  });

  const resendConfirmEmail = useMutation({
    mutationFn: resendConfirmationEmailService,
    onSuccess: async (data: any) => {
      if (data?.message.includes("confirmed")) throw data;
    },
  });

  const forgetPassword = useMutation({
    mutationFn: forgetPasswordService,
    onError: (err) => console.log(err),
  });

  const resetPassword = useMutation({
    mutationFn: resetPasswordService,
  });

  return { login, logout, forgetPassword, signup, resendConfirmEmail, resetPassword };
};

export const authQueriesKeys = {
  currentUser: ["currentUser"],
};
