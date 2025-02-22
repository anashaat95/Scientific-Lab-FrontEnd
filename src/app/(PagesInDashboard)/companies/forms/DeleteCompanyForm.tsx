"use client";
import { DeleteFormModal } from "@/components/forms/DeleteFormModal";
import { COMPANIES_FRONTEND_ENDPOINT } from "../companiesConsts";
import useDeleteCompanyFormHandler from "../hooks/useDeleteCompanyFormHandler";

export default function DeleteCompanyForm({ id }: { id: string }) {
  const { submit, errorMessage, isPending, isSuccess } = useDeleteCompanyFormHandler({ id });

  return (
    <DeleteFormModal
      backUrl={COMPANIES_FRONTEND_ENDPOINT}
      itemName={`Company`}
      errorMessage={errorMessage}
      isPending={isPending}
      isSuccess={isSuccess}
      submitFn={submit}
    />
  );
}
