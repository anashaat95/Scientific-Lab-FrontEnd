"use client";
import { IUser } from "@/app/(PagesInDashboard)/users/usersInterfaces";
import { login as loginStore, logout as logoutStore } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
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
  const dispatch: AppDispatch = useDispatch();

  const login = useMutation({
    mutationFn: loginService,
    onSuccess: (data: { message: string; isAuthenticated: Boolean; currentUser?: IUser }) => {
      dispatch(loginStore(data.currentUser));
      if (data.isAuthenticated) refreshPage(router);
      if (data?.message.includes("not confirmed")) throw data;
    },
  });

  const logout = useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      dispatch(logoutStore());
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
    onError: (err) => {
      // console.log(err),
    },
  });

  const resetPassword = useMutation({
    mutationFn: resetPasswordService,
  });

  return { login, logout, forgetPassword, signup, resendConfirmEmail, resetPassword };
};

export const authQueriesKeys = {
  currentUser: ["currentUser"],
};
