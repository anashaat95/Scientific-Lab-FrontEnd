"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IAddEquipmentFormInput, IUpdateEquipmentFormInput } from "../equipmentsInterfaces";
import { addEquipmentService, deleteEquipmentService, updateEquipmentService } from "../equipmentsServicesFrontEnd";

export const useEquipment = () => {
  const router = useRouter();

  const addEquipment = useMutation({
    mutationFn: async (data: IAddEquipmentFormInput) => {
      await addEquipmentService(data);
    },
  });

  const updateEquipment = useMutation({
    mutationFn: (data: IUpdateEquipmentFormInput) => {
      return updateEquipmentService({ id: data.id, data });
    },
  });

  const deleteEquipment = useMutation({
    mutationFn: deleteEquipmentService,
  });

  return { addEquipment, updateEquipment, deleteEquipment };
};
