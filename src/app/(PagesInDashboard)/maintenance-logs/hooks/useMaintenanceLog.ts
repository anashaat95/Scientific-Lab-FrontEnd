"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { IAddMaintenanceLogFormInput, IUpdateMaintenanceLogFormInput } from "../MaintenanceLogsInterfaces";
import { addMaintenanceLogService, deleteMaintenanceLogService, updateMaintenanceLogService } from "../MaintenanceLogsServicesFrontEnd";

export const useMaintenanceLog = () => {
  const router = useRouter();

  const addMaintenanceLog = useMutation({
    mutationFn: async (data: IAddMaintenanceLogFormInput) => {
      await addMaintenanceLogService(data);
    },
    onSuccess: () => {
      toast.success("Maintenance log added successfully");
    },
  });

  const updateMaintenanceLog = useMutation({
    mutationFn: (data: IUpdateMaintenanceLogFormInput) => {
      return updateMaintenanceLogService({ id: data.id, data });
    },
    onSuccess: () => {
      toast.success("Maintenance log updated successfully");
    },
  });

  const deleteMaintenanceLog = useMutation({
    mutationFn: deleteMaintenanceLogService,
    onSuccess: () => {
      toast.success("Maintenance log deleted successfully");
    },
  });

  return { addMaintenanceLog, updateMaintenanceLog, deleteMaintenanceLog };
};
