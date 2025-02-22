"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IAddDepartmentFormInput, IEditDepartmentFormInput } from "../departmentsInterfaces";
import { addDepartmentService, deleteDepartmentService, editDepartmentService } from "../departmentsServicesFrontEnd";

export const useDepartment = () => {
  const router = useRouter();

  const addDepartment = useMutation({
    mutationFn: async (data: IAddDepartmentFormInput) => {
      await addDepartmentService(data);
    },
  });

  const editDepartment = useMutation({
    mutationFn: (data: IEditDepartmentFormInput) => {
      return editDepartmentService({ id: data.id, data });
    },
  });

  const deleteDepartment = useMutation({
    mutationFn: deleteDepartmentService,
  });

  return { addDepartment, editDepartment, deleteDepartment };
};
