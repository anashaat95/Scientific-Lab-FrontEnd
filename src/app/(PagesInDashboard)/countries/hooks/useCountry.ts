"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IAddCountryFormInput, IUpdateCountryFormInput } from "../countriesInterfaces";
import { addCountryService, deleteCountryService, updateCountryService } from "../countriesServicesFrontEnd";

export const useCountry = () => {
  const router = useRouter();

  const addCountry = useMutation({
    mutationFn: async (data: IAddCountryFormInput) => {
      await addCountryService(data);
    },
  });

  const updateCountry = useMutation({
    mutationFn: (data: IUpdateCountryFormInput) => {
      return updateCountryService({ id: data.id, data });
    },
  });

  const deleteCountry = useMutation({
    mutationFn: deleteCountryService,
  });

  return { addCountry, updateCountry, deleteCountry };
};
