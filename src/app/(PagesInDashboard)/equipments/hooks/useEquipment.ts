"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { IAddEquipmentFormInput, IUpdateEquipmentFormInput } from "../equipmentsInterfaces";
import { addEquipmentService, deleteEquipmentService, updateEquipmentService } from "../equipmentsServicesFrontEnd";

export const useEquipment = () => {
  const router = useRouter();

  const addEquipment = useMutation({
    mutationFn: async (data: IAddEquipmentFormInput) => {
      await addEquipmentService(data);
    },
    onSuccess: () => {
      toast.success("Equipment added successfully");
    },
  });

  const updateEquipment = useMutation({
    mutationFn: (data: IUpdateEquipmentFormInput) => {
      return updateEquipmentService({ id: data.id, data });
    },
    onSuccess: () => {
      toast.success("Equipment updated successfully");
    },
  });

  const deleteEquipment = useMutation({
    mutationFn: deleteEquipmentService,
    onSuccess: () => {
      toast.success("Equipment deleted successfully");
    },
  });

  return { addEquipment, updateEquipment, deleteEquipment };
};
