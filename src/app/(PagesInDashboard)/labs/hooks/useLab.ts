"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IAddLabFormInput, IEditLabFormInput } from "../labsInterfaces";
import { addLabService, deleteLabService, editLabService } from "../labsServicesFrontEnd";

export const useLab = () => {
  const router = useRouter();

  const addLab = useMutation({
    mutationFn: async (data: IAddLabFormInput) => {
      await addLabService(data);
    },
  });

  const editLab = useMutation({
    mutationFn: (data: IEditLabFormInput) => {
      return editLabService({ id: data.id, data });
    },
  });

  const deleteLab = useMutation({
    mutationFn: deleteLabService,
  });

  return { addLab, editLab, deleteLab };
};
