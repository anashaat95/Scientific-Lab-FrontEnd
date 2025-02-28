"use client";
import { getMeClientService } from "@/app/(Authentication)/authServicesClient";
import { updateCurrentUser } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateEmailService, updatePasswordService, updatePersonalDataService, updateUsernameService } from "../accountServicesClient";

export const useAccount = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const updateMyPersonalData = useMutation({
    mutationFn: updatePersonalDataService,
    onSuccess: async () => {
      const data = await getMeClientService();
      dispatch(updateCurrentUser(data?.data));
      toast.success("Your personal data updated successfully");
    },
  });

  const updateMyEmail = useMutation({
    mutationFn: updateEmailService,
    onSuccess: async () => {
      const data = await getMeClientService();
      dispatch(updateCurrentUser(data?.data));
      toast.success(`A confirmation sent successfully to the new mail. See it and click confirm to update your email in the system`);
    },
  });

  const updateMyUsername = useMutation({
    mutationFn: updateUsernameService,
    onSuccess: async () => {
      const data = await getMeClientService();
      dispatch(updateCurrentUser(data?.data));
      toast.success("Username updated successfully");
    },
  });

  const updateMyPassword = useMutation({
    mutationFn: updatePasswordService,
    onSuccess: async () => {
      const data = await getMeClientService();
      dispatch(updateCurrentUser(data?.data));
      toast.success("Your password updated successfully");
    },
  });

  return { updateMyPersonalData, updateMyEmail, updateMyUsername, updateMyPassword };
};
