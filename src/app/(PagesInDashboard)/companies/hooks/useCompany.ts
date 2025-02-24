"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IAddCompanyFormInput, IUpdateCompanyFormInput } from "../companiesInterfaces";
import { addCompanyService, deleteCompanyService, updateCompanyService } from "../companiesServicesFrontEnd";

export const useCompany = () => {
  const router = useRouter();

  const addCompany = useMutation({
    mutationFn: async (data: IAddCompanyFormInput) => {
      await addCompanyService(data);
    },
  });

  const updateCompany = useMutation({
    mutationFn: (data: IUpdateCompanyFormInput) => {
      return updateCompanyService({ id: data.id, data });
    },
  });

  const deleteCompany = useMutation({
    mutationFn: deleteCompanyService,
  });

  return { addCompany, updateCompany, deleteCompany };
};
