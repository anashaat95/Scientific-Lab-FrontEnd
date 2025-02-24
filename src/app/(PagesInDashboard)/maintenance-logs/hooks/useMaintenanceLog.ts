"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IAddMaintenanceLogFormInput, IUpdateMaintenanceLogFormInput } from "../MaintenanceLogsInterfaces";
import { addMaintenanceLogService, deleteMaintenanceLogService, updateMaintenanceLogService } from "../MaintenanceLogsServicesFrontEnd";

export const useMaintenanceLog = () => {
  const router = useRouter();

  const addMaintenanceLog = useMutation({
    mutationFn: async (data: IAddMaintenanceLogFormInput) => {
      await addMaintenanceLogService(data);
    },
  });

  const updateMaintenanceLog = useMutation({
    mutationFn: (data: IUpdateMaintenanceLogFormInput) => {
      return updateMaintenanceLogService({ id: data.id, data });
    },
  });

  const deleteMaintenanceLog = useMutation({
    mutationFn: deleteMaintenanceLogService,
  });

  return { addMaintenanceLog, updateMaintenanceLog, deleteMaintenanceLog };
};
