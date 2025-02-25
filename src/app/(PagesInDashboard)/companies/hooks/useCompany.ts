"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { IAddCompanyFormInput, IUpdateCompanyFormInput } from "../companiesInterfaces";
import { addCompanyService, deleteCompanyService, updateCompanyService } from "../companiesServicesFrontEnd";

export const useCompany = () => {
  const router = useRouter();

  const addCompany = useMutation({
    mutationFn: async (data: IAddCompanyFormInput) => {
      await addCompanyService(data);
    },
    onSuccess: () => {
      toast.success("Company added successfully");
    },
  });

  const updateCompany = useMutation({
    mutationFn: (data: IUpdateCompanyFormInput) => {
      return updateCompanyService({ id: data.id, data });
    },
    onSuccess: () => {
      toast.success("Company updated successfully");
    },
  });

  const deleteCompany = useMutation({
    mutationFn: deleteCompanyService,
    onSuccess: () => {
      toast.success("Company deleted successfully");
    },
  });

  return { addCompany, updateCompany, deleteCompany };
};
