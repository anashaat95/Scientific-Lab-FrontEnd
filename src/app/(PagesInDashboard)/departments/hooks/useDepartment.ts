"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { IAddDepartmentFormInput, IUpdateDepartmentFormInput } from "../departmentsInterfaces";
import { addDepartmentService, deleteDepartmentService, updateDepartmentService } from "../departmentsServicesFrontEnd";

export const useDepartment = () => {
  const router = useRouter();

  const addDepartment = useMutation({
    mutationFn: async (data: IAddDepartmentFormInput) => {
      await addDepartmentService(data);
    },
    onSuccess: () => {
      toast.success("Department added successfully");
    },
  });

  const updateDepartment = useMutation({
    mutationFn: (data: IUpdateDepartmentFormInput) => {
      return updateDepartmentService({ id: data.id, data });
    },
    onSuccess: () => {
      toast.success("Department updated successfully");
    },
  });

  const deleteDepartment = useMutation({
    mutationFn: deleteDepartmentService,
    onSuccess: () => {
      toast.success("Department deleted successfully");
    },
  });

  return { addDepartment, updateDepartment, deleteDepartment };
};
