"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IAddCityFormInput, IEditCityFormInput } from "../citiesInterfaces";
import { addCityService, deleteCityService, editCityService } from "../citiesServicesFrontEnd";

export const useCity = () => {
  const router = useRouter();

  const addCity = useMutation({
    mutationFn: async (data: IAddCityFormInput) => {
      await addCityService(data);
    },
  });

  const editCity = useMutation({
    mutationFn: (data: IEditCityFormInput) => {
      return editCityService({ id: data.id, data });
    },
  });

  const deleteCity = useMutation({
    mutationFn: deleteCityService,
  });

  return { addCity, editCity, deleteCity };
};
