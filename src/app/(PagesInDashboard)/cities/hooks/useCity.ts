"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { IAddCityFormInput, IUpdateCityFormInput } from "../citiesInterfaces";
import { addCityService, deleteCityService, updateCityService } from "../citiesServicesFrontEnd";

export const useCity = () => {
  const router = useRouter();

  const addCity = useMutation({
    mutationFn: async (data: IAddCityFormInput) => {
      await addCityService(data);
    },
    onSuccess: () => {
      toast.success("City added successfully");
    },
  });

  const updateCity = useMutation({
    mutationFn: (data: IUpdateCityFormInput) => {
      return updateCityService({ id: data.id, data });
    },
    onSuccess: () => {
      toast.success("City updated successfully");
    },
  });

  const deleteCity = useMutation({
    mutationFn: deleteCityService,
    onSuccess: () => {
      toast.success("City deleted successfully");
    },
  });

  return { addCity, updateCity, deleteCity };
};
