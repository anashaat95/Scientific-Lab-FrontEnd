"use client";
import { getMeClientService } from "@/app/(Authentication)/authServicesClient";
import { updateCurrentUser } from "@/store/authSlice";
import { AppDispatch } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { updateEmailService, updatePersonalDataService } from "../accountServicesClient";

export const useAccount = () => {
  const dispatch: AppDispatch = useDispatch();

  const updateMyPersonalData = useMutation({
    mutationFn: updatePersonalDataService,
    onSuccess: async () => {
      const data = await getMeClientService();
      dispatch(updateCurrentUser(data?.data));
    },
  });

  const updateMyEmail = useMutation({
    mutationFn: updateEmailService,
    onSuccess: async () => {
      const data = await getMeClientService();
      dispatch(updateCurrentUser(data?.data));
    },
  });

  return { updateMyPersonalData, updateMyEmail };
};
