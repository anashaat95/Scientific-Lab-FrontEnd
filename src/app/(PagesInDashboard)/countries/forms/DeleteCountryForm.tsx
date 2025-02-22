"use client";
import { DeleteFormModal } from "@/components/forms/DeleteFormModal";

import { COUNTRIES_FRONTEND_ENDPOINT } from "../countriesConsts";
import useDeleteCountryFormHandler from "../hooks/useDeleteCountryFormHandler";

export default function DeleteCountryForm({ id }: { id: string }) {
  const { submit, errorMessage, isPending, isSuccess } = useDeleteCountryFormHandler({ id });

  return (
    <DeleteFormModal
      backUrl={COUNTRIES_FRONTEND_ENDPOINT}
      itemName={`Country`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitFn={submit}
    />
  );
}
