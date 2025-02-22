"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IAddMaintenanceLogFormInput, IEditMaintenanceLogFormInput } from "../MaintenanceLogsInterfaces";
import { addMaintenanceLogService, deleteMaintenanceLogService, editMaintenanceLogService } from "../MaintenanceLogsServicesFrontEnd";

export const useMaintenanceLog = () => {
  const router = useRouter();

  const addMaintenanceLog = useMutation({
    mutationFn: async (data: IAddMaintenanceLogFormInput) => {
      await addMaintenanceLogService(data);
    },
  });

  const editMaintenanceLog = useMutation({
    mutationFn: (data: IEditMaintenanceLogFormInput) => {
      return editMaintenanceLogService({ id: data.id, data });
    },
  });

  const deleteMaintenanceLog = useMutation({
    mutationFn: deleteMaintenanceLogService,
  });

  return { addMaintenanceLog, editMaintenanceLog, deleteMaintenanceLog };
};
