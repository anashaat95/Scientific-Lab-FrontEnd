"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { IAddCountryFormInput, IUpdateCountryFormInput } from "../countriesInterfaces";
import { addCountryService, deleteCountryService, updateCountryService } from "../countriesServicesFrontEnd";

export const useCountry = () => {
  const router = useRouter();

  const addCountry = useMutation({
    mutationFn: async (data: IAddCountryFormInput) => {
      await addCountryService(data);
    },
    onSuccess: () => {
      toast.success("Country added successfully");
    },
  });

  const updateCountry = useMutation({
    mutationFn: (data: IUpdateCountryFormInput) => {
      return updateCountryService({ id: data.id, data });
    },
    onSuccess: () => {
      toast.success("Country updated successfully");
    },
  });

  const deleteCountry = useMutation({
    mutationFn: deleteCountryService,
    onSuccess: () => {
      toast.success("Country deleted successfully");
    },
  });

  return { addCountry, updateCountry, deleteCountry };
};
