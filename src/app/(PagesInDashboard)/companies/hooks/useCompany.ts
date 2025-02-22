"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IAddCompanyFormInput, IEditCompanyFormInput } from "../companiesInterfaces";
import { addCompanyService, deleteCompanyService, editCompanyService } from "../companiesServicesFrontEnd";

export const useCompany = () => {
  const router = useRouter();

  const addCompany = useMutation({
    mutationFn: async (data: IAddCompanyFormInput) => {
      await addCompanyService(data);
    },
  });

  const editCompany = useMutation({
    mutationFn: (data: IEditCompanyFormInput) => {
      return editCompanyService({ id: data.id, data });
    },
  });

  const deleteCompany = useMutation({
    mutationFn: deleteCompanyService,
  });

  return { addCompany, editCompany, deleteCompany };
};
