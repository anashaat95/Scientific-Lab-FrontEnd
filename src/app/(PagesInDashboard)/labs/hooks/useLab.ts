"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { IAddLabFormInput, IUpdateLabFormInput } from "../labsInterfaces";
import { addLabService, deleteLabService, updateLabService } from "../labsServicesFrontEnd";

export const useLab = () => {
  const router = useRouter();

  const addLab = useMutation({
    mutationFn: async (data: IAddLabFormInput) => {
      await addLabService(data);
    },
    onSuccess: () => {
      toast.success("Lab added successfully");
    },
  });

  const updateLab = useMutation({
    mutationFn: (data: IUpdateLabFormInput) => {
      return updateLabService({ id: data.id, data });
    },
    onSuccess: () => {
      toast.success("Lab updated successfully");
    },
  });

  const deleteLab = useMutation({
    mutationFn: deleteLabService,
    onSuccess: () => {
      toast.success("Lab deleted successfully");
    },
  });

  return { addLab, updateLab, deleteLab };
};
