"use client";
import { DeleteFormModal } from "@/components/forms/DeleteFormModal";
import { CITIES_FRONTEND_ENDPOINT } from "../citiesConsts";
import useDeleteCityFormHandler from "../hooks/useDeleteCityFormHandler";

export default function DeleteCityForm({ id }: { id: string }) {
  const { submit, errorMessage, isPending, isSuccess } = useDeleteCityFormHandler({ id });

  return (
    <DeleteFormModal
      backUrl={CITIES_FRONTEND_ENDPOINT}
      itemName={`City`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitFn={submit}
    />
  );
}
