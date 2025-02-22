"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IAddCountryFormInput, IEditCountryFormInput } from "../countriesInterfaces";
import { addCountryService, deleteCountryService, editCountryService } from "../countriesServicesFrontEnd";

export const useCountry = () => {
  const router = useRouter();

  const addCountry = useMutation({
    mutationFn: async (data: IAddCountryFormInput) => {
      await addCountryService(data);
    },
  });

  const editCountry = useMutation({
    mutationFn: (data: IEditCountryFormInput) => {
      return editCountryService({ id: data.id, data });
    },
  });

  const deleteCountry = useMutation({
    mutationFn: deleteCountryService,
  });

  return { addCountry, editCountry, deleteCountry };
};
