"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IAddDepartmentFormInput, IUpdateDepartmentFormInput } from "../departmentsInterfaces";
import { addDepartmentService, deleteDepartmentService, updateDepartmentService } from "../departmentsServicesFrontEnd";

export const useDepartment = () => {
  const router = useRouter();

  const addDepartment = useMutation({
    mutationFn: async (data: IAddDepartmentFormInput) => {
      await addDepartmentService(data);
    },
  });

  const updateDepartment = useMutation({
    mutationFn: (data: IUpdateDepartmentFormInput) => {
      return updateDepartmentService({ id: data.id, data });
    },
  });

  const deleteDepartment = useMutation({
    mutationFn: deleteDepartmentService,
  });

  return { addDepartment, updateDepartment, deleteDepartment };
};
