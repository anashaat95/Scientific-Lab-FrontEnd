"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IAddEquipmentFormInput, IEditEquipmentFormInput } from "../equipmentsInterfaces";
import { addEquipmentService, deleteEquipmentService, editEquipmentService } from "../equipmentsServicesFrontEnd";

export const useEquipment = () => {
  const router = useRouter();

  const addEquipment = useMutation({
    mutationFn: async (data: IAddEquipmentFormInput) => {
      await addEquipmentService(data);
    },
  });

  const editEquipment = useMutation({
    mutationFn: (data: IEditEquipmentFormInput) => {
      return editEquipmentService({ id: data.id, data });
    },
  });

  const deleteEquipment = useMutation({
    mutationFn: deleteEquipmentService,
  });

  return { addEquipment, editEquipment, deleteEquipment };
};
