"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IAddLabFormInput, IUpdateLabFormInput } from "../labsInterfaces";
import { addLabService, deleteLabService, updateLabService } from "../labsServicesFrontEnd";

export const useLab = () => {
  const router = useRouter();

  const addLab = useMutation({
    mutationFn: async (data: IAddLabFormInput) => {
      await addLabService(data);
    },
  });

  const updateLab = useMutation({
    mutationFn: (data: IUpdateLabFormInput) => {
      return updateLabService({ id: data.id, data });
    },
  });

  const deleteLab = useMutation({
    mutationFn: deleteLabService,
  });

  return { addLab, updateLab, deleteLab };
};
