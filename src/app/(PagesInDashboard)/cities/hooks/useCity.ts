"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { IAddCityFormInput, IUpdateCityFormInput } from "../citiesInterfaces";
import { addCityService, deleteCityService, updateCityService } from "../citiesServicesFrontEnd";

export const useCity = () => {
  const router = useRouter();

  const addCity = useMutation({
    mutationFn: async (data: IAddCityFormInput) => {
      await addCityService(data);
    },
  });

  const updateCity = useMutation({
    mutationFn: (data: IUpdateCityFormInput) => {
      return updateCityService({ id: data.id, data });
    },
  });

  const deleteCity = useMutation({
    mutationFn: deleteCityService,
  });

  return { addCity, updateCity, deleteCity };
};
